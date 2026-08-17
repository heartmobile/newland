// lib/authSigner.ts
import crypto from 'crypto';

interface OAuthCredentials {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

/**
 * Generates an OAuth 1.0a HMAC-SHA1 Authorization Header string.
 * This runs strictly on the server-side to protect your private API keys.
 */
export function generateOAuthHeader(
  method: string, 
  url: string, 
  creds: OAuthCredentials
): string {
  // 1. Generate unique request parameters
  const nonce = crypto.randomBytes(16).toString('hex');
  const timestamp = Math.floor(Date.now() / 1000).toString();

  // 2. Set up base protocol parameters
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: creds.consumerKey,
    oauth_token: creds.accessToken,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_nonce: nonce,
    oauth_version: '1.0'
  };

  // 3. Sort parameters alphabetically (Required by OAuth 1.0a spec)
  const sortedKeys = Object.keys(oauthParams).sort();
  const parameterString = sortedKeys
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(oauthParams[key])}`)
    .join('&');

  // 4. Construct the unique signing text block
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(parameterString)}`;
  const signingKey = `${encodeURIComponent(creds.consumerSecret)}&${encodeURIComponent(creds.accessTokenSecret)}`;
  
  // 5. Generate the HMAC-SHA1 signature hash
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');

  oauthParams['oauth_signature'] = signature;

  // 6. Format the final text output for the HTTP authorization header line
  return 'OAuth ' + Object.keys(oauthParams)
    .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
    .join(', ');
}
