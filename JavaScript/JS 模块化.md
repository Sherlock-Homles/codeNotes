# ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABH1JREFUSA3tVl1oHFUUPmdmd2ltklqbpJDiNnXFmgbFktho7YMPNiJSSZM0+CAYSkUELVhM6YuwIPpgoOKDqOBDC0XE2CQoNtQXBUFTTcCi+Wlh1V2TQExsUzcltd3M9Tt3ZjZzZ2fT+OJTL8yeM+eee757fmeJbq//KQL8X3DUSFOcfr7cRsRtxNQMWueeVzOkaITIGqQHNg5y8+jNW9ldM7A6nTpAjuolUikAwq7CE3WcM2RRDz+XGVgN3FptU/aUSlvq9Pa3iZ1+sgAqJyyAFqkipd9dqiwHF3P65YycLWc/6sqGrvoEoIp6DOFaX5h6+dnfjkWprwqsPk0dUGq5vySwDImC10KxFHgGL1SWoc92O3eVht09qdXNH11I2SsTsJYqMWzihqGMi+A+Garf3BAuuLI5oGlULyNfyB/HYNujwktOfRrMr5t77NmevqaUopx0grnKAyvVpmwUDB4x6FPXuGvYLTDwWsejwgtgkYKPqRJg8SV6xaiZ3ZTppGneS4yfH5/66fZSDHv+QZci/+h5c5UHtpy67JUqGppM0sh0Nc1dW6/N1W5Yoqat8/TU/VnadmdeW2PLLSyh0cvxBs3KbqTmwYPpxN4do/mzE8nEpvX/UMu2Wbp74zUAK5q6WkHns7V0eWkdPbPzd3rxkTGybadYySumVzhcaJFbs5UrEkQ/+CK8gF5dnh/6ciIZ73gwQ927L1IitoxKLXYP3SjYdOrHHfTZhRRlFyrorafPk20B3HPD1y2G3qKZME5Jcf3t/HUC13/8tSd++vqFveMUTwAUxSUFI1QekR1+bIze3D9MF2aq6cPvG72CgnldWCFqyRw3lwH8ZMerjTD9ElRO7Gv44wNpC90aASqGfVlz/Rx17srQ57/UU26hkhQqUB7dBR71WmzQhHUnblGmVOEw0jhbV1n9OlXUDCIRGaNV5Jp43N516fN7JmnTHdfp7Hgy0luO4aMhtkLL8Bi3bUWYvzh5Mn1dTxrL6QmGuRhGL/TiTTxRoEdTszSaq9GR0NGA3KdkOz3hqSV3MIDhQ5IVX/Ivx3umBti2es2h4eZby7x8br1rkf7Mo90AqC8aQ3sJeNzqFRu+vSANAQe3PL7l0HGOAdwDCeZYvNKeoZp1Qfs6Aipndh86HmFRi0LAnEO47wsqM6cdfjh3jBPUzhZy7nvlUfFsamED1VQt6aISHVymXZ/B2aCtIG8AI8xfobj2d3en1wWVhOeHELKmLQ1s211s88comkv4UCwWyF787mJdYXtNfhKAXVqnKTq8QZvGAGGOfaTo5pGZ/PwbUCr5+DPr/1J92JNHr9aOl/F3iI5+O1nfybsGxoimvZ3ViWSluDITw3P37mypheDIPY0tw7+O/5ApbkYw+zpfaUVu32Pi98+defdUhEpZkRFq0aqyNh9FuL9hpYbEm6iwi0z2REd09ZmyENEbuhjDWzKvZXTqKYaBIr3tt5kuPtQBZFvEUwHt60vfCNu41XsksH9Ij1BMMz1Y0OOunHNShFIP5868g5zeXmuLwL9T4b6Q2+KejgAAAABJRU5ErkJggg==)[js 模块化](https://674948122.github.io/12.js%E6%A8%A1%E5%9D%97%E5%8C%96.html)

### 一、什么是模块化

在 js 刚刚出现的时候，是为了实现一些简单的功能，但随着浏览器的不断发展，js 越来越被重视起来，可以实现较为复杂的功能。这个时候开发者为了维护方便，会把不同功能的模块抽离出来写入单独的 js 文件，但是当项目更为复杂的时候，html 可能会引入很多个 js 文件，而这个时候就会出现命名冲突，污染作用域等一系列问题，这个时候模块化的概念及实现方法应运而生。

模块化开发是一种管理方式，一种生产方式，一种解决问题的方案。一个模块就是实现某个特定功能的文件，我们可以很方便的使用别人的代码，想要什么模块，就引入那个模块。但是模块开发要遵循一定的规范，后面就出现了我们所熟悉的 AMD 和 CMD 规范。

### 二、立即执行函数

在早期，使用立即执行函数实现模块化是最常见的手段，通过函数作用域解决了命名冲突、污染全局的问题，那么立即执行函数也是一种模块化的实现方式，但并非是一种解决方案。举个例子：

```javascript
;(function (a) {
  // 在这里面声明各种变量、函数都不会污染全局作用域
})(a)
```

### 三、AMD

AMD 即是“异步模块定义”，它采用异步方式加载模块，模块的加载不影响后面语句的运行，所有依赖整个模块的语句，都定义在一个回调函数中，等到加载完成后，整个回调函数才会运行。

在使用时，需引入 require.js，通过 require.js 实现 AMD 规范的模块化。

在 AMD 规范中，我们使用 define 定义模块，使用 require 加载模块。

#### 1、定义模块

```javascript
define(id?, dependencies?, factory);
```

- id 是定义的模块名，这个参数是可选的，如果没有定义该参数，模块名字应该默认为模块加载器请求的指定脚本的名字，如果有该参数，模块名必须是顶级的绝对的。
- dependencies 是定义的模块中所依赖的模块数组，依赖模块优先级执行，并且执行结果按照数组中的排序依次以参数的形式传入 factory。
- factory 是模块初始化要执行的函数或对象，只被执行依次，如果是对象，则为该模块的输出值。

下面来看一个例子：

```javascript
define('OrderModel', ['Header', 'Pay'], function (Header, Pay) {
  var OrderModel = function () {
    this.headerData = Header.getHeaderData()
    this.payData = Pay.getPayData()
  }
  return OrderModel
})
```

#### 2、加载模块

```javascript
require([module], callback)
```

require 要传入两个参数，第一个是[module]，是一个数组，就是要加载的模块，第二个 callback 是加载成功之后的回调函数。

下面举个例子：

```javascript
// 在定义模块中已经定义过OrderModel模块了，下面只需要加载并使用它
require(['OrderModel'], function (OrderModel) {
  console.log(OrderModel.headerData)
  console.log(OrderModel.payData)
})
```

### 四、CMD

CMD 即是“通用模块定义”，CMD 规范是国内发展出来的，CMD 和 AMD 都是要解决同一个问题，只不过两者在模块定义方式和模块加载时机上有所不同罢了。

在使用时，需引入 sea.js，通过 sea.js 实现 CMD 规范的模块化：

1. 使用 define()定义模块，使用 require()加载模块;
2. 使用 seajs.use 加载使用模块。

#### 1、定义模块

在 CMD 中一个模块就是一个文件，通过 define()进行定义。

define 接收 factory 参数，它可以使一个函数，也可以是一个对象一个字符串。

- 当 factory 是一个对象或者一个字符串时，表示该模块的接口就是这个对象或者字符串。
- 当 factory 是一个函数时，表示是该模块的构造方法。执行该构造方法，可以得到模块向外提供的接口，factory 在执行时，默认传入三个参数：require、exports、module。
- 其中 require 用来加载其它模块。exports 用来实现向外提供的模块接口。
- module 是一个对象，存储着与当前模块相关联的一些属性和方法，传给 factory 构造方法的 exports 是 module.exports 对象的一个引用，至通过 exports 参数来提供对外的接口，有时无法满足所有需求，比如当模块的接口是某个类的实例时，这个时候就需要通过 module.exports 来实现。

下面举个例子：

```javascript
// 定义模块OrderModel.js
define(function (require, exports, module) {
  var Header = require('./Header') // require用来加载其它模块
  exports.headerData = Header.getHeaderData() // 对外提供headerData属性
  // exports是module.exports的一个引用
  console.log(exports === modele.exports) // true

  var Pay = require('./Pay') // 依赖可以就近加载
  exports.payData = Pay.getPayData() // 对外提供payData属性
  exports.payFun = function () {
    console.log('payFun log something')
  } // 对外提供payFun方法
})
```

#### 2、加载模块

通过 SeaJs 的 use 方法我们可以加载模块

举个例子：

```javascript
// 上面我们已经定义了OrderModel模块了，直接加载即可
seajs.use(['OrderModel.js'], function (orderModel) {
  var headerData = orderModel.headerData
  var payData = orderModel.payData
  orderModel.payFun() // 可以直接使用，输出 payFun log something
})
```

#### 3、AMD 与 CMD 的不同

- 对于依赖模块，AMD 是提前执行，CMD 是延迟执行
- 对于依赖模块，AMD 是依赖前置，CMD 是依赖就近

### 五、UMD

UMD（Universal Module Definition）通用模块定义，为了兼容 AMD、CMD 和无模块化开发规范。

1. UMD 是 AMD 和 CommonJS 的糅合。 AMD 模块以浏览器第一的原则发展，异步加载模块。
2. CommonJS 模块以服务器第一原则发展，选择同步加载。它的模块无需包装(unwrapped modules)。 这迫使人们又想出另一个更通用的模式 UMD（Universal Module Definition)，实现跨平台的解决方案。
3. UMD 先判断是否支持 Node.js 的模块（exports）是否存在，存在则使用 Node.js 模块模式。再判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块。

```javascript
/**
 * UMD-Universal Module Definition 通用模块定义
 * */
;(function (root, factory) {
  // 判断是否是AMD/CMD
  if (typeof define === 'function') {
    define([], factory)
  } else if (typeof exports === 'object') {
    // Node CommonJS规范
    module.exports = factory()
  } else {
    // 浏览器环境
    root.someAttr = factory
  }
})(this, function () {
  let add = function (a, b) {
    return a + b
  }
  return {
    add,
    module: 'UMD',
  }
})
```

### 六、CommonJS

CommonJS 规范主要应用于 Node，每个文件就是一个模块，有自己的作用域，即在一个文件中定义的变量、函数、类都是私有的，对其他文件不可见。

#### 1、定义模块

（上面说了每个文件就是一个模块，所以不存在定义的概念，只是为了承接上下文，更好理解罢了，文章后面不再说明。）

CommonJs 规范规定，每个模块内部有两个变量可以使用：require 和 module。

- require 用来加载某个需要的模块。
- module 代表的是当前模块，是一个对象，存储着当前模块的相关联的属性和方法。exports 是 module 上的一个属性。该属性表示当前模块对外输出的接口，其它文件加载该模块，实际上就是读取 module.exports 变量。（在实际开发中如果区分不了 exports 和 module.exports 的话，那就直接使用 module.exports 即可，那个 exports 就别管、别用了。）

举个例子：

```javascript
// orderModel.js
var Header = require('./Header') // require用来加载其它模块
var Pay = require('./Pay')

var payFun = function () {
  console.log('payFun log something')
}

module.exports = {
  // 对外提供以下三个属性
  headerData: Header.getHeaderData(),
  payData: Pay.getPayData(),
  payFun: payFun,
}
```

#### 2、加载模块

其实在上面的代码中，即 orderModel.js 中已经写出了加载模块的方法了。

下面是加载并使用 orderModel.js 的例子：

```javascript
var orderModel = require('./orderModel')

var headerData = orderModel.headerData
var payData = orderModel.payData
orderModel.payFun() // 输出 payFun log something
```

需要注意的是，CommonJS 规范规定，模块可以多次加载，但是只会在第一次加载时运行一次，运行结果就会被缓存下来，以后再加载就直接读取缓存结果，如果想让模块再次运行，必须清除缓存。

举个例子：

```javascript
require('./orderModel')
require('./orderModel').message = 'hello world'
require('./orderModel').message
// hello world
```

清除缓存例子：

```javascript
// 删除指定模块的缓存，这里删除orderModel.js，也可以写多个进行批量删除。
delete require.cache[require.resolve('./orderModel')]

// 删除所有模块的缓存，大范围攻击
Object.keys(require.cache).forEach(function (key) {
  delete require.cache[key]
})
```

### 七、ES Module

在 ES6 没出来之前，模块加载方案主要使用 CommonJS 和 AMD 两种，前者用于服务器，后者用于浏览器。ES6 在语言标准层面上实现了模块功能，而且使用起来相当简单。

#### 1、定义模块

模块功能主要由两个命令构成：export 和 import，export 命令用于规定模块的对外接口，import 用于引入其它模块提供的功能。

一般来说，一个模块对应的就是一个文件，该文件内部的变量外部无法获取，如果你希望外部能够读取到某个变量，就需要使用 export 关键字输出该变量。

举个例子：

```javascript
// user.js
let name = '张三'
let age = 20

const getSex = (s) => {
  return s === 1 ? '男' : '女'
}
// 通用写法，如果不想了解，就这样写就完事了
export { name, age, getSex }
```

#### 2、加载模块

上面已经使用 export 命令定义了模块对外的接口后，其它的 JS 文件就可以通过 import 命令加载这个模块。

举个例子：

```javascript
// main.js
import { name, age, getSex } from './user'

console.log(name) // 张三
console.log(age) // 20
console.log(getSex(1)) // 男
```

import 接受一对大括号，里面指定的是要从其它模块导入的变量名。大括号内的变量名，必须与导入模块对外接口的名称相同。

我们经常需要对加载模块进行重命名，如下写法：

```javascript
// main.js
import { name as otherName } from './user' // 使用as进行重命名
console.log(otherName) // 张三
```

我们也经常使用到对模块的整体加载，如下写法：

```javascript
// main.js
import * as user from './user' // 使用 * 号指定一个对象，所有输出值都加载在这个对象上面

console.log(user.name) // 张三
console.log(user.age) // 20
console.log(user.getSex(1)) // 男

// 需要注意的是 user是静态分析的，不允许运行时改变
// 下面的写法是不允许的
user.height = 180
user.setOld = function () {}
```

#### 3、和 CommonJS 的区别

1. ES Module 不支持动态导入，但已提案，指日可待。
2. ES Module 是异步导入，因为用于浏览器，需要下载文件，如果采用同步导入对渲染有很大影响。CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡主主线程影响也不大。
3. ES Module 导出的是值的引用，导入导出值都指向同一个内存地址，所以导入值会跟随导出值变化。而 CommonJS 在导出时都是值的拷贝，就算导出的值变了，导入的值也不会改变，所以想要更新值，必须重新导入一次。

### 八、总结

- AMD/CMD/CommonJs 是 js 模块化开发的规范，对应的实现是 require.js/sea.js/Node.js。
- CommonJs 主要针对服务端，AMD/CMD/ES Module 主要针对浏览器端，容易混淆的是 AMD/CMD。（顺便提一下，针对服务器端和针对浏览器端有什么本质的区别呢？服务器端一般采用同步加载文件，也就是说需要某个模块，服务器端便停下来，等待它加载再执行。这里如果有其他后端语言，如 java。而浏览器端要保证效率，需要采用异步加载，这就需要一个预处理，提前将所需要的模块文件并行加载好。）
- AMD/CMD 区别，虽然都是并行加载 js 文件，但还是有所区别，AMD 是预加载，在并行加载 js 文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；而 CMD 是懒加载，虽然会一开始就并行加载 js 文件，但是不会执行，而是在需要的时候才执行。
- AMD/CMD 的优缺点.一个的优点就是另一个的缺点， 可以对照浏览。
- AMD 优点：加载快速，尤其遇到多个大文件，因为并行解析，所以同一时间可以解析多个文件。
- AMD 缺点：并行加载，异步处理，加载顺序不一定，可能会造成一些困扰，甚至为程序埋下大坑。
- CMD 优点：因为只有在使用的时候才会解析执行 js 文件，因此，每个 JS 文件的执行顺序在代码中是有体现的，是可控的。
- CMD 缺点：执行等待时间会叠加。因为每个文件执行时是同步执行（串行执行），因此时间是所有文件解析执行时间之和，尤其在文件较多较大时，这种缺点尤为明显。（PS：重新看这篇文章，发现这里写的不是很准确。确切来说，JS 是单线程，所有 JS 文件执行时间叠加在 AMD 和 CMD 中是一样的。但是 CMD 是使用时执行，没法利用空闲时间，而 AMD 是文件加载好就执行，往往可以利用一些空闲时间。这么来看，CMD 比 AMD 的优点还是很明显的，毕竟 AMD 加载好的时候也未必就是 JS 引擎的空闲时间！）
- 如何使用？CommonJs 的话，因为 NodeJS 就是它的实现，所以使用 node 就行，也不用引入其他包。AMD 则是通过 `<script>`标签引入 require.js，CMD 则是引入 sea.js。
- UMD 通用模块定义，为了兼容 AMD、CMD 和无模块化开发规范。
- CommonJS 和 ES Module 区别：CommonJS 模块输出的。是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块输出的是值的拷贝（类比于基本类型和引用类型的赋值操作）。对于基本类型，一旦输出，模块内部的变化影响不到这个值。对于引用类型，效果同引用类型的赋值操作。
- ES6 模块是动态关联模块中的值，输出的是值得引用。原始值变了，import 加载的值也会跟着变。
- ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析时，遇到模块加载命令 import，就会生成一个只读引用。 等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
- ES6 模块中，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值
