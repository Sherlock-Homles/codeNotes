## 1、实例生命周期钩子

简单理解，生命周期钩子函数就是vue实例在某一个时间点会自动执行的函数。

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