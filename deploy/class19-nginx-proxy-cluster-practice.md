# Class19 Nginx 反向代理与集群部署实战

## 完成目标

- 使用 Nginx 托管 React 前端生产构建目录。
- 使用 `try_files $uri $uri/ /index.html;` 支持 SPA 前端路由刷新。
- 使用 `location /api/` 把动态接口请求反向代理到 Node.js 后端。
- 使用 `upstream backend_nodes` 抽象后端节点池，为负载均衡做准备。
- 使用 PM2 `cluster` 模式和 `instances: max` 守护后端进程。
- 保留 Gzip 和静态资源缓存配置，延续 Class18 的性能优化。

## 服务器实操命令

```bash
cd /var/www/hexa-cms
git fetch origin feature-nginx-proxy-cluster
git checkout feature-nginx-proxy-cluster
npm install --prefix hexa-cms-server
npm install --prefix hexa-cms-admin
npm run build --prefix hexa-cms-admin
```

启动或重启 PM2 集群：

```bash
pm2 delete hexa-cms-api
pm2 start hexa-cms-server/ecosystem.config.js --env production
pm2 save
pm2 list
```

复制 Nginx 反向代理配置并重载：

```bash
cp /var/www/hexa-cms/deploy/class19-nginx-reverse-proxy-cluster.conf /etc/nginx/sites-available/default
ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 验证命令

```bash
pm2 list
curl http://127.0.0.1:5000/api/health
curl http://114.55.63.161/api/health
nginx -t
```

公网浏览器访问：

```text
http://114.55.63.161
```

验证 SPA 路由刷新：

```text
http://114.55.63.161/post
```

## 截图建议

1. 服务器终端截图：`pm2 list` 中能看到 `hexa-cms-api`，模式为 `cluster`，状态为 `online`。
2. 服务器终端截图：`nginx -t` 显示 `syntax is ok` 和 `test is successful`。
3. 服务器终端截图：`curl http://114.55.63.161/api/health` 返回后端健康状态。
4. 浏览器截图：地址栏为 `http://114.55.63.161`，页面能正常打开，不能出现 `:3000` 或 `:5000`。
5. 浏览器截图：进入 `http://114.55.63.161/post` 后刷新页面，页面不报 404。
6. 浏览器或 Postman 截图：注册、登录、发布文章接口能通过公网 IP 正常调用。

## 说明

Class19 的重点是“动静分离完整闭环”：

- 静态页面由 Nginx 的 `location /` 托管。
- 动态接口由 Nginx 的 `location /api/` 反向代理到 Node.js。
- 后端由 PM2 集群模式守护，关闭 SSH 后仍然保持运行。
