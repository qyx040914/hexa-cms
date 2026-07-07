# Hexa CMS Server

这是 Hexa CMS 的 Node.js 后端练习项目，用来演示 NPM、CommonJS 模块、第三方依赖、异步非阻塞 I/O、Promise 和 Async/Await。

## Class5 已完成内容

- 使用 `npm init` 创建 `package.json`
- 安装 `colors` 依赖
- 创建 `math.js` 并通过 `module.exports` 导出函数
- 在 `index.js` 中使用 `require` 引入本地模块和第三方模块
- 使用 `fs.readFile` 演示异步读取文件
- 按照 Node 规范处理错误优先回调参数 `err`

运行 Class5 示例：

```bash
npm start
```

## Class6 已完成内容

- 创建 `file-utils.js`，手动封装 `readFilePromise`
- 创建 `promise-chain-demo.js`，使用 `.then()` 链式调用串行读取文件
- 创建 `async-blog-server.js`，使用 `async/await` 渲染 CMS 博客页面
- 创建 `dashboard-demo.js`，使用 `Promise.all` 并行加载仪表盘数据
- 创建 `titles.json` 和 `template.html` 作为模拟 CMS 数据与模板

运行 Promise 链式调用示例：

```bash
npm run promise
```

运行 Promise.all 并行加载示例：

```bash
npm run dashboard
```

运行 Async/Await HTTP 服务：

```bash
npm run server
```

然后在浏览器访问：

```text
http://127.0.0.1:8000
```
