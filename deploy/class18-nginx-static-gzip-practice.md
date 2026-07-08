# Class18 Nginx 动静分离部署与前端性能优化

## 完成目标

- 使用 `npm run build --prefix hexa-cms-admin` 生成 React 生产环境静态文件。
- 使用 Nginx 托管 `hexa-cms-admin/build` 目录中的 `index.html`、CSS 和 JS。
- 使用 `try_files $uri $uri/ /index.html;` 解决 React Router 刷新页面 404 的问题。
- 开启 Gzip 压缩，让浏览器响应头出现 `Content-Encoding: gzip`。
- 给 `/static/` 目录配置长期缓存，提升前端资源加载性能。

## 服务器实操命令

```bash
cd /var/www/hexa-cms
git fetch origin feature-nginx-static-gzip
git checkout feature-nginx-static-gzip
npm install --prefix hexa-cms-admin
npm run build --prefix hexa-cms-admin
```

把 Class18 配置复制为 Nginx 默认站点：

```bash
cp /var/www/hexa-cms/deploy/class18-nginx-static-spa.conf /etc/nginx/sites-available/default
ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 验证命令

```bash
ls /var/www/hexa-cms/hexa-cms-admin/build
nginx -t
curl -I -H "Accept-Encoding: gzip" http://127.0.0.1/static/js/
```

也可以在浏览器访问公网 IP：

```text
http://114.55.63.161
```

打开开发者工具 F12，进入 Network 面板，刷新页面后点开 JS 或 CSS 文件，在 Response Headers 中检查：

```text
Content-Encoding: gzip
```

## 截图建议

1. 服务器终端截图：`npm run build --prefix hexa-cms-admin` 构建成功。
2. 服务器终端截图：`ls /var/www/hexa-cms/hexa-cms-admin/build` 能看到 `index.html` 和 `static`。
3. 服务器终端截图：`nginx -t` 显示 `syntax is ok` 和 `test is successful`。
4. 浏览器截图：访问 `http://114.55.63.161` 能打开前端页面。
5. 浏览器 F12 Network 截图：JS 或 CSS 响应头中能看到 `Content-Encoding: gzip`。

## 注意

Class18 重点是 Nginx 托管前端静态资源和 Gzip 优化。`/api` 反向代理属于下一讲的重点；如果要保持完整全栈可登录版本，可以继续使用 `deploy/nginx-hexa-cms.conf`。
