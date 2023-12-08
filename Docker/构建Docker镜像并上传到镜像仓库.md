## 1、使用[Jenkins](http://192.168.11.180:10086/)在服务器上创建自动构建任务

![img](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701071075346.3wopjtbpykm0.webp)

![img](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701071193186.yll3z74nr6o.webp)

![img](https://github.com/Sherlock-Homles/gallery/raw/main/1701071257922.4glizvmlrq80.webp)

![](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1702000905407.pvl1rvdl3z4.webp)

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
docker push oguricap/oybl:v1.0
```

### 2.4、推送成功

![img](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701070738128.1mbnvh3byekg.png)

## 3、k8s镜像拉取配置

> 地址：http://k8s.oybl.thundersdata.com:1480/#!/deployment?namespace=high-speed

![](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1701742609145.tv587abcws0.png)

![](https://github.com/Sherlock-Homles/gallery/raw/main/1701742786963.6s6ais0dz9o0.webp)

配置文件

```json
{
  "kind": "Deployment",
  "apiVersion": "extensions/v1beta1",
  "metadata": {
    "name": "eurasia-logistics-screen",
    "namespace": "high-speed",
    "selfLink": "/apis/extensions/v1beta1/namespaces/high-speed/deployments/eurasia-logistics-screen",
    "uid": "db875c95-21fb-11ed-a090-00163e0100b2",
    "resourceVersion": "169248918",
    "generation": 85,
    "creationTimestamp": "2022-08-22T09:21:52Z",
    "labels": {
      "app": "eurasia-logistics-screen",
      "k8s-app": "eurasia-logistics-screen"
    },
    "annotations": {
      "deployment.kubernetes.io/revision": "85"
    }
  },
  "spec": {
    "replicas": 1,
    "selector": {
      "matchLabels": {
        "app": "eurasia-logistics-screen",
        "k8s-app": "eurasia-logistics-screen"
      }
    },
    "template": {
      "metadata": {
        "creationTimestamp": null,
        "labels": {
          "app": "eurasia-logistics-screen",
          "k8s-app": "eurasia-logistics-screen"
        },
        "annotations": {
          "deployment.create.timestamp": "1699502782084",
          "sidecar.istio.io/inject": "false"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "eurasia-logistics-screen",
            "image": "oguricap/oybl-small:v1.0",
            "ports": [
              {
                "containerPort": 80,
                "protocol": "TCP"
              }
            ],
            "env": [
              {
                "name": "APP_INFO_APP_NAME",
                "value": "eurasia-logistics-screen"
              },
              {
                "name": "ELASTIC_APM_APPLICATION_PACKAGES",
                "value": "com.thundersdata"
              },
              {
                "name": "APP_SECRET_AES_KEY",
                "value": "I/nW6vQTnDX7mPlP4HyD3rPgYAiJ4Gc49myJV3/aujpxoedHD/ZfoeM11xvAc3EL0T2sPqI8q9W0cQoc3A3wokRy+OOB/DorzRkzHpKPhXWD5yDDvw51iQsmEoKO8HNSFB42X7RuefH1ADfZYjsN/lhNNgIvZrXskJawUeHApgfcL8aPexCQH4xAkqYLEfIWshkjf5N7+M4Lub6x5VLpDFgv6WyEkeg/H6NtUTKSrnt3MMtvEIp6bp7Fj4cO3IAg7bgzGnnWxSE8Tn3y5BoBz06EpP5XhUXW53+1/RkGS2zdtsIQPMgObw2sWPRk/+dnZ0TpYDw4kph7Ru1OiqD7sg=="
              },
              {
                "name": "ELASTIC_APM_SERVER_URLS",
                "value": "http://apm-server.elk:8200"
              },
              {
                "name": "SPRING_PROFILES_ACTIVE",
                "value": "prod"
              },
              {
                "name": "APP_INFO_PROJECT_NAME",
                "value": "high-speed"
              },
              {
                "name": "APP_INFO_PROFILE",
                "value": "prod"
              },
              {
                "name": "ELASTIC_APM_DISABLE_INSTRUMENTATIONS"
              },
              {
                "name": "APP_INFO_CLUSTER_NAME",
                "value": "oybl"
              },
              {
                "name": "ELASTIC_APM_SERVICE_NAME",
                "value": "high-speed_eurasia-logistics-screen"
              },
              {
                "name": "APP_SECRET_TOKEN",
                "value": "E82B585F43F611E95942974A0E0B3858805503FA763FC589EAA14CB0013D2086451A0E46B805763568C99186F3E733F766A763EB0773ABB5498986D76F075425AFCADBC88884582AFA42A457293C32100EBE2C21420CB7BED7AFB85EAD5D2BC0A1C7BC78EF1BBF457BA6D8311FEEBE0D0342D7367B7717AABBC4848533660344C4F431A6C0FDC576ABE8E1F88ABD6881891DC9FFE176D67A81BAB2F325E0B8D4"
              },
              {
                "name": "MY_POD_IP",
                "valueFrom": {
                  "fieldRef": {
                    "apiVersion": "v1",
                    "fieldPath": "status.podIP"
                  }
                }
              }
            ],
            "resources": {
              "limits": {
                "cpu": "100m",
                "memory": "500Mi"
              },
              "requests": {
                "cpu": "50m",
                "memory": "125Mi"
              }
            },
            "terminationMessagePath": "/dev/termination-log",
            "terminationMessagePolicy": "File",
            "imagePullPolicy": "Always"
          }
        ],
        "restartPolicy": "Always",
        "terminationGracePeriodSeconds": 30,
        "dnsPolicy": "ClusterFirst",
        "securityContext": {},
        "imagePullSecrets": [
          {
            "name": "regsecret-genergydata"
          }
        ],
        "schedulerName": "default-scheduler"
      }
    },
    "strategy": {
      "type": "RollingUpdate",
      "rollingUpdate": {
        "maxUnavailable": 1,
        "maxSurge": 1
      }
    },
    "revisionHistoryLimit": 2147483647,
    "progressDeadlineSeconds": 2147483647
  },
  "status": {
    "observedGeneration": 85,
    "replicas": 1,
    "updatedReplicas": 1,
    "readyReplicas": 1,
    "availableReplicas": 1,
    "conditions": [
      {
        "type": "Available",
        "status": "True",
        "lastUpdateTime": "2022-08-22T09:21:52Z",
        "lastTransitionTime": "2022-08-22T09:21:52Z",
        "reason": "MinimumReplicasAvailable",
        "message": "Deployment has minimum availability."
      }
    ]
  }
}
```

