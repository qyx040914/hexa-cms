const express = require('express');

const app = express();
const port = 5000;

const posts = [
  { id: 1, title: 'React+Node.js 全栈之路', author: '张三' },
  { id: 2, title: '理解 Express 中间件', author: '李四' },
  { id: 3, title: 'Axios 跨域联调实践', author: '钱宇歆' },
];

app.get('/api/posts', function getPosts(req, res) {
  res.json(posts);
});

app.get('/api/health', function getHealth(req, res) {
  res.json({ status: 'ok', service: 'hexa-cms-server' });
});

app.listen(port, () => {
  console.log(`Express API 服务器已启动：http://localhost:${port}`);
});
