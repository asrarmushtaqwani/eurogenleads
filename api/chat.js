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

    // Format conversation history
    const formattedHistory = (conversationHistory || [])
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = formattedHistory 
      ? `${formattedHistory}\nUser: ${message}\nAssistant:`
      : `User: ${message}\nAssistant:`;

    // Using NEW endpoint: router.huggingface.co with distilgpt2
    const response = await fetch(
      'https://router.huggingface.co/models/distilgpt2',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 200,
            temperature: 0.8
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = Array.isArray(data) && data[0] && data[0].error 
        ? data[0].error 
        : (data.error || 'Unknown error from Hugging Face');
      return res.status(response.status).json({ error: errorMsg });
    }

    // Extract text from response
    let assistantMessage = '';
    
    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      assistantMessage = data[0].generated_text;
      // Remove the prompt from the response
      assistantMessage = assistantMessage.replace(prompt, '').trim();
    } else {
      return res.status(500).json({ error: 'Invalid response format' });
    }

    if (!assistantMessage) {
      assistantMessage = 'I received your message. How can I help?';
    }

    return res.status(200).json({
      success: true,
      message: assistantMessage
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}