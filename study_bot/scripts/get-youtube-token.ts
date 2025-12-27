/**
 * get-youtube-token.ts
 * 
 * Helper script to obtain YouTube OAuth2 refresh token using localhost redirect.
 * 
 * Prerequisites:
 * 1. Create OAuth 2.0 credentials in Google Cloud Console
 * 2. Enable YouTube Data API v3
 * 3. Add http://localhost:3333 to authorized redirect URIs in your OAuth client
 * 
 * Usage:
 * 1. Set YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET in .env
 * 2. Run: npx ts-node scripts/get-youtube-token.ts
 * 3. Browser will open automatically
 * 4. Authorize your YouTube account
 * 5. The refresh token will be displayed in the console
 */

import dotenv from 'dotenv';
import { google } from 'googleapis';
import http from 'http';
import open from 'open';

dotenv.config();

const SCOPES = [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.force-ssl'
];

const REDIRECT_PORT = 3333;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;

async function main() {
    const clientId = process.env.YOUTUBE_CLIENT_ID;
    const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.error('❌ Missing YOUTUBE_CLIENT_ID or YOUTUBE_CLIENT_SECRET in .env');
        console.log('\nTo set up:');
        console.log('1. Go to https://console.cloud.google.com/apis/credentials');
        console.log('2. Create OAuth 2.0 Client ID (Web application)');
        console.log('3. Add http://localhost:3333 to Authorized redirect URIs');
        console.log('4. Copy Client ID and Secret to .env file');
        process.exit(1);
    }

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        REDIRECT_URI
    );

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });

    console.log('\n=== YouTube OAuth2 Token Generator ===\n');
    console.log('Starting local server on port', REDIRECT_PORT);
    console.log('Opening browser for authorization...\n');

    // Create a simple HTTP server to catch the callback
    const server = http.createServer(async (req, res) => {
        if (req.url?.startsWith('/?')) {
            const url = new URL(req.url, REDIRECT_URI);
            const code = url.searchParams.get('code');
            const error = url.searchParams.get('error');

            if (error) {
                res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`<h1>❌ Error</h1><p>${error}</p><p>You can close this window.</p>`);
                console.error('❌ Authorization error:', error);
                server.close();
                process.exit(1);
            }

            if (code) {
                try {
                    const { tokens } = await oauth2Client.getToken(code);

                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(`
                        <h1>✅ Authorization Successful!</h1>
                        <p>Refresh token has been displayed in the console.</p>
                        <p>You can close this window.</p>
                    `);

                    console.log('\n✅ Success! Here is your refresh token:\n');
                    console.log('━'.repeat(60));
                    console.log(tokens.refresh_token);
                    console.log('━'.repeat(60));

                    console.log('\n📋 Add this to your .env file:');
                    console.log(`YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}`);
                    console.log('\n⚠️  IMPORTANT: Keep your refresh token secret!');

                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(`<h1>❌ Error getting tokens</h1><p>${err}</p>`);
                    console.error('❌ Error getting tokens:', err);
                }

                setTimeout(() => {
                    server.close();
                    process.exit(0);
                }, 1000);
            }
        }
    });

    server.listen(REDIRECT_PORT, () => {
        console.log(`Server listening on ${REDIRECT_URI}`);
        console.log('\nIf browser does not open automatically, visit:');
        console.log(authUrl);
        console.log('');

        // Try to open browser automatically
        open(authUrl).catch(() => {
            console.log('Could not open browser automatically. Please open the URL above manually.');
        });
    });
}

main();
