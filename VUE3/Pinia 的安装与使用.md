[Pinia](https://so.csdn.net/so/search?q=Pinia&spm=1001.2101.3001.7020) 是 Vue.js 3 的状态管理库，使用起来非常简单和直观

## Pinia 的优点大致如下

**TypeScript 支持**：Pinia 使用 [TypeScript](https://so.csdn.net/so/search?q=TypeScript&spm=1001.2101.3001.7020) 编写，并提供完整的类型支持，这使得编写类型安全的代码变得更加容易和直观。
**简单易用**：Pinia 的设计非常简单，只有一个 Store 的概念，使用起来比 Vuex 更加容易。
**更好的性能**：Pinia 使用 Vue 3 的新特性，如[响应式](https://so.csdn.net/so/search?q=响应式&spm=1001.2101.3001.7020) API 和新的组件实例化方式，这使得它的性能比 Vuex 更高。
**模块化**：Pinia 的模块化设计非常好，可以轻松地将功能模块拆分成独立的 Store 实例。
**更好的测试支持**：Pinia 对测试有很好的支持，可以轻松地编写测试代码，并且不需要太多的 mock 代码。

## 1、安装使用 Pinia

### 1.1 使用 npm 或 yarn 安装 Pinia：

```json
npm install pinia
# or with yarn 
yarn add pinia
```

### 1.2 在入口文件 main.js 中注册 Pinia

```json
import { createPinia } from 'pinia'

app.use(createPinia())
```

### 1.3 在 src 目录下新建 store/index.js

```javascript
import { defineStore } from 'pinia'
// 第一个参数 storeId 是仓库的key 必须独一无二
export const useStore = defineStore('storeId', {
  state: () => {
    return {
      count: 0,
      name: "张三"
    }
  },
  getters:{},
  actions:{}
})
```

### 1.4 在组件中使用 Pinia 的 state 数据

```vue
<template>
	<div>
		<h1>组件</h1>
		{{ count }}
	</div>
</template>
 
<script setup>
	import { useStore } from '@/store/index'
	const store = useStore();
	const { name } = store;
</script>
```

### 1.5 组件修改 Pinia 中的数据

本身 pinia 可以直接修改 state 数据，无需像 vuex 一样通过 mutations 才可以修改，但是上面写的 const {name} = store; 这种解构是不可以的，所以要换解构的方式。

```vue
<template>
	<div>
		<h1>组件</h1>
		{{ count }}
	</div>
</template>
<script setup>
	import { storeToRefs } from 'pinia'
	import { useStore } from '@/store/index'
	const store = useStore();
	// 第一种、直接修改
	store.count++
	// 第二种、调用$patch方法修改
	countStore.$patch({
	  count: store.count+2
	})
	// 第三种
	// pinia提供了 一个 storeToRefs 方法 类似于 vue3中 toRefs 
	const { count }  = storeToRefs(store);
	count.value = 1000;
</script>
```

### 1.6 getters 的使用

getters 和 vuex 里的 getters 几乎类似，基于 已有的 state 进行计算得到新值，会基于依赖进行缓存，多次使用依赖不变 不会重新计算

```javascript
import { defineStore } from 'pinia'
// 第一个参数 storeId 是仓库的key 必须独一无二
export const useStore = defineStore('storeId', {
  state: () => {
    return {
      num: 10,
      name: "张三"
    }
  },
  getters:{
  	// 1 箭头函数写法 参数是state
    doubleNum: state => {
      return state.num * 2
    },
    // 2 对象方法写法
    tribleNum(state){
      return state.num*3
    }
   },
  actions:{}
})
```

组件中使用 getters

```
<template>
	<div>
		{{ doubleNum }}
		{{ tribleNum }}
		{{ tribleNum }}
		<h1>组件</h1>
		{{ num }}
	</div>
</template>
<script setup>
	import { storeToRefs } from 'pinia'
	import { useStore } from '../store/index'
	const store = useStore();
	//直接使用
	console.log(store.doubleNum )
	//解构
	const { num, doubleNum, tribleNum}  = storeToRefs(store);
</script>
```

### 1.7 actions 的使用

actions 就比较简单了，写入方法，比如我们可以让 state 中的某一个值 +=，而且传入参数

```javascript
import { defineStore } from 'pinia'
// 第一个参数 storeId 是仓库的key 必须独一无二
export const useStore = defineStore('storeId', {
  state: () => {
    return {
      num: 10,
      name: "张三"
    }
  },
  getters:{
  	// 1 箭头函数写法 参数是state
    doubleNum: state => {
      return state.num * 2
    },
    // 2 对象方法写法
    tribleNum(state){
      return state.num*3
    }
   },
  actions:{
	addNum(n) {
      // 直接通过this 千万不要写箭头函数
      this.num += n
    }
  }
})
```

组件中使用

```javascript
<script setup>
	import { storeToRefs } from 'pinia'
	import { useStore } from '../store/index'
	const store = useStore();
	//直接使用
	store.addNum(100)
</script>
```

## 2、Pinia 怎么分模块？

Pinia 不需要像 Vuex 一样使用 modules 分模块，Pinia 可在 store 目录中直接定义对应模块就可以了，简洁明了

### 2.1 目录结构

```json
store/user.ts //用户模块
store/shop.ts //商品模块
	...
```

### 2.2 store/user.ts

```javascript
import { defineStore } from 'pinia'
 
	export const user = defineStore({
	  id: 'user',
	  state:()=>{
	  	return {
	        userInfo:{
	            nickName:'admin'
	        },
	        token:'xdsrrd-fsdsdsd02d5sdsd-dsds'
	  	}
	  },
	  getters:{
	 
	  },
	  actions:{
	  	
	  }
	})
```

### 2.3 组件中使用

```vue
<template>
	<div>
		<h1>A组件</h1>
		{{ userInfo.nickName }}
	</div>
</template>
 
<script setup>
	import { storeToRefs } from 'pinia'
	// 模块一
	import { useStore } from '../store/index'
	const store = useStore();
	// 模块二
	import { user } from '../store/user'
	const store = user();
	// 使用语法同上
</script>
```

## 3、Pinia 持久化存储

### 3.1 安装插件

```json
npm i pinia-plugin-persist --save
```

### 3.2 在入口文件 main.js 中引入

```json
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; //pinia持久化
const pinia = createPinia();
pinia.use(piniaPluginPersist);
```

### 3.3 在 store 中使用

```javascript
export const useStore = defineStore("main", {
 	  state:()=>{
	  	return {
	  	}
	  },
	  getters:{
	 
	  },
	  actions:{
	  	
	  }
    //持久化
    persist: {
        enabled: true,
        // 自定义持久化参数
        strategies: [
            {
                // 自定义key,默认就是仓库的key
                key: "token",
                // 自定义存储方式，默认sessionStorage
                storage: localStorage,
                // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
                paths: ["token"],
            },
            {
                key: "menulist",
                storage: localStorage,
                paths: ["menulist"],
            },
        ],
    },
});
```