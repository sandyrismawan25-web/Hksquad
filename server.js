'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { OAuth2Client } = require('google-auth-library');

const root = __dirname;
const envPath = path.join(root, '.env');
const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
};

function loadEnvFile() {
    if (!fs.existsSync(envPath)) {
        return;
    }

    for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
        const entry = line.trim();
        if (!entry || entry.startsWith('#')) {
            continue;
        }

        const separator = entry.indexOf('=');
        if (separator < 1) {
            continue;
        }

        const key = entry.slice(0, separator).trim();
        let value = entry.slice(separator + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"'))
            || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        if (!process.env[key]) {
            process.env[key] = value;
        }
    }
}

loadEnvFile();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const adminGoogleEmail = process.env.ADMIN_GOOGLE_EMAIL?.trim().toLowerCase();
if (!googleClientId || !adminGoogleEmail) {
    console.error('Atur GOOGLE_CLIENT_ID dan ADMIN_GOOGLE_EMAIL di environment backend sebelum menjalankan server.');
    process.exit(1);
}

const googleAuthClient = new OAuth2Client(googleClientId);
const allowedOrigins = new Set(
    (process.env.ALLOWED_ORIGINS || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
);
const failedAdminAttempts = new Map();
const maxAdminAttempts = 5;
const adminLockDuration = 15 * 60 * 1000;

function sendJson(response, status, payload, origin) {
    const headers = {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
    };
    if (origin && allowedOrigins.has(origin)) {
        headers['Access-Control-Allow-Origin'] = origin;
        headers.Vary = 'Origin';
    }
    response.writeHead(status, headers);
    response.end(JSON.stringify(payload));
}

async function readJson(request) {
    const chunks = [];
    let size = 0;

    for await (const chunk of request) {
        size += chunk.length;
        if (size > 16 * 1024) {
            const error = new Error('Request body is too large.');
            error.status = 413;
            throw error;
        }
        chunks.push(chunk);
    }

    try {
        return JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
        const error = new Error('Invalid JSON body.');
        error.status = 400;
        throw error;
    }
}

async function verifyAdminGoogleCredential(credential) {
    let ticket;
    try {
        ticket = await googleAuthClient.verifyIdToken({
            idToken: credential,
            audience: googleClientId,
        });
    } catch (error) {
        console.warn('Gagal memverifikasi token Google:', error.message);
        return { error: 'GOOGLE_AUTH_FAILED' };
    }

    const payload = ticket.getPayload();
    if (!payload || typeof payload.email !== 'string' || payload.email_verified !== true) {
        return { error: 'GOOGLE_AUTH_FAILED' };
    }
    if (payload.email.toLowerCase() !== adminGoogleEmail) {
        return { error: 'GOOGLE_ADMIN_REQUIRED' };
    }
    return { email: payload.email };
}

function recordFailedAttempt(address) {
    const now = Date.now();
    const attempt = failedAdminAttempts.get(address);
    if (!attempt || (attempt.lockedUntil && attempt.lockedUntil <= now)) {
        failedAdminAttempts.set(address, { count: 1, lockedUntil: 0 });
        return;
    }

    attempt.count += 1;
    if (attempt.count >= maxAdminAttempts) {
        attempt.lockedUntil = now + adminLockDuration;
    }
}

function serveStatic(request, response, pathname) {
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(pathname);
    } catch {
        sendJson(response, 400, { error: 'INVALID_PATH' });
        return;
    }

    const relativePath = decodedPath === '/' ? 'index.html' : decodedPath.replace(/^[/\\]+/, '');
    const normalizedPath = path.normalize(relativePath);
    const allowedPath = normalizedPath === 'index.html'
        || normalizedPath === 'member.html'
        || normalizedPath.startsWith(`css${path.sep}`)
        || normalizedPath.startsWith(`img${path.sep}`)
        || normalizedPath.startsWith(`java script${path.sep}`);
    const filePath = path.resolve(root, normalizedPath);

    if (!allowedPath || !filePath.startsWith(`${root}${path.sep}`)) {
        response.writeHead(404);
        response.end('Not found');
        return;
    }

    fs.readFile(filePath, (error, contents) => {
        if (error) {
            response.writeHead(error.code === 'ENOENT' ? 404 : 500);
            response.end(error.code === 'ENOENT' ? 'Not found' : 'Unable to read file');
            return;
        }

        response.writeHead(200, {
            'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
            'X-Content-Type-Options': 'nosniff',
        });
        if (request.method === 'HEAD') {
            response.end();
            return;
        }
        response.end(contents);
    });
}

const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url, 'http://localhost');
    const origin = request.headers.origin;

    if (requestUrl.pathname.startsWith('/api/')) {
        if (origin && !allowedOrigins.has(origin)) {
            sendJson(response, 403, { error: 'ORIGIN_NOT_ALLOWED' });
            return;
        }

        if (request.method === 'OPTIONS') {
            const headers = {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Max-Age': '600',
            };
            if (origin) {
                headers['Access-Control-Allow-Origin'] = origin;
                headers.Vary = 'Origin';
            }
            response.writeHead(204, headers);
            response.end();
            return;
        }
    }

    if (requestUrl.pathname === '/api/auth/google'
        || requestUrl.pathname === '/api/admin/reset-password') {
        if (request.method !== 'POST') {
            sendJson(response, 405, { error: 'METHOD_NOT_ALLOWED' }, origin);
            return;
        }

        const address = request.socket.remoteAddress || 'unknown';
        const attempts = failedAdminAttempts.get(address);
        if (attempts && attempts.lockedUntil > Date.now()) {
            sendJson(response, 429, { error: 'ADMIN_RATE_LIMITED' }, origin);
            return;
        }

        try {
            const body = await readJson(request);
            if (!body || typeof body.credential !== 'string' || body.credential.length > 8192) {
                sendJson(response, 400, { error: 'INVALID_INPUT' }, origin);
                return;
            }

            if (requestUrl.pathname === '/api/admin/reset-password'
                && (typeof body.newPassword !== 'string'
                    || body.newPassword.length < 8
                    || body.newPassword.length > 128
                    || !Number.isInteger(body.memberId)
                    || body.memberId < 1
                    || body.memberId > 12)) {
                sendJson(response, 400, { error: 'INVALID_INPUT' }, origin);
                return;
            }

            const authentication = await verifyAdminGoogleCredential(body.credential);
            if (authentication.error) {
                recordFailedAttempt(address);
                const status = authentication.error === 'GOOGLE_ADMIN_REQUIRED' ? 403 : 401;
                sendJson(response, status, { error: authentication.error }, origin);
                return;
            }

            failedAdminAttempts.delete(address);
            if (requestUrl.pathname === '/api/auth/google') {
                sendJson(response, 200, { email: authentication.email }, origin);
                return;
            }

            const passwordSalt = crypto.randomBytes(16).toString('hex');
            const passwordHash = crypto.createHash('sha256')
                .update(`${passwordSalt}:${body.newPassword}`, 'utf8')
                .digest('hex');
            sendJson(response, 200, { passwordSalt, passwordHash }, origin);
        } catch (error) {
            console.error('Gagal memproses permintaan reset kata sandi:', error);
            sendJson(response, error.status || 500, {
                error: error.status ? 'INVALID_REQUEST' : 'INTERNAL_ERROR',
            }, origin);
        }
        return;
    }

    if (requestUrl.pathname.startsWith('/api/')) {
        sendJson(response, 404, { error: 'NOT_FOUND' }, origin);
        return;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405);
        response.end('Method not allowed');
        return;
    }

    serveStatic(request, response, requestUrl.pathname);
});

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';
server.listen(port, host, () => {
    console.log(`HK Squad berjalan di http://127.0.0.1:${port}`);
});
