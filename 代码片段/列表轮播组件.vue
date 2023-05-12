<template>
  <div class="box">
    <div class="title">{{ title }}</div>
    <div class="time">{{ time }}</div>
    <el-table
      :data="tableData"
      height="500"
      border
      ref="table"
      :cell-style="cellStyle"
      :header-cell-style="{ background: '#0658a1', color: '#fff' }"
      @cell-mouse-enter="mouseEnter"
      @cell-mouse-leave="mouseLeave"
    >
      <el-table-column prop="scheduleCycleDate" label="日期" align="center">
      </el-table-column>
      <el-table-column prop="departureStation" label="始发站" align="center">
      </el-table-column>
      <el-table-column prop="portStation" label="口岸" align="center">
      </el-table-column>
      <el-table-column prop="destinationCountry" label="目的国" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { carousel } from '@/api/schedule/index.js'
export default {
  data() {
    return {
      title: '山东高速齐鲁号日韩陆海快线班期表',
      time: `${new Date().getFullYear()}年${new Date().getMonth() + 1}月`,
      tableData: [],
      timer: '',
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    tableData(newval, oldval) {
      if (newval.length >= 10) {
        // this.getData()
        this.lunbo()
      }
    },
  },

  methods: {
    // 鼠标移入
    mouseEnter() {
      clearInterval(this.timer)
      this.timer = null
    },
    //鼠标移出
    mouseLeave() {
      this.lunbo()
    },
    lunbo() {
      // 拿到表格挂载后的真实DOM
      const table = this.$refs.table
      // 拿到表格中承载数据的div元素
      const divData = table.bodyWrapper
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      this.timer = setInterval(() => {
        // 元素自增距离顶部1像素
        divData.scrollTop += 1
        // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
        if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
          divData.scrollTop = 0
        }
      }, 30)
    },
    getData() {
      carousel({
        scheduleDate: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1 < 10
            ? `0${new Date().getMonth() + 1}`
            : new Date().getMonth() + 1
        }`,
      }).then((response) => {
        if (response.data.code === 0) {
          this.tableData = response.data.data
        }
      })
    },
    cellStyle() {
      return {
        background: '#f7f9fb',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}
.box {
  padding: 5% 20%;
  color: #3f4042;
  div {
    text-align: center;
  }
  .title {
    font-size: 25px;
    font-weight: 500;
  }
  // 隐藏表格滚动条start
  .is-scrolling-none {
    overflow: hidden;
    overflow-y: auto;
    overflow-x: scroll;
  }

  .is-scrolling-none::-webkit-scrollbar {
    display: none;
  }

  .el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }

  .el-table--scrollable-x ::-webkit-scrollbar {
    display: none;
  }
  // 隐藏表格滚动条end
  // 隐藏table gutter列和内容区右侧的空白 start
  /deep/ .el-table th.gutter {
    display: none;
    width: 0;
  }
  /deep/ .el-table colgroup col[name='gutter'] {
    display: none;
    width: 0;
  }

  /deep/ .el-table__body {
    width: 100% !important;
  }
  // 隐藏table gutter列和内容区右侧的空白 end
}
</style>
