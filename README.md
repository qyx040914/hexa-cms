# Hexa CMS

Hexa CMS 是一个用于练习企业级 Git、GitHub 协作流程、React 前端组件化开发和 Node.js 后端开发的示例项目。

## 当前内容

- `hexa-cms-admin/`：React 后台管理页面
- `hexa-cms-server/`：Node.js / Express / MongoDB 后端练习
- `README.md`：项目说明
- `tech-stack.txt`：技术栈说明
- `login.html`：登录页面练习
- `members.md`：成员信息练习

## Class9 RESTful API 与内容协商

- 按 RESTful 风格重构文章接口
- 使用 HTTP 谓词表达 CRUD：
  - `GET /api/posts`
  - `GET /api/posts/:id`
  - `POST /api/posts`
  - `PUT /api/posts/:id`
  - `DELETE /api/posts/:id`
- 使用标准 HTTP 状态码：
  - `200 OK`
  - `201 Created`
  - `204 No Content`
  - `400 Bad Request`
  - `401 Unauthorized`
  - `404 Not Found`
  - `406 Not Acceptable`
  - `503 Service Unavailable`
- 使用 `res.format()` 支持内容协商：
  - `Accept: application/json`
  - `Accept: application/xml`
- 新增 `requireAuth` 中间件，保护 POST、PUT、DELETE 写操作
- 当创建或更新文章缺少 `title` 或 `content` 时返回 `400 Bad Request`

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

写操作测试请求头：

```text
X-Admin-Token: hexa-admin-token
```

MongoDB 默认连接地址：

```text
mongodb://localhost:27017/hexa_cms
```
