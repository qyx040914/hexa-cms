# Hexa CMS Server

这是 Hexa CMS 的 Node.js 后端练习项目，包含 Express API、异步编程、Promise、Async/Await，以及 MongoDB / Mongoose 建模示例。

## Class8 已完成内容

- 安装 `mongoose`
- 创建 `models/Post.js`
- 定义文章 Schema 与 Model
- 在 `app.js` 中连接 MongoDB
- 使用 `express.json()` 支持 JSON 请求体
- 实现文章 CRUD 接口

## API

查询文章：

```http
GET /api/posts
```

新增文章：

```http
POST /api/posts
Content-Type: application/json

{
  "title": "MongoDB 与 Mongoose 建模实战",
  "content": "使用 Mongoose Schema 约束文章数据。",
  "author": "钱宇歆"
}
```

更新文章：

```http
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "更新后的标题",
  "content": "更新后的正文",
  "author": "钱宇歆"
}
```

删除文章：

```http
DELETE /api/posts/:id
```

## 运行

```bash
npm run api
```

默认数据库地址：

```text
mongodb://localhost:27017/hexa_cms
```
