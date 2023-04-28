## 1、安装

### 1.1、Linux上安装Django

#### 安装 setuptools

```python
# Python3 安装
yum install python3-setuptools
# Python2 安装
yum install python2-setuptools
```

使用 easy_install 命令安装 django

```python
easy_install django
```

在 Python 解释器输入以下代码:

```python
[root@solar django]# python
Python 3.7.4 (default, May 15 2014, 14:49:08)
[GCC 4.8.0] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>> django.VERSION
(3, 0, 6, 'final', 0)
```

看到输出了Django的版本号，说明安装成功。

#### pip 命令安装方法

```python
sudo pip3 install Django -i https://pypi.tuna.tsinghua.edu.cn/simple
```

``-i https://pypi.tuna.tsinghua.edu.cn/simple`` 指定清华镜像源，下载速度更快。

指定 Django 的下载版本（3.0.6 可以改成你要的版本）：

```python
sudo pip3 install Django==3.0.6 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

如果 pip < 1.4，安装方法如下：

```python
pip install https://www.djangoproject.com/download/1.11a1/tarball/
```

## 2、创建第一个项目

### 2.1、HelloWorld

使用 django-admin 来创建 HelloWorld 项目：

```python
django-admin startproject HelloWorld
```

创建完成后我们可以查看下项目的目录结构：

```json
$ cd HelloWorld/
$ tree
.
|-- HelloWorld
|   |-- __init__.py
|   |-- asgi.py
|   |-- settings.py
|   |-- urls.py
|   `-- wsgi.py
`-- manage.py
```

目录说明：

- **HelloWorld:** 项目的容器。
- **manage.py:** 一个实用的命令行工具，可让你以各种方式与该 Django 项目进行交互。
- **HelloWorld/__init__.py:** 一个空文件，告诉 Python 该目录是一个 Python 包。
- **HelloWorld/asgi.py:** 一个 ASGI 兼容的 Web 服务器的入口，以便运行你的项目。
- **HelloWorld/settings.py:** 该 Django 项目的设置/配置。
- **HelloWorld/urls.py:** 该 Django 项目的 URL 声明; 一份由 Django 驱动的网站"目录"。
- **HelloWorld/wsgi.py:** 一个 WSGI 兼容的 Web 服务器的入口，以便运行你的项目。

接下来我们进入 HelloWorld 目录输入以下命令，启动服务器：

```json
python manage.py runserver 0.0.0.0:8000
```

0.0.0.0 让其它电脑可连接到开发服务器，8000 为端口号。如果不说明，那么端口号默认为 8000。

在浏览器输入你服务器的 ip（这里我们输入本机 IP 地址： **127.0.0.1:8000**） 及端口号，如果正常启动，输出结果如下：

![img](https://www.runoob.com/wp-content/uploads/2015/01/225A52EA-25EF-4BF1-AA5A-B91490CBF26D.jpg)

### 2.1、视图和 URL 配置

在先前创建的 HelloWorld 目录下的 HelloWorld 目录新建一个 views.py 文件，并输入代码：

``HelloWorld/HelloWorld/views.py 文件代码：``

```python
from django.http import HttpResponse
 
def hello(request):
    return HttpResponse("Hello world ! ")
```

接着，绑定 URL 与视图函数。打开 urls.py 文件，删除原来代码，将以下代码复制粘贴到 urls.py 文件中：

``HelloWorld/HelloWorld/urls.py 文件代码：``

```python
from django.conf.urls import url
 
from . import views
 
urlpatterns = [
    url(r'^$', views.hello),
]
```

整个目录结构如下：

```json
$ tree
.
|-- HelloWorld
|   |-- __init__.py
|   |-- __init__.pyc
|   |-- settings.py           # 项目配置
|   |-- settings.pyc
|   |-- urls.py               # URL和函数的对应关系
|   |-- urls.pyc
|   |-- views.py              # 添加的视图文件
|   |-- views.pyc             # 编译后的视图文件
|   |-- wsgi.py               # 接收网络请求
|   `-- wsgi.pyc
`-- manage.py                 # 项目的管理,启动项目、创建app、数据管理
```

完成后，启动 Django 开发服务器，并在浏览器访问打开浏览器并访问：

![img](https://www.runoob.com/wp-content/uploads/2015/01/BD259D4C-2DBE-4657-8761-D8C3508E8A94.jpg)

我们也可以修改以下规则：

``HelloWorld/HelloWorld/urls.py 文件代码：``

```python
from django.urls import path
 
from . import views
 
urlpatterns = [
    path('hello/', views.hello),
]
```

通过浏览器打开 **http://127.0.0.1:8000/hello**，输出结果如下：

![img](https://www.runoob.com/wp-content/uploads/2015/01/344A94C7-8D7D-4A69-9963-00D28A69CD56.jpg)

### 2.3、path() 函数

Django path() 可以接收四个参数，分别是两个必选参数：route、view 和两个可选参数：kwargs、name。

语法格式：

```python
path(route, view, kwargs=None, name=None)
```

- route: 字符串，表示 URL 规则，与之匹配的 URL 会执行对应的第二个参数 view。
- view: 用于执行与正则表达式匹配的 URL 请求。
- kwargs: 视图使用的字典类型的参数。
- name: 用来反向获取 URL。

Django2. 0中可以使用 re_path() 方法来兼容 1.x 版本中的 **url()** 方法，一些正则表达式的规则也可以通过 re_path() 来实现 。

```python
from django.urls import include, re_path

urlpatterns = [
    re_path(r'^index/$', views.index, name='index'),
    re_path(r'^bio/(?P<username>\w+)/$', views.bio, name='bio'),
    re_path(r'^weblog/', include('blog.urls')),
    ...
]
```

### 2.4、使用PyCharm创建Django项目

#### 2.4.1 安装Anaconda创建Django虚拟环境

![doc-image-20230427093128661](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/20230427/doc-image-20230427093128661.26cf3ocshoqo.png)

#### 2.4.1、PyCharm添加Python解释器

![doc-image-20230427093419300](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/20230427/doc-image-20230427093419300.5kro25oaz4s0.png)

#### 2.4.2、创建Django项目

![doc-image-20230427093254950](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/20230427/doc-image-20230427093254950.n608nsgymao.png)

#### 2.4.3 启动项目

![doc-image-20230427093526852](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/20230427/doc-image-20230427093526852.2t8d6pnmyfi0.png)

### 2.5、创建APP

```json
|-- 项目
|   |-- app, 用户管理【表结构、函数、HTML模板、CSS】
|   |-- app, 网站【表结构、函数、HTML模板、CSS】
|   |-- app, API【表结构、函数、HTML模板、CSS】
|   ..
```

#### 2.5.1、创建一个user应用：

```json
(Django) D:\Python\PyCharmProject\FirstProject>python manage.py startapp user 
```

```json
# APP目录结构
──user
    │  admin.py        # 固定不动，Django默认提供了admin后台管理
    │  apps.py         # 固定不动，app启动类
    │  models.py       # 重要，对数据库操作
    │  tests.py        # 固定不动，单元测试
    │  views.py        # 重要，函数
    │  __init__.py
    │
    └─migrations       # 固定不动，数据库变更记录
            __init__.py
```

#### 2.5.2、注册app：

``settings.py``

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user.apps.UserConfig'
]
```

#### 2.5.3、编写URL和视图函数对应关系：

``urls.py``

```python
from user import views

urlpatterns = [
    # www.xxx.com/index/ -> 函数
    path('index/', views.index),
]
```

#### 2.5.4、编写视图函数

``views.py``

```python
from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Wellcome")
```

#### 2.5.5、访问

``http://127.0.0.1:8000/index/``

![doc-image](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/20230427/doc-image.1dmxvy0n0fls.webp)

#### 2.5.6、命令行启动Django

```json
python manage.py runserver
```

### 2.6、模板

模板文件夹``templates``

``urls.py``

```python
from django.urls import path
from user import views

urlpatterns = [
    path('user/list/', views.user_list),
]
```

``views.py``

```python
from django.shortcuts import render

def user_list(request):
    # 1、优先去根目录的templates中寻找（需提前配置）
    # 2、根据app的注册顺序，在每个app目录下的templates目录寻找
    return render(request, 'user_list.html')
```

访问``http://127.0.0.1:8000/user_list/``

![doc-1682578514245](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/20230427/doc-1682578514245.19dqbsp8d01s.png)

### 2.7、静态文件

在app目录下创建static文件，存放图片、CSS、JS等文件

```json
 ──static
    │  ├─css
    │  ├─img
    │  │      2023 R01 巴林大奖赛.jpg
    │  │
    │  ├─js
    │  └─plugins
```

HTML文件引入静态文件

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div class="box">
        helloWorld
    </div>
    <div class="images">
        <img src="{% static 'img/2023 R01 巴林大奖赛.jpg' %}" alt="">
    </div>
</body>
</html>
<style>
    .box {
        width: 200px;
        height: 200px;
        border: 1px solid #66ccff;
        line-height: 200px;
        text-align: center;
        font-size: 20px;
        font-weight: bolder;
    }

    .images {
        width: 300px;
    }

    img {
        width: 100%;
    }
</style>
```

### 2.8、模板语法

本质上：在HTML中写一些占位符，由数据对这些占位符进行替换和处理。

``views.py``

```python
def user_list(request):
    title = "标题1"
    data = ["001", "002", "003"]
    device = {"code": "001", "name": "设备1", "status": "在线"}
    device_list = [
        {"code": "001", "name": "设备1", "status": "在线"},
        {"code": "002", "name": "设备2", "status": "离线"},
        {"code": "003", "name": "设备3", "status": "在线"},
    ]
    return render(request, 'user_list.html',
                  {"title": title, 'data': data, "device": device, "device_list": device_list})
```

``user_list.html``

```html
    <div>{{ title }}</div>
    {# for循环 #}
    <div>
        {% for item in data %}
            <li>{{ item }}</li>
        {% endfor %}
    </div>
    <div>
        {% for key, vlaue in device.items %}
            <li>{{ key }} = {{ vlaue }}</li>
        {% endfor %}
    </div>
    <div>
        {% for item in device_list %}
        <li>{{ item.name }}  {{ item.status }}</li>
        {% endfor %}
    </div>
    {# if语句 #}
    <div>
        {% if title == "标题1" %}
            <h1>TRUE</h1>
        {% else %}
            <h1>FALSE</h1>
        {% endif %}
    </div>
```

发送请求获取数据：

``views.py``

```python
def news(request):
    # 第三方模块：request（请求）
    import requests
    response = requests.get("https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true")
    news_list = response.json()
    return render(request, 'news.html',
                  {"news": news_list})
```

``news.html``

```html
    <div>
        {% for item in news.data %}
            <li>{{ item.target.title }}</li>
        {% endfor %}
    </div>
```

![doc-1682588617602](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/20230427/doc-1682588617602.1uk1fdph7jsw.png)

### 2.9、请求和响应

```python
def index(request):
    # request是一个对象，封装入用户发过来的所有请求相关数据
    # 1、[请求]获取请求方式
    print(request.method)

    # 2、[请求]在url上传递值/index/?a=1&b=2
    print(request.GET)

    # 3、[请求]在请求中提交数据
    print(request.POST)

    # 4、[响应]HttpResponse("返回内容")，内容字符串返回给请求者
    # return HttpResponse("Wellcome")

    # 5、[响应]读取HTML内容 + 渲染（替换）-> 字符串，返回给用户浏览器
    # return render(request, 'index.html', {"text": "主页"})

    # 6、[响应]浏览器重定向到其他网站
    # 关于重定向：是浏览器直接访问重定向后的地址
    return redirect("https://www.bilibili.com")
```

案例：实现一个简单的用户登录功能

``views.py``

```python
def login(request):
    if request.method == "GET":
        return render(request, "login.html")
    # POST请求获取用户提交数据
    # print(request.POST)
    # 数据校验
    username = request.POST.get("name")
    password = request.POST.get("password")
    if username == "admin" and password == "123456":
        return render(request, "user_list.html")
    return render(request, "login.html", {"error_msg": "用户名或密码错误"})
```

``login.html``

```html
<div class="login">
    <form method="post" action="/login/">
        {# 用于校验请求是否合法 #}
        {% csrf_token %}
        <input type="text" name="name" placeholder="用户名">
        <input type="password" name="password" placeholder="密码">
        <button type="submit">登录</button>
        <p style="color: red">{{ error_msg }}</p>
    </form>
</div>
```

## 3、数据库操作

MySQL数据库+pymysql

```python
import pymysql

# 1、连接MySQL
conn = pymysql.connect(host="127.0.0.1",prot=3306,user="root",passwd="root",charset="utf8",db="unicom")
cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)

# 2、发送指令
cursor.execute("insert into admin(username,paddword,mobile) value('admin','123456','15666666666')")
conn.commit()

# 3、关闭
cursor.close()
conn.close()
```

Django操作数据库，内部提供了ORM框架

### 3.1、 安装第三方模块

```json
pip install mysqlclient
```

### 3.2、ORM

- 创建、修改、删除数据库中的数据表，但无法创建数据库。
- 操作数据表中的数据。

#### 3.2.1 连接MySQL

修改配置文件``setting.py``

```python
DATABASES = { 
    'default': 
    { 
        'ENGINE': 'django.db.backends.mysql',    # 数据库引擎
        'NAME': 'runoob', # 数据库名称
        'HOST': '127.0.0.1', # 数据库地址，本机 ip 地址 127.0.0.1 
        'PORT': 3306, # 端口 
        'USER': 'root',  # 数据库用户名
        'PASSWORD': '123456', # 数据库密码
    }  
} 
```

#### 3.2.2、创建表

``models.py``

```python
from django.db import models


class UserInfo(models.Model):
    name = models.CharField(max_length=32)
    password = models.CharField(max_length=64)
    age = models.IntegerField()
```

```json
python manage.py makemigrations
python manage.py migrate
```

注意：app必须已注册

#### 3.2.3、增删改查

```python
def orm(request):
    # 1、新增数据
    # UserInfo.objects.create(name="admin", password="123456", age="20")
    # UserInfo.objects.create(name="root", password="root", age="21")

    # 2、删除数据
    # UserInfo.objects.filter(name="root").delete()

    # 3、查询数据
    # data_list: 获取符合条件的所有数据，得到QuerySet类型数据
    # data_list = UserInfo.objects.all()
    # print(data_list)
    data_list = UserInfo.objects.filter(name="admin")
    # row_obj: 获取第一条数据，得到一个对象
    row_obj = UserInfo.objects.filter(name="admin").first()
    for obj in data_list:
        print(obj.id, obj.name, obj.password, obj.age)

    # 4、更新数据
    UserInfo.objects.filter(name="admin").update(age="99")

    return HttpResponse("SUCCESS")
```



> 当前 进度：P48:1-17 案例
