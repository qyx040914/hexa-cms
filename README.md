# Hexa CMS

Hexa CMS 是一个用于练习企业级 Git、GitHub 协作流程、React 前端组件化开发和 Node.js 后端开发的示例项目。

## 当前内容

- `hexa-cms-admin/`：React 后台管理页面
- `hexa-cms-server/`：Node.js / Express / MongoDB 后端练习
- `README.md`：项目说明
- `tech-stack.txt`：技术栈说明
- `login.html`：登录页面练习
- `members.md`：成员信息练习

## Class10 MongoDB 接入与用户注册 API

- 新增 `models/User.js`
- 新增用户 Schema：
  - `username`
  - `password`
  - `createdAt`
- 新增 `utils/password.js`
- 使用 Node 内置 `crypto` 对密码做 MD5 哈希
- 实现管理员注册接口：
  - `POST /api/users/register`
- 实现用户登录接口：
  - `POST /api/users/login`
- 注册接口支持：
  - 用户名和密码不能为空
  - 两次密码必须一致
  - 用户名不能重复
  - 注册成功返回 `201 Created`
  - 不返回密码字段
- 登录接口支持：
  - 用户不存在返回 `404`
  - 密码错误返回 `401`
  - 登录成功返回 `200`
  - 不返回密码字段

## 本地运行

一键启动前后端：

```bash
npm start
```

后端 API：

```bash
cd hexa-cms-server
npm run api
```

MongoDB 默认连接地址：

```text
mongodb://localhost:27017/hexa_cms
```

注册测试请求：

```http
POST /api/users/register
Content-Type: application/json

{
  "username": "admin",
  "password": "123",
  "password_repeat": "123"
}
```

登录测试请求：

```http
POST /api/users/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123"
}
```
