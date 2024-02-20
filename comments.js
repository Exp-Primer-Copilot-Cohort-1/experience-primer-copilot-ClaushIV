// create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  const extname = path.extname(pathname);
  const mimeType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  if (pathname === '/') {
    fs.readFile('./index.html', 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (extname === '.css' || extname === '.js') {
    fs.readFile(`.${pathname}`, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': mimeType[extname] });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```
```html
<!-- Path: index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Comments</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app"></div>
  <script src="app.js"></script>
</body>
</html>
```
```css
/* Path: style.css */
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
```
```javascript
// Path: app.js
const app = document.getElementById('app');
const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');
const comments = document.createElement('div');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text