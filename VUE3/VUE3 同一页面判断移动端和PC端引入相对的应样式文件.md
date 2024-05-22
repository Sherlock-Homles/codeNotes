### VUE3 同一页面判断移动端和PC端引入相对的应样式文件

> 参考：[根据判断pc端还是移动端引入相对应的css文件（vue3版）](https://blog.csdn.net/weixin_45421804/article/details/135605659)

```typescript
<script setup lang="ts">
import { ref, onMounted } from "vue";
// 判断设备是移动端还是pc端
const deviceType = () => {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
};
// 判断是否是移动端
const isMobile = ref();
isMobile.value = deviceType() ? true : false;

onMounted(() => {
  if (isMobile.value) {
    import("@/assets/mobile.css");  // 移动端样式文件
  }else{
    import("@/assets/pc.css");  // pc端样式文件
  }
})
</script>
```

