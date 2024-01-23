### 一、生命周期概念

> 通俗地讲，生命周期即Vue实例或组件从创建到被消灭的一系列过程，中间的各个节点被称为钩子. vue.js中created方法是一个生命周期钩子函数，一个vue实例被生成后会调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要进行编译，然后再插入到document中。每一个阶段都会有一个钩子函数，方便开发者在不同阶段处理不同逻辑。 一般可以在created函数中调用ajax获取页面初始化所需的数据。

![img](https://img-blog.csdnimg.cn/57bc94823d6d4895aa26837d4a0ede89.png)



### 二、浏览器渲染过程

要深刻理解生命周期的各个节点，就必须了解浏览器的渲染过程

- 构建 DOM 树
- 构建 css 规则树, 根据执行顺序解析 js 文件。
- 构建渲染树 Render Tree
- 渲染树布局 layout
- 渲染树绘制

### 三、生命周期中的浏览器渲染

- **created：已创建，在模板渲染成`html`前调用，即通常初始化某些属性值，然后再渲染成视图。**

- **mounted：已挂载，在模板渲染成`html`后调用，通常是初始化页面完成后，再对`html`的`dom`节点进行一些操作。**

- ```
  通常created使用的次数多，而mounted是在一些插件或组件的使用中进行操作，比如插件chart.js的使用: var ctx = document.getElementById(ID);通常会有这一步，而如果你写入组件中，你会发现在created中无法对chart进行一些初始化配置，一定要等这个html渲染完后才可以进行，那么mounted就是不二之选。
  ```

| **生命周期** | **是否获取 dom 节点** | **是否获取 data** | **是否获取 methods** |
| ------------ | --------------------- | ----------------- | -------------------- |
| beforeCreate | 否                    | 否                | 否                   |
| created      | 否                    | 是                | 是                   |
| beforeMount  | 否                    | 是                | 是                   |
| mounted      | 是                    | 是                | 是                   |

#### beforeCreate 阶段

对浏览器来说，整个渲染流程尚未开始或者说准备开始，对 vue 来说，实例尚未被初始化，data [observer](https://so.csdn.net/so/search?q=observer&spm=1001.2101.3001.7020) 和 event/watcher 也还未被调用，在此阶段，对 data、methods 或文档节点的调用现在无法得到正确的数据。

#### created 阶段

对浏览器来说，渲染整个 HTML 文档时, dom 节点、css 规则树与 js 文件被解析后，但是没有进入被浏览器 render 过程，上述资源是尚未挂载在页面上，也就是在 [vue 生命周期](https://so.csdn.net/so/search?q=vue生命周期&spm=1001.2101.3001.7020)中对应的 created 阶段，实例已经被初始化，但是还没有挂载至 $el 上，所以我们无法获取到对应的节点，但是此时我们是可以获取到 vue 中 data 与 methods 中的数据的

#### beforeMount 阶段

实际上与 created 阶段类似，节点尚未挂载，但是依旧可以获取到 data 与 methods 中的数据。

####  mounted 阶段

对浏览器来说，已经完成了 dom 与 css 规则树的 render，并完成对 render tree 进行了布局，而浏览器收到这一指令，调用渲染器的 paint（）在屏幕上显示，而对于 vue 来说，在 mounted 阶段，vue 的 template 成功挂载在 $el 中，此时一个完整的页面已经能够显示在浏览器中，所以在这个阶段，即可以调用节点了（关于这一点，在笔者测试中，在 mounted 方法中打断点然后 run，依旧能够在浏览器中看到整体的页面）。

### 四、使用场景

通过浏览器的渲染过程，可以总结出 created 和 mounted 的使用场景

**created：通常用于初始化某些属性值，例如 data 中的数据，然后再渲染成视图。
  mounted：通常在初始化页面完成后，对 html 的 dom 节点进行需要的操作。**

因此，在 created 中，是无法进行 DOM 操作的，而 mounted 可以获取渲染出来的所有属性值。

### 五、常见相关问题

#### 一些页面跳转后, 一些基础数据接口没有重新请求

```javascript
// 举个简单的例子  
created(){ 	
    this.init();  
},   
mounted() {    
    this.init();  
},  
methods: {    
    init() {        
        this.getList();        
        this.getdetailById();        
        this.getFicts();      
    }    
}
```