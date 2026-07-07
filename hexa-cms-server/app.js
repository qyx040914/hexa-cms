const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hexa_cms';

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
    title: 'Mongoose 建模与 CRUD 实战',
    content: '使用 Schema 约束文章数据，并完成增删改查接口。',
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

function requireMongo(res) {
  if (isMongoReady()) {
    return true;
  }

  res.status(503).json({
    error: 'MongoDB 未连接，请先启动本地 MongoDB 服务',
    mongoUri,
  });
  return false;
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

app.get('/api/posts', async function getPosts(req, res) {
  try {
    if (!isMongoReady()) {
      res.json(demoPosts);
      return;
    }

    const posts = await Post.find().sort({ createdAt: 'descending' });
    res.json(posts.map(normalizePost));
  } catch (err) {
    res.status(500).json({ error: '查询文章失败' });
  }
});

app.post('/api/posts', async function createPost(req, res) {
  if (!requireMongo(res)) {
    return;
  }

  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();

    res.status(201).json({
      message: '文章发布成功！',
      post: normalizePost(savedPost),
    });
  } catch (err) {
    res.status(400).json({ error: '插入失败，请检查数据格式' });
  }
});

app.put('/api/posts/:id', async function updatePost(req, res) {
  if (!requireMongo(res)) {
    return;
  }

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
      res.status(404).json({ error: '文章不存在' });
      return;
    }

    res.json({
      message: '文章更新成功！',
      post: normalizePost(updatedPost),
    });
  } catch (err) {
    res.status(400).json({ error: '更新失败，请检查文章 ID 或数据格式' });
  }
});

app.delete('/api/posts/:id', async function deletePost(req, res) {
  if (!requireMongo(res)) {
    return;
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      res.status(404).json({ error: '文章不存在' });
      return;
    }

    res.json({ message: '文章删除成功！' });
  } catch (err) {
    res.status(400).json({ error: '删除失败，请检查文章 ID' });
  }
});

app.get('/api/health', function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'hexa-cms-server',
    database: isMongoReady() ? 'connected' : 'disconnected',
    mongoUri,
  });
});

app.listen(port, () => {
  console.log(`Express API 服务器已启动：http://localhost:${port}`);
});
