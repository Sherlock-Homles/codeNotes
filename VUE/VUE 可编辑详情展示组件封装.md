## 可编辑详情展示组件功能封装（初版）

### 1、子组件

``detailList.vue``

```vue
<template>
    <div class="detailBox">
        <el-row>
            <el-col v-for="(item, index) in datailValue" :key="index" :span="6">
                <div
                    style="margin-top: 20px; margin-left: 40px"
                    v-if="index < 4"
                >
                    <span style="color: #848da3; font-size: 12px"
                        >{{ item.label }}：</span
                    >
                    <span
                        v-if="item.type === 'status'"
                        style="color: #333333; font-size: 12px"
                        >{{
                            detailList[item.value]
                                ? item.statusOption.filter(i => {
                                      return (
                                          i[`${item.optionVlaue}`] ==
                                          detailList[item.value]
                                      )
                                  })[0][`${item.optionLabel}`]
                                : '--'
                        }}
                    </span>
                    <span
                        v-else-if="item.isEdit"
                        style="color: #333333; font-size: 12px"
                    >
                        <el-input
                            v-if="item.editShow && item.editType == 'input'"
                            :placeholder="item.placeholder"
                            v-model="editValue"
                            :size="inputSize"
                            style="width: 200px"
                        ></el-input>
                        <el-date-picker
                            v-else-if="item.editShow && item.editType == 'date'"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :placeholder="item.placeholder"
                            :size="inputSize"
                            v-model="editValue"
                            style="width: 200px"
                        ></el-date-picker>
                        <span v-else>{{ detailList[item.value] }}</span>
                        <span
                            style="
                                font-size: 12px;
                                cursor: pointer;
                                color: #409eff;
                            "
                            @click="eidtClick(item)"
                        >
                            {{ item.editShow ? '保存' : '修改' }}
                        </span>
                        <el-tooltip
                            class="item"
                            effect="light"
                            :content="item.content"
                            placement="right"
                        >
                            <i class="el-icon-question" style="color: gray"></i>
                        </el-tooltip>
                    </span>
                    <span v-else style="color: #333333; font-size: 12px"
                        >{{
                            detailList[item.value]
                                ? detailList[item.value]
                                : '--'
                        }}
                    </span>
                </div>
            </el-col>
            <el-button
                v-if="datailValue.length >= 5"
                size="small"
                type="text"
                @click="openTags"
                style="position: absolute; right: 20px; top: 17px"
            >
                {{ tagShow ? '收起' : '展开' }}
                <i :class="tagShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'">
                </i>
            </el-button>
            <el-collapse-transition>
                <div v-show="tagShow">
                    <el-col
                        v-for="(item, index) in datailValue"
                        :key="index"
                        :span="6"
                    >
                        <div
                            style="margin-top: 20px; margin-left: 40px"
                            v-if="index >= 4"
                        >
                            <span style="color: #848da3; font-size: 12px"
                                >{{ item.label }}：</span
                            >
                            <span
                                v-if="item.type === 'status'"
                                style="color: #333333; font-size: 12px"
                                >{{
                                    detailList[item.value]
                                        ? item.statusOption.filter(i => {
                                              return (
                                                  i[`${item.optionVlaue}`] ==
                                                  detailList[item.value]
                                              )
                                          })[0][`${item.optionLabel}`]
                                        : '--'
                                }}
                            </span>
                            <span
                                v-else-if="item.isEdit"
                                style="color: #333333; font-size: 12px"
                            >
                                <el-input
                                    v-if="
                                        item.editShow &&
                                        item.editType == 'input'
                                    "
                                    :placeholder="item.placeholder"
                                    v-model="editValue"
                                    :size="inputSize"
                                    style="width: 200px"
                                ></el-input>
                                <el-date-picker
                                    v-else-if="
                                        item.editShow && item.editType == 'date'
                                    "
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    :placeholder="item.placeholder"
                                    :size="inputSize"
                                    v-model="editValue"
                                    style="width: 200px !important"
                                ></el-date-picker>
                                <span v-else>{{ detailList[item.value] }}</span>
                                <span
                                    style="
                                        font-size: 12px;
                                        cursor: pointer;
                                        color: #409eff;
                                    "
                                    @click="eidtClick(item)"
                                >
                                    {{ item.editShow ? '保存' : '修改' }}
                                </span>
                                <el-tooltip
                                    class="item"
                                    effect="light"
                                    :content="item.content"
                                    placement="right"
                                >
                                    <i
                                        class="el-icon-question"
                                        style="color: gray"
                                    ></i>
                                </el-tooltip>
                            </span>
                            <span v-else style="color: #333333; font-size: 12px"
                                >{{
                                    detailList[item.value]
                                        ? detailList[item.value]
                                        : '--'
                                }}
                            </span>
                        </div>
                    </el-col>
                </div>
            </el-collapse-transition>
        </el-row>
    </div>
</template>

<script>
import waves from '@/directive/waves/index.js'

export default {
    props: {
        detailList: {
            type: Object,
            default: () => {
                return {}
            }
        },
        datailValue: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {},
    name: 'detail',
    directives: {
        waves
    },
    data() {
        return {
            inputSize: 'small',
            tagShow: false,
            editValue: ''
        }
    },
    computed: {},
    filters: {},
    watch: {
        detailList: {
            handler(newValue, oldValue) {},
            deep: true,
            immediate: true
        },
        datailValue: {
            handler(newValue, oldValue) {},
            deep: true,
            immediate: true
        }
    },
    created() {},
    methods: {
        openTags() {
            this.tagShow = !this.tagShow
        },
        eidtClick(item) {
            if (item.editShow) {
                this.$emit('editDataSubmit', item, this.editValue)
            } else {
                this.editValue = this.detailList[item.value]
                this.$emit('editData', item)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.detailBox {
    padding: 10px 30px;
    font-size: 14px;
    /deep/ .el-input--small .el-input__inner {
        height: 27px !important;
    }
}
</style>
```

### 2、父组件使用

```vue
<!--HTML-->
<detail-list
   :detailList="addform"
   :datailValue="datailValue"
   @editData="editData"
   @editDataSubmit="editDataSubmit"
></detail-list>
<!--JAVASCRIPT-->
<script>
import detailList from '../planned/components/detailList.vue'
    export default {
    components: {
        'detail-list': detailList
    }, 
    data() {
        return {
            addform: {
                shiftNo: '',
                shiftName: '',
                trip: '',
                shippingLine: '',
                city: '',
                resveredField08: '',
                portStation: '',
                destinationName: '',
                provinceShiftNo: '',
                domesticFreight: '',
                overseasFreightOc: '',
                overseasFreightCny: '',
                exchangeRate: '',
                amount: '',
                remarks: '',
                dataList: [],
                resveredField08Str: ''
            },
            datailValue: [
                {
                    label: '省级班列号',
                    value: 'provinceShiftNo',
                    isEdit: true,
                    editType: 'input',
                    editShow: false,
                    placeholder: '请输入省级班列号',
                    content:
                        "先点击左侧'修改'，在下方输入框里输入新的'省级班列号'，然后点击'保存'"
                },
                {
                    label: '班列名称',
                    value: 'shiftName',
                    isEdit: false
                },
                {
                    label: '发运城市',
                    value: 'city',
                    isEdit: false
                },
                {
                    label: '口岸站',
                    value: 'portStation',
                    isEdit: false
                },
                {
                    label: '方向',
                    value: 'trip',
                    type: 'status',
                    optionVlaue: 'id',
                    optionLabel: 'name',
                    statusOption: [
                        {
                            id: 'G',
                            name: '去程'
                        },
                        {
                            id: 'R',
                            name: '回程'
                        }
                    ],
                    isEdit: false
                },
                {
                    label: '线路',
                    value: 'shippingLine',
                    isEdit: false
                },
                {
                    label: '发运日期',
                    value: 'resveredField08',
                    isEdit: true,
                    editType: 'date',
                    editShow: false,
                    placeholder: '请选择发运日期',
                    content:
                        "先点击左侧'修改'，在下方选择新的'发运日期'，然后点击'保存'"
                },
                {
                    label: '集结站',
                    value: 'destinationName',
                    isEdit: false
                },
                {
                    label: '汇率',
                    value: 'exchangeRate',
                    isEdit: false
                },
                {
                    label: '备注信息',
                    value: 'remarks',
                    isEdit: false
                }
            ],
        }
    },
    methods: {
        // 基本信息编辑
        editData(row) {
            this.datailValue.forEach(item => {
                if (item.label == row.label) {
                    item.editShow = !item.editShow
                } else {
                    item.editShow = false
                }
            })
        },
        editDataSubmit(row, value) {
            if (row.label == '省级班列号') {
                if (value != this.addform.provinceShiftNo) {
                    var obj = {
                        accountCode: this.addform.accountCode,
                        provinceShiftNo: value,
                        provinceShiftNoX: this.addform.provinceShiftNo // provinceShiftNoX 为旧的
                    }
                    updateProvinceShiftNo(obj).then(res => {
                        if (res.data.b) {
                            this.$message.success(res.data.msg)
                            this.getForm()
                            this.editData(row)
                        } else {
                            this.$message.info(res.data.msg)
                        }
                    })
                } else {
                    return this.$message.info('请输入新的省级班列号再保存')
                }
            } else if (row.label == '发运日期') {
                this.dateType = true
                const obj = {
                    resveredField08Str: value,
                    rowId: this.queryRow.rowId
                }
                updateShippingTime(obj).then(res => {
                    if (res.data.statusCode == 200) {
                        this.$message.success(res.data.object)
                        this.getForm()
                        this.editData(row)
                    } else {
                        this.$message.info(res.data.object)
                    }
                })
            }
        }
    }
}
```

