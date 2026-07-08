const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    username: user.username,
    createdAt: user.createdAt,
  };
}

router.post('/register', async (req, res) => {
  try {
    const { username, password, password_repeat } = req.body;

    if (!username || !password) {
      res.status(400).json({ success: false, message: '用户名或密码不能为空！' });
      return;
    }

    if (password !== password_repeat) {
      res.status(400).json({ success: false, message: '两次输入的密码不一致！' });
      return;
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ success: false, message: '用户名已经被占用！' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: '注册成功！',
      user: sanitizeUser(newUser),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ success: false, message: '用户名或密码不能为空！' });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ success: false, message: '抱歉，用户不存在。' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: '密码错误！' });
      return;
    }

    req.session.user = sanitizeUser(user);
    res.status(200).json({
      success: true,
      user: req.session.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ success: true, message: '已退出登录' });
  });
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    res.status(401).json({ success: false, message: '未登录' });
    return;
  }

  res.status(200).json({ success: true, user: req.session.user });
});

module.exports = router;
