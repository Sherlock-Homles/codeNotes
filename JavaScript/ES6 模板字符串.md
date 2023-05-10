### 模板字符串

```js
 `进行处理的字符串 或者 ${变量（常量）或者 表达式（≠语句）}`
```

```js
        // 原先的字符串要实现转行或空格等特殊行为，需要用对应的特殊字符进行转义
        const str = '今天\n下暴雨';
        console.log(str);
 
        // es6提供模板字符串，从而实现对字符串的灵活处理
 
        const str1 = `今天下暴雨`;
        console.log(str1);
 
        // 模板字符串 浏览器可识别模板字符串中的任何特殊字符——包括转行、空格.....
        const str11 = `今天
                下暴雨
                `;
        console.log(str11);
 
        const str111 = `今天
        下暴雨
                `;
        console.log(str111);
 
        // 内容为表达式时,浏览器会解析模板字符串中的表达式
        const str_ex = `${1+1}`;
        console.log(str_ex);
 
        // 内容为语句时
        // 浏览器仍会解析语句，并执行语句
        // 但解析和执行的行为会脱离模板字符串的范围
        // 当前语句在模板字符串中被返回undefined
 
        function fn() {
            console.log("我是fn函数")
        };
        const str_lan = `${fn()}`;
        console.log(str_lan);
```

输出结果如下:





![img](https://img-blog.csdnimg.cn/16b3706eed894528ad154894d8f4a425.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZCD6ZqP5Zyw5pi1,size_7,color_FFFFFF,t_70,g_se,x_16)





 **标签模板字符串** 

对[模板字符串](https://so.csdn.net/so/search?q=模板字符串&spm=1001.2101.3001.7020)进行标记

格式：标记名 ` 模板字符串 `

标记是一个函数时，函数参数如下：

参数 1：被插值分割的字符串组成的数组

后续参数们：所有插值

```js
        function fun(param1, param2, param3) {
            console.log(param1);
            console.log(param2);
            console.log(param3);
        };
        let name1 = "阿芳";
        let name2 = "阿丽";
        let tagStr = fun `姐妹1${name1}姐妹2${name2}。`;
```

输出结果：





![img](https://img-blog.csdnimg.cn/775c511bfaa54eeaa1b9fe1f733513d7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5ZCD6ZqP5Zyw5pi1,size_10,color_FFFFFF,t_70,g_se,x_16)





 **标签模板字符串的自定义**

```js
        function fun(parts) {
            const values = Array.prototype.slice.apply(arguments).slice(1)
            let str = "";
            for (let i = 0; i < values.length; i++) {
                str += `${parts[i]} : ${values[i]};`;
                // 拼接最后的字符串部分
                if (i == values.length - 1) {
                    str += parts[i + 1]
                };
            };
            return str;
        };
 
        let name1 = "阿芳";
        let name2 = "阿丽";
        let tagStr = fun `姐妹1${name1}姐妹2${name2}。`;
        console.log(tagStr); //  姐妹1 : 阿芳;姐妹2 : 阿丽;。
```