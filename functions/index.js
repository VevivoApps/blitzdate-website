import { onRequest } from 'firebase-functions/v2/https';

let cachedToken = null;
let tokenExpiry = 0;

const getSendPulseErrorMessage = (responseData, defaultMessage) => {
  if (typeof responseData !== 'object' || responseData === null) {
    if (typeof responseData === 'string' && responseData.trim().length > 0) {
      return responseData;
    }
    return defaultMessage;
  }
  return responseData.error_description || responseData.message || responseData.error || defaultMessage;
};

const getAccessToken = async (apiUserId, apiSecret) => {
  if (cachedToken && tokenExpiry > Date.now()) {
    return cachedToken;
  }
  try {
    const tokenResponse = await fetch('https://api.sendpulse.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: apiUserId,
        client_secret: apiSecret,
      }),
    });
    if (!tokenResponse.ok) {
      cachedToken = null;
      tokenExpiry = 0;
      return null;
    }
    const tokenData = await tokenResponse.json();
    cachedToken = tokenData.access_token;
    tokenExpiry = Date.now() + (tokenData.expires_in - 60) * 1000;
    return cachedToken;
  } catch {
    cachedToken = null;
    tokenExpiry = 0;
    return null;
  }
};

export const subscribeNewsletter = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    res.status(400).json({ success: false, error: 'Invalid content type' });
    return;
  }

  const body = req.body || {};
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const website_details = typeof body.website_details === 'string' ? body.website_details : '';

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    res.status(400).json({ success: false, error: 'Invalid email address format.' });
    return;
  }

  if (website_details && website_details.trim().length > 0) {
    res.status(200).json({ success: true, message: "Successfully subscribed! We'll keep you updated." });
    return;
  }

  const apiUserId = process.env.SENDPULSE_API_USER_ID || null;
  const apiSecret = process.env.SENDPULSE_API_SECRET || null;
  const addressBookId = process.env.SENDPULSE_ADDRESS_BOOK_ID || null;
  const notifyEmail = process.env.NEWSLETTER_NOTIFY_EMAIL || 'info@blitzdate.app';

  if (!apiUserId || !apiSecret || !addressBookId) {
    res.status(503).json({ success: false, error: 'Subscription service is currently unavailable. Please try again later.' });
    return;
  }

  const accessToken = await getAccessToken(apiUserId, apiSecret);
  if (!accessToken) {
    res.status(401).json({ success: false, error: 'Authentication failed with email service.' });
    return;
  }

  try {
    const addEmailPayload = {
      emails: [{
        email,
        variables: { spt_tags: 'Newsletter Subscriber' }
      }]
    };

    const addEmailResponse = await fetch(`https://api.sendpulse.com/addressbooks/${addressBookId}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(addEmailPayload),
    });

    const responseBodyText = await addEmailResponse.text();
    let responseBody;
    try {
      responseBody = JSON.parse(responseBodyText);
    } catch {
      res.status(500).json({ success: false, error: `Failed to subscribe. Email service response: ${responseBodyText || `Status ${addEmailResponse.status}`}` });
      return;
    }

    if (!addEmailResponse.ok) {
      const errorMessage = getSendPulseErrorMessage(responseBody, `Failed to subscribe. Status: ${addEmailResponse.status}`);
      res.status(addEmailResponse.status).json({ success: false, error: errorMessage });
      return;
    }

    if (responseBody.result === true) {
      try {
        const payload = {
          email: {
            subject: 'New newsletter subscription',
            text: `A new user subscribed to the newsletter: ${email}`,
            from: {
              email: notifyEmail,
              name: 'BlitzDate',
            },
            to: [{ email: notifyEmail }],
          },
        };
        const resNotify = await fetch('https://api.sendpulse.com/smtp/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        });
        if (!resNotify.ok) {
          await resNotify.text();
        }
      } catch { void 0; }
      res.status(200).json({ success: true, message: "Successfully subscribed! We'll keep you updated." });
      return;
    } else {
      const errorMessage = getSendPulseErrorMessage(responseBody, 'Subscription failed. Please check details or try again.');
      res.status(400).json({ success: false, error: errorMessage });
      return;
    }
  } catch {
    res.status(500).json({ success: false, error: 'Could not complete the subscription process due to a network or unexpected issue.' });
  }
});
