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

## 3、el-table 选中行与复选框相互联动的实现步骤

目录步骤：1. 点击行时触发复选框的选择或取消 2. 点击复选框时触发相应行的变化（问题关键在怎么获取复选框选取的行）需求：对 el-table 选中行时复选框也被选中，选中复选框时触发行的相应变化（拢共分两步）

步骤： 第一步：点击行时触发复选框的选择或取消；
第二步：点击复选框时触发相应行的变化（问题关键在怎么获取复选框选取的行）

### 3.1、点击行时触发复选框的选择或取消

```vue
// <template>
<el-table
            class="right-panel-table"
            :data="tableData"           
            @selection-change="(val) => handleSelectionChange(val,'ischeckboxTick')"
            ref="multipleTable"
            v-loading="planLoading"
            @cell-mouse-enter="handleMouseEnter"
            @cell-mouse-leave="handleMouseOut"
            @row-click="(row,column,event) => handleRowClick(row,column,event,'onclumn')"
            highlight-current-row
          >
//  <script>  添加row-click方法，点击列表行时触发
handleRowClick(row,column,event, onclumn){  
      if(onclumn === 'onclumn') {
        this.isonClunm = true;
      }
      row.flag = !row.flag;
      this.$refs.multipleTable.toggleRowSelection(row, row.flag);
      if(row.flag) {
        this.selectSatitleLatLon(row);
      } else {
        this.unselectSatitleLatLon(row);
      }
}
```

添加完以上代码后，点击行，相应行前面的复选框会跟着选中或取消

### 3.2、点击复选框时触发相应行的变化（问题关键在怎么获取复选框选取的行） 当点击列表行时，先触发 row-click 事件，然后再触发 selection-change 事件，点击复选框时只触发 selection-change 事件，想要判断出点击复选框时触发的是哪一行时，则需要对上一次选中的列表项和这次选中的列表项对比

```vue
// template部分同上
// <script>
handleSelectionChange(val, checkFlag) {
      let that = this;
      if(checkFlag === 'ischeckboxTick') {
        that.ischeckboxTick = true
      }
      // 获取当前增加的或者减少的那条数据
      let n = {};
      let currentVal = [];
      val.forEach(item => {
        currentVal.push(item);
      })
      if(val.length > that.multipleSelection.length) {
        // 增加时比之前不一样的某个值
        n = (val.filter(item => !that.multipleSelection.includes(item)))[0];
      } else {
        // 减少时与之前不一样的值
        let oldSelect = [];
        that.multipleSelection.forEach(item => {
          oldSelect.push(item)
        })
        if(val.length === 0) {
          n = that.multipleSelection[0];
        } else {
          that.multipleSelection.forEach((item, index) => {
            let delIndex = 0;
            currentVal.forEach((item1, index1) => {
              if(item.sname === item1.sname && item.startTime === item1.startTime && item.endTime === item1.endTime) {
                delIndex = index;
                currentVal.splice(index1, 1);
                oldSelect.splice(delIndex, 1, '');   
              }
            })
          })
          oldSelect.forEach(item => {
            if(item !== '') {
              n = item
            }
          })
        }
      }
 
      that.multipleSelection = val;  // 选中的所有项
      that.isonClunm = false;
      that.ischeckboxTick = false;
     
    },
```

## 4、element-ui dialog 对话框局部显示（不全屏遮罩）

### 4.1、遮罩覆盖住了对话框

设置 [modal](https://so.csdn.net/so/search?q=modal&spm=1001.2101.3001.7020)-append-to-body 或者 append-to-body 属性为 false

```vue
<el-dialog
            title="新增对话框"
            width="80%"
            :modal-append-to-body='false'
            :append-to-body="false"
            :center="true"
        >
</el-dialog>
```

### 4.2、如何让对话框在某一个 div 中局部弹出？

如需要在 box1 中弹出对话框

```vue
<div class = "box1">
  <el-dialog
    title="新增对话框"
    width="80%"
    :modal-append-to-body='false'
    :append-to-body="false"
    :center="true"
  >
  </el-dialog>
</div>
```

需要在 css 中修改 [el-dialog](https://so.csdn.net/so/search?q=el-dialog&spm=1001.2101.3001.7020) 的原始样式，将 position 由 fixed 修改为 absolute（没有效果的话加 / deep / 和！important）

```css
/deep/.el-dialog__wrapper{
    position: absolute !important;
  }
/deep/.v-modal{
    position: absolute !important;
  }
```

效果如图所示，对话框仅在红框的 div 内展示

![img](https://img-blog.csdnimg.cn/043a77fee08844c3893eb0af616567f8.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQV9sZXh6YW5kYQ==,size_20,color_FFFFFF,t_70,g_se,x_16)

## 5、vue 如何监听浏览器主动刷新

### 5.1、监听浏览器主动刷新

```javascript
 mounted() {
             window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))   //监听页面刷新触发事件
        },
 methods(){
  		beforeunloadHandler(e) {    //根据事件进行操作进行操作
                console.log(e)
                console.log('浏览器刷新') 
            },
},
destroyed () {  //进行监听销毁
            window.removeEventListener('beforeunload', e =>this.beforeunloadHandler(e))
},
```

### 5.2、监听刷新事件

```javascript
 mounted() {
    window.addEventListener("load", () => {
      //写入你想要执行的代码
    });
  },
```

