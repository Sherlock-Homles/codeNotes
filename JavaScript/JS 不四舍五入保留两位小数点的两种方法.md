### 1. 使用 parseInt() 与 toFixed() 的结合

仅仅使用 toFixded(2) 会四舍五入。

```javascript
let a = 0.99996
a.toFixed(2)  //(0.99996).toFixed(2)   1.00,自动四舍五入
 
console.log(a.toFixed(2)) //1.00
```

可以使用 **parseInt() 进行取整后再除以 100。**

```javascript
let a = 0.99996
parseInt(a*100)/100 //0.99996*100 = 99.996,经过parseInt取整后99再除以100 = 0.99
 
console.log(parseInt(a*100)/100) //0.99
```

但是！如果小数点一位或两位为 0，则只会保留整数。所以要跟 toFixded(2) 配合

```javascript
let a = 0.909
parseInt(a*100)/100 //0.909*100 = 90.9,经过parseInt取整后90再除以100 = 0.9
 
console.log(parseInt(a*100)/100) //0.9  这时候只有保留了一位小数点
 
 
(parseInt(a*100)/100).toFixed(2) //自动补全后两位 
 
console.log((parseInt(a*100)/100).toFixed(2)) //0.90
```

所以无论是想保留小数点后一位还是三位，都可以用这个方法。

```javascript
let a = 0.99006
 
(parseInt(a*10)/10).toFixed(1) //  9.9006取整为 9 再除以10 等于0.9 再取后面一位 0.9
 
console.log((parseInt(a*10)/10).toFixed(1)) //0.9
 
 
let b = 0.99006
 
(parseInt(b*1000)/1000).toFixed(3) // 990.06取整为 990 再除以1000 等于0.99 再取后面三位 0.990
 
console.log((parseInt(b*1000)/1000).toFixed(3)) //0.990
```

### 2.Math.floor() 与 toFixed() 的结合

其实原理跟 **parseInt()** 差不多**，****floor()** 方法返回小于等于 x 的最大整数。如果传递的参数是一个整数，该值不变。

```
let a = 0.909
 
 
(Math.floor(a*100)/100).toFixed(2) //自动补全后两位 
 
console.log((Math.floor(a*100)/100).toFixed(2)) //0.90
```