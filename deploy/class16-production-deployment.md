# Class16 MERN Production Deployment

本文件对应第16讲公网部署任务，按本项目真实目录整理命令：

- 前端目录：`hexa-cms-admin`
- 后端目录：`hexa-cms-server`
- 后端入口：`hexa-cms-server/app.js`
- 前端构建目录：`hexa-cms-admin/build`

## 1. SSH 连接云服务器

```bash
ssh root@你的服务器公网IP
```

## 2. 安装生产环境依赖

```bash
sudo apt update
sudo apt install git nginx -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
sudo npm install pm2 -g
```

MongoDB 可使用云数据库，也可以在 Ubuntu 上安装本地服务。使用本地 MongoDB 时，确保连接地址为：

```text
mongodb://127.0.0.1:27017/hexa_cms
```

## 3. 克隆项目并安装依赖

```bash
cd /var/www
git clone https://github.com/qyx040914/hexa-cms.git hexa-cms
cd /var/www/hexa-cms
npm run install:all
```

## 4. 构建 React 前端

```bash
cd /var/www/hexa-cms
npm run build:client
```

构建成功后会生成：

```text
/var/www/hexa-cms/hexa-cms-admin/build
```

## 5. 启动后端 PM2 进程

先编辑 `hexa-cms-server/ecosystem.config.js`，把 `SESSION_SECRET` 和 `ADMIN_TOKEN` 换成自己的安全字符串。

```bash
cd /var/www/hexa-cms
pm2 start hexa-cms-server/ecosystem.config.js --env production
pm2 save
pm2 startup
pm2 list
```

常用排查命令：

```bash
pm2 logs hexa-cms-api
pm2 restart hexa-cms-api
```

## 6. 配置 Nginx 反向代理

复制本项目模板：

```bash
sudo cp /var/www/hexa-cms/deploy/nginx-hexa-cms.conf /etc/nginx/sites-available/hexa-cms
sudo ln -s /etc/nginx/sites-available/hexa-cms /etc/nginx/sites-enabled/hexa-cms
sudo nginx -t
sudo systemctl reload nginx
```

注意把配置里的 `server_name your_server_ip_or_domain;` 改成你的公网 IP 或域名。

## 7. 验收截图建议

1. 服务器 SSH 连接成功截图。
2. `node -v`、`npm -v`、`pm2 list` 截图。
3. `npm run build:client` 构建成功截图。
4. `sudo nginx -t` 成功截图。
5. 浏览器访问公网 IP 或域名，展示登录页、文章列表、文章详情、发布文章页面截图。
