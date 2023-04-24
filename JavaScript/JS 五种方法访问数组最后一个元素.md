### 1. 使用 `arr[arr.length - 1]`

首先最常规的方法就是使用 `arr[arr.length - 1]` ，缺点就是这样写太长了，例如下面这个数组：

```javascript
const lastEle = this.form.users[this.form.users - 1];
```

> 对于类数组对象，例如 `arguments` 、`Set` 、`NodeList` ，推荐使用这个方法，也可以先转为数组再用数组操作方法处理，但是会有额外性能开销

### 2. 使用 slice 方法
数组实例的 slice 方法返回一个由 begin 和 end 组成的闭开区间的新数组，如果 end 被省略，则 slice 会一直提取到原数组末尾。因此，只要让 begin 等于 -1 并且省略 end 就能提取到最后一个元素了。需要注意 slice 返回的是数组，所以还需要用下标访问一下元素：

```javascript
const lastEle = ["apple", "banana"].slice(-1)[0];
```

### 3. 使用 `reverse` 方法

数组实例的 `reverse` 方法，可以反转数组元素的顺序，这样访问最后一个元素就变成访问第一个元素了。但是要注意 `reverse` 方法会修改原数组，因此在调用前需要先浅拷贝一下：

```javascript
const lastEle = [...this.form.users].reverse()[0];
```

### 4. 使用 `pop` 方法

数组实例的 `pop` 方法，会移除数组的最后一个元素，并且返回这个元素，这样就可以访问到最后一个元素了。注意这个方法同样也会修改原数组，因此在调用前也需要浅拷贝

```javascript
const lastEle = [...this.form.users].pop();
```

### 5. 使用 `at` 方法

JavaScript 中可以使用下标访问数组，但是这个下标只能是非负数，这样就导致了很大的局限性。例如在 Python 中，我们可以传入一个负的下标，当下标为负时，就会从数组的最后向前查找，因此当需要访问最后一个元素就可以这样：

```py
# Python 代码
arr = ["apple", "banana"]
lastEle = arr[-1] # "banana"
```

在 JS 里面有一个实验性语法 `Array.prototype.at` 方法 (Relative indexing method) ，接受一个整数作为下标返回对应的元素。如果传非负下标，那就和方括号语法一致，如果传负的下标，就会从后向前查找，可以很方便地访问数组最后一个元素：

```javascript
const fruit = ["apple", "banana"];
fruit.at(0); // "apple"
fruit.at(-1); // "banana"
```

