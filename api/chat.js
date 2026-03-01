// Save this file as: api/chat.js in your Vercel project
// Fixed version with correct safetySettings

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the message from the request
  const { message, conversationHistory } = req.body;

  // Validate input
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Build the conversation history for Gemini
    const contents = [
      ...(conversationHistory || []).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Call Gemini API with CORRECT safety settings
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_CIVIC_INTEGRITY',
              threshold: 'BLOCK_NONE'
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);
      
      // Better error messages
      let errorMessage = 'Failed to get response from Gemini';
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      
      return res.status(response.status).json({ 
        error: errorMessage
      });
    }

    const data = await response.json();

    // Extract the response text
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      // Sometimes the API returns empty candidates if content is blocked
      if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === 'SAFETY') {
        return res.status(200).json({
          success: true,
          message: "I can't respond to that. Please try a different question.",
          usage: data.usageMetadata || {}
        });
      }
      
      return res.status(500).json({ 
        error: 'Unexpected response format from Gemini API',
        details: 'No content in response'
      });
    }

    const assistantMessage = data.candidates[0].content.parts[0].text;

    // Return the response
    res.status(200).json({
      success: true,
      message: assistantMessage,
      usage: data.usageMetadata || {}
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message 
    });
  }
}