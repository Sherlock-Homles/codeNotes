### 1、vue路由的两种模式：hash与history的区别

> 前言：众所周知，vue-router有两种模式，hash模式和history模式，下面来看看两者的区别。
>
> 一、基本情况
>        直观区别：hash模式url带#号，history模式不带#号。
>
>       1.hash模式
>          hash就是指url尾巴后的#号以及后面的字符。这里的#和css里的#是一个意思。hash也被称为锚点，本身是用来做页面定位的，它可以是对应的id元素显示在可视区域内。
>     
>         由于hash值变化不会导致游览器向服务器发出请求，而且hash改变会触发hashchange事件，hashChange事件中获取当前的hash值，并根据hash值来修改页面内容，则达到了前端路由的目的。游览器的进后退也能对其进行控制，所以人们在html5的history出现前，基本都是使用h ash来实现前端路由的。
>     
>        hash模式背后的原理是onhashchange事件，可以在window对象上监听这个事件：
>
> window.onhashchange = function(event){// 点击游览器前进后退按钮时会触发
>     console.log(event.oldURL,event.newURL);
>     let hash = location.hash.slice(1);
>     document.body.style.color = hash;
> }
>      因为hash发生变化的url都会被游览器记录下来，所以你发现游览器的前进后退都可以用了。这样一来，尽管游览器没有请求服务器，但是页面状态和url一一关联起来。
>
>     2.history模式
>      已经有hash模式了，而且hash能兼容到IE8，history只能兼容到IE10，为什么还要搞个history呢？
>     
>      首先，hash本来是拿来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了。其次，hash的传参是基于url的，如果要传递复杂的数据，会有体积的限制，而history模式不仅可以在url里放参数，还可以将数据存放在一个特定的对象中。
>     
>     随着history api的到来，前端路由开始进化，前面的hashchange，你只能改变#后面的url片段，而history api则给了前端完全的自由。
>     
>     history的api
>
> window.history.pushState(state,title,url)
> // state:需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
> // title:标题，基本没用，一般穿null
> // url:设定新的历史记录的url。新的url与当前的origin必须是一样的，否则会抛出错误。
> // url可以是绝对路径，也可以是相对路径。
> // 如当前url是https://www.baidu.com/a/,执行history.pushState(null,null,'./qq/'),
> // 则变成 https://www.baidu.com/a/qq/,
> // 则变成 https://wwww.baidu.com/a/qq/,
> // 执行history.pushState(null,null,'/qq/'),则变成https://www.baidu.com/qq/
> window.history.replaceState(state,title,url)
> // 与pushState基本相同，但它是修改当前历史记录，而pushState是创建新的历史记录
> window.addEventListener("popstate",function(){
> // 监听游览器前进后退事件，pushState与replaceState方法不会触发
>     console.log(event.state)
> });
> history.state; //是一个属性，可得到当前页的state信息。
> // 通过window.history对象来控制页面历史记录跳转
> window.history.back() //后退
> window.history.forward() //前进
> window.history.go(1)  //前进一步，-2为后退两步，window.history.length可以查看当前历史堆栈中页面的数量
>
>      通过pushstate把页面的状态保存在state对象中，当页面的url再变回这个url时，可以通过event.state取到这个state对象，从而可以对页面状态进行还原，其实滚动条的位置，阅读进度，组件的开关的这些页面都可以存储到state的里面，从而可以对页面状态进行还原，其实滚动条的位置，阅读进度，组件的开关的这些页面 状态都可以存储到state的里面。
>     
>     history模式的问题
>     
>     在hash模式下，前端路由修改的是#中的信息，而游览器请求时是不带它玩的，所以没有问题。但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或资源，会分分钟刷出一个404来。
>
>    history模式改变url的方式会导致游览器向服务器发送请求，这不是我们想看到的，我们需要在服务器端做处理：如果匹配不到任何静态资源，则应该始终返回同一个html页面。
>
>    使用history模式还有一个问题就是，在访问二级页面的时候，做刷新操作，会出现404错误，那么就需要和后端配合让他配置一下apache或是nginx的url重定向，重定向到你的首页路由上就ok啦。
>
>    路由模式配置：
>
> export default new Router({
>     // mode: 'history',
>     mode: 'hash',
>     routes
> })
>    如果是history模式需要后端配合解决刷新404问题，这里以Node后台为例：
>
>  const Koa = require('koa')
>  const Router = require('koa-router');
>  const static = require('koa-static')
>  const fs = require('fs');
>  const app = new Koa();
>  const router = new Router();
>
>  let str;
>  fs.readFile('../dist/index.html', "utf-8", (err, data) => {
>      if (err) {
>         ctx.body = "error found"
>      }
>      str = data.toString();
> })
>
> // 解决vue 路由在 history刷新 404情况
> router.get('*', async(ctx, next) => {
>      if (ctx.url !== "/index.html") {
>          console.log("在这里返回")
>          ctx.body = str;
>      } 
> })
>
> app.use(static("../dist/"));
> app.use(router.routes()) //启动路由
> app.use(router.allowedMethods());
>
>
> app.listen(8989, () => {
>     console.log("监听服务器地址：127.0.0.1:8989");
> })
> 二、总结
>          hash模式和history模式的区别：
>
> 1.hash模式带#号比较丑，history模式比较优雅；
>
> 2.pushState设置的新的URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL；
>
> 3.pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中；
>
> 4.pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串；
>
> 5.pushState可额外设置title属性供后续使用；
>
> 6.hash兼容IE8以上，history兼容IE10以上；
>
> 7.history模式需要后端配合将所有访问都指向index.html，否则用户刷新页面，会导致404错误。
> ————————————————
> 版权声明：本文为CSDN博主「lilly呀」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
> 原文链接：https://blog.csdn.net/qq_26780317/article/details/117790679