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

## 6、前端单点登录功能实现

``./src/util/auth.js``

```javascript
import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token, { domain: 'thingshive.com.cn' })
  // Cookies.setDomain('.thingshive.com.cn')
  return Cookies.set(TokenKey, token)
  //
}

export function removeToken() {
  Cookies.remove(TokenKey, {domain: 'thingshive.com.cn'})
  return Cookies.remove(TokenKey)
  // return window.sessionStorage.clear
}
```

``./src/permission.js``

```javascript
import { getToken } from '@/util/auth';
router.beforeEach((to, from, next) => {
    console.log('to', to);
    console.log('from', from);
    NProgress.start();
    // 单点登录 start
    // 进入/securityProtection/index页面，且没有token
    if (to.path.includes('/securityProtection/index') && !getToken()) {
        const loginForm = {
            username: '18655668899',
            password: 'Huanyu@2022',
            code: '',
            randomStr: randomLenNum(4, true)
        };

        store.dispatch('LoginByUsername', loginForm).then(res => {
            console.log('res-login', res);
            if (res == 0) {
                next();
            } else {
                next('/login-error');
                window.localStorage.removeItem('logStatus');
            }
        }).catch(()=>{
            next('/login-error');
        })
        return
    }
    // 单点登录 end
    if (getToken()) {
        // determine if there has token
        // 存在token，进行路由配置
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {
            if (store.getters.menus.length == 0) {
                store.dispatch('GenerateRoutes', {}).then(routes => {
                    // 动态组装路由
                    router.addRoutes(routes);
                    next({ ...to, replace: true });
                });
            } else {
                next();
            }
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done();
        }
    }
});
```

## 7、JS字符串去掉特殊字符和转义字符

```javascript
/*** 
* 去掉字符串中的特殊字符 
*/  
var excludeSpecial = function(s) {  
   // 去掉转义字符  
   s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');  
   // 去掉特殊字符  
   s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/);  
   return s;  
};  
 
function main(){  
   var s = "He is\tcalled 'Johnny'";;  
   console.log(s);  
   console.log(excludeSpecial(s));  
   console.log(s);  
};  
main();  
```

## 8、数据深拷贝

参考文章：[浅拷贝（shallow copy）与深拷贝（deep copy）](https://blog.csdn.net/Mayonnaise_Sann/article/details/130269137)

### 8.1、浅拷贝

- 仅复制最外一层，对于内层是相同的引用。
- 对于基本数据类型的属性，拷贝值。源对象和拷贝对象开辟不同的内存空间，不共享。
- 对于引用数据类型的属性，拷贝内存地址。源对象和拷贝对象指向同一块内存空间，共享。

#### 扩展运算符

```javascript
const source = {
	A: 'A',
    referProp: ['A','B','C']
}
// 浅拷贝
const result = {...source}
```

#### Object.assign

```javascript
const source1 = {
	A: 'A',
    referProp: ['A','B','C']
}
const source2 = { B: 'B' }
// 浅拷贝
const result = Object.assign({}, source1, source2)
// {A: 'A', referProp: ['A','B','C'], B: 'B'}
```

### 8.2、深拷贝

- 在堆内存中开辟新的空间存储数据对象，源对象和拷贝对象存储地址不同，不共享。

#### 函数库 lodash

```javascript
const _ = require('lodash');
const source = {
   A: 'A',
    referProp: ['A','B','C']
};
const result = _.cloneDeep(source);
```

#### JSON.stringify

使用 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 将可以被[序列化](https://developer.mozilla.org/zh-CN/docs/Glossary/Serialization)的对象转换为 JSON 字符串，然后使用 [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 将该字符串转换回（全新的）JavaScript 对象。

```javascript
const source = {
   A: 'A',
    referProp: ['A','B','C']
};
const result = JSON.parse(JSON.stringify(source));
```

#### 存在问题

- 拷贝的对象中如果有 function、undefined、symbol，当使用过`JSON.stringify()`进行处理之后，都会消失。
- 无法拷贝不可枚举的属性；
- 无法拷贝对象的原型链；
- 拷贝 `Date` 引用类型会变成字符串；
- 拷贝 `RegExp` 引用类型会变成空对象；
- 对象中含有`NaN、Infinity`以及 `-Infinity`，`JSON` 序列化的结果会变成`null`；
- 无法拷贝对象的循环引用，即对象成环 (`obj[key] = obj`)。

## 9、this.$set的用法

### 9.1、this.$set实现什么功能，为什么要用它

当你发现你给对象加了一个属性，在控制台能打印出来，但是却没有更新到视图上时，也许这个时候就需要用到``this.$set() ``这 个 方 法 了 。

官方解释：向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = ‘hi’).

### 9.2、使用方法

调用方法：this.$set( target, key, value )

target：要更改的数据源(可以是对象或者数组)

key：要更改的具体数据

value ：重新赋的值

```javascript
submit(val, addStatus) {
  const data = val
  if (addStatus == 'add') {
     this.tableData.push(data)
  } else if (addStatus == 'edit') {
     this.$set(this.tableData, this.dialogRowIndex, data)
  }
}
```

