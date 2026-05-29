// API Gateway للتفاعل مع Anthropic API بشكل آمن
// Backend Function - Serverless

export default async function handler(req, res) {
  // التحقق من الطريقة
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // التحقق من المفتاح السري
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // الطلب الآمن إلى Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.error?.message || 'API Error' });
    }

    const data = await response.json();
    const content = data.content[0]?.text || '';

    return res.status(200).json({
      success: true,
      message: content,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Backend Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}