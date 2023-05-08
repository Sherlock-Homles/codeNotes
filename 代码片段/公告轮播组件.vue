<template>
  <div id="demo">
    <div class="list">
      <div
        class="child"
        v-for="(item, index) in ulList"
        :key="item.id"
        :class="!index && play ? 'toUp' : ''"
      >
        <el-row>
          <el-col :span="6"> <img :src="noticeImg" alt="" /></el-col>
          <el-col :span="12">
            <span class="symbol"> • </span>
            <span class="notice">{{ item.notice }}</span></el-col
          >
          <el-col :span="6">
            <span class="time">{{ item.time }}</span></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setInterval(this.startPlay, 2000)
  },
  data() {
    return {
      noticeImg: require('@/assets/img/notice/notice.png'),
      ulList: [
        { notice: '这是第一条信息', time: '2023-05-08' },
        { notice: '这是第二条信息', time: '2023-05-08' },
        { notice: '这是第三条信息', time: '2023-05-08' },
        { notice: '这是第四条信息', time: '2023-05-08' },
        { notice: '这是第五条信息', time: '2023-05-08' },
        { notice: '这是第六条信息', time: '2023-05-08' },
        { notice: '这是第七条信息', time: '2023-05-08' },
        { notice: '这是第八条信息', time: '2023-05-08' },
        { notice: '这是第九条信息', time: '2023-05-08' },
        { notice: '这是第十条信息', time: '2023-05-08' },
      ],
      play: true,
    }
  },
  methods: {
    startPlay() {
      let that = this
      that.play = true //开始播放
      setTimeout(() => {
        that.ulList.push(that.ulList[0]) //将第一条数据塞到最后一个
        that.ulList.shift() //删除第一条数据
        that.play = false //暂停播放,此处修改，保证每一次都会有动画显示。 一定要修改属性，只有修改属性这样才能触发控件刷新冲毁!!!!
      }, 1000)
    },

    //只要对第一行进行滚动，下面的自动会跟着往上移动。
    isScroll(index) {
      if (index == 0) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  width: 100%;
  text-align: center;
  overflow: hidden;
  background-color: #e6f0f8;
  height: 60px;
  margin: 0;
}

.child {
  text-align: left; /**覆盖外层设置的水平居中效果**/
  height: 60px;
  line-height: 60px; /**span 垂直居中需要这一句**/
  img {
    height: 30px;
    float: right;
    transform: translate(-10%, 50%);
  }
  span {
    color: #636262;
    font-size: 15px;
  }
}

.toUp {
  margin-top: -60px; //向上移
  transition: all 0.5s;
}
</style>
