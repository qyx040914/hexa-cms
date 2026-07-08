const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');

const router = express.Router();
const adminToken = process.env.ADMIN_TOKEN || 'hexa-admin-token';

const demoPosts = [
  {
    id: 1,
    title: 'React 与 Node.js 全栈入门',
    content: '通过 React、Express 和 MongoDB 组成完整 MERN 项目。',
    author: '张三',
    status: 'published',
    createdAt: new Date('2026-07-08T09:00:00.000Z'),
  },
  {
    id: 2,
    title: '理解 Express 中间件',
    content: 'Express 使用中间件处理请求体、路由与错误。',
    author: '李四',
    status: 'published',
    createdAt: new Date('2026-07-08T09:10:00.000Z'),
  },
];

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
    status: post.status,
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
    <status>${escapeXml(post.status)}</status>
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
  res.status(status).json({ error: message, details });
}

function requireMongo(req, res, next) {
  if (isMongoReady()) {
    next();
    return;
  }

  sendError(res, 503, 'MongoDB 未连接，请先启动本地 MongoDB 服务');
}

function requireAdmin(req, res, next) {
  const token = req.get('X-Admin-Token');

  if (token !== adminToken) {
    sendError(res, 401, '未授权，请在请求头中提供有效的 X-Admin-Token');
    return;
  }

  next();
}

function validatePostPayload(req, res, next) {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    sendError(res, 400, '请求格式错误：title、content 和 author 为必填字段');
    return;
  }

  next();
}

router.get('/', async (req, res) => {
  try {
    if (!isMongoReady()) {
      sendPosts(req, res, demoPosts);
      return;
    }

    const posts = await Post.find().sort({ createdAt: -1 });
    sendPosts(req, res, posts.map(normalizePost));
  } catch (err) {
    sendError(res, 500, '服务器内部错误，无法获取文章列表', err.message);
  }
});

router.get('/:id', async (req, res) => {
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
    sendError(res, 400, '请求格式错误：文章 ID 无效', err.message);
  }
});

router.post('/', validatePostPayload, requireMongo, async (req, res) => {
  try {
    const { title, content, author, status } = req.body;
    const newPost = new Post({ title, content, author, status });
    const savedPost = await newPost.save();

    res.status(201).json({
      message: '文章发布成功！',
      post: normalizePost(savedPost),
    });
  } catch (err) {
    sendError(res, 400, '文章发布失败，请检查字段格式', err.message);
  }
});

router.put('/:id', requireAdmin, validatePostPayload, requireMongo, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        status: req.body.status,
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
    sendError(res, 400, '文章更新失败，请检查文章 ID 或字段格式', err.message);
  }
});

router.delete('/:id', requireAdmin, requireMongo, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      sendError(res, 404, '文章不存在');
      return;
    }

    res.status(204).end();
  } catch (err) {
    sendError(res, 400, '文章删除失败，请检查文章 ID', err.message);
  }
});

module.exports = router;
