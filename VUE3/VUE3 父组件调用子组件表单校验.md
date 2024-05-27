### 1、父组件

```vue
<template>
	<!-- 子组件使用：供应商信息表单 -->
	<SupplyInformation ref="supplyInformationForm" v-model="form"/>
</template>
<script lang="ts" setup>
  import { onMounted, ref, provide, computed, nextTick } from 'vue';
  const supplyInformationForm = ref(null);
  // 数据提交校验
  const submit = async () => {
    await nextTick();
    // 供应商信息校验
    await supplyInformationForm?.value?.onSubmit();
  };
</script>
```

### 2、子组件

```vue
<template>
	<h-form
      ref="formRef"
      :model="form"
      :label-col="{ flex: '140px' }"
      :wrapper-col="{ flex: '1' }">
    </h-form>
</template>
<script lang="ts" setup>
  import { computed, ref, inject, toRaw } from 'vue';
  import type { FormInstance } from 'ant-design-vue/es/form';
  const formRef = ref<FormInstance | null>();
  // 提交前校验
  const onSubmit = (validate = true) => {
    return new Promise((resolve, reject) => {
      if (!validate) {
        return resolve(toRaw(form));
      }
      formRef.value
        .validate()
        .then(() => {
          resolve(toRaw(form)); // 异步操作成功时调用 resolve，并传入结果
        })
        .catch((error) => {
          message.error('供应商供货信息未正确填写，请检查！');
          reject(error); // 异步操作失败时调用 reject，并传入错误信息
        });
    });
  };
  //将方法暴露出去
  defineExpose({ onSubmit });
</script>
```

