## VUE 不使用keep-alive实现列表页面查询条件缓存功能

> 原理：把列表页面的查询条件缓存到``sessionStorage``中，切换``tag``时读取缓存，关闭``tag``时清除对应缓存

![image](https://github.com/Sherlock-Homles/picx-images-hosting/raw/master/20241024/image.1vynftaub1.png)

### 列表页面缓存

```vue
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem("searchFlag", true);
    next();
  },

  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem(this.$route.path, JSON.stringify(this.banciF));
    next();
  },
  destroyed() {
    // 销毁组件
    sessionStorage.removeItem("searchFlag");
  },
  mounted() {
    // 存在 读缓存
    if (
      sessionStorage.getItem("searchFlag") &&
      sessionStorage.getItem(this.$route.path) &&
      sessionStorage.getItem(this.$route.path) != "null"
    ) {
      this.banciF = JSON.parse(sessionStorage.getItem(this.$route.path));
    } else {
      // 首次进入列表页,清除缓存中的搜索条件
      sessionStorage.removeItem(this.$route.path);
    }
    this.getList();
  },
```

### 关闭tag清除缓存

```java
    closeTag(item) {
      const key = this.eachTag(item);
      let tag;
      this.$store.commit("DEL_TAG", item);
      // 清除查询条件缓存
      setTimeout(() => {
        sessionStorage.removeItem(item.value);
      }, 1000);
      if (item.value == this.tag.value) {
        tag = this.tagList[key == 0 ? key : key - 1];
        this.openUrl(tag);
      }
      if (this.tagBodyLeft < -100) {
        this.tagBodyLeft = this.tagBodyLeft + 100;
      } else {
        this.tagBodyLeft = 0;
      }
      this.isShow =
        this.$refs.tagsList.offsetWidth - this.$refs.tagBox.offsetWidth > 0;
    },