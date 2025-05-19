const http = require('http');
const https = require('https');
const { URL } = require('url');

const hostName = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = reqUrl.pathname;
  const searchParams = reqUrl.searchParams;

  if (path === '/song') {
    const songUrl = searchParams.get('url');

    if (!songUrl) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing "url" query parameter' }));
      return;
    }

    const encodedUrl = encodeURIComponent(songUrl);
    const apiUrl = `https://api.song.link/v1-alpha.1/links?url=${encodedUrl}&userCountry=US`;

    https.get(apiUrl, (apiRes) => {
      let data = '';

      apiRes.on('data', (chunk) => {
        data += chunk;
      });

      apiRes.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }).on('error', (err) => {
      console.error('Error fetching from Songlink:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch song data' }));
    });

  } else {
    
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>404 - Not Found</h1></body></html>');
  }
});

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
