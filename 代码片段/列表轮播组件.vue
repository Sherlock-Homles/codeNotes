<template>
  <div class="box">
    <div class="title">{{ title }}</div>
    <div class="time">{{ time }}</div>
    <el-table
      :data="tableData"
      height="500"
      border
      ref="table"
      :header-cell-style="{ background: '#0658a1', color: '#fff' }"
    >
      <el-table-column prop="name" label="班次名称" align="center" width="400">
      </el-table-column>
      <el-table-column prop="time" label="发运时间" align="center">
      </el-table-column>
      <el-table-column prop="direction" label="方向" align="center">
      </el-table-column>
      <el-table-column prop="type" label="班列类型" align="center">
      </el-table-column>
      <el-table-column prop="line" label="发运线路" align="center">
      </el-table-column>
      <el-table-column prop="number" label="实际仓位数量" align="center">
      </el-table-column>
      <el-table-column
        prop="setOut"
        label="发站"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reach"
        label="到站"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '山东高速齐鲁号日韩陆海快线班期表',
      time: '2023年5月',
      tableData: [],
    }
  },
  mounted() {
    this.lunbo()
  },

  methods: {
    lunbo() {
      // 拿到表格挂载后的真实DOM
      const table = this.$refs.table
      // 拿到表格中承载数据的div元素
      const divData = table.bodyWrapper
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
      setInterval(() => {
        // 元素自增距离顶部1像素
        divData.scrollTop += 1
        // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
        if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
          this.tableData.push({
            name: '2023-序号163-伊尔库茨克-编组-二连-济南南',
            time: '2023-05-01',
            direction: '回程',
            type: '整列',
            line: '中俄',
            number: '62',
            setOut: '伊尔库茨克 编组',
            reach: '济南南',
          })
        }
      }, 30)
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
  padding: 5% 12%;
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
