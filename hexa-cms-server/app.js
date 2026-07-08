const express = require('express');

if (!globalThis.crypto) {
  globalThis.crypto = require('crypto').webcrypto;
}

const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hexa_cms';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'hexa-cms-super-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => {
    console.log('CMS 数据库连接成功！');
  })
  .catch((err) => {
    console.error('数据库连接失败，请确认 MongoDB 已启动：', err.message);
  });

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'hexa-cms-server',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    mongoUri,
    auth: 'session-enabled',
    posts: 'restful-enabled',
  });
});

app.use((req, res) => {
  res.status(404).json({ error: '请求的资源不存在' });
});

app.listen(port, () => {
  console.log(`Express MERN API 服务器已启动：http://localhost:${port}`);
});
