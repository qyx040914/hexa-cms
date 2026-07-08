# Hexa CMS Server

这是 Hexa CMS 的 Node.js 后端练习项目，包含 Express API、异步编程、Promise、Async/Await、MongoDB / Mongoose 建模和 RESTful API 示例。

## Class9 已完成内容

- 使用 RESTful 风格重构文章接口
- 使用准确的 HTTP 状态码表达结果
- 使用 `res.format()` 支持 JSON 与 XML 内容协商
- 使用 `requireAuth` 中间件保护写操作
- 使用 `validatePostPayload` 校验 `title` 和 `content`
- 缺少必填字段时返回 `400 Bad Request`

## API

查询文章列表：

```http
GET /api/posts
Accept: application/json
```

查询 XML 格式文章列表：

```http
GET /api/posts
Accept: application/xml
```

查询文章详情：

```http
GET /api/posts/:id
```

新增文章：

```http
POST /api/posts
Content-Type: application/json
X-Admin-Token: hexa-admin-token

{
  "title": "RESTful API 与内容协商",
  "content": "使用 HTTP 谓词、状态码和 Accept 请求头规范接口。",
  "author": "钱宇歆"
}
```

更新文章：

```http
PUT /api/posts/:id
Content-Type: application/json
X-Admin-Token: hexa-admin-token

{
  "title": "更新后的标题",
  "content": "更新后的正文",
  "author": "钱宇歆"
}
```

删除文章：

```http
DELETE /api/posts/:id
X-Admin-Token: hexa-admin-token
```

## 运行

```bash
npm run api
```

默认数据库地址：

```text
mongodb://localhost:27017/hexa_cms
```
