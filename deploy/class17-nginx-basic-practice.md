# Class17 Nginx Basic Configuration Practice

本文件对应第17讲 Nginx 架构原理与基础配置实战。

## 实战目标

1. 在 Ubuntu 云服务器安装并启动 Nginx。
2. 理解 Nginx 配置结构中的 `server`、`location`、`root`、`index`。
3. 修改默认静态页，将公网 IP 访问结果改成个人欢迎语。

## Nginx 核心命令

```bash
apt update
apt install nginx -y
systemctl start nginx
systemctl status nginx --no-pager
nginx -t
nginx -s reload
```

## 部署 Class17 最小站点

在服务器执行：

```bash
cp /var/www/hexa-cms/deploy/class17-nginx-basic-server.conf /etc/nginx/sites-available/default
cp /var/www/hexa-cms/deploy/class17-index.html /var/www/html/index.html
nginx -t
systemctl reload nginx
```

然后用浏览器访问：

```text
http://114.55.63.161
```

页面应显示：

```text
Hello，这是钱宇歆的第一个公网服务器！
```

## 配置结构说明

```nginx
server {
    listen 80;
    server_name _;

    location / {
        root /var/www/html;
        index index.html index.htm;
    }
}
```

- `listen 80`：让 Nginx 监听 HTTP 默认端口。
- `server_name _`：匹配任意公网 IP 或域名。
- `location /`：匹配根路径访问。
- `root /var/www/html`：指定静态资源所在目录。
- `index index.html index.htm`：指定默认首页文件。

## 截图建议

1. `systemctl status nginx --no-pager` 显示 `active (running)`。
2. `nginx -t` 显示语法检查成功。
3. GitHub 文件截图：`deploy/class17-nginx-basic-server.conf`。
4. 浏览器访问 `http://114.55.63.161`，显示个人欢迎页。
