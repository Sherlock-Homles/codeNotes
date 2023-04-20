## 1、基础

### 1.1、实例生命周期钩子

> 简单理解，生命周期钩子函数就是vue实例在某一个时间点会自动执行的函数。
>
> ```vue
> <div id="app">{{msg}}</div>
> 
> <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
> <script>
>   var vm = new Vue({
>     el: '#app',
>     data: {
>       msg: 'Vue的生命周期'
>     },
>     beforeCreate: function() {
>       console.group('------beforeCreate创建前状态------');
>       console.log("el     : " + this.$el); //undefined
>       console.log("data   : " + this.$data); //undefined
>       console.log("msg: " + this.msg) //undefined
>     },
>     created: function() {
>       console.group('------created创建完毕状态------');
>       console.log("el     : " + this.$el); //undefined
>       console.log("data   : " + this.$data); //已被初始化
>       console.log("msg: " + this.msg); //已被初始化
>     },
>     beforeMount: function() {
>       console.group('------beforeMount挂载前状态------');
>       console.log(this.$el);// <div id="app">{{msg}}</div> 挂载前状态
>     },
>     mounted: function() {
>       console.group('------mounted 挂载结束状态------');
>       console.log(this.$el);// <div id="app">Vue的生命周期</div>   msg内容被挂载并渲染到页面
>     },
>       // 当data被修改之前
>     beforeUpdate: function () {
>       console.group('beforeUpdate 更新前状态===============》');
>       console.log("el     : " + this.$el);
>       console.log(this.$el);
>       console.log("data   : " + this.$data);
>       console.log("msg: " + this.msg);
>     },
>       // 触发beforeUpdate之后，虚拟DOM重新渲染并应用更新
>       // 当data被修改之后
>     updated: function () {
>       console.group('updated 更新完成状态===============》');
>       console.log("el     : " + this.$el);
>       console.log(this.$el);
>       console.log("data   : " + this.$data);
>       console.log("msg: " + this.msg);
>     },
>       // 调用vm.$destroy() 销毁前
>     beforeDestroy: function () {
>       console.group('beforeDestroy 销毁前状态===============》');
>       console.log("el     : " + this.$el);
>       console.log(this.$el);
>       console.log("data   : " + this.$data);
>       console.log("msg: " + this.msg);
>     },
>        // 调用vm.$destroy() 销毁后
>     destroyed: function () {
>       console.group('destroyed 销毁完成状态===============》');
>       console.log("el     : " + this.$el);
>       console.log(this.$el);
>       console.log("data   : " + this.$data);
>       console.log("msg: " + this.msg)
>     }
>   })
> </script>
> ```

### 1.2、计算属性 vs 方法 vs 侦听属性

> 如果一个功能同时可以使用计算属性(computed)、方法(methods)、侦听属性(watch)来实现的时候推荐使用计算属性。
>
> | 计算属性                                 | 方法                                               | 侦听属性                                     |
> | ---------------------------------------- | -------------------------------------------------- | -------------------------------------------- |
> | 计算属性是基于它们的响应式依赖进行缓存的 | 每当触发重新渲染时，调用方法将**总会**再次执行函数 | 有缓存，但相比计算属性，实现起来要复杂很多。 |

### 1.3、列表渲染之数组、对象更新检测

>## 数组更新检测
>
>#### 变异方法 (mutation method)
>
>Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
>
>- `push()`末尾添加
>- `pop()`末尾删除
>- `shift()` 首位删除
>- `unshift() ` 首位添加
>- `splice()` 拼合
>- `sort()` 排序
>- `reverse()` 反转
>
>#### 替换数组
>
>变异方法，顾名思义，会改变调用了这些方法的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如 `filter()`、`concat()` 和 `slice()` 。它们不会改变原始数组，而**总是返回一个新数组**。当使用非变异方法时，可以用新数组替换旧数组：
>
>```javascript
>example1.items = example1.items.filter(function (item) {
>  return item.message.match(/Foo/)
>})
>```
>
>你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。
>
>#### 注意事项
>
>**由于 JavaScript 的限制，Vue 不能检测以下数组的变动**
>
>1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
>2. 当你修改数组的长度时，例如：`vm.items.length = newLength`
>
>为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：
>
>```javascript
>// Vue.set
>Vue.set(vm.items, indexOfItem, newValue)
>// Array.prototype.splice
>vm.items.splice(indexOfItem, 1, newValue)
>```
>
>你也可以使用 [`vm.$set`](https://cn.vuejs.org/v2/api/#vm-set) 实例方法，该方法是全局方法 `Vue.set` 的一个别名：
>
>```javascript
>vm.$set(vm.items, indexOfItem, newValue)
>```
>
>为了解决第二类问题，你可以使用 `splice`：
>
>```javascript
>vm.items.splice(newLength)
>```
>
>## 对象变更检测注意事项
>
>> 列表循环对象示例
>>
>> ```vue
>> <div v-for="(item, key, index) in obj">
>> </div>
>> ```
>
>还是由于 JavaScript 的限制，**Vue 不能检测对象属性的添加或删除**：
>
>```javascript
>var vm = new Vue({
>  data: {
>    a: 1
>  }
>})
>// `vm.a` 现在是响应式的
>vm.b = 2
>// `vm.b` 不是响应式的
>```
>
>对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。
>
>但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性。例如，对于：
>
>```javascript
>var vm = new Vue({
>  data: {
>    userProfile: {
>      name: 'Anika'
>    }
>  }
>})
>```
>
>你可以添加一个新的 `age` 属性到嵌套的 `userProfile` 对象：
>
>```javascript
>Vue.set(vm.userProfile, 'age', 27)
>```
>
>你还可以使用 `vm.$set` 实例方法，它只是全局 `Vue.set` 的别名：
>
>```javascript
>vm.$set(vm.userProfile, 'age', 27)
>```
>
>有时你可能需要为已有对象赋值多个新属性，比如使用 `Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：
>
>```javascript
>Object.assign(vm.userProfile, {
>  age: 27,
>  favoriteColor: 'Vue Green'
>})
>```
>
>你应该这样做：
>
>```javascript
>vm.userProfile = Object.assign({}, vm.userProfile, {
>  age: 27,
>  favoriteColor: 'Vue Green'
>})
>```
>
>## 总结
>
>一、使数组更新具有响应式可使用的办法：
>
>1. 使用变异方法 （push、pop、unshift、shift、splice、sort、reverse）
>2. 替换数组引用 （对不改变原数组的方法可使用替换数组）
>3. 使用Vue.set()方法
>
>二、使对象属性的添加或删除具有响应式可使用的办法：
>
>1. 替换对象引用
>2. 使用Vue.set()方法
>
>三、Vue.set() 语法：
>
>```
>// 向数组更新数据
>Vue.set(vm.items, indexOfItem, newValue)
>即 Vue.set(原数组, 索引, 新数据)
>
>// 向对象更新数据
>Vue.set(object, propertyName, value)
>即 Vue.set(原对象, 属性名, 值)
>```
>
>vm.$set() 实例方法是 Vue.set() 全局方法的别名

## 2、组件

### 2.1、动态组件

> ```vue
> <div id="root">
> 	<component :is="type"></component> <!--其效果如同下面两行被注释的代码-->
> 	<!-- <child-one v-if="type === 'child-one'"></child-one>
> 	    <child-two v-if="type === 'child-two'"></child-two> -->
> 	<button @click="handleClick">change</button>
> </div>
> <script type="text/javascript">
>  Vue.component('child-one', {
>      template: '<div>child-one</div>'
>  })
>  Vue.component('child-two', {
>      template: '<div>child-two</div>'
>  })
> 
>  var vm = new Vue({
>      el: '#root',
>      data: {
>          type: 'child-one'
>      },
>      methods: {
>          handleClick() {
>              this.type = this.type === 'child-one' ? 'child-two' : 'child-one'
>          }
>      }
>  })
> </script>
> ```
> 
>上面代码中，点击按钮在两个组件间切换，可使用`<component>`标签并绑定`:is`为动态组件名。

### 2.2、v-once 指令

> 只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
>
> ```vue
> <!-- 单个元素 -->
> <span v-once>This will never change: {{msg}}</span>
> <!-- 有子元素 -->
> <div v-once>
>   <h1>comment</h1>
>   <p>{{msg}}</p>
> </div>
> <!-- 组件 -->
> <my-component v-once :comment="msg"></my-component>
> <!-- `v-for` 指令-->
> <ul>
>   <li v-for="i in list" v-once>{{i}}</li>
> </ul>
> ```

### 2.3、vue父子组件的生命周期顺序

> #### 加载渲染过程
>
> ```
> 父beforeCreate -> 父created-> 父beforeMount-> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
> ```
>
> 父组件会先执行到beforeMount，接着会执行子组件钩子到挂载结束，再挂载父组件。
>
> #### 子组件更新过程
>
> ```
> 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
> ```
>
> #### 父组件更新过程
>
> ```
> 父beforeUpdate -> 父updated
> ```
>
> #### 销毁过程
>
> ```
> 父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed
> ```

### 2.4、Prop 验证

> 子组件对父组件传递来的参数进行校验
>
> ```javascript
> Vue.component('my-component', {
>   props: {
>     // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
>     propA: Number,
>     // 多个可能的类型
>     propB: [String, Number],
>     // 必填的字符串
>     propC: {
>       type: String,
>       required: true
>     },
>     // 带有默认值的数字
>     propD: {
>       type: Number,
>       default: 100
>     },
>     // 带有默认值的对象
>     propE: {
>       type: Object,
>       // 对象或数组默认值必须从一个工厂函数获取
>       default: function () {
>         return { message: 'hello' }
>       }
>     },
>     // 自定义验证函数
>     propF: {
>       validator: function (value) {
>         // 这个值必须匹配下列字符串中的一个
>         return ['success', 'warning', 'danger'].indexOf(value) !== -1
>       }
>     }
>   }
> })
> ```

### 2.5、父组件调用子组件方法并传入值

> 通过`ref`引用调用子组件内的方法并传入参数
>
> 父组件：
>
> ```javascript
> <子组件标签  ref="refName"></子组件标签>
> methods: {
>     fnX(x) {
>       this.$refs.refName.fnY(x) // 调用子组件方法并传入值
>     }
> }
> ```
>
> 子组件：
>
> ```javascript
> methods: {
>     fnY(x) {
>       this.x = x
>     }
>   }
> }
> ```

## 3、Vuex

### 3.1、vuex操作相关

> ```javascript
> import { mapActions, mapMutations, mapGetters } from 'vuex'
> 
> computed: {
>     ...mapGetters([ // 获取数据，内部为数组
>         'searchHistory' // 相当于在data插入searchHistory和获取到的数据
>     ])
> },
> 
> methods: {
> 	某方法(){
> 	  this.saveSearchHistory(传入值)
> 	},
> 	...mapActions([ // 提交actions修改数据，内部为数组 因为actions文件已对方法进行了封装所有是数组类型
>       'saveSearchHistory' // 相当于在methods绑定了事件saveSearchHistory
>     ]),
> 
> 	某方法() {
> 		this.setFullScreen(传入值)
> 	},
> 	 ...mapMutations({ // 提交mutations，内部为对象
>       setFullScreen: 'SET_FULL_SCREEN' // 相当于在methods绑定了事件setFullScreen
>     })
> }
> 
> ```

## 4、路由

### 4.1、路由懒加载

> ```javascript
> // 路由同步加载
> // import Recommend from '@/components/recommend/recommend'
> // import Singer from '@/components/singer/singer'
> // import Rank from '@/components/rank/rank'
> // import Search from '@/components/search/search'
> // import SingerDetail from '@/components/singer-detail/singer-detail'
> // import Disc from '@/components/disc/disc'
> // import TopList from '@/components/top-list/top-list'
> // import UserCenter from '@/components/user-center/user-center'
> 
> Vue.use(Router)
> 
> // 路由懒加载
> const Recommend = () => import('@/components/recommend/recommend')
> const Singer = () => import('@/components/singer/singer')
> const Rank = () => import('@/components/rank/rank')
> const Search = () => import('@/components/search/search')
> const SingerDetail = () => import('@/components/singer-detail/singer-detail')
> const Disc = () => import('@/components/disc/disc')
> const TopList = () => import('@/components/top-list/top-list')
> const UserCenter = () => import('@/components/user-center/user-center')
> ```

## 5、其他

### 5.1、Vue中的防抖函数封装和使用

> 如搜索框中，每改变一个数值就请求一次搜索接口，当快速的改变数值时并不需要多次请求接口，这就需要一个防抖函数：
>
> ```javascript
> // 防抖函数
> export function debounce(func, delay) { // func 函数 delay间隔时间
>   let timer
>   return function (...args) {
>     if (timer) {
>       clearTimeout(timer)
>     }
>     timer = setTimeout(() => {
>       func.apply(this, args)
>     }, delay)
>   }
> }
> 
> //使用：
> import { debounce } from '@/common/js/util'
> 
> created() {
>     /**
>      * 为什么不直接在watch里面写？？？
>      * 因为要做防抖处理，防止在快速输入时多次请求接口
>      */
>     this.$watch('query', debounce((newQuery) => {
>       this.$emit('query', newQuery)
>     }, 200))
>   }
> ```