import { readFile } from 'fs/promises';
import { createServer } from 'http';
const PORT = 3002;

const server = createServer(async (req, res) => {
    console.log(req.url);
    if (req.method === 'GET') {
        if (req.url === '/') {
            try {
                const data = await readFile(path.join('public', 'index.html'));
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            } catch (error) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('<h1>404 Not Found</h1>');
            }
        }
    }
});


server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});