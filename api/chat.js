export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, conversationHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message' });
  }

  try {
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'HUGGING_FACE_API_KEY not set' });
    }

    // Format conversation history for Hugging Face
    const formattedHistory = (conversationHistory || [])
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = formattedHistory 
      ? `${formattedHistory}\nUser: ${message}\nAssistant:`
      : `User: ${message}\nAssistant:`;

    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 512,
            temperature: 0.7,
            top_p: 0.95
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error || 'Unknown error from Hugging Face';
      return res.status(response.status).json({ error: errorMsg });
    }

    // Extract text from response
    let assistantMessage = '';
    
    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      assistantMessage = data[0].generated_text;
      // Remove the prompt from the response
      assistantMessage = assistantMessage.replace(prompt, '').trim();
    } else if (data.generated_text) {
      assistantMessage = data.generated_text.replace(prompt, '').trim();
    } else {
      return res.status(500).json({ error: 'Invalid response format from Hugging Face' });
    }

    if (!assistantMessage) {
      return res.status(500).json({ error: 'Empty response from model' });
    }

    return res.status(200).json({
      success: true,
      message: assistantMessage
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}