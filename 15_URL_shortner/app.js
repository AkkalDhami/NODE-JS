import { readFile } from 'fs/promises';
import { createServer } from 'http';
import path from 'path';
import crypto from 'crypto';
import { writeFile } from 'fs';
const PORT = 3000;

const serveFile = async (res, contentType, filePath) => {
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('<h1>404 Page Not Found</h1>');
    }
}

const DATA_FILE = path.join('data', 'links.json');

const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
}

const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links));
}

const server = createServer(async (req, res) => {
    console.log(req.url);
    if (req.method === 'GET') {
        if (req.url === '/favicon.ico') {
            res.writeHead(204);
            return res.end();
        }
        if (req.url === '/') {
            return serveFile(res, 'text/html', path.join('public', 'index.html'));
        } else if (req.url === '/style.css') {
            return serveFile(res, 'text/css', path.join('public', 'style.css'));
        }
    }

    if (req.method === 'POST' && req.url === '/shorten') {
        const links = await loadLinks();
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            console.log("POST REQUEST", body);
            const { url, shortCode } = JSON.parse(body);

            if (!url) {
                res.writeHead(400, { "Content-Type": 'text/plain' });
                return res.end("URL is required");
            }

            const finalCode = shortCode || crypto.randomBytes(4).toString('hex');

            if (links[finalCode]) {
                res.writeHead(400, { "Content-Type": 'text/plain' });
                return res.end("Short code already exists");
            }
            links[finalCode] = url;
            await saveLinks(links);

            res.writeHead(200, { "Content-Type": 'application/json' });
            return res.end(JSON.stringify({ finalCode }));
        });
    }

});


server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});