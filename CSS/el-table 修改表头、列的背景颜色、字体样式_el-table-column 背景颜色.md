## 设置列的背景颜色

**html**

```html
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.4.11/lib/index.js"></script>
<div id="app">
<template>
    <el-table :data="tableData" 
    			:cell-style="cellStyle" 
    			border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </template>
</div>
```

**js**

```js
var Main = {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },{
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄'
          },{
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1522 弄'
          }]
        }
      },
      methods: {
      	cellStyle({row, column, rowIndex, columnIndex}){
        	if(column.property === 'name'){
          	switch(row.name) {
            	case '王小虎1':
              	return {
                	background: 'red',
                  color: '#FFFFFF'
                }
              	break
              case '王小虎2':
              	return {
                	background: 'blue',
                  color: '#FFFFFF'
                }
              	break
            }
          }
        }
      }
    }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
```

**效果**

![img](https://img-blog.csdnimg.cn/4b461222b168434faecae6c462150460.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RheDFf,size_16,color_FFFFFF,t_70)

## 设置表头背景颜色，字体

**html**

```html
    <el-table
      border
      fit
      highlight-current-row
      style="width: 100%;"
      stripe
      :header-cell-style="rowClass"
    >
      <!-- 表格列 -->
      <el-table-column
        prop="name"
        label="地区"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="厂站"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="psdb名称"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="参数类型"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="psdb值"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="cime值"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="差异比例"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="修改建议"
        min-width="90"
        style="color:green"
        align="center"
      />
      <el-table-column
        prop="name"
        label="PSDB修改值"
        min-width="90"
        align="center"
      />
      <el-table-column
        prop="name"
        label="CIME修改值"
        min-width="90"
        align="center"
      />
    </el-table>
```

**JS**

```js
    rowClass({ rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if(columnIndex===7||columnIndex===8||columnIndex===9){
          return {background:'skyblue',color:'white'}
        }else{
          return {background:'#ededed'}
        }
      }
    },
```

**效果图**

![img](https://img-blog.csdnimg.cn/f9ddbae05507485bb25b82caf845f545.png)