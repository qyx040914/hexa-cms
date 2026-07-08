const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

if (!globalThis.crypto) {
  globalThis.crypto = require('crypto').webcrypto;
}

const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hexa_cms';
const socketOrigins = (process.env.SOCKET_CORS_ORIGIN || 'http://localhost:3000,http://127.0.0.1:3000,http://114.55.63.161')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: socketOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.set('io', io);

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

io.on('connection', (socket) => {
  console.log(`WebSocket client connected: ${socket.id}`);

  socket.emit('server:welcome', {
    message: 'WebSocket connected',
    socketId: socket.id,
    connectedAt: new Date().toISOString(),
  });

  socket.on('disconnect', (reason) => {
    console.log(`WebSocket client disconnected: ${socket.id}, reason: ${reason}`);
  });
});

app.use((req, res) => {
  res.status(404).json({ error: '请求的资源不存在' });
});

server.listen(port, () => {
  console.log(`Express MERN API 服务器已启动：http://localhost:${port}`);
});
