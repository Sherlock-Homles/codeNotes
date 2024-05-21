> 参考：[vue中处理后台返回的图片流，并将图片流显示在前端](https://blog.csdn.net/qq_41948525/article/details/105238646)

### 1、API文件

```typescript
import type { ApiResult } from '@/api';
import type { User } from '@/api/system/user/model';
import request from '@/utils/request';

// 发货单打印二维码
export async function printCode(id: any): Promise<any> {
  const res = await request.get<ApiResult<User>>(
    `/zc/purchaseOrderDelivery/generateDeliveryQrCode/${id}`,
    { responseType: 'blob' } // 设置blod请求头
  );
  return res.data;
}
```

### 2、页面请求渲染

关键渲染：``createObjectURL``是JavaScript中一个非常有用的函数，它可以将Blob、File等二进制文件转换为浏览器可以直接显示的URL地址，从而方便进行展示、下载等操作。

```vue
<template>
	<div>
        <img :src="codeUrl" />
    </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { printCode } from '@/api/zc-manage/vendor-deliver-goods-management/vendor-order-management.ts';
  const codeUrl = ref('');
  const getCode = (id) => {
    printCode(id)
      .then((response) => {
        codeUrl.value = window.URL.createObjectURL(response);
      })
  };
</script>
```

