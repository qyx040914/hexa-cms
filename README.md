# Hexa CMS

Hexa CMS 是一个用于练习企业级 Git、GitHub 协作流程、React 前端组件化开发和 Node.js 后端开发的示例项目。

## 当前内容

- `hexa-cms-admin/`：React 后台管理页面
- `hexa-cms-server/`：Node.js / Express / MongoDB 后端练习
- `README.md`：项目说明
- `tech-stack.txt`：技术栈说明
- `login.html`：登录页面练习
- `members.md`：成员信息练习

## Class12 API 安全认证与前端路由

- 后端安装并使用 `express-session`
- 后端安装并使用 `bcrypt`
- 新增认证路由文件 `hexa-cms-server/routes/auth.js`
- 新增 API：
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
- 注册时使用 bcrypt 加盐哈希保存密码
- 登录时使用 bcrypt.compare 校验密码
- 登录成功后写入 `req.session.user`
- 前端安装 `react-router-dom`
- 前端新增路由：
  - `/login`
  - `/register`
  - `/post`
- 注册成功后通过 `navigate('/login', { state })` 传递成功提示
- 登录成功后保存用户信息到 `localStorage` 并跳转文章列表

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

前端：

```bash
cd hexa-cms-admin
npm start
```

MongoDB 默认连接地址：

```text
mongodb://localhost:27017/hexa_cms
```

前端页面：

```text
http://localhost:3000/login
http://localhost:3000/register
http://localhost:3000/post
```
