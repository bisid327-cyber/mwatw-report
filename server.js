const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'src');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
};

// Mock Database (In-Memory)
const db = {
    users: [], // { email, password, name }
    reports: [] // { id, userId, data }
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Simple CORS and Preflight
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // ──────────────────────────────────
    // API Routes
    // ──────────────────────────────────
    if (req.url.startsWith('/api/')) {
        res.setHeader('Content-Type', 'application/json');
        
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            let data = {};
            if (body) {
                try { data = JSON.parse(body); } catch(e) {}
            }

            if (req.url === '/api/signup' && req.method === 'POST') {
                const existing = db.users.find(u => u.email === data.email);
                if (existing) {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ error: "User already exists" }));
                }
                const user = { email: data.email, password: data.password, name: data.name };
                db.users.push(user);
                res.writeHead(200);
                return res.end(JSON.stringify({ message: "Account created", user: { email: user.email, name: user.name } }));
            }

            if (req.url === '/api/login' && req.method === 'POST') {
                const user = db.users.find(u => u.email === data.email && u.password === data.password);
                if (!user) {
                    res.writeHead(401);
                    return res.end(JSON.stringify({ error: "Invalid credentials" }));
                }
                res.writeHead(200);
                // In a real app we'd return a JWT token, here we just return the user object as a "token"
                return res.end(JSON.stringify({ message: "Login successful", token: user.email, user: { email: user.email, name: user.name } }));
            }

            if (req.url === '/api/reports' && req.method === 'GET') {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    res.writeHead(401);
                    return res.end(JSON.stringify({ error: "Unauthorized" }));
                }
                const email = authHeader.replace('Bearer ', '');
                const userReports = db.reports.filter(r => r.userId === email).map(r => r.data);
                res.writeHead(200);
                return res.end(JSON.stringify({ reports: userReports }));
            }

            if (req.url === '/api/reports' && req.method === 'POST') {
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    res.writeHead(401);
                    return res.end(JSON.stringify({ error: "Unauthorized" }));
                }
                const email = authHeader.replace('Bearer ', '');
                
                // Expects { reports: [...] }
                if (data.reports && Array.isArray(data.reports)) {
                    // Overwrite user's reports
                    db.reports = db.reports.filter(r => r.userId !== email);
                    data.reports.forEach(rpt => {
                        db.reports.push({ id: rpt.id, userId: email, data: rpt });
                    });
                    res.writeHead(200);
                    return res.end(JSON.stringify({ message: "Reports synced successfully" }));
                } else {
                    res.writeHead(400);
                    return res.end(JSON.stringify({ error: "Invalid payload" }));
                }
            }

            res.writeHead(404);
            res.end(JSON.stringify({ error: "API route not found" }));
        });
        return;
    }

    // ──────────────────────────────────
    // Static File Serving
    // ──────────────────────────────────
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found', 'utf-8');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`API endpoints ready at http://localhost:${PORT}/api/`);
});
