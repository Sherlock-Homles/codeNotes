## ElementUI 实现表格穿梭框

[elementUI](https://so.csdn.net/so/search?q=elementUI&spm=1001.2101.3001.7020) 有一个穿梭框组件，但是这个组件局限性比较大，就是不能实现类似表格的效果，不像 antDesign 的穿梭框，可以搭配 Table 组件实现表格穿梭框的效果，所以就花时间用 elementUI 自己封装了一个（源码在最后面）。

### 实现效果

![1729135547192](https://github.com/Sherlock-Homles/picx-images-hosting/raw/master/20241017/1729135547192.41y1r4rxov.webp)

### 使用

组件借鉴了 elementUI 的 transfer，api 与方法都与 trransfer 类似，可以参考 [elementUI transfer 组件](https://element.eleme.cn/#/zh-CN/component/transfer)。

```vue
<template>
  <div>
    <!-- 左右两侧的表格列自定义，需指定插槽名 -->
    <table-transfer
      :data="dataSource"
      v-model="value"
      row-key="id"
      filterable
      :titles="['可选项', '已选项']"
      style="width: 100%;"
      :filter-method="filterMethod"
    >
      <template slot="left-table">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
      </template>
      <template slot="right-table">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="参与评分" prop="score">
          <template slot-scope="{ row }">
            <el-checkbox v-model="row.score"></el-checkbox>
          </template>
        </el-table-column>
      </template>
    </table-transfer>

    <!-- 两侧的表格列一致，可不用指定插槽名 -->
    <table-transfer
      :data="dataSource"
      v-model="value"
      rowKey="id"
      :titles="['可选项', '已选项']"
    >
      <template>
        <el-table-column
          type="selection"
          width="55"
          :selectable="selectable"
        ></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
      </template>
    </table-transfer>

    <!-- 项目中的实际使用，搭配分页查询功能 -->
    <table-transfer
      :data="userList"
      :filter-method="filterMethod"
      v-model="form.groupDevices"
      rowKey="userId"
      filterable
      :titles="['可选项', '已选项']"
      style="width: 100%;"
    >
      <template slot="left-table">
        <el-table-column label="姓名" prop="userRealNameW"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
      </template>
      <template slot="right-table">
        <el-table-column label="姓名" prop="userRealNameW"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
      </template>
      <template slot="left-footer">
        <el-pagination
          small
          slot="left-footer"
          align="right"
          @current-change="handleCurrentChange"
          :current-page="formValue.page"
          :page-size="formValue.limit"
          :total="total"
          :pager-count="5"
          layout="prev, pager, next"
        ></el-pagination>
      </template>
    </table-transfer>
  </div>
</template>
```

```javascript
import TableTransfer from '@/components/TableTransfer/index.vue'

export default {
  components: {
    TableTransfer
  },
  data() {
    data: [
      { id: 1, name: '测试1', status: '启用', score: true },
      { id: 2, name: '测试2', status: '启用', score: true },
      { id: 3, name: '测试3', status: '启用', score: true },
      { id: 4, name: '测试4', status: '启用', score: true },
      { id: 5, name: '测试5', status: '启用', score: true },
      { id: 6, name: '测试6', status: '启用', score: true }
    ],
    value: [],
    userList: [],
    filterMethod(query, item) {
		return item.userRealNameW.indexOf(query) > -1
    },
    formValue: {
		page: 1,
		limit: 10
    },
    total: 0
  },
  methods: {
    handleCurrentChange(val) {
       this.formValue.page = val
       this.getUserList()
    }
  }
}
```

### api 详细说明

#### Attributes

| 参数               | 说明                                                                                                                                     | 类型                          | 可选值                    | 默认值                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| value / v-model    | 绑定值                                                                                                                                   | array                         | —                         | —                                                                                                                       |
| data               | Transfer 的数据源                                                                                                                        | array                         | —                         | []                                                                                                                      |
| rowKey             | 行数据的 Key，用来优化 Table 的渲染，与绑定的 value 值关联                                                                               | string                        | —                         | —                                                                                                                       |
| filterable         | 是否可搜索                                                                                                                               | boolean                       | —                         | false                                                                                                                   |
| selectable         | 传入一个函数，函数的返回值用来决定这一行的 CheckBox 是否可以勾选                                                                         | Function(row, index)          | —                         | —                                                                                                                       |
| filter-placeholder | 搜索框占位符                                                                                                                             | string                        | —                         | 请输入搜索内容                                                                                                          |
| filter-method      | 自定义搜索方法                                                                                                                           | Function(keywords, row)       | —                         | —                                                                                                                       |
| panelStyle         | 左右两边穿梭框样式                                                                                                                       | object                        | —                         | —                                                                                                                       |
| target-order       | 右侧列表元素的排序策略：若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前 | string                        | original / push / unshift | original                                                                                                                |
| titles             | 自定义列表标题                                                                                                                           | array                         | —                         | []                                                                                                                      |
| button-texts       | 自定义按钮文案                                                                                                                           | array                         | —                         | []                                                                                                                      |
| format             | 列表顶部勾选状态文案                                                                                                                     | object{noChecked, hasChecked} | —                         | { noChecked: ‘ c h e c k e d / {checked}/ checked/{total}’, hasChecked: ‘ c h e c k e d / {checked}/ checked/{total}’ } |

#### Slot

| name         | 说明                                         |
| ------------ | -------------------------------------------- |
| —            | 若左右两边的表格列一致，则只需要填写默认插槽 |
| left-table   | 穿梭框左边的表格列                           |
| right-table  | 穿梭框右边的表格列                           |
| letf-footer  | 左侧列表底部的内容                           |
| right-footer | 右侧列表底部的内容                           |

#### Methods

| 方法名     | 说明                     | 参数                                 |
| ---------- | ------------------------ | ------------------------------------ |
| clearQuery | 清空某个面板的搜索关键词 | ‘left’ / ‘right’，指定需要清空的面板 |

#### Events

| 事件名称           | 说明                                    | 回调参数                                                            |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------- |
| change             | 右侧列表元素变化时触发                  | 当前值、数据移动的方向（‘left’ / ‘right’）、发生移动的数据 key 数组 |
| left-check-change  | 左侧列表元素被用户选中 / 取消选中时触发 | 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组      |
| right-check-change | 右侧列表元素被用户选中 / 取消选中时触发 | 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组      |

### 源码

#### index.vue

```vue
<template>
    <div class="fs-transfer">
        <transfer-panel
            v-bind="$props"
            ref="leftPanel"
            :data="sourceData"
            :title="titles[0] || ''"
            :default-checked="leftDefaultChecked"
            @checked-change="onSourceCheckedChange"
        >
            <!-- 组件间的插槽传递 -->
            <template slot="table">
                <slot v-if="$slots.default" slot="table" />
                <slot v-else name="left-table" slot="table" />
            </template>
            <template slot="footer">
                <slot name="left-footer" slot="footer"></slot>
            </template>
        </transfer-panel>
        <div class="fs-transfer-option">
            <el-button
                type="primary"
                :disabled="rightChecked.length === 0"
                @click.native="addToLeft"
            >
                <i class="el-icon-arrow-left"></i>
                <span v-if="buttonTexts[0] !== undefined">{{
                    buttonTexts[0]
                }}</span>
            </el-button>
            <el-button
                type="primary"
                :disabled="leftChecked.length === 0"
                @click.native="addToRight"
            >
                <span v-if="buttonTexts[1] !== undefined">{{
                    buttonTexts[1]
                }}</span>
                <i class="el-icon-arrow-right"></i>
            </el-button>
        </div>
        <transfer-panel
            v-bind="$props"
            ref="rightPanel"
            :data="targetData"
            :title="titles[1] || ''"
            :default-checked="rightDefaultChecked"
            @checked-change="onTargetCheckedChange"
        >
            <template slot="table">
                <slot v-if="$slots.default" slot="table" />
                <slot v-else name="right-table" slot="table" />
            </template>
            <slot name="right-footer" slot="footer"></slot>
        </transfer-panel>
    </div>
</template>

<script>
import TransferPanel from './transferPanel'

export default {
    name: 'TableTransfer',
    components: {
        TransferPanel
    },
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        },
        rowKey: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            default() {
                return []
            }
        },
        buttonTexts: {
            type: Array,
            default() {
                return []
            }
        },
        leftDefaultChecked: {
            type: Array,
            default() {
                return []
            }
        },
        beforeRightButtonClick: Function,
        beforeLeftButtonClick: Function,
        rightDefaultChecked: {
            type: Array,
            default() {
                return []
            }
        },
        filterable: {
            type: Boolean,
            default: false
        },
        filterPlaceholder: {
            type: String,
            default: '请输入搜索内容'
        },
        filterMethod: Function,
        selectable: Function,
        panelStyle: {
            type: Object,
            default() {
                return {}
            }
        },
        targetOrder: {
            type: String,
            default: 'original'
        },
        titles: {
            type: Array,
            default() {
                return []
            }
        },
        format: {
            type: Object,
            default() {
                return {}
            }
        },
        tableProps: Object
    },
    data() {
        return {
            leftChecked: [],
            rightChecked: []
        }
    },
    computed: {
        dataObj() {
            const key = this.rowKey
            return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {})
        },
        sourceData() {
            return this.data.filter(i => !this.value.includes(i[this.rowKey]))
        },
        targetData() {
            if (this.targetOrder === 'original') {
                return this.data.filter(i =>
                    this.value.includes(i[this.rowKey])
                )
            } else {
                return this.value.reduce((arr, cur) => {
                    const val = this.dataObj[cur]
                    if (val) {
                        arr.push(val)
                    }
                    return arr
                }, [])
            }
        }
    },
    methods: {
        addToLeft() {
            if (this.beforeLeftButtonClick) {
                if (!this.beforeLeftButtonClick()) return
            }
            const currentValue = this.value.slice()
            const key = this.rowKey
            this.rightChecked.forEach(item => {
                const index = currentValue.indexOf(item[key])
                if (index > -1) {
                    currentValue.splice(index, 1)
                }
            })
            this.$emit('input', currentValue)
            this.$emit('change', currentValue, 'left', this.rightChecked)
        },
        addToRight() {
            if (this.beforeRightButtonClick) {
                if (!this.beforeRightButtonClick()) return
            }
            let currentValue = this.value.slice()
            const itemsToBeMoved = []
            const key = this.rowKey
            this.data.forEach(item => {
                const itemKey = item[key]
                if (
                    this.leftChecked.findIndex(i => i[key] === itemKey) > -1 &&
                    this.value.indexOf(itemKey) === -1
                ) {
                    itemsToBeMoved.push(itemKey)
                }
            })
            currentValue =
                this.targetOrder === 'unshift'
                    ? itemsToBeMoved.concat(currentValue)
                    : currentValue.concat(itemsToBeMoved)
            this.$emit('input', currentValue)
            this.$emit('change', currentValue, 'right', this.leftChecked)
        },
        onSourceCheckedChange(val, movedKeys, checkedRows) {
            this.leftChecked = checkedRows || []
            if (movedKeys === undefined) return
            this.$emit('left-check-change', val, movedKeys, checkedRows)
        },
        onTargetCheckedChange(val, movedKeys, checkedRows) {
            this.rightChecked = checkedRows || []
            if (movedKeys === undefined) return
            this.$emit('right-check-change', val, movedKeys, checkedRows)
        },
        clearQuery(direction) {
            if (direction === 'left') {
                this.$refs.leftPanel.clearQuery()
            } else if (direction === 'right') {
                this.$refs.rightPanel.clearQuery()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.fs-transfer {
    text-align: left;
    height: 450px;
    display: flex;
    align-items: center;
    width: 850px;

    .fs-transfer-option {
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px;
    }
}
</style>
```

#### transferPanel.vue

```vue
<template>
    <div class="fs-transfer-panel" :style="panelStyle">
        <div class="fs-transfer-panel_header">
            <el-checkbox
                v-model="allChecked"
                @change="handleAllCheckedChange"
                :indeterminate="isIndeterminate"
            >
                {{ title }}
            </el-checkbox>
            <span>{{ checkedSummary }}</span>
        </div>
        <div class="el-transfer-panel_filter" v-if="filterable">
            <el-input
                class="fs-teansfer-input"
                size="small"
                :placeholder="filterPlaceholder"
                prefix-icon="el-icon-search"
                v-model="keywords"
            />
        </div>
        <div class="fs-transfer-panel_body" ref="panelBody">
            <el-table
                v-bind="tableProps"
                :data="filteredData"
                pagination
                style="min-height: 98%"
                :height="tableHeight"
                @selection-change="selectionChange"
                :empty-text="emptyText"
                ref="table"
            >
                <el-table-column
                    type="selection"
                    width="55"
                    :selectable="selectable"
                    fixed="left"
                ></el-table-column>
                <slot name="table" />
            </el-table>
        </div>
        <div class="fs-transfer-panel_footer" v-if="$slots.footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'FsTransferPanel',
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        },
        title: String,
        defaultChecked: Array,
        filterable: Boolean,
        filterPlaceholder: String,
        filterMethod: Function,
        targetOrder: String,
        format: Object,
        rowKey: String,
        selectable: Function,
        panelStyle: Object,
        tableProps: Object
    },
    data() {
        return {
            allChecked: false,
            checked: [],
            keywords: '',
            checkChangeByUser: true,
            tableHeight: 200
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.tableHeight =
                parseFloat(getComputedStyle(this.$refs.panelBody).height) - 10
        })
    },
    computed: {
        filteredData() {
            return this.data.filter(item => {
                if (typeof this.filterMethod === 'function') {
                    return this.filterMethod(this.keywords, item)
                } else {
                    return true
                }
            })
        },
        emptyText() {
            if (this.keywords.length && this.filteredData.length === 0) {
                return '无匹配数据'
            }
            return '暂无数据'
        },
        isIndeterminate() {
            if (this.checked.length) {
                if (this.checked.length === this.selectableLength) {
                    return false
                } else {
                    return true
                }
            }
            return false
        },
        selectableLength() {
            if (typeof this.selectable === 'function') {
                return this.filteredData.filter(this.selectable).length
            } else {
                return this.filteredData.length
            }
        },
        checkableData() {
            if (typeof this.selectable === 'function') {
                return this.filteredData.filter(this.selectable)
            } else {
                return this.filteredData
            }
        },
        checkedSummary() {
            const checkedLength = this.checked.length
            const dataLength = this.data.length
            const { noChecked, hasChecked } = this.format
            if (noChecked && hasChecked) {
                return checkedLength > 0
                    ? hasChecked
                          .replace(/\${checked}/g, checkedLength)
                          .replace(/\${total}/g, dataLength)
                    : noChecked.replace(/\${total}/g, dataLength)
            } else {
                return `${checkedLength}/${dataLength}`
            }
        }
    },
    watch: {
        checked(val, oldVal) {
            const valArr = val.map(i => i[this.rowKey])
            const oldValArr = oldVal.map(i => i[this.rowKey])
            if (this.checkChangeByUser) {
                const movedKeys = valArr
                    .concat(oldValArr)
                    .filter(
                        v =>
                            valArr.indexOf(v) === -1 ||
                            oldValArr.indexOf(v) === -1
                    )
                this.$emit('checked-change', valArr, movedKeys, val)
            } else {
                this.$emit('checked-change', valArr)
                this.checkChangeByUser = true
            }
        },
        defaultChecked: {
            immediate: true,
            handler(val, oldVal) {
                if (
                    oldVal &&
                    val.length === oldVal.length &&
                    val.every(item => oldVal.indexOf(item) > -1)
                ) {
                    return
                }
                const checked = []
                this.checkableData.forEach(row => {
                    if (val.indexOf(row[this.rowKey]) > -1) {
                        checked.push(row)
                        this.$nextTick(() => {
                            this.$refs.table.toggleRowSelection(row, true)
                        })
                    }
                })
                this.checkChangeByUser = false
                this.checked = checked
            }
        }
    },
    methods: {
        selectionChange(val) {
            this.checked = val
            if (val.length && !this.isIndeterminate) {
                this.allChecked = true
            } else {
                this.allChecked = false
            }
        },
        handleAllCheckedChange(val) {
            if (this.selectableLength === 0) {
                this.allChecked = false
                return
            }
            if (val) {
                this.$refs.table.toggleAllSelection(true)
            } else {
                this.$refs.table.toggleAllSelection(false)
            }
        },
        clearQuery() {
            this.keywords = ''
        }
    }
}
</script>

<style lang="scss" scoped>
$--border-color: #ebeef5;
.fs-transfer-panel {
    display: inline-flex;
    flex-direction: column;
    vertical-align: middle;
    height: 100%;
    overflow: hidden;
    border: 1px solid $--border-color;
    border-radius: 5px;
    min-width: 200px;
    flex: 1;

    .fs-transfer-panel_header {
        height: 40px;
        line-height: 40px;
        background: #f5f7fa;
        border-bottom: 1px solid $--border-color;
        padding: 0 15px;
        span:nth-last-child(1) {
            float: right;
            font-size: 12px;
            color: #909399;
            margin-left: 10px;
        }
    }

    .el-transfer-panel_filter {
        padding: 10px;
    }

    .fs-transfer-panel_footer {
        padding: 10px;
        border-top: 1px solid $--border-color;
    }

    .fs-transfer-panel_body {
        padding: 0 10px;
        // overflow-y: overlay;
        overflow: hidden;
        flex: 1;
    }
}

::v-deep .el-table::before {
    height: 0;
}

::v-deep .el-input__inner {
    border-radius: 28px;
}

::v-deep .el-table__fixed::before {
    height: 0;
}
</style>
```

全文完

本文由 [简悦 SimpRead](http://ksria.com/simpread) 转码，用以提升阅读体验，[原文地址](https://blog.csdn.net/weixin_50649221/article/details/131222289)
