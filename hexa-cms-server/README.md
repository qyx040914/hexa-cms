# Hexa CMS Server

这是 Class5 的 Node.js 后端练习项目，用来演示 NPM、CommonJS 模块、第三方依赖和异步非阻塞 I/O。

## 已完成内容

- 使用 `npm init` 创建 `package.json`
- 安装 `colors` 依赖
- 创建 `math.js` 并通过 `module.exports` 导出函数
- 在 `index.js` 中使用 `require` 引入本地模块和第三方模块
- 使用 `fs.readFile` 演示异步读取文件
- 按照 Node 规范处理错误优先回调参数 `err`

## 运行方式

```bash
npm start
```

预期输出顺序会体现异步非阻塞特征：

```text
1. 开始通知系统异步读取文章数据
2. 不等待文件读取，主线程继续处理其他任务
3. 文件读取完成，内容如下：
```
