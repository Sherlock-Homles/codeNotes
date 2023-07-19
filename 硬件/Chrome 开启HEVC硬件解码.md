# Chrome 开启 HEVC 硬件解码

HEVC/H265 是目前桌面端或手机端播放器最主流的编码格式，由于其编码复杂度高，解码更耗费资源，因此为其实现硬解非常必要的，由于项目的 UI 交互界面是采用 chrome 浏览器，需要能够播放 H265 视频，前期 chrome 官方版本一直未支持 H265，因此前期只能通过自己编译 chrome 源码来生成 H265 定制浏览器，但是不支持硬解码的缺陷一直是一个大坑，我们一度准备放弃 chrome 浏览器，前几天忽然听说 chrome 105 以上的稳定版本已经集成了 HEVC 解码并且支持硬解，就迫不及待的实验了以下，以下记录下 chrome 开启 HEVC 硬解码的过程。

## 1.1 判断客户机是否支持 HEVC 硬解码

首先检查自己的电脑是否支持 HEVC 硬解码，可以下载 dxva checker 检测软件，DXVAChecker 是一个 windows 系统 PC 检测 DirectX 视频加速的工具，其可检测解码是否支持 GPU，下载地址如下：
[下载地址](https://bluesky-soft.com/common/app/release/dxvac/DXVAChecker_4.6.0_Setup.exe)

安装完成后，打开如下图，如果有红框内容，则表示支持 HEVC。

![img](https://img-blog.csdnimg.cn/img_convert/008b941b02f697bbc1335a50ae9b8d7b.png)

## 1.2 chrome 浏览器配置

配置步骤如下：

### 1.2.1 首先安装最新版本的 google chrome 浏览器，打开帮助 -> 关于，查看版本号是否大于 104：

![img](https://img-blog.csdnimg.cn/img_convert/1f614224e10387c4843f3f473783e548.png)

### 1.2.2 地址栏输入：chrome://settings，打开配置页面，搜索 "硬件加速"，使用硬件加速开启：

![img](https://img-blog.csdnimg.cn/img_convert/9a5efa2cb745687498f1930be373ce12.png)

### 1.2.3 地址栏输入：chrome://flags，搜索 hardware，使能 Hardware-accelerated video decode 硬件解码：

![img](https://img-blog.csdnimg.cn/img_convert/1603baca8b7e300376272d03513579a8.png)

### 1.2.4 通过快捷键打开 chrome，地址栏输入 chrome://gpu, 搜索 "Video Acceleration", 验证 chrome 是否开启成功:

![img](https://img-blog.csdnimg.cn/img_convert/17c785701d1969d32b1447409b854129.png)

有红框的内容，说明配置成功

## 1.3 通过播放 HEVC 视频验证



通过上文配置好的快捷键（一定要从入口打开）打开 chrome，输入支持 HEVC 的视频网址（哔哩哔哩有很多 HEVC 视频），这里采用我们项目的播放器，播放前端 HEVC 的摄像机视频，能够正常播放，查看 GPU 使用情况，GPU VIDEO DECODE 项有波动，说明已开启硬件解码。

![img](https://img-blog.csdnimg.cn/img_convert/69c31c1375b78fbb679acc3ddeb89549.png)