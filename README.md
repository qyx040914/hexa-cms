# Hexa CMS

Hexa CMS 是一个用于练习企业级 Git、GitHub 协作流程、React 前端组件化开发和 Node.js 后端开发的示例项目。

## 当前内容

- `hexa-cms-admin/`：React 后台管理页面
- `hexa-cms-server/`：Node.js / Express 后端练习
- `README.md`：项目说明
- `tech-stack.txt`：技术栈说明
- `login.html`：登录页面练习
- `members.md`：成员信息练习

## Class3 React 组件化

- 创建 `Header` 顶部组件
- 创建 `Sidebar` 侧边栏组件
- 创建 `ArticleList` 文章列表组件
- 在 `App.js` 中组合成左右分栏后台布局

## Class4 React 状态管理

- 使用 `useState` 保存当前菜单
- 通过 Props 传递菜单数据、文章数据和切换函数
- 使用 `map` 动态渲染文章表格
- 使用 State 实现文章标题搜索
- 新增 `Dashboard`、`CategoryPanel`、`CommentPanel`、`SystemSettings` 页面组件

## Class5 Node.js 后端基础

- 使用 `npm init` 创建 `package.json`
- 安装 `colors` 依赖
- 使用 `module.exports` 和 `require` 练习模块导入导出
- 使用 `fs.readFile` 演示异步非阻塞 I/O
- 使用错误优先回调处理文件读取异常
- 在 `.gitignore` 中忽略 `node_modules/`

## Class6 Promise 与 Async/Await

- 使用 Promise 封装 `fs.readFile`
- 使用 `.then()` 链式调用按顺序读取标题数据和 HTML 模板
- 使用 `async/await` 重构 CMS 页面渲染流程
- 使用 `try...catch` 统一捕获异步错误
- 使用 `Promise.all` 并行加载 Dashboard 数据

## Class7 Express 与 React 跨域联调

- 在 `hexa-cms-server/app.js` 中创建 Express 后端接口
- 提供 `GET /api/posts` 文章列表 API
- 在 React 前端安装并使用 Axios
- 新增 `PostList.jsx`，从后端接口拉取文章数据并渲染表格
- 在前端 `package.json` 中配置 `proxy: http://localhost:5000`
- 在根目录安装 `concurrently`，支持一键同时启动前后端

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

Class6 示例：

```bash
cd hexa-cms-server
npm run promise
npm run dashboard
npm run server
```
