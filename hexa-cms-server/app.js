const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const { hashPassword, sanitizeUser } = require('./utils/password');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hexa_cms';
const adminToken = process.env.ADMIN_TOKEN || 'hexa-admin-token';

const demoPosts = [
  {
    id: 1,
    title: 'React+Node.js 全栈之路',
    content: '通过 React、Express 与 MongoDB 组成完整 MERN 项目。',
    author: '张三',
    createdAt: new Date('2026-07-08T09:00:00.000Z'),
  },
  {
    id: 2,
    title: '理解 Express 中间件',
    content: 'Express 使用中间件处理请求体、路由与错误。',
    author: '李四',
    createdAt: new Date('2026-07-08T09:10:00.000Z'),
  },
  {
    id: 3,
    title: 'RESTful API 与内容协商',
    content: '使用 HTTP 谓词、状态码、Accept 请求头和认证中间件规范接口。',
    author: '钱宇歆',
    createdAt: new Date('2026-07-08T09:20:00.000Z'),
  },
];

app.use(express.json());

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => {
    console.log('CMS 数据库连接成功！');
  })
  .catch((err) => {
    console.error('数据库连接失败，GET 接口将暂时返回演示数据：', err.message);
  });

function isMongoReady() {
  return mongoose.connection.readyState === 1;
}

function normalizePost(post) {
  if (!post._id) {
    return post;
  }

  return {
    id: post._id.toString(),
    _id: post._id,
    title: post.title,
    content: post.content,
    author: post.author,
    createdAt: post.createdAt,
  };
}

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function postsToXml(posts) {
  const entries = posts
    .map(
      (post) => `
  <post>
    <id>${escapeXml(post._id || post.id)}</id>
    <title>${escapeXml(post.title)}</title>
    <content>${escapeXml(post.content)}</content>
    <author>${escapeXml(post.author)}</author>
    <createdAt>${escapeXml(post.createdAt)}</createdAt>
  </post>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<posts>${entries}\n</posts>`;
}

function sendPosts(req, res, posts) {
  res.status(200).format({
    'application/json': () => res.json(posts),
    'application/xml': () => res.type('application/xml').send(postsToXml(posts)),
    default: () => res.status(406).json({ error: '仅支持 application/json 或 application/xml' }),
  });
}

function sendError(res, status, message, details) {
  res.status(status).json({
    error: message,
    details,
  });
}

function requireMongo(req, res, next) {
  if (isMongoReady()) {
    next();
    return;
  }

  sendError(res, 503, 'MongoDB 未连接，请先启动本地 MongoDB 服务', { mongoUri });
}

function requireAuth(req, res, next) {
  const token = req.get('X-Admin-Token');

  if (token !== adminToken) {
    sendError(res, 401, '您没有访问此 API 的权限，请在请求头中提供有效的 X-Admin-Token');
    return;
  }

  next();
}

function validatePostPayload(req, res, next) {
  const { title, content } = req.body;

  if (!title || !content) {
    sendError(res, 400, '请求格式错误：title 和 content 为必填字段');
    return;
  }

  next();
}

function validateRegisterPayload(req, res, next) {
  const { username, password, password_repeat } = req.body;

  if (!username || !password) {
    sendError(res, 400, '用户名或密码不能为空！');
    return;
  }

  if (password !== password_repeat) {
    sendError(res, 400, '两次输入的口令不一致！');
    return;
  }

  next();
}

function validateLoginPayload(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    sendError(res, 400, '用户名或密码不能为空！');
    return;
  }

  next();
}

app.post('/api/users/register', validateRegisterPayload, requireMongo, async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      sendError(res, 400, '该用户已存在！');
      return;
    }

    const newUser = new User({
      username,
      password: hashPassword(password),
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: '注册成功！',
      data: sanitizeUser(newUser),
    });
  } catch (err) {
    sendError(res, 500, '服务器内部错误', err.message);
  }
});

app.post('/api/users/login', validateLoginPayload, requireMongo, async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      sendError(res, 404, '用户不存在');
      return;
    }

    if (user.password !== hashPassword(password)) {
      sendError(res, 401, '密码错误');
      return;
    }

    res.status(200).json({
      success: true,
      message: '登录成功！',
      data: sanitizeUser(user),
    });
  } catch (err) {
    sendError(res, 500, '服务器内部错误', err.message);
  }
});

app.get('/api/posts', async function getPosts(req, res) {
  try {
    if (!isMongoReady()) {
      sendPosts(req, res, demoPosts);
      return;
    }

    const posts = await Post.find().sort({ createdAt: 'descending' });
    sendPosts(req, res, posts.map(normalizePost));
  } catch (err) {
    sendError(res, 500, '服务器内部错误：查询文章失败');
  }
});

app.get('/api/posts/:id', async function getPostById(req, res) {
  try {
    if (!isMongoReady()) {
      const post = demoPosts.find((item) => String(item.id) === req.params.id);
      if (!post) {
        sendError(res, 404, '文章不存在');
        return;
      }
      res.status(200).json(post);
      return;
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      sendError(res, 404, '文章不存在');
      return;
    }

    res.status(200).json(normalizePost(post));
  } catch (err) {
    sendError(res, 400, '请求格式错误：文章 ID 无效');
  }
});

app.post('/api/posts', requireAuth, validatePostPayload, requireMongo, async function createPost(req, res) {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();

    res.status(201).json({
      message: '文章发布成功！',
      post: normalizePost(savedPost),
    });
  } catch (err) {
    sendError(res, 400, '请求格式错误：插入失败，请检查数据格式', err.message);
  }
});

app.put('/api/posts/:id', requireAuth, validatePostPayload, requireMongo, async function updatePost(req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      sendError(res, 404, '文章不存在');
      return;
    }

    res.status(200).json({
      message: '文章更新成功！',
      post: normalizePost(updatedPost),
    });
  } catch (err) {
    sendError(res, 400, '请求格式错误：更新失败，请检查文章 ID 或数据格式', err.message);
  }
});

app.delete('/api/posts/:id', requireAuth, requireMongo, async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      sendError(res, 404, '文章不存在');
      return;
    }

    res.status(204).end();
  } catch (err) {
    sendError(res, 400, '请求格式错误：删除失败，请检查文章 ID', err.message);
  }
});

app.get('/api/health', function getHealth(req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'hexa-cms-server',
    database: isMongoReady() ? 'connected' : 'disconnected',
    mongoUri,
  });
});

app.use(function notFound(req, res) {
  sendError(res, 404, '请求的资源不存在');
});

app.listen(port, () => {
  console.log(`Express RESTful API 服务器已启动：http://localhost:${port}`);
});
