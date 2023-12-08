## VUE 多级表头报表+前端数据导出

### 1、组件

#### 1.1、组件代码

`reportForms.vue`

```vue
<template>
  <div class="tableBox" :class="[hasTab ? 'hasTab' : 'noTab']">
    <el-row class="topRow">
      <el-col :span="4" style="display: flex">
        <el-date-picker
          v-model="queryData.reportDate"
          type="date"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
          class="queryInput"
          :disabled="level != 'first'"
          :picker-options="selectDatePickerOptions"
          @change="search"
        ></el-date-picker>
      </el-col>
      <el-col :span="4" style="display: flex" v-if="level == 'third'">
        <el-input
          v-model="queryData.employeeName"
          placeholder="姓名"
          class="queryInput"
        ></el-input
      ></el-col>
      <el-col :span="4" style="display: flex" v-if="level == 'third'">
        <el-input
          v-model="queryData.qjlx"
          placeholder="假期类型"
          class="queryInput"
        ></el-input>
      </el-col>
      <el-button
        v-if="level == 'third'"
        @click="search"
        size="small"
        type="primary"
        >查 询</el-button
      >
      <el-button
        type="success"
        @click="exportToExcel('blankBable', tableTitle, 3)"
        size="small"
        style="float: right"
        >导 出</el-button
      >
    </el-row>
    <!-- 表格数据 -->
    <el-row style="height: 85%">
      <el-table
        id="blankBable"
        style="width: 100%"
        height="100%"
        v-loading="tableLoading"
        :data="tableData"
        :header-cell-style="headerMerge ? headerStyle : headerCellStyle"
        :span-method="isMerge ? spanMethod : () => {}"
        :row-class-name="tableRowClassName"
      >
        <el-table-column align="center" :render-header="renderHeaderBig">
          <el-table-column
            align="center"
            type="index"
            width="50"
            label="序号"
            show-overflow-tooltip
          ></el-table-column>
          <template v-for="(item, index) in tableColumn">
            <el-table-column
              :key="index"
              :width="item.width"
              :align="item.align"
              :label="item.label"
              :prop="item.param"
              show-overflow-tooltip
            >
              <template v-for="(row, i) in item.children">
                <el-table-column
                  :key="i"
                  :width="row.width"
                  :align="row.align"
                  :label="row.label"
                  :prop="row.param"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      v-if="
                        row.click &&
                        scope.row[row.param] != '领域整体' &&
                        scope.row[row.param] != '小计' &&
                        scope.row[row.param] != '合计'
                      "
                      @click="handleClick(row.methods, scope.row)"
                      >{{ scope.row[row.param] ? scope.row[row.param] : '--' }}
                    </el-button>
                    <span v-else-if="row.render">
                      {{ item.render(scope.row) }}
                    </span>
                    <span v-else>
                      {{ scope.row[row.param] ? scope.row[row.param] : '--' }}
                    </span>
                  </template>
                </el-table-column>
              </template>
              <template slot-scope="scope">
                <el-button
                  type="text"
                  v-if="
                    item.click &&
                    scope.row[item.param] != '小计' &&
                    scope.row[item.param] != '合计'
                  "
                  @click="handleClick(item.methods, scope.row)"
                  >{{ scope.row[item.param] ? scope.row[item.param] : '--' }}
                </el-button>
                <span v-else-if="item.render">
                  {{ item.render(scope.row) }}
                </span>
                <span v-else
                  >{{ scope.row[item.param] ? scope.row[item.param] : '--' }}
                </span>
              </template>
            </el-table-column>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
// 引入依赖
import * as XLSX from 'xlsx'
import * as XLSXStyle from 'xlsx-style'
export default {
  data() {
    return {
      // 表头背景
      headerCellStyle: {
        borderColor: '#d6d8dc',
      },
      queryData: {},
      selectDatePickerOptions: {
        disabledDate: (time) => {
          return (
            time.getTime() <= new Date('2023-12-01').getTime() - 8.64e7 ||
            time.getTime() >= Date.now()
          )
        },
      },
    }
  },
  props: {
    level: {
      type: String,
      return: '',
    },
    merge: {
      type: Number,
      return: 1,
    },
    headerMerge: {
      type: Boolean,
      return: false,
    },
    hasTab: {
      type: Boolean,
      default: false,
    },
    isMerge: {
      type: Boolean,
      default: false,
    },
    tableTitle: {
      type: String,
      default: '报表',
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    queryForm: {
      type: Object,
      default: () => {
        return {
          reportDate: '',
        }
      },
    },
    tableColumn: {
      type: Array,
      default: () => {
        return []
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  created() {
    this.queryData = this.queryForm
  },
  methods: {
    search() {
      this.$emit('search', this.queryData)
    },

    // 点击表格
    handleClick(methods, row, index, rowIndex) {
      // 按钮事件
      this.$emit('cellClick', row)
    },

    // 数据导出方法
    exportToExcel(idSelector, fileName, titleNum = 1) {
      // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
      const xlsxParam = { raw: true }
      const table = document.querySelector(`#${idSelector}`).cloneNode(true)

      // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
      if (table.querySelector('.el-table__fixed-right')) {
        table.removeChild(table.querySelector('.el-table__fixed-right'))
      }
      if (table.querySelector('.el-table__fixed')) {
        table.removeChild(table.querySelector('.el-table__fixed'))
      }

      const wb = XLSX.utils.table_to_book(table, xlsxParam)
      const range = XLSX.utils.decode_range(wb.Sheets['Sheet1']['!ref'])
      const cWidth = []
      for (let C = range.s.c; C < range.e.c; ++C) {
        //SHEET列
        let len = 100 //默认列宽
        const len_max = 400 //最大列宽
        for (let R = range.s.r; R <= range.e.r; ++R) {
          //SHEET行
          const cell = { c: C, r: R } //二维 列行确定一个单元格
          const cell_ref = XLSX.utils.encode_cell(cell) //单元格 A1、A2
          if (wb.Sheets['Sheet1'][cell_ref]) {
            if (R < titleNum) {
              wb.Sheets['Sheet1'][cell_ref].s = {
                //设置第一行单元格的样式 style
                alignment: {
                  horizontal: 'center',
                  vertical: 'center',
                },
              }
            } else {
              wb.Sheets['Sheet1'][cell_ref].s = {
                alignment: {
                  horizontal: 'center',
                  vertical: 'center',
                },
              }
            }
            //动态自适应：计算列宽
            // const va = JSON.parse(
            //     JSON.stringify(wb.Sheets['Sheet1'][cell_ref].v)
            // )
            // var card1 = JSON.parse(JSON.stringify(va)).match(
            //     /[\u4e00-\u9fa5]/g
            // ) //匹配中文
            // var card11 = ''
            // if (card1) {
            //     card11 = card1.join('')
            // }
            // var card2 = JSON.parse(JSON.stringify(va)).replace(
            //     /([^\u0000-\u00FF])/g,
            //     ''
            // ) //剔除中文
            // let st = 0
            // if (card11) {
            //     // st += card11.length * 16  //中文字节码长度
            //     st += card11.length * 20 //中文字节码长度
            // }
            // if (card2) {
            //     // st += card2.length * 8  //非中文字节码长度
            //     st += card2.length * 10 //非中文字节码长度
            // }
            // if (st > len) {
            //     len = st
            // }
          }
        }
        if (len > len_max) {
          //最大宽度
          len = len_max
        }

        cWidth.push({ wpx: len }) //列宽
      }
      wb.Sheets['Sheet1']['!cols'] = cWidth
      const wbout = XLSXStyle.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary',
      })
      try {
        FileSaver.saveAs(
          new Blob([this.s2ab(wbout)], { type: '' }),
          `${fileName}.xlsx`
        )
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },

    s2ab(s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    },

    // 最大表头
    renderHeaderBig(h, { column, $index }) {
      return h('div', [
        h('div', {
          // 表示内容
          domProps: {
            innerHTML: `<h1 style='color:#000;font-weight: 600;letter-spacing: 3px;position: relative;top: 8px;'>${this.tableTitle}</h1>`,
          },
        }),
      ])
    },

    // 数据合并
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        (this.level === 'second' && (columnIndex === 1 || columnIndex === 2)) ||
        (this.level === 'third' &&
          (columnIndex === 1 ||
            columnIndex === 2 ||
            columnIndex === 3 ||
            columnIndex === 4))
      ) {
        let data = []
        data = this.tableData
        const _row = this.flitterData(data, column.property).arr[rowIndex]
        const _col = _row > 0 ? this.colData(data, row, columnIndex) : 0
        return {
          rowspan: _row,
          colspan: _col,
        }
      }
    },

    // 行合并
    colData(arr, row, columnIndex) {
      // 计算横向合并单元格
      if (
        columnIndex === 1 &&
        row.levelName1 &&
        row.levelName1 === row.levelName2
      ) {
        return 0
      } else if (
        columnIndex === 2 &&
        row.levelName1 &&
        row.levelName1 === row.levelName2
      ) {
        return 2
      } else if (columnIndex === 1 && row.region && row.region === row.name) {
        return 0
      } else if (columnIndex === 2 && row.region && row.region === row.name) {
        return 2
      } else {
        return 1
      }
    },

    // 列合并
    flitterData(arr, key) {
      const spanOneArr = []
      let concatOne = 0
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          if (item && arr[index - 1] && item[key] === arr[index - 1][key]) {
            // 第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return {
        arr: spanOneArr,
      }
    },

    // 表头合并
    headerStyle({ row, column, rowIndex, columnIndex }) {
      const comStyle = {
        borderColor: '#d6d8dc',
      }
      // 1.1 让第1行的第1列跨2行
      if (rowIndex === 1 && columnIndex === 1) {
        this.$nextTick(() => {
          document
            .getElementsByClassName(column.id)[0]
            .setAttribute('rowSpan', 2)
          return comStyle
        })
      }
      // 1.2 被覆盖的直接移除dom元素
      if (rowIndex === 2 && (columnIndex == 0 || columnIndex == 1)) {
        this.$nextTick(() => {
          // 根据class去移除被覆盖的dom
          document
            .getElementsByClassName(`${column.id} is-leaf`)[0]
            .remove(document.getElementsByClassName(`${column.id} is-leaf`)[0])
        })
      }
      return comStyle
    },

    tableRowClassName(row) {
      if (
        row.row.name == '小计' ||
        row.row.name == '合计' ||
        row.row.levelName2 == '小计' ||
        row.row.levelName2 == '合计'
      ) {
        return 'amount'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tableBox {
  /deep/.el-input__suffix {
    right: 10px !important;
  }
  /deep/ h1 {
    margin: 0 auto !important;
  }
  /deep/ .el-input__inner {
    height: 33px;
  }
  .topRow {
    margin: 0 0 15px;

    /deep/ .el-input__icon {
      line-height: 33px;
    }
  }
  .cell-hide {
    display: none;
  }
  .queryInput {
    padding: 0 10px 0 0;
  }
  /deep/ .el-button {
    border-bottom: 1px solid;
  }
  /deep/ .el-tooltip {
    width: 100% !important;
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa !important;
  }
}
.hasTab {
  height: calc(100vh - 170px) !important;
}
.noTab {
  height: calc(100vh - 110px) !important;
}
</style>
```

#### 1.2、使用

```vue
<template>
    <div class="checkBox">
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="height: 100%"
        >
            <el-tab-pane label="项目" name="first" v-if="projectLabel == 1">
                <reportForms
                    v-if="activeName == 'first'"
                    level="second"
                    :merge="1"
                    :hasTab="true"
                    :isMerge="true"
                    :tableTitle="tableTitle"
                    :tableLoading="tableLoading"
                    :queryForm="queryForm"
                    :tableColumn="tableColumn"
                    :tableData="tableData"
                    @search="getPage"
                    @cellClick="cellClick"
                ></reportForms
            ></el-tab-pane>
            <el-tab-pane label="平台" name="second">
                <reportForms
                    v-if="activeName == 'second'"
                    level="second"
                    :merge="1"
                    :headerMerge="true"
                    :hasTab="true"
                    :isMerge="true"
                    :tableTitle="tableTitlePlatform"
                    :tableLoading="tableLoading"
                    :queryForm="queryFormPlatform"
                    :tableColumn="tableColumnPlatform"
                    :tableData="tableDataPlatform"
                    @search="getPagePlatform"
                    @cellClick="cellClickPlatform"
                ></reportForms
            ></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import reportForms from './components/reportForms.vue'
import { getSecondVacationReport } from '@/api/human/dailyAnalysis'
export default {
    data() {
        return {
            activeName: 'first',
            tableTitle: '',
            queryForm: {
                reportDate: ''
            },
            tableColumn: [
                {
                    param: 'region',
                    label: '区域',
                    type: 'template',
                    align: 'center',
                    width: 180
                },
                {
                    param: 'name',
                    label: '项目',
                    type: 'template',
                    align: 'center',
                    click: true,
                    methods: 'cellClick',
                    width: 180
                },
                // {
                //     param: 'employeeName',
                //     label: '接口人',
                //     type: 'template',
                //     align: 'center',
                //     width: 180
                // },
                {
                    param: 'totalNum',
                    label: '总人数',
                    type: 'template',
                    align: 'center'
                },
                {
                    label: '请休假类型',
                    param: '',
                    align: 'center',
                    children: [
                        {
                            param: 'vacationNum',
                            label: '人数合计',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'gjnj',
                            label: '国家年假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'henj',
                            label: '海尔年假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'bj',
                            label: '病假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'sj',
                            label: '事假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'hj',
                            label: '婚假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'yej',
                            label: '育儿假',
                            type: 'template',
                            align: 'center'
                        }
                    ]
                },
                {
                    param: 'xjzb',
                    label: '休假占比',
                    type: 'template',
                    align: 'center',
                    render: row => {
                        return `${(Number(row.xjzb) * 100).toFixed(0)}%`
                    }
                }
            ],
            tableData: [],
            tableLoading: false,
            tableTitlePlatform: '',
            queryFormPlatform: {
                reportDate: ''
            },
            tableColumnPlatform: [
                // {
                //     param: 'region',
                //     label: '区域',
                //     type: 'template',
                //     align: 'center',
                //     width: 180
                // },
                {
                    param: '',
                    label: '平台',
                    type: 'template',
                    align: 'center',
                    children: [
                        {
                            param: 'levelName1',
                            label: '',
                            type: 'template',
                            align: 'center',
                            width: 180
                        },
                        {
                            param: 'levelName2',
                            label: '',
                            type: 'template',
                            align: 'center',
                            click: true,
                            methods: 'cellClick',
                            width: 180
                        }
                    ]
                },
                // {
                //     param: 'employeeName',
                //     label: '接口人',
                //     type: 'template',
                //     align: 'center',
                //     width: 180
                // },
                {
                    param: 'totalNum',
                    label: '总人数',
                    type: 'template',
                    align: 'center'
                },
                {
                    label: '请休假类型',
                    param: '',
                    align: 'center',
                    children: [
                        {
                            param: 'vacationNum',
                            label: '人数合计',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'gjnj',
                            label: '国家年假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'henj',
                            label: '海尔年假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'bj',
                            label: '病假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'sj',
                            label: '事假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'hj',
                            label: '婚假',
                            type: 'template',
                            align: 'center'
                        },
                        {
                            param: 'yej',
                            label: '育儿假',
                            type: 'template',
                            align: 'center'
                        }
                    ]
                },
                {
                    param: 'xjzb',
                    label: '休假占比',
                    type: 'template',
                    align: 'center',
                    render: row => {
                        return `${(Number(row.xjzb) * 100).toFixed(0)}%`
                    }
                }
            ],
            tableDataPlatform: [],
            topTitle: '',
            projectLabel: 1
        }
    },
    components: { reportForms },
    created() {},

    watch: {
        $route: {
            handler: function (val, oldVal) {
                if (val.path == '/human/dailyAnalysis/secondTable') {
                    this.topTitle = val.query.title
                    this.projectLabel = val.query.projectLabel
                    this.queryForm.topId = val.query.topId
                    this.queryForm.reportDate = val.query.reportDate
                    this.queryFormPlatform.topId = val.query.topId
                    this.queryFormPlatform.reportDate = val.query.reportDate
                    if (this.projectLabel != 1) {
                        this.activeName = 'second'
                    }
                    this.getPage()
                }
            },
            immediate: true,
            deep: true
        }
    },

    methods: {
        handleClick() {
            if (this.activeName == 'first') {
                this.getPage()
            } else {
                this.getPagePlatform()
            }
        },
        // 获取分页
        getPage(queryData) {
            if (queryData) {
                this.queryForm.reportDate = queryData.reportDate
            }
            this.tableLoading = true
            getSecondVacationReport(this.queryForm).then(res => {
                this.tableData = []
                this.tableLoading = false
                this.tableTitle = `${this.topTitle}到项目请休假分析`
                const amount = JSON.parse(
                    JSON.stringify(res.data.data.projectSecondReportTree[0])
                )
                amount.region = '合计'
                amount.name = '合计'
                delete amount.children
                this.tableData.push(amount)
                res.data.data.projectSecondReportTree[0].children.forEach(
                    item => {
                        const itemList = JSON.parse(JSON.stringify(item))
                        itemList.region = item.name
                        itemList.name = '小计'
                        delete itemList.children
                        this.tableData.push(itemList)
                        item.children.forEach(element => {
                            const list = element
                            list.region = item.name
                            this.tableData.push(list)
                        })
                    }
                )
            })
        },
        getPagePlatform(queryData) {
            if (queryData) {
                this.queryFormPlatform = queryData
            }
            this.tableLoading = true
            getSecondVacationReport(this.queryFormPlatform).then(res => {
                this.tableDataPlatform = []
                this.tableLoading = false
                this.tableTitlePlatform = `${this.topTitle}到平台请休假分析`
                const amount = JSON.parse(
                    JSON.stringify(res.data.data.platformSecondReportTree[0])
                )
                amount.levelName1 = '合计'
                amount.levelName2 = '合计'
                delete amount.children
                this.tableDataPlatform.push(amount)
                res.data.data.platformSecondReportTree[0].children.forEach(
                    element => {
                        if (element.children) {
                            const itemList = JSON.parse(JSON.stringify(element))
                            itemList.levelName1 = element.name
                            itemList.levelName2 = '小计'
                            delete itemList.children
                            this.tableDataPlatform.push(itemList)
                            element.children.forEach(ele => {
                                const list = ele
                                list.levelName1 = element.name
                                list.levelName2 = ele.name
                                this.tableDataPlatform.push(list)
                            })
                        } else {
                            const itemList = JSON.parse(JSON.stringify(element))
                            itemList.levelName1 = '小计'
                            itemList.levelName2 = '小计'
                            delete itemList.children
                            this.tableDataPlatform.push(itemList)
                            const list = element
                            list.region = element.name
                            list.levelName1 = element.name
                            list.levelName2 = element.name
                            this.tableDataPlatform.push(list)
                        }
                    }
                )
            })
        },

        // 点击表格
        cellClick(row) {
            this.$router.push({
                path: '/human/dailyAnalysis/thirdProject',
                query: {
                    deptId: row.deptId,
                    title: row.name,
                    reportDate: this.queryForm.reportDate
                }
            })
        },
        cellClickPlatform(row) {
            this.$router.push({
                path: '/human/dailyAnalysis/thirdPlatform',
                query: {
                    deptId: row.deptId,
                    title: row.name,
                    reportDate: this.queryForm.reportDate
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.checkBox {
    padding: 5px 20px 0 20px;
    overflow: hidden;

    /deep/.el-table .rowstylexj {
        background: #edf2f5;
    }
    /deep/ .el-tabs__content {
        height: 100%;
    }
}
</style>
```

### 2、遇到的问题

#### 2.1、解决pnpm i xlsx-style 引入报错问题

> vue Can‘t resolve ‘./cptable‘ in ‘xxx\node_modules_xlsx

![](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/0cf9b55cf3eba4f813647e24fd8a7ea.19hdhlafv44g.webp)

> 在vue-cli2.x的webpack.base.conf.js文件中添加

```json
module.exports = {
	externals: {
    	'./cptable': 'var cptable'
 	}
}
```

> 在vue-cli3.x的vue.config.js文件中添加

```json
module.exports = {
	configureWebpack: {
    	externals: {
      		'./cptable': 'var cptable'
    	}
  	}
}
```

