# Class20 Node.js WebSocket 全双工通信

## 完成目标

- 后端安装并挂载 `socket.io`。
- Express 服务改为基于 Node 原生 HTTP Server 启动。
- Socket.io 与 API 共用 5000 端口。
- 前端安装 `socket.io-client`，页面加载后自动发起 WebSocket 连接。
- Nginx 增加 `/socket.io/` 反向代理，支持公网 80 端口 WebSocket 握手。
- 浏览器 F12 Network -> WS 中能看到 `101 Switching Protocols`，连接保持 Pending。

## 本地运行命令

```bash
cd E:\codex\hexa-cms
npm install --prefix hexa-cms-server
npm install --prefix hexa-cms-admin
npm run start:server
npm run start:client
```

本地浏览器打开：

```text
http://localhost:3000
```

打开 F12 -> Network -> WS，刷新页面，检查是否出现 `socket.io` 请求，状态码为 `101 Switching Protocols`。

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
cp /var/www/hexa-cms/deploy/class20-nginx-websocket-proxy.conf /etc/nginx/sites-available/default
nginx -t
systemctl reload nginx
```

公网浏览器打开：

```text
http://114.55.63.161
```

## 截图建议

1. 服务器终端截图：`pm2 list` 中 `hexa-cms-api` 为 `cluster` 和 `online`。
2. 服务器终端截图：`nginx -t` 显示 `syntax is ok` 和 `test is successful`。
3. 浏览器截图：公网访问 `http://114.55.63.161` 页面正常打开。
4. 浏览器 F12 截图：Network -> WS 中出现 `socket.io`，状态码为 `101 Switching Protocols`。
5. 浏览器 Console 截图：看到 `WebSocket connected` 日志。

## 验收说明

如果 F12 的 WS 面板中能看到 `socket.io` 长连接，并且状态保持 Pending，不自动断开，就说明 WebSocket 全双工通信通道已经建立。
