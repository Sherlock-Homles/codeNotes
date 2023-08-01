## elementUI动态显示el-Table中的字段

### 1、在做pc端项目时候,经常会碰到这种需求,可以根据选择框来控制表格的一些字段展示或者不展示,效果图如下:

![1690877425198](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/1690877425198.ebo7qnbfocw.webp)

![1690877479740](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/1690877479740.3rgcizyqx240.webp)

### 2、首先需要el-table、el-popover、el-tree等组件来实现这种联动效果
先写出ui结构,以下为选择框和弹出层的ui结构：


```html
                    <!-- 选择展示字段 -->
                    <el-popover
                        placement="top"
                        trigger="manual"
                        v-model="visible"
                        width="350"
                        popper-class="max-h-300px overflow-auto"
                    >
                        <el-row>
                            <el-col :span="24">
                                <el-col :span="24">
                                    <el-checkbox
                                        :indeterminate="isIndeterminate"
                                        v-model="checkAll"
                                        @change="handleCheckAllChange"
                                        >全选</el-checkbox
                                    >
                                </el-col>
                                <el-col :span="24">
                                    <el-tree
                                        ref="menuTree"
                                        :data="tableLabel"
                                        show-checkbox
                                        node-key="label"
                                        :props="{
                                            children: 'children',
                                            label: 'label'
                                        }"
                                        :default-checked-keys="
                                            checkedTableColumns
                                        "
                                        @check="handleCheckedCitiesChange"
                                        style="height: 250px; overflow: auto"
                                    >
                                    </el-tree>
                                </el-col>
                            </el-col>
                        </el-row>
                        <div>
                            <el-button
                                type="primary"
                                :size="buttonSize"
                                @click="cancel"
                                style="float: right; background-color: #347df7"
                                >取 消</el-button
                            >
                            <el-button
                                type="primary"
                                :size="buttonSize"
                                @click="exportExcel('form')"
                                style="
                                    float: right;
                                    background-color: #347df7;
                                    margin-right: 10px;
                                "
                                >导出Excel</el-button
                            >
                        </div>
                        <el-button
                            slot="reference"
                            type="primary"
                            @click="visible = true"
                            :size="buttonSize"
                            style="
                                float: right;
                                background-color: #347df7;
                                margin: 6px 20px 0 0;
                            "
                            >运费导出</el-button
                        >
                    </el-popover>
```

```html

                    <!-- 展示列表 -->
                    <table-com
                        :table-data="tableData"
                        :table-label="bindTableColumns"
                        :hasSelect="hasSelect"
                        :hasIndex="hasIndex"
                    >
                    </table-com>
```

### 3、以下为核心数据,首先需要定义表格需要展示的字段数据tableLabel

```javascript
export default {
    components: {
        'table-com': Table,
        'pager-com': Pager
    },
    data() {
        return {
            // 需要展示的字段值
            tableLabel: [
                {
                    label: '箱基本信息',
                    param: '',
                    align: 'center',
                    isShow: true,
                    children: [
                        {
                            param: 'isRansit',
                            label: '类型',
                            render: row => {
                                return row.isRansit == 'E'
                                    ? '出口'
                                    : row.isRansit == 'I'
                                    ? '进口'
                                    : row.isRansit == 'P'
                                    ? '过境'
                                    : '--'
                            },
                            isShow: true
                        },
                        {
                            param: 'orgUnit',
                            label: '货源组织单位',
                            type: 'template',
                            align: 'center',
                            width: '350',
                            isShow: true
                        },
                        {
                            param: 'consignorName',
                            label: '收货人',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'destinationName',
                            label: '发站',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'destinationCountry',
                            label: '目的国',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'destination',
                            label: '到站',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'portAgent',
                            label: '口岸代理',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'goodsName',
                            label: '品名',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'containerOwner',
                            label: '箱属',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            render: row => {
                                return row.containerOwner === '0'
                                    ? '自备箱'
                                    : row.containerOwner === '1'
                                    ? '中铁箱'
                                    : '--'
                            },
                            isShow: true
                        },
                        {
                            param: 'containerType',
                            label: '箱型',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'containerNumber',
                            label: '箱号',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'goodsNums',
                            label: '件数',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'goodsWeight',
                            label: '货重',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'containerWeight',
                            label: '箱重',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'isFull',
                            label: '是否全程',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            render: row => {
                                return row.isFull === '0'
                                    ? '否'
                                    : row.isFull === '1'
                                    ? '是'
                                    : '--'
                            },
                            isShow: true
                        },
                        {
                            param: 'nonFerrous',
                            label: '有色金属',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            render: row => {
                                return row.nonFerrous === '0'
                                    ? '否'
                                    : row.nonFerrous === '1'
                                    ? '是'
                                    : '--'
                            },
                            isShow: true
                        }
                    ]
                },
                {
                    label: '箱补充信息',
                    param: '',
                    align: 'center',
                    isShow: true,
                    children: [
                        {
                            param: 'goodsOwner',
                            label: '货主',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'destination',
                            label: '境内货源地/目的地',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'clearanceNumber',
                            label: '报关单号',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'valueUsd',
                            label: '货值（美金）',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'customsSeal',
                            label: '海关封',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'trainNumber',
                            label: '车号',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'waybillDemandNumber',
                            label: '订单需求号',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'waybillLnNumber',
                            label: '国联订单号',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        }
                    ]
                },
                {
                    label: '运费信息',
                    param: '',
                    align: 'center',
                    isShow: true,
                    children: [
                        {
                            param: 'domesticFreight',
                            label: '境内运费（人民币）',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'overseasFreightCny',
                            label: '境外运费（人民币）',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'overseasFreightOc',
                            label: '境外运费（原币）',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'monetaryType',
                            label: '境外币种',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        }
                    ]
                },
                {
                    label: '补贴信息',
                    param: '',
                    align: 'center',
                    isShow: true,
                    children: [
                        {
                            param: 'subsidyStandards',
                            label: '补贴标准',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        },
                        {
                            param: 'subsidyAmount',
                            label: '补贴金额',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        }
                    ]
                },
                {
                    label: '备注',
                    param: '',
                    align: 'center',
                    isShow: true,
                    children: [
                        {
                            param: 'remarks',
                            label: '箱备注',
                            type: 'template',
                            align: 'center',
                            width: '150',
                            isShow: true
                        }
                    ]
                }
            ],
            hasSelect: false,
            hasIndex: true,
            visible: false,
            checkAll: true,
            isIndeterminate: false
        }
    }
```

### 4、然后通过columns中的isShow字段来确定字段展不展示,表格绑定的数据bindTableColumns和选择框需要的数据如下,通过计算属性实现。

```javascript
    computed: {
        bindTableColumns() {
            const labelList = []
            this.tableLabel.forEach(item => {
                const childrenArray = item.children.filter(v => {
                    return v.isShow == true
                })
                if (childrenArray.length >= 1) {
                    const labelArray = Object.assign({}, item)
                    labelArray.children = childrenArray
                    labelList.push(labelArray)
                }
            })
            return labelList
        },
        checkedTableColumns: {
            get() {
                let labelArray = []
                this.bindTableColumns.forEach(item => {
                    labelArray = labelArray.concat(
                        item.children.map(v => v.label)
                    )
                })
                return labelArray
            },
            set(value) {
                this.tableLabel.forEach(v => {
                    if (value.includes(v.label)) {
                        v.isShow = true
                    } else {
                        v.isShow = false
                    }
                    v.children.forEach(i => {
                        if (value.includes(i.label)) {
                            i.isShow = true
                        } else {
                            i.isShow = false
                        }
                    })
                })
            }
        }
    }
```

### 5、实现全选和全不选功能。

```javascript
    methods: {
        handleCheckAllChange(val) {
            this.tableLabel.forEach(value => {
                value.children.forEach(v => {
                    v.isShow = val
                })
            })
            if (val) {
                this.$nextTick(() => {
                    this.$refs.menuTree.setCheckedNodes(this.tableLabel)
                    this.checkedTableColumns =
                        this.$refs.menuTree.getCheckedKeys()
                })
            } else {
                this.checkedTableColumns = []
                this.$nextTick(() => {
                    this.$refs.menuTree.setCheckedKeys(this.checkedTableColumns)
                })
            }
            this.isIndeterminate = false
        },
        handleCheckedCitiesChange(checkedNodes, checkedKeys) {
            const checkedCount = checkedKeys.checkedKeys.length
            let labelnum = 0
            this.tableLabel.forEach(item => {
                labelnum += item.children.length
            })
            labelnum += this.tableLabel.length
            this.checkAll = checkedCount === labelnum
            this.isIndeterminate = checkedCount > 0 && checkedCount < labelnum
            this.checkedTableColumns = checkedKeys.checkedKeys
        },
        cancel() {
            this.visible = false
            this.handleCheckAllChange(true)
        }
    }
```

