## 1、Vue修改data数据后视图没同步更新

> 数据修改后调用this.$forceUpdate()强制更新视图
>
> ```javascript
> this.$forceUpdate()
> ```

## 2、elementui el-table多选换单选，并去掉表头复选框

```vue
  <el-table v-loading="paperPage.listLoading" :data="paperPage.tableData"
            @selection-change="handleSelectionChange" border fit highlight-current-row style="width: 100%" ref="tb">
    <el-table-column type="selection" width="35"></el-table-column>
    <el-table-column prop="id" label="Id" width="90px"/>
    <el-table-column prop="subjectId" label="科目" :formatter="subjectFormatter" width="120px"/>
    <el-table-column prop="name" label="名称"/>
    <el-table-column prop="createTime" label="创建时间" width="160px"/>
  </el-table>
```

多选变单选，关键是ref=“xx”

```javascript
handleSelectionChange (val) {
  if (val.length > 1) {
    this.$refs.tb.clearSelection()
    this.$refs.tb.toggleRowSelection(val.pop())
  }
  this.paperPage.multipleSelection = val
},
```

去掉表头复选框，规范每行最前面的复选框

```css
<style lang="scss" scoped>
::v-deep .el-table .has-gutter .el-checkbox .el-checkbox__inner {
  display: none;
}

::v-deep .el-table .cell::before {
  content: '';
  text-align: center;
  line-height: 37px;
}
</style>
```

重点是深度选择器，去页面里找到具体的class，视情况自适应

父组件内使用：``this.$refs.父组件.$refs.子组件``

