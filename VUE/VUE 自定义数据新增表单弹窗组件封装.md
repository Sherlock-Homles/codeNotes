# 自定义数据新增表单弹窗组件封装

### 1、父组件使用

```vue
<template>
  <div style="background-color: #f0f3fa">
    <add-Dialog
      :dialogVisible="dialogVisibleAdd"
      :dialogTitle="dialogTitleAdd"
      :formData="addList"
      :inputLabel="inputLabelAdd"
      :inputRlue="inputRuleAdd"
      :addStatus="dialogAddStatus"
      @changeBox="changeBox"
      @handleClose="handleCloseAdd"
      @handleChangeBC="handleChangeBC"
      @handleChangeSC="handleChangeSC"
      @changeMoney="changeMoney"
      @submitClick="submit"
    ></add-Dialog>
  </div>
</template>

<script>
import addDialog from '../planned/components/addDialog.vue'
export default {
  components: {
    'add-Dialog': addDialog,
  },
  data() {
    return {
      tableData: [],
      dialogVisibleAdd: false,
      dialogAddStatus: 'add',
      dialogTitleAdd: '',
      addList: {
        containerNumber: [],
        codeBbCategoriesCode: '',
        codeBbCategoriesName: '',
        codeSsCategoriesCode: '',
        codeSsCategoriesName: '',
        currency: '人民币',
        exchangeRate: 1,
        localCurrencyAmount: '',
        originalCurrencyAmount: '',
      },
      inputLabelAdd: [
        {
          label: '箱号',
          placeholder: '请选择箱号',
          value: 'containerNumber',
          type: 'select',
          disabled: false,
          option: [],
          optionKey: 'rowId',
          optionLabel: 'containerNumber',
          optionValue: '',
          change: 'changeBox',
        },
        {
          label: '费用大类',
          placeholder: '请选择费用大类',
          value: 'codeBbCategoriesCode',
          type: 'select',
          disabled: false,
          option: [],
          optionKey: 'rowId',
          optionLabel: 'name',
          optionValue: 'code',
          change: 'handleChangeBC',
        },
        {
          label: '费用小类',
          placeholder: '请选择费用小类',
          value: 'codeSsCategoriesCode',
          type: 'select',
          disabled: false,
          option: [],
          optionKey: 'rowId',
          optionLabel: 'name',
          optionValue: 'code',
          change: 'handleChangeSC',
        },
        {
          label: '币种',
          placeholder: '请输入币种',
          value: 'currency',
          type: 'input',
          disabled: false,
        },
        {
          label: '金额',
          placeholder: '请输入金额',
          value: 'originalCurrencyAmount',
          type: 'input',
          input: 'changeMoney',
          disabled: false,
        },
      ],
      inputRuleAdd: {
        containerNumber: [
          {
            required: true,
            message: '箱号不能为空',
            trigger: 'change',
          },
        ],
        codeBbCategoriesCode: [
          {
            required: true,
            message: '费用大类不能为空',
            trigger: ['change', 'blur'],
          },
        ],
        codeSsCategoriesCode: [
          {
            required: true,
            message: '费用小类不能为空',
            trigger: ['change', 'blur'],
          },
        ],
        currency: [
          {
            required: true,
            message: '币种不能为空',
            trigger: 'blur',
          },
        ],
        originalCurrencyAmount: [
          {
            required: true,
            message: '金额不能为空',
            trigger: 'blur',
          },
        ],
      },
      fetchFeeTypeData: [],
      fetchSubFeeTypeData: [],
    }
  },
  filters: {},
  created() {
    this.getBoxList()
  },
  computed: {},
  watch: {
    'addform.resveredField08': {
      handler: function (newVal, oldVal) {
        if (newVal && oldVal && this.addform.resveredField08) {
          this.dateType = true
          var obj = {
            resveredField08Str: this.addform.resveredField08,
            rowId: this.queryRow.rowId,
          }
          updateShippingTime(obj).then((res) => {
            if (res.data.statusCode == 200) {
              this.$message.success(res.data.object)
            } else {
              this.$message.info(res.data.object)
            }
          })
        }
      },
      deep: true,
      immediate: true,
    },
    $route: {
      handler(to, from) {
        if (to.path == '/welPR/standBookAppend') {
          if (JSON.parse(sessionStorage.getItem('platform_info')).content[0]) {
            this.platformInfo = JSON.parse(
              sessionStorage.getItem('platform_info')
            ).content[0]
          }
          // 新增(列表页已经不能新增，已经注释掉了)
          if (to.query.data) {
            this.addform = to.query.data
          }
          // 查看没有to.query.data
          if (to.query.num == 1 || to.query.num == 2) {
            this.queryRow = to.query
            this.getForm()
          }
          this.listQuery.accountCode = to.query.accountCode
          // 0是新增，2是查看
          this.queryNum = to.query.num
        }
      },
      deep: true,
      immediate: true,
    },
    tableData: {
      handler(newValue, oldValue) {
        this.costTotal.total = 0
        if (newValue.length > 0) {
          this.selectOption = this.uniqueArr(newValue, 'containerNo')
          newValue.forEach((item) => {
            this.costTotal.total += Number(item.localCurrencyAmount)
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 获取箱号列表
    getBoxList() {
      boxList(this.listQuery).then((res) => {
        this.boxListData = res.data
      })
    },
    // 选择箱号
    changeBox(val) {
      this.addList.containerNumber = val.filter((item) => {
        return item.containerNumber
      })
    },
    // 计算原币金额
    changeMoney(val) {
      this.addList.localCurrencyAmount =
        val != '' && this.addList.exchangeRate != ''
          ? Number(Number(val) * Number(this.addList.exchangeRate))
          : 0
    },
    //费用大类下拉属性值变更--重新加载费用小类
    handleChangeBC(val) {
      this.fetchSubFeeTypeData = []
      this.addList.codeBbCategoriesCode = val
      this.addList.codeSsCategoriesCode = ''
      this.addList.codeSsCategoriesName = ''
      this.fetchFeeTypeData.forEach((x) => {
        if (x.code == val) {
          this.addList.codeBbCategoriesName = x.name
          //加载费用小类
          fetchSubFeeType(x.id).then((res2) => {
            res2.data.forEach((option) => {
              this.fetchSubFeeTypeData.push(option)
            })
          })
        }
      })
      setTimeout(() => {
        this.inputLabelAdd[2].option = this.fetchSubFeeTypeData
      }, 500)
    },
    handleChangeSC(val) {
      this.addList.codeSsCategoriesCode = val
      this.fetchSubFeeTypeData.forEach((x) => {
        if (x.code == val) {
          this.addList.codeSsCategoriesName = x.name
        }
      })
      setTimeout(() => {
        this.inputLabelAdd[2].option = this.fetchSubFeeTypeData
      }, 500)
    },
    addCost() {
      this.getDictionary()
      setTimeout(() => {
        this.inputLabelAdd[0].option = this.boxListData
        this.inputLabelAdd[1].option = this.fetchFeeTypeData
      }, 500)
      this.dialogTitleAdd = '新增费用'
      this.dialogAddStatus = 'add'
      this.dialogVisibleAdd = true
    },
    handleCloseAdd(boolean) {
      this.dialogVisibleAdd = boolean
      this.dialogTitleAdd = ''
      this.restForm()
    },
    restForm() {
      this.addList = {
        costCode: '',
        containerNumber: [],
        codeBbCategoriesCode: '',
        codeBbCategoriesName: '',
        codeSsCategoriesCode: '',
        codeSsCategoriesName: '',
        currency: '人民币',
        exchangeRate: 1,
        localCurrencyAmount: '',
        originalCurrencyAmount: '',
      }
    },
    submit(val, addStatus) {
      if (addStatus == 'add') {
        const data = []
        val.containerNumber.forEach((item) => {
          const list = {
            containerNo: item.containerNumber,
            goodsName: item.goodsName,
            identification: item.isRansit,
            orgUnit: item.orgUnit,
            customerName: item.customerName,
            orderNo: item.orderNo,
            waybillNo: item.transportOrderNumber,
            invoiceApplicationCode: item.invoiceApplicationCode,
            containerOwner: item.containerOwner,
            containerTypeCode: item.containerTypeCode,
            containerTypeName: item.containerTypeName,
            containerType: item.containerType,
            startCompilation: item.destinationCode,
            startCompilationName: item.destinationName,
            endCompilation: item.destinationCode,
            endCompilationName: item.destination,
            destinationCountry: item.destinationCountryCode,
            destinationCountryName: item.destinationCountry,
            consigneeName: item.consignorName,
            createUserrealname: item.createUserrealname,
            codeBbCategoriesCode: val.codeBbCategoriesCode,
            codeBbCategoriesName: val.codeBbCategoriesName,
            codeSsCategoriesCode: val.codeSsCategoriesCode,
            codeSsCategoriesName: val.codeSsCategoriesName,
            currency: val.currency,
            exchangeRate: val.exchangeRate,
            localCurrencyAmount: Number(val.localCurrencyAmount).toFixed(2),
            originalCurrencyAmount: Number(val.originalCurrencyAmount),
          }
          data.push(list)
        })
        setTimeout(() => {
          this.tableData.push.apply(this.tableData, data)
        }, 500)
      } else if (addStatus == 'edit') {
        const data = val
        this.$set(this.tableData, this.dialogRowIndex, data)
      }
    },
    editData(row, rowIndex) {
      this.getDictionary()
      setTimeout(() => {
        this.inputLabelAdd[0].option = this.boxListData
        this.inputLabelAdd[0].disabled = this.dialogAddStatus == 'edit'
        this.inputLabelAdd[1].option = this.fetchFeeTypeData
      }, 500)
      this.handleChangeBC(row.codeBbCategoriesCode)
      this.addList = JSON.parse(JSON.stringify(row))
      this.dialogTitleAdd = '编辑费用'
      this.dialogAddStatus = 'edit'
      this.dialogRowIndex = rowIndex
      this.dialogVisibleAdd = true
    },
    deleteData(row, rowIndex) {
      this.$confirm('请确认是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.tableData.splice(rowIndex, 1)
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
```

### 2、子组件功能代码

``addDialog.vue``

```vue
<template>
    <div class="dialogBox">
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            @close="handleClose"
            width="60%"
            :close-on-click-modal="false"
        >
            <el-form
                :model="addForm"
                ref="form"
                label-position="top"
                label-width="80px"
                :rules="inputRlue"
            >
                <el-row :gutter="10">
                    <el-col
                        :span="24"
                        v-for="(item, index) in inputLabel"
                        :key="index"
                    >
                        <el-form-item :label="item.label" :prop="item.value">
                            <el-input
                                v-if="item.type == 'input'"
                                :placeholder="item.placeholder"
                                v-model="addForm[`${item.value}`]"
                                :size="inputSize"
                                :disabled="item.disabled"
                                @input="val => inputChange(val, item.input)"
                                clearable
                            />
                            <el-input
                                v-if="item.type == 'number'"
                                :placeholder="item.label"
                                v-model="addForm[`${item.value}`]"
                                oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3').replace(/^\./g, '').replace(/^0+(?!\.|$)/g, '')"
                                :size="inputSize"
                                :disabled="item.disabled"
                                @input="val => inputChange(val, item.input)"
                                :maxlength="15"
                                clearable
                            />
                            <el-select
                                v-if="
                                    item.type == 'select' &&
                                    item.optionValue !== ''
                                "
                                :placeholder="item.placeholder"
                                v-model="addForm[`${item.value}`]"
                                clearable
                                :size="inputSize"
                                :disabled="item.disabled"
                                @change="val => changeClick(val, item.change)"
                                :value-key="item.optionKey"
                                filterable
                            >
                                <el-option
                                    v-for="i in item.option"
                                    :key="i[`${item.optionKey}`]"
                                    :label="i[`${item.optionLabel}`]"
                                    :value="i[`${item.optionValue}`]"
                                >
                                </el-option>
                            </el-select>
                            <el-select
                                v-if="
                                    item.type == 'select' &&
                                    item.optionValue === '' &&
                                    !Array.isArray(addForm[`${item.value}`])
                                "
                                :placeholder="item.placeholder"
                                v-model="selectList[index]"
                                clearable
                                :size="inputSize"
                                :disabled="item.disabled"
                                @change="val => changeClick(val, item.change)"
                                :value-key="item.optionKey"
                                filterable
                            >
                                <el-option
                                    v-for="i in item.option"
                                    :key="i[`${item.optionKey}`]"
                                    :label="i[`${item.optionLabel}`]"
                                    :value="i"
                                >
                                </el-option>
                            </el-select>
                            <el-select
                                v-if="
                                    item.type == 'select' &&
                                    item.optionValue === '' &&
                                    Array.isArray(addForm[`${item.value}`])
                                "
                                :placeholder="item.placeholder"
                                v-model="addForm[`${item.value}`]"
                                clearable
                                :size="inputSize"
                                :disabled="item.disabled"
                                @change="val => changeClick(val, item.change)"
                                :value-key="item.optionKey"
                                filterable
                                multiple
                                collapse-tags
                            >
                                <div class="select_up">
                                    <el-button
                                        type="text"
                                        v-on:click="
                                            selectAll(item.option, item.value)
                                        "
                                    >
                                        <i class="el-icon-circle-check" />
                                        全选</el-button
                                    >
                                    <el-button
                                        type="text"
                                        v-on:click="removeTag(item.value)"
                                    >
                                        <i class="el-icon-close" />
                                        清空</el-button
                                    >
                                    <el-button
                                        type="text"
                                        v-on:click="
                                            selectReverse(
                                                item.option,
                                                item.value
                                            )
                                        "
                                    >
                                        <i class="el-icon-copy-document" />
                                        反选</el-button
                                    >
                                </div>
                                <div class="select_list">
                                    <el-option
                                        v-for="i in item.option"
                                        :key="i[`${item.optionKey}`]"
                                        :label="i[`${item.optionLabel}`]"
                                        :value="i"
                                    >
                                    </el-option>
                                </div>
                            </el-select>
                            <el-date-picker
                                v-if="item.type == 'year'"
                                :placeholder="item.placeholder"
                                v-model="addForm[`${item.value}`]"
                                type="year"
                                size="small"
                                :disabled="item.disabled"
                                :picker-options="pickerOptionsYear"
                                value-format="yyyy"
                            >
                            </el-date-picker>
                            <el-date-picker
                                v-if="item.type == 'date'"
                                :placeholder="item.placeholder"
                                v-model="addForm[`${item.value}`]"
                                type="date"
                                size="small"
                                :disabled="item.disabled"
                                value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                            <el-date-picker
                                v-if="item.type == 'datetime'"
                                :placeholder="item.placeholder"
                                v-model="addForm[`${item.value}`]"
                                type="datetime"
                                size="small"
                                :disabled="item.disabled"
                                value-format="yyyy-MM-dd HH:mm:dd"
                            >
                            </el-date-picker>
                            <el-input
                                v-if="item.type == 'textarea'"
                                type="textarea"
                                :rows="2"
                                :placeholder="item.placeholder"
                                v-model="addForm[`${item.value}`]"
                                :size="inputSize"
                                :disabled="item.disabled"
                                maxlength="200"
                                clearable
                                show-word-limit
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button
                    :loading="submitLoading"
                    type="primary"
                    @click="submit"
                    :size="buttonSize"
                >
                    确 定
                </el-button>
                <el-button type="" :size="buttonSize" @click="handleClose()">
                    取 消
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        addStatus: {
            type: String,
            default: 'add'
        },
        dialogTitle: {
            type: String,
            default: ''
        },
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        inputLabel: {
            type: Array,
            default: () => {
                return []
            }
        },
        inputRlue: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        ...mapGetters(['platform_info'])
    },
    data() {
        return {
            inputSize: 'small ',
            buttonSize: 'small',
            addForm: {},
            selectList: [],
            submitLoading: false,
            pickerOptionsYear: {
                disabledDate(time) {
                    return time.getYear() > new Date().getYear()
                }
            }
        }
    },
    watch: {
        inputLabel: {
            handler(newValue, oldValue) {},
            deep: true,
            immediate: true
        },
        formData: {
            handler(newValue, oldValue) {
                this.addForm = newValue
            },
            deep: true,
            immediate: true
        },
        dialogVisible: {
            handler(newValue, oldValue) {
                if (newValue) {
                    this.selectListChange()
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.addForm = this.formData
    },
    methods: {
        selectListChange() {
            if (this.addStatus == 'edit') {
                this.inputLabel.forEach((item, index) => {
                    if (item.type == 'select' && item.optionValue == '') {
                        item.option.forEach(element => {
                            if (
                                element[`${item.optionLabel}`] ==
                                this.addForm[`${item.value}`]
                            ) {
                                this.selectList[index] = element
                            }
                        })
                    }
                })
            }
        },
        handleClose() {
            this.selectList = []
            this.$refs.form.resetFields()
            this.$emit('handleClose', false)
        },
        inputChange(item, value) {
            this.$emit(value, item)
        },
        changeClick(item, value) {
            this.$emit(value, item)
        },
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    const data = JSON.parse(JSON.stringify(this.addForm))
                    this.$confirm('请确认是否提交数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submitLoading = true
                        this.$emit('submitClick', data, this.addStatus)
                        this.handleClose()
                        this.submitLoading = false
                    })
                }
            })
        },
        // 全选操作
        selectAll(option, value) {
            this.addForm[`${value}`] = []
            option.map(item => {
                if (!this.addForm[`${value}`].includes(item[`${value}`])) {
                    this.addForm[`${value}`].push(item)
                }
            })
        },
        // 清空操作
        removeTag(value) {
            this.addForm[`${value}`] = []
        },
        // 反选操作
        selectReverse(option, value) {
            const val = []
            option.map(item => {
                let num = 0
                //判断现有选中数据是否包含如果不包含则进行反选数据
                this.addForm[`${value}`].forEach(element => {
                    if (element[`${value}`] == item[`${value}`]) {
                        num++
                    }
                })
                if (num == 0) {
                    val.push(item)
                }
            })
            this.addForm[`${value}`] = val
        }
    }
}
</script>

<style lang="scss" scoped>
.dialogBox {
    /deep/ .el-dialog {
        border-radius: 10px;
    }

    /deep/ .el-dialog__header {
        background-size: cover;
        background-repeat: no-repeat;
    }

    /deep/ .el-input__inner {
        border-radius: 4px;
    }

    /deep/.el-table__footer-wrapper {
        height: 0;
    }

    /deep/ .el-dialog__title {
        font-weight: 600;
    }

    .tableTitle {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #222631;
        line-height: 38px;
    }
    .el-select-dropdown__list {
        height: 100%;
        overflow: hidden;
    }

    .select_up {
        font-size: 14px;
        position: absolute;
        z-index: 99999;
        background-color: white;
        top: 0px;
        width: 100%;
        border-radius: 5px 5px 0 0;

        ::v-deep .el-button {
            color: #bcbcbc;
            font-size: 14px;

            i {
                font-size: 14px;
            }
        }

        ::v-deep .el-button:hover {
            color: #409eff;
        }

        .el-button + .el-button {
            margin-left: 6px;
        }
    }

    .select_list {
        margin-top: 25px;
    }
}
</style>
```

