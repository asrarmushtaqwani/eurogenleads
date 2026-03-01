// Save this file as: api/chat.js in your Vercel project
// Using gemini-pro-vision which is more widely available

export default async function handler(req, res) {
  console.log('API called with method:', req.method);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the message from the request
  const { message, conversationHistory } = req.body;
  console.log('Received message:', message);

  // Validate input
  if (!message || typeof message !== 'string') {
    console.log('Invalid message');
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('API Key exists:', !!apiKey);
    
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

    console.log('Calling Gemini API...');

    // Call Gemini API - trying with gemini-pro which is more stable
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    console.log('URL:', url.replace(apiKey, 'KEY_HIDDEN'));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API error:', error);
      
      let errorMessage = 'Failed to get response from Gemini';
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      
      return res.status(response.status).json({ 
        error: errorMessage
      });
    }

    const data = await response.json();
    console.log('Got response from Gemini');

    // Extract the response text
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.log('No content in response');
      return res.status(500).json({ 
        error: 'No response from Gemini',
        details: 'Empty candidates'
      });
    }

    const assistantMessage = data.candidates[0].content.parts[0].text;
    console.log('Sending response back to client');

    // Return the response
    res.status(200).json({
      success: true,
      message: assistantMessage,
      usage: data.usageMetadata || {}
    });

  } catch (error) {
    console.error('Catch error:', error);
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message 
    });
  }
}