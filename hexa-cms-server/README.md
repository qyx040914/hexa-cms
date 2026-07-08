# Hexa CMS Server

这是 Hexa CMS 的 Node.js 后端练习项目，包含 Express API、异步编程、Promise、Async/Await、MongoDB / Mongoose 建模、RESTful API 和安全认证示例。

## Class12 已完成内容

- 使用 `express-session` 维护登录状态
- 使用 `bcrypt` 对密码加盐哈希
- 创建 `routes/auth.js`
- 实现注册接口 `POST /api/auth/register`
- 实现登录接口 `POST /api/auth/login`
- 实现退出接口 `POST /api/auth/logout`
- 实现当前用户接口 `GET /api/auth/me`
- 登录成功后写入 `req.session.user`

## API

用户注册：

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "123",
  "password_repeat": "123"
}
```

用户登录：

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123"
}
```

获取当前登录用户：

```http
GET /api/auth/me
```

退出登录：

```http
POST /api/auth/logout
```

## 运行

```bash
npm run api
```

默认数据库地址：

```text
mongodb://localhost:27017/hexa_cms
```
