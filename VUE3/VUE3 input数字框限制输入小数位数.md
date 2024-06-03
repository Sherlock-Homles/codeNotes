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