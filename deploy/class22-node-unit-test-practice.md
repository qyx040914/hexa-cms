# Class22 Node.js 单元测试与 Mocha 断言

## 完成目标

- 后端安装 `mocha` 和 `chai` 测试依赖。
- 在 `package.json` 中配置 `npm test` 自动运行 Mocha。
- 在 `hexa-cms-server/test/cms.test.js` 中新增同步测试和异步测试。
- 执行 `npm test --prefix hexa-cms-server` 后输出 `2 passing`。

## 运行命令

```bash
cd /var/www/hexa-cms
npm install mocha chai@4 --save-dev --prefix hexa-cms-server
npm test --prefix hexa-cms-server
```

## 截图建议

1. 终端截图：执行 `npm test --prefix hexa-cms-server`。
2. 截图中要看到测试套件名称 `Hexa-CMS 核心业务逻辑测试`。
3. 截图中要看到两个绿色对勾和 `2 passing`。

## 说明

Mocha 负责运行测试用例，Chai 负责提供 `expect` 断言语法。异步测试中必须调用 `done()`，否则 Mocha 会一直等待直到超时报错。
