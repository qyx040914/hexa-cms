# Hexa CMS Server

这是 Hexa CMS 的 Node.js 后端练习项目，包含 Express API、异步编程、Promise、Async/Await、MongoDB / Mongoose 建模、RESTful API 和用户注册登录示例。

## Class10 已完成内容

- 创建 `models/User.js`
- 使用 Mongoose Schema 定义用户模型
- 创建 `utils/password.js`
- 使用 `crypto.createHash('md5')` 加密密码
- 实现 `POST /api/users/register`
- 实现 `POST /api/users/login`
- 注册成功不返回密码
- 登录成功不返回密码

## API

管理员注册：

```http
POST /api/users/register
Content-Type: application/json

{
  "username": "admin",
  "password": "123",
  "password_repeat": "123"
}
```

成功响应：

```json
{
  "success": true,
  "message": "注册成功！",
  "data": {
    "id": "...",
    "username": "admin",
    "createdAt": "..."
  }
}
```

用户登录：

```http
POST /api/users/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123"
}
```

成功响应：

```json
{
  "success": true,
  "message": "登录成功！",
  "data": {
    "id": "...",
    "username": "admin",
    "createdAt": "..."
  }
}
```

## 错误状态

- `400`：用户名或密码为空、两次密码不一致、用户已存在
- `401`：密码错误
- `404`：用户不存在
- `503`：MongoDB 未连接

## 运行

```bash
npm run api
```
