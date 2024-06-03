> 参考：[vue中input框输入大于等于0且保留两位小数，超出的部分无法输入（还有保留一位小数、输入正整数）](https://blog.csdn.net/pipizhou16/article/details/126163092?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-126163092-blog-109772103.235^v43^pc_blog_bottom_relevance_base8&spm=1001.2101.3001.4242.1&utm_relevant_index=3)

```vue
<a-input-number
   style="width: 100%"
   :min="0"
   oninput="value=value.replace(/^\D*([0-9]\d{0,7}*\.?\d{0,2})?.*$/,'$1')"
   :maxLength="8"
   placeholder="请输入项目预算"
   v-model:value="formState.budget"
   :addon-after="'万元'"
   :readonly="status === 'detail'"
   :bordered="status !== 'detail'"
/>
```

> **正则解析**
> /^\D*([0-9]\d{0,7}*\.?\d{0,2})?.*$/
>
> 整数位：限制输入0-9，且位数限制为小于等于8位
>
> 小数位：位数最大输入2位小数