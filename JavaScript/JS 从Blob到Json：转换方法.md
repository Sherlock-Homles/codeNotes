# [从Blob到JSON：转换方法](https://www.python100.com/html/3UAY27A37M1U.html)

## 一、Blob 的概念与使用

Blob 是一种二进制数据类型，它可以存储任意类型的数据，比如文件、图像和音频等。在前端中，我们通常使用 Blob 对象来实现文件上传、图片预览等功能，具体使用方法如下：

```javascript
const data = 'Hello, world!';
const blob = new Blob([data], { type: 'text/plain' });
```

上述代码创建了一个 Blob 对象，并传入了一个字符串和一个 MIME 类型。这个 Blob 对象可以以 URL 或二进制数据的形式发送至服务器。

## 二、将 Blob 对象转换成 Json 格式

在前端开发中，我们通常需要将数据以 Json 格式发送到后台或其他应用程序中。但是，Blob 对象并不是一个合法的 Json 对象，因此我们需要将 Blob 对象转换成 Json 对象。

### 1. 使用 FileReader 对象

FileReader 是一种经常被用来读取文件的 Web API。尽管名字中带有 "File"，但它也可以用来读取 Blob 对象。使用 FileReader 对象，可以将 Blob 对象读取成二进制格式或文本格式的数据，具体代码如下：

```javascript
// 将Blob对象读取成文本格式
const fileReader = new FileReader();
fileReader.onload = () => {
  const text = fileReader.result;
  const json = JSON.parse(text);
};
fileReader.readAsText(blob);

// 将Blob对象读取成二进制格式
fileReader.onload = () => {
  const buffer = fileReader.result;
  const json = JSON.parse(new TextDecoder().decode(buffer));
};
fileReader.readAsArrayBuffer(blob);
```

使用 FileReader 对象，我们可以将 Blob 对象读取成文本或二进制格式的数据，并将其转换成 Json 对象。这种方法是通用的，适用于任意类型的数据。

### 2. 使用 XMLHttpRequest 对象

XMLHttpRequest 是一种用于在浏览器中发起 Ajax 请求的 Web API。使用 XMLHttpRequest 对象，我们可以将 Blob 对象发送到服务器，服务器将其转换成 Json 格式的数据并返回给客户端。具体代码如下：

```javascript
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.onload = () => {
  const json = xhr.response;
};
xhr.open('GET', 'http://example.com/convert', true);
xhr.send(blob);
```

使用 XMLHttpRequest 对象，我们可以在与服务器通信的过程中将 Blob 对象转换成 Json 对象。这种方法通常用于与后台进行数据交互。

## 三、将 Json 对象转换成 Blob 对象

与将 Blob 对象转换成 Json 对象相反，有时我们需要将 Json 对象转换成 Blob 对象。例如，在前端开发中，我们通常需要将用户上传的文件以 Json 格式保存在服务器上。这时，我们需要将 Json 对象转换成 Blob 对象，具体代码如下：

```javascript
const json = { name: 'example' };
const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
```

使用上述代码，我们可以将 Json 对象转换成 Blob 对象，并设置 MIME 类型为 "application/json"。这样，我们就可以将 Json 对象一次性上传到服务器上。

## 四、常见应用场景

将 Blob 转换成 Json 或将 Json 转换成 Blob 在前端开发中应用非常广泛，下面列举几个常见应用场景：

### 1. 文件上传

在前端中，我们可以使用 Blob 对象上传文件到服务器。例如，可以使用 FormData 对象将文件转换成 Blob 对象，并发送到服务器。具体代码如下：

```javascript
const file = document.querySelector('input[type="file"]').files[0];
const formData = new FormData();
formData.append('file', file);
const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://example.com/upload', true);
xhr.send(formData);
```

使用 FormData 对象，我们可以将文件转换成 Blob 对象，并将其上传到服务器上。

### 2. 图片预览

在前端开发中，我们通常需要在页面中预览用户上传的图片。使用 FileReader 对象，我们可以将用户上传的图片转换成 Blob 对象，并将其在页面中进行显示，具体代码如下：

```javascript
const file = document.querySelector('input[type="file"]').files[0];
const fileReader = new FileReader();
fileReader.onload = () => {
  const blob = new Blob([fileReader.result], { type: file.type });
  const img = document.createElement('img');
  img.src = URL.createObjectURL(blob);
};
fileReader.readAsArrayBuffer(file);
```

使用 FileReader 对象，我们可以将用户上传的图片转换成 Blob 对象，并使用 URL.createObjectURL() 方法将其转换成一个可访问的 URL，从而在页面中进行预览。

## 五、总结

本文对 Blob 对象的概念和使用进行了介绍，并探讨了如何将 Blob 对象转换成 Json 对象和如何将 Json 对象转换成 Blob 对象，并列举了常见的应用场景。通过学习本文，我们可以更加深入地了解 Blob 对象的特性和用法，从而提高前端开发的效率和质量。