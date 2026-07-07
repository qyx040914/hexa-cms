const http = require('http');
const path = require('path');
const colors = require('colors');
const { readFilePromise } = require('./file-utils');

const titlesFile = path.join(__dirname, 'titles.json');
const templateFile = path.join(__dirname, 'template.html');

async function renderBlogPage(req, res) {
  try {
    const data = await readFilePromise(titlesFile);
    const titles = JSON.parse(data);
    const tmpl = await readFilePromise(templateFile);
    const html = tmpl.replace('%', titles.join('</li><li>'));

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    console.error('系统严重错误：'.red, err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server Error');
  }
}

const server = http.createServer(renderBlogPage);

server.listen(8000, '127.0.0.1', () => {
  console.log('Async/Await CMS 服务已启动：http://127.0.0.1:8000'.green);
});
