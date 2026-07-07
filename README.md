# Hexa CMS

Hexa CMS 是一个用于练习企业级 Git、GitHub 协作流程、React 前端组件化开发和 Node.js 后端开发的示例项目。

## 练习目标

- 初始化本地 Git 仓库
- 创建基础项目文件
- 连接 GitHub 远程仓库
- 使用分支开发功能
- 模拟 Pull Request 流程
- 练习冲突解决
- 使用 React 创建后台管理页面
- 使用 React State、Props 和条件渲染实现动态页面
- 使用 Node.js、NPM 和异步回调创建后端练习项目

## 当前内容

- `README.md`：项目说明
- `tech-stack.txt`：技术栈说明
- `login.html`：登录页面练习
- `members.md`：成员信息练习
- `hexa-cms-admin/`：React 后台管理页面练习
- `hexa-cms-server/`：Node.js 后端练习

## Class3 React 练习

`hexa-cms-admin` 使用 Create React App 创建，主要完成了以下内容：

- 创建 `Header` 顶部组件
- 创建 `Sidebar` 侧边栏组件
- 创建 `ArticleList` 文章列表组件
- 在 `App.js` 中组合成左右分栏后台布局

## Class4 React 练习

在 Class3 静态后台基础上，继续完成 React 状态管理与动态渲染：

- 在 `App.js` 中使用 `useState` 保存当前菜单
- 通过 Props 将菜单数据、文章数据和切换函数传给子组件
- 在 `Sidebar` 中点击菜单切换右侧内容
- 在 `ArticleList` 中使用 `map` 动态渲染文章表格
- 在 `ArticleList` 中使用 State 实现文章标题搜索
- 新增 `Dashboard`、`CategoryPanel`、`CommentPanel`、`SystemSettings` 页面组件

## Class5 Node.js 练习

`hexa-cms-server` 用于练习 Node.js 后端基础：

- 使用 `npm init` 创建 `package.json`
- 使用 `npm install colors --save` 安装第三方依赖
- 使用 `module.exports` 和 `require` 练习模块导入导出
- 使用 `fs.readFile` 演示异步非阻塞 I/O
- 使用错误优先回调处理文件读取异常
- 在 `.gitignore` 中忽略 `node_modules/`

## Class6 Promise 与 Async/Await 练习

在 Class5 后端基础上继续完成异步流程优化：

- 使用 Promise 封装 `fs.readFile`
- 使用 `.then()` 链式调用按顺序读取标题数据和 HTML 模板
- 使用 `async/await` 重构 CMS 页面渲染流程
- 使用 `try...catch` 统一捕获异步错误
- 使用 `Promise.all` 并行加载 Dashboard 数据

## 本地运行

前端：

```bash
cd hexa-cms-admin
npm start
```

后端：

```bash
cd hexa-cms-server
npm start
```

Class6 示例：

```bash
cd hexa-cms-server
npm run promise
npm run dashboard
npm run server
```
