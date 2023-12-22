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

## 10、VueX的存储与使用缓存页面查询条件

### 10.1、在vuex里新建一个对象用来保存查询条件

``src/store/index.js``

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import query from './modules/query'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    query
  },
  getters,
})

export default store
```

### 10.2、在mutations：{}里面新加一个函数用来修改state里面的值，因为vuex里是不能直接修改的

``src/store/modules/query.js``

```javascript
const query = {
  state: {
    rateSettingQuery: {
      shiftName: undefined,
      startTime: undefined,
      endTime: undefined,
      shippingLine: undefined,
      destinationName: undefined,
      portStation: undefined,
      trip: undefined,
      platformCode: undefined,
      page: 1,
      limit: 10
    },
  },
  mutations: {
    save_StorageQueryCriteria(state, value) {
      state.rateSettingQuery.shiftName = value.shiftName
      state.rateSettingQuery.startTime = value.startTime
      state.rateSettingQuery.endTime = value.endTime
      state.rateSettingQuery.shippingLine = value.shippingLine
      state.rateSettingQuery.destinationName = value.destinationName
      state.rateSettingQuery.portStation = value.portStation
      state.rateSettingQuery.trip = value.trip
      state.rateSettingQuery.platformCode = value.platformCode
      state.rateSettingQuery.page = value.page
      state.rateSettingQuery.limit = value.limit
    },
  }

}

export default query
```

### 10.3、使用

页面跳转时保存查询参数

```javascript
toDetail(row) {
    // save_StorageQueryCriteria 这个方法就是mutations里的函数
    this.$store.commit('save_StorageQueryCriteria', this.listQuery)
    this.$router.push({
        path: '/wel/bancixq',
        query: {
           id: row.shiftId,
           province: true
         }
    })
}
```

数据回显方法

```javascript
		// 回显查询条件
        queryConditionsDisplayed() {
            // 把vueX里的数据取出来
            const obj = this.$store.state.query.rateSettingQuery
            this.listQuery.shiftName = obj.shiftName
            this.listQuery.startTime = obj.startTime
            this.listQuery.endTime = obj.endTime
            this.listQuery.shippingLine = obj.shippingLine
            this.listQuery.destinationName = obj.destinationName
            this.listQuery.portStation = obj.portStation
            this.listQuery.trip = obj.trip
            this.listQuery.platformCode = obj.platformCode
            this.listQuery.page = obj.page
            this.listQuery.limit = obj.limit
            this.getList()
        }
```

## 11、点击按钮关闭当前tab页并返回上个页面

### 11.1、使用：

```javascript
        back() {
            this.$store.commit('DEL_TAG', this.$store.getters.tag)
            this.$router.back()
        }
```

### 11.2、DEL_TAG方法配置：

``store/modules/tags.js``

```javascript
import {
  setStore,
  getStore,
  removeStore
} from '@/util/store'
const tagObj = {
  label: '',
  value: '',
  query: '',
  num: '',
  close: true
}

function setFistTag(list) {
  if (list.length == 1) {
    list[0].close = false
  } else {
    list.some(a => {
      a.close = true
    })
  }
  return list
}
const navs = {
  state: {
    tagList: getStore({
      name: 'tagList'
    }) || [],
    tag: getStore({
      name: 'tag'
    }) || tagObj,
    tagWel: {
      label: '首页',
      value: '/wel/index'
    },
    tagCurrent: getStore({
      name: 'tagCurrent'
    }) || []
  },
  actions: {

  },
  mutations: {
    UPDATE_TAGLIST: (state, tagList) => {
      state.tagList = tagList
      setStore({
        name: 'tagList',
        content: state.tagList,
        type: 'session'
      })
    },
    ADD_TAG: (state, action) => {
      state.tag = action
      setStore({
        name: 'tag',
        content: state.tag,
        type: 'session'
      })
      if (state.tagList.some(a => a.value === action.value)) return
      state.tagList.push({
        label: action.label,
        value: action.value,
        query: action.query,
        meta: action.meta
      })
      state.tagList = setFistTag(state.tagList)
      setStore({
        name: 'tagList',
        content: state.tagList,
        type: 'session'
      })
    },
    SET_TAG_CURRENT: (state, tagCurrent) => {
      state.tagCurrent = tagCurrent
      setStore({
        name: 'tagCurrent',
        content: state.tagCurrent,
        type: 'session'
      })
    },
    SET_TAG: (state, value) => {
      state.tagList.forEach((ele, num) => {
        if (ele.value === value) {
          state.tag = state.tagList[num]
          setStore({
            name: 'tag',
            content: state.tag,
            type: 'session'
          })
        }
      })
    },
    DEL_ALL_TAG: (state, action) => {
      state.tag = tagObj
      state.tagList = []
      state.tagList.push(state.tagWel)
      removeStore({
        name: 'tag'
      })
      removeStore({
        name: 'tagList'
      })
    },
    DEL_TAG_OTHER: (state, action) => {
      state.tagList.forEach((ele, num) => {
        if (ele.value === state.tag.value) {
          state.tagList = state.tagList.slice(num, num + 1)
          state.tag = state.tagList[0]
          state.tagList[0].close = false
          setStore({
            name: 'tag',
            content: state.tag,
            type: 'session'
          })
          setStore({
            name: 'tagList',
            content: state.tagList,
            type: 'session'
          })
        }
      })
    },
    DEL_TAG: (state, action) => {
      state.tagList.forEach((ele, num) => {
        if (ele.value === action.value) {
          state.tagList.splice(num, 1)
          state.tagList = setFistTag(state.tagList)
          setStore({
            name: 'tag',
            content: state.tag,
            type: 'session'
          })
          setStore({
            name: 'tagList',
            content: state.tagList,
            type: 'session'
          })
        }
      })
    }
  }
}
export default navs
```

引用：

``store/index.js``

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import errLog from './modules/errLog'
import query from './modules/query'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    errLog,
    tags,
    query
  },
  getters,
})

export default store
```

``store/getters.js``

```javascript
const getters = {
  tag: state => state.tags.tag,
  website: state => state.common.website,
  theme: state => state.common.theme,
  themeName: state => state.common.themeName,
  cacheControl: state => state.common.cacheControl,
  isCollapse: state => state.common.isCollapse,
  isLock: state => state.common.isLock,
  isFullScren: state => state.common.isFullScren,
  isLoading: state => state.common.isLoading,
  isTags: state => state.common.isTags,
  menuType: state => state.common.menuType,
  lockPasswd: state => state.common.lockPasswd,
  tagList: state => state.tags.tagList,
  tagCurrent: state => state.tags.tagCurrent,
  tagWel: state => state.tags.tagWel,
  access_token: state => state.user.access_token,
  platform_info: state => state.user.platform_info,
  refresh_token: state => state.user.refresh_token,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  permissions: state => state.user.permissions,
  menu: state => state.user.menu,
  menus: state => state.user.menus,
  errLog: state => state.errLog.errLog
}
export default getters
```

## 12、el-input 限制只能输入两位小数，并且自定义位数

```html
<el-input oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').replace(/^\./g, '').replace(/^0+(?!\.|$)/g, ''),value = Number(value) >= 999999.99 ? 999999.99 : value" size="mini" v-model="scope.row[value]" placeholder="请输入内容" :controls="false" :maxlength="9"></el-input>
```

### 12.1、使用

1. /\[^\d.]/g，匹配所有非数字和非小数点的字符，用空字符替换。
2. /.{2,}/g，匹配两个及以上的连续小数点，用一个小数点替换。
3. /./g，匹配所有小数点，替换为特殊占位符 KaTeX parse error: Expected 'EOF', got '#' at position 1: #̲。
4. /^(-)*(\d+).(\d\d).*$/，匹配首位是负号（可有可无）的数字，小数点后面只保留两位。
5. /^./g，匹配所有以小数点开头的内容，用空字符替换。
6. /^0+(?!.|$)/g，匹配所有以 0 开头的数字（小数点后不能跟着数字），用空字符替换。

总体来说，就是将输入框中非数字和非小数点的字符删除，保留小数点前后只有一位，且删除开头的 0。这样做是为了输入时限制只能输入数字和小数点，并且保证输入的数据格式正确。

### 12.2、自定位数

```javascript
replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 两位小数
replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3') // 四位小数
```

## 13、JavaScript常用方法，根据二维数组内某个元素的值排序，去重

### 13.1、 二维数组排序 (根据某个字段排序)

```javascript
/* 二维数组排序(根据某个字段排序) */
const listSortBy = (arr, field, sort = "asc") => {
    arr.sort(function (a, b) {
	    return a[field] - b[field]
	})
	if (sort === "desc") {
		arr.reverse()
	}
	return arr
}
```

### 13.2、二维数组去重（根据某个字段值去重）

```javascript
/* 数组去重 */
const uniqueArray = arr => {
	return Array.from(new Set(arr))
}
/* 二维数组去重(根据数组内某个元素的值去重) */
const uniqueArr = (arr, field) => {
	const res = new Map();
	return arr.filter(item => !res.has(item[field]) && res.set(item[field], 1))
}
```

### 13.3、深拷贝

```javascript
const deepCopy = source => {
	if (typeof source != 'object') {
		return source
	}
	if (source == null) {
		return source
	}
	var newObj = source.constructor === Array ? [] : {} //开辟一块新的内存空间
	for (var i in source) {
		newObj[i] = this.deepCopy(source[i])
	}
	return newObj
}
```

## 14、VUE监听路由参数跳转不同页面

```javascript
watch: {
  $route: {
      handler(to, from) {
          if (to.path == '/planned/receivableDetail') {
              if (
                  (to.query.num == 3 || to.query.num == 2) && from
                      ? from.query.num == 1
                      : false
              ) {
                  this.$store.commit('DEL_TAG', this.$store.getters.tag)
                  if (to.query.platformLevel == 1) {
                      this.$router.push({
                          path: '/planned/receivable'
                      })
                  } else if (to.query.platformLevel == 2) {
                      this.$router.push({
                          path: '/planned/payable'
                      })
                  }
              }
          }
      }
  }
}
```

## 15、[blob类型的数据如何转为JSON](https://www.yzktw.com.cn/post/1143556.html)

Blob类型的数据是一种能够保存二进制数据的JavaScript对象。在前端开发中，我们通常会使用blob来保存图像、音频、视频等多媒体数据。

如果我们需要将blob类型的数据转换成JSON格式，可以通过以下步骤：

```JavaScript
const blob = new Blob(['{"name": "张三", "age": 18 }'], { type: 'application/json' }); // 创建一个JSON格式的Blob对象
const reader = new FileReader();
reader.readAsText(blob); // 以文本形式读取Blob对象
reader.onload = () => {
	const jsonStr = reader.result; // 获取读取的内容
	const jsonData = JSON.parse(jsonStr); // 将JSON格式的字符串转换为JavaScript对象
	console.log(jsonData.name); // 输出结果
};
```

实例：

```javascript
        // 运费核算表导出导出
        exportData(row) {
            fdBillExport({
                uuid: row.uuid,
                platformLevel: 2
            }).then(response => {
                var blob = new Blob([response.data], {
                    type: 'application/vnd.ms-excel;charset=UTF-8'
                })
                const reader = new FileReader()
                reader.readAsText(blob) // 以文本形式读取Blob对象
                reader.onload = () => {
                    const jsonStr = reader.result // 获取读取的内容
                    const jsonData = JSON.parse(jsonStr) // 将JSON格式的字符串转换为JavaScript对象
                    // 输出结果
                    if (!jsonData.b) { // 导出接口返回异常
                        this.$message.info(jsonData.msg)
                    } else {
                        var link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = `运费核算表.xls`
                        link.target = '_blank'
                        link.click()
                        window.URL.revokeObjectURL(link.href)
                    }
                }
            })
        }
```

## 16、el-select下拉实现：全选、反选、清空功能

参考：https://blog.csdn.net/askuld/article/details/131184542

``父组件传参``

```vue
<add-Dialog
:dialogVisible="dialogVisibleAdd"
:dialogTitle="dialogTitleAdd"
:formData="addList"
:inputLabel="inputLabelAdd"
></add-Dialog>

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
    change: 'changeBox'
}]
```

``子组件``

```vue
<el-col :span="24" v-for="(item, index) in inputLabel" :key="index">
    <el-form-item :label="item.label" :prop="item.value">
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
              <el-button type="text" v-on:click=" selectAll(item.option, item.value)">
                <i class="el-icon-circle-check" />全选
              </el-button>
              <el-button type="text" v-on:click="removeTag(item.value)">
                <i class="el-icon-close" />清空
              </el-button>
              <el-button type="text" v-on:click="selectReverse(item.option,item.value)">
                <i class="el-icon-copy-document" />反选
              </el-button>
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
    </el-form-item>
</el-col>

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

// 按钮样式
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
```

## 16、el-table修改table expand展开行的图标以及动效

参考：[vue element 修改table expand展开行的图标以及动效](https://blog.csdn.net/a83370892/article/details/114141439)

### 16.1、效果图

![img](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/1693562154624.1qxnzhicbbe.webp)

### 16.2、css样式代码

```css
<style>
/*修改展开按钮的样式 start*/
/*1.取消原本展开的旋转动效*/
.el-table__expand-icon {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}
/*2.展开按钮未点击的样式是加号带边框*/
.el-table__expand-icon .el-icon-arrow-right:before {
    content: '\e6d9';
    border: 1px solid #409eff;
    padding: 1px;
    font-weight: bold !important;
}
/*3.展开按钮点击后的样式是减号带边框*/
.el-table__expand-icon--expanded .el-icon-arrow-right:before {
    content: '\e6d8';
    font-weight: bold !important;
}
</style>
```

## 17、el-table树形表格实现复选框多选效果

当使用树形结构表格需要进行多选功能操作的时候会发现点击全选的时候，只有一级表格数据会被选中。需要实现的是点击全选，不管是几级表格数据都可以被选中。实现如下：

```html
 <el-table 
           :data="typeList" 
           :key="curryId"  
           row-key="id"              
           :tree-props="{children: 'children', hasChildren: 'hasChildren'}"              
           ref="table"              
           @selection-change="selection_all_operation_record"              
           @select-all="handleSelectAll">
</el-table>
```

```javascript
methods:{
    handleSelectAll() {
        for (let item of this.typeList) {
            this.selectChildren(item)
        }
    },
    selectChildren(item) {
        if (item.children != null) {
            for (let childItem of item.children) {
                this.selectChildren(childItem)
                this.$refs.table.toggleRowSelection(childItem)
            }
        }
    }
}
```

原理：通过递归的方式来给每一层数据都可以被选中。

## 18、输入所选年月获取当月第一天和最后一天

```javascript
// 方法
getDay(time) {
   var date = new Date(time)
   var new_year = date.getFullYear() // 取当前的年份
   var month = date.getMonth()
   var nextMonth = month + 1
   var firstDay = new Date(new_year, month, 1) // 取当年当月中的第一天
   var NextMonthFirstDay = new Date(new_year, nextMonth, 1) // 取下个月中的第一天
   var lastDay = new Date(NextMonthFirstDay.getTime() - 1000 * 60 * 60 * 24).getDate() // 获取当月最后一天日期
   var mon = ''
   if (firstDay.getMonth() < 9) {
       mon = '0' + (firstDay.getMonth() + 1)
   } else {
       mon = firstDay.getMonth() + 1
   }
   var startDate = firstDay.getFullYear() + '-' + mon + '-' + '0' + firstDay.getDate()
   var endDate = firstDay.getFullYear() + '-' + mon + '-' + lastDay
   return [startDate, endDate]
}
// 使用
colsole.log(this.getDay('2023-12'))
// 输出
['2023-12-01', '2023-12-31']
```

## 19、CSS 获取屏幕高度

```css
/* 方法一：使用100vh单位 */
.full-screen {
height: 100vh;
}
/* 方法二：使用calc()函数 */
.full-screen {
height: calc(100vh - 80px); /* 80px为非全屏元素的高度 */
}
```

第一种方法使用了CSS3新增的Viewport单位——vh（View Height），它表示相对于整个视口高度的百分比。100vh就是整个视口的高度。

第二种方法使用了calc()函数，它可以进行数学运算和单位转换。

```javascript
/* 方法三：使用JavaScript获取屏幕高度 */
var screenHeight = window.innerHeight;
document.querySelector('.full-screen').style.height = `${screenHeight}px`;
```

需要注意的是，vh单位和calc()函数都有兼容性问题，不同浏览器的支持程度也不同。所以在实际开发中，我们可能需要使用JavaScript来获取屏幕高度，然后通过CSS动态设置元素高度。

上面的代码使用了JavaScript中的innerHeight属性来获取屏幕高度，并将其转换为像素值，然后通过querySelector方法来获取需要设置的元素，最后将高度值用字符串模板填入style中。

## 20、el-tree数据回显以及回显后的节点置灰（不可操作）

```javascript
        <el-tree
            :data="treeData"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expand-all
        ></el-tree>
		// 获取已绑定部门
        getBindDept() {
            const param = {
                projectId: this.projectId
            }
            bindDept(param).then(response => {
                const bindIds = []
                response.data.data.forEach(item => {
                    bindIds.push(item.deptId)
                })
                const treeRef = this.$refs.tree
                // 回显已绑定的部门数据
                treeRef.setCheckedKeys(bindIds)
                if (treeRef) {
                    const treeStore = treeRef.store || {}
                    const treeNodesMap = treeStore.nodesMap || {} //tree node集合
                    Object.keys(treeNodesMap).forEach(key => {
                        const item = treeNodesMap[key] || {}
                        // 判断已勾选的节点不可操作
                        if (bindIds.includes(Number(item.key))) {
                            // 更新未勾选的复选框的禁选状态
                            const data = item.data || {}
                            data.disabled = true
                            treeRef.setCurrentNode(data)
                        }
                    })
                }
            })
        },
```

效果图：![](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/1700632801369.6s4pt0ik7bo0.webp)

## 21、el-table点击某一行的任意位置就勾选上

```vue
<!-- signType判断单选还是多选（1.单选，2.多选）,单选conceal-btn去除左上角的全选按钮 -->
<el-table 
    :class="signType=== '1'?'conceal-btn':''" 
    :data="userList" 
    @selection-change="handleSelectionChange" 
    @row-click="clickRow"
    ref="multipleTable"  
    stripe 
    :header-cell-style="{ background: '#FAFAFA'}">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
</el-table>
<script>
export default {
    props: {
        signType: {
          type: String,
          required: false
        }
    },
    data(){
        return {
            selectList:[],
        }
    },
    methods:{
        handleSelectionChange(val) {
            this.selectList = val
            if (val.length > 1 && this.signType === '1') {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            }
        },
        // 点击一行时选中
        clickRow(row){
           if(this.signType === '1'){
              // 单选选中行
              if (this.selectList[0] == row) {
                // 取消
                this.selectList = [];
                this.$refs.multipleTable.clearSelection();
              } else {
                // 选择
                this.selectList = [row];
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row, true);
            }
         }else{
             // 多选选中行
             // 根据id判断当前点击的是否被选中
             const selected = this.selectList.some(item => item.id === row.id)
             if (!selected) {
                // 选择
                this.selectList.push(row)
                this.$refs.multipleTable.toggleRowSelection(row, true);
             } else {
                // 取消
                var finalArr = this.selectList.filter((item) => {
                  return item.id !== row.id
                })
                // 取消后剩余选中的
                this.selectList = finalArr  
                this.$refs.multipleTable.toggleRowSelection(row, false);
             }
          }
        },
    }
}
</script>
<style>
// 将全选项隐藏
.conceal-btn thead .el-table-column--selection .cell {
    display: none;
}
</style>
```

## 22、vue展开收起元素，有过渡效果

> 问题：解决dom元素展开时出现闪动的问题

![](https://raw.githubusercontent.com/Sherlock-Homles/gallery/main/image.6ete1ss3lrc.webp)

新建``collapseTransition.js``

```javascript
const elTransition = '1s height ease-in-out, 1s padding-top ease-in-out, 1s padding-bottom ease-in-out';
const Transition = {
    'before-enter'(el) {
        el.style.transition = elTransition;
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
    },
    enter(el) {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }
        el.style.overflow = 'hidden';
    },
    'after-enter'(el) {
        el.style.transition = '';
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
    },
    'before-leave'(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
 
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
    },
    leave(el) {
        if (el.scrollHeight !== 0) {
            el.style.transition = elTransition;
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }
    },
    'after-leave'(el) {
        el.style.transition = '';
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
};
export default {
    name: 'collapseTransition',
    functional: true,
    render(h, {children}) {
        const data = {
            on: Transition
        };
        return h('transition', data, children);
    }
};
```

在使用的页面内引用

```javascript
import collapseTransition from '../collapseTransition.js';
```

页面中使用，通过修改topShow的true和false来达到效果

```vue
<collapseTransition> 
    <div v-show="topShow"> 
    </div> 
</collapseTransition> 
```

