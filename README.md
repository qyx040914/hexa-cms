# Hexa CMS

Hexa CMS 是一个用于练习企业级 Git、GitHub 协作流程、React 前端组件化开发和 Node.js 后端开发的示例项目。

## 当前内容

- `hexa-cms-admin/`：React 后台管理页面
- `hexa-cms-server/`：Node.js / Express / MongoDB 后端练习
- `README.md`：项目说明
- `tech-stack.txt`：技术栈说明
- `login.html`：登录页面练习
- `members.md`：成员信息练习

## Class8 MongoDB 与 Mongoose 建模

- 安装 `mongoose`
- 新增 `hexa-cms-server/models/Post.js`
- 定义 Post Schema：`title`、`content`、`author`、`createdAt`
- 在 `app.js` 中连接 `mongodb://localhost:27017/hexa_cms`
- 使用 `express.json()` 解析请求体
- 实现文章 CRUD 接口：
  - `GET /api/posts`
  - `POST /api/posts`
  - `PUT /api/posts/:id`
  - `DELETE /api/posts/:id`
- 前端 `PostList.jsx` 兼容 MongoDB 返回的 `_id`

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

如果本机未启动 MongoDB，`GET /api/posts` 会返回演示数据，写入、更新、删除接口会提示需要连接 MongoDB。
