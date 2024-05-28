## VUE3 + H5实现扫描条形码&二维码功能

### 注意：

> 1、由于涉及到调用手机摄像头，涉及到隐私，必须在HTTPS环境使用。
>
> 2、在手机端使用，PC端使用会报错获取信息失败。

### 1、Vite 本地开启 https 模式便于调试

#### 1.1、安装依赖

```shell
npm install @vitejs/plugin-basic-ssl -D
```

#### 1.2、修改配置文件

```json
// vite.config.js 
import  basicSsl  from  '@vitejs/plugin-basic-ssl' 
 
export  default  {
  plugins : [
    basicSsl ( {
      /** 认证名称 */
      name : 'test' ,
      /** 自定义信任域 * /
      domains : [ '*.custom.com' ] ,
      /** 自定义认证目录 */
      certDir : '/Users/.../.devServer/cert'
    } )
  ]
}
```

### 2、项目安装html5-qrcode插件

```shell
yarn add html5-qrcode
或
npm i html5-qrcode
```

### 3、DEMO

```vue
<template>
  <div class="container">
    <div id="reader"></div>
  </div>
  <button @click="getCameras">扫码</button>
  <span>{{ result }}</span>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import { showToast } from 'vant';

const cameraId = ref('')
const devicesInfo = ref('')
const html5QrCode = ref(null)
const result = ref('')

onMounted(() => {
  // getCameras()
})

onUnmounted(() => {
  stop()
})

const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      console.log('摄像头信息', devices)
      showToast('摄像头信息', devices)
      if (devices && devices.length) {
        // 如果有2个摄像头，1为前置的
        if (devices.length > 1) {
          cameraId.value = devices[1].id
        } else {
          cameraId.value = devices[0].id
        }
        devicesInfo.value = devices
        // start开始扫描
        start()
      }
    })
    .catch((err) => {
      // handle err
      console.log('获取设备信息失败', err) // 获取设备信息失败
      showToast('获取设备信息失败')
    })
}
const start = () => {
  html5QrCode.value = new Html5Qrcode('reader')
  console.log('html5QrCode', html5QrCode)

  html5QrCode.value.start(
    cameraId.value, 
    {
      fps: 10, // 设置每秒多少帧
      qrbox: { width: 250, height: 250 } // 设置取景范围
    },
    (decodedText, decodedResult) => {
      console.log('扫描的结果', decodedText, decodedResult)
      showToast('扫描的结果===', decodedText, decodedResult)
      result.value = decodedText
      if (decodedText) {
        stop();
      }
    },
    (errorMessage) => {
      showToast('暂无扫描结果')
      console.log('暂无扫描结果', errorMessage)
    }
  )
    .catch((err) => {
      console.log(`Unable to start scanning, error: ${err}`)
    })
}
const stop = () => {
  html5QrCode.value
    .stop()
    .then((ignore) => {
      // QR Code scanning is stopped.
      console.log('QR Code scanning stopped.', ignore)
      showToast('QR Code scanning stopped.')
    })
    .catch((err) => {
      // Stop failed, handle it.
      console.log('Unable to stop scanning.', err)
      showToast('Unable to stop scanning.')
    })
}
</script>

<style scoped>
.container {
  position: relative;
  height: 80%;
  width: 100%;
  background: rgba(#000000, 0.48);
}
#reader {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>
```

### 参考：

[vue3+h5实现扫描条形码&二维码功能](https://blog.csdn.net/YSys12345678/article/details/135454719)

[Vite 本地开启 https 模式便于调试 ](https://www.cnblogs.com/lpkshuai/p/17636869.html)

