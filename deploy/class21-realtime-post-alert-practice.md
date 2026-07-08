# Class21 CMS 实时通知大屏

## 完成目标

- 后端在文章发布成功后触发 `io.emit('new_post_alert')` 全网广播。
- 前端通过 Socket.io 监听 `new_post_alert` 事件。
- 任意浏览器窗口发布新文章后，其他已打开的 CMS 页面无需刷新即可看到绿色实时通知。
- React `useEffect` 中清理事件监听，避免重复弹窗和内存泄漏。

## 核心事件

后端广播事件名：

```text
new_post_alert
```

前端通知文案：

```text
系统通知：作者 刚刚发布了新文章《标题》
```

## 服务器运行命令

```bash
cd /var/www/hexa-cms
npm install --prefix hexa-cms-server
npm install --prefix hexa-cms-admin
npm run build --prefix hexa-cms-admin
pm2 delete hexa-cms-api
cd /var/www/hexa-cms/hexa-cms-server
pm2 start app.js -i max --name hexa-cms-api
pm2 save
nginx -t
systemctl reload nginx
```

## 验收步骤

1. 用 Edge 打开 `http://114.55.63.161` 并登录。
2. 用 Chrome 再打开 `http://114.55.63.161` 并登录。
3. 在其中一个浏览器进入发布文章页面，填写标题、作者和富文本内容。
4. 点击发布文章。
5. 不操作另一个浏览器，观察右上角是否自动出现绿色通知。

## 截图建议

1. 服务器终端截图：`npm run build --prefix hexa-cms-admin` 显示 `Compiled successfully.`。
2. 服务器终端截图：`pm2 list` 显示 `hexa-cms-api` 为 `cluster` 和 `online`。
3. 浏览器截图：Network -> WS 显示 `socket.io` 状态码 `101`。
4. 双浏览器截图：窗口 A 发布文章，窗口 B 自动弹出绿色通知。
5. 代码截图：`App.js` 中存在 `socket.off('new_post_alert', handleNewPostAlert)` 清理监听。
