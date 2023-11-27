## 1、使用[Jenkins](http://192.168.11.180:10086/)在服务器上创建自动构建任务

![img](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701071075346.3wopjtbpykm0.webp)

![img](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701071193186.yll3z74nr6o.webp)

![img](https://github.com/Sherlock-Homles/gallery/raw/main/1701071257922.4glizvmlrq80.webp)

## 2、构建步骤

### 2.1、项目打包及配置文件

```shell
npm run bulid
```

#### 2.1.1、编写 Dockerfile 文件

`Dockerfile`

```shell
## nginx基础镜像,版本号为1.17.2
From nginx:1.17.2
## 复制NGINX配置⽂件到指定⽬录
COPY default.conf /etc/nginx/conf.d/
## 复制项⽬运⾏⽂件到指定⽬录
COPY  build /usr/share/nginx/html/
```

#### 2.1.2、编写 nginx.config 文件

`default.conf`

```json
server {
 listen 80;
 server_name localhost;
 #charset koi8-r;
 #access_log /var/log/nginx/host.access.log main;
 location / {
 root /usr/share/nginx/html;
 index index.html index.htm;
 try_files $uri /index.html;
 }
 location ~ \.css {
 root /usr/share/nginx/html;
 add_header Content-Type text/css;
 }
 location ~ \.js {
 root /usr/share/nginx/html;
 add_header Content-Type application/x-javascript;
 }
 #error_page 404 /404.html;
 # redirect server error pages to the static page /50x.html
 #
 error_page 500 502 503 504 /50x.html;
 location = /50x.html {
 root /usr/share/nginx/html;
 }
 # proxy the PHP scripts to Apache listening on 127.0.0.1:80
 #
 #location ~ \.php$ {
 # proxy_pass http://127.0.0.1;
 #}
 # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
 #
 #location ~ \.php$ {
 # root html;
 # fastcgi_pass 127.0.0.1:9000;
 # fastcgi_index index.php;
 # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
 # include fastcgi_params;
#}
 # deny access to .htaccess files, if Apache's document root
 # concurs with nginx's one
 #
 #location ~ /\.ht {
 # deny all;
 #}
}
```

#### 2.1.3、上传到服务器 Jenkins 代码目录

`/root/.jenkins/workspace/OYBL`

### 2.2、构建 docker 镜像

```shell
docker build -t oybl-big-image .
```

### 2.3、启动

```shell
docker run -d -p 8000:80 oybl-big-image
```

### 2.3、新建远程镜像库，并推送到镜像库

#### 2.3.1、新建远程镜像库

地址：https://hub.docker.com/

注册一个账号

创建

![img](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701070955369.tnd71zko51s.webp)

#### 2.3.2、推送

```shell
// 查看已构建的镜像
docker images

REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
oybl-big-image             latest              33d478de4d07        2 days ago          137MB
your-frontend-image-name   latest              33d478de4d07        2 days ago          137MB
emqx/emqx                  v4.0.0              c8ca10ec25b0        3 years ago         95.4MB
nginx

// 登录docker镜像仓库
docker login

Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: oguricap
Password:
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

// 重命名docker镜像
docker tag oybl-big-image oguricap/oybl:v1.0

// 推送到DockerHub镜像仓库
docker pull oguricap/oybl
```

### 2.4、推送成功

![img](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701070738128.1mbnvh3byekg.png)
