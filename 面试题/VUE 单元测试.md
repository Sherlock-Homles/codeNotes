### **一、工具选择**

1. **测试框架**
   - **Jest**：主流选择，内置断言、Mock 和覆盖率报告，适合大多数项目。
   - **Vitest**：基于 Vite 的测试框架，速度快，适合 Vite 项目。
2. **测试工具库**
   - **Vue Test Utils**：Vue 官方测试工具库，提供组件挂载、DOM 操作和事件模拟。
3. **辅助工具**
   - **Testing Library**（可选）：更贴近用户行为的测试风格（如 `@testing-library/vue`）。

------

### **二、环境配置**

#### 1. 安装依赖

```bash
# 使用 Jest 的配置
npm install --save-dev jest @vue/test-utils @vue/vue3-jest babel-jest @babel/core @babel/preset-env
```

#### 2. 创建 Jest 配置文件 `jest.config.js`

```javascript
module.exports = {
  preset: '@vue/vue3-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: ['**/__tests__/**/*.spec.js']
};
```

#### 3. 配置 Babel `.babelrc`

```json
{
  "presets": ["@babel/preset-env"]
}
```

------

### **三、编写测试用例**

#### 1. 测试组件渲染

```javascript
// ExampleComponent.vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p v-if="showText">Hello World</p>
  </div>
</template>

<script>
export default {
  props: ['title', 'showText']
}
</script>

// __tests__/ExampleComponent.spec.js
import { shallowMount } from '@vue/test-utils'
import ExampleComponent from '@/components/ExampleComponent.vue'

describe('ExampleComponent', () => {
  it('渲染标题和文本', () => {
    const wrapper = shallowMount(ExampleComponent, {
      props: {
        title: 'Vue Test',
        showText: true
      }
    })
    expect(wrapper.find('h1').text()).toBe('Vue Test')
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
```

#### 2. 测试用户交互

```javascript
// ButtonComponent.vue
<template>
  <button @click="handleClick">点击次数：{{ count }}</button>
</template>

<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    handleClick() {
      this.count++
    }
  }
}
</script>

// __tests__/ButtonComponent.spec.js
import { shallowMount } from '@vue/test-utils'
import ButtonComponent from '@/components/ButtonComponent.vue'

describe('ButtonComponent', () => {
  it('点击按钮增加计数', async () => {
    const wrapper = shallowMount(ButtonComponent)
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.count).toBe(1)
    expect(wrapper.text()).toContain('点击次数：1')
  })
})
```

#### 3. 测试 Props 和 Emits

```javascript
// EmitComponent.vue
<template>
  <button @click="$emit('submit', 'data')">提交</button>
</template>

// __tests__/EmitComponent.spec.js
import { shallowMount } from '@vue/test-utils'
import EmitComponent from '@/components/EmitComponent.vue'

describe('EmitComponent', () => {
  it('点击按钮触发 submit 事件', async () => {
    const wrapper = shallowMount(EmitComponent)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0]).toEqual(['data'])
  })
})
```

#### 4. 测试 Vuex 状态

```javascript
// StoreComponent.vue
<template>
  <div>{{ $store.state.count }}</div>
</template>

// __tests__/StoreComponent.spec.js
import { createStore } from 'vuex'
import { shallowMount } from '@vue/test-utils'
import StoreComponent from '@/components/StoreComponent.vue'

const store = createStore({
  state() {
    return { count: 10 }
  }
})

describe('StoreComponent', () => {
  it('显示 Vuex 中的 count', () => {
    const wrapper = shallowMount(StoreComponent, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.text()).toContain('10')
  })
})
```

------

### **四、常见测试场景**

1. **异步操作测试**
   使用 `async/await` 或 `flushPromises` 处理异步逻辑：

   ```javascript
   it('异步加载数据', async () => {
     const wrapper = shallowMount(AsyncComponent)
     await wrapper.vm.loadData()
     expect(wrapper.find('.data').exists()).toBe(true)
   })
   ```

2. **HTTP 请求 Mock**
   使用 `jest.mock` 或 `axios-mock-adapter` 模拟 API 调用：

   ```javascript
   import axios from 'axios'
   jest.mock('axios')
   
   it('获取用户数据', async () => {
     axios.get.mockResolvedValue({ data: { name: 'Leo' } })
     const wrapper = shallowMount(UserComponent)
     await flushPromises()
     expect(wrapper.text()).toContain('Leo')
   })
   ```

3. **快照测试**
   捕捉组件渲染结果，防止意外更改：

   ```javascript
   it('快照匹配', () => {
     const wrapper = shallowMount(ExampleComponent)
     expect(wrapper.html()).toMatchSnapshot()
   })
   ```

------

### **五、最佳实践**

1. **测试行为而非实现**：关注用户可见的交互和输出，而非内部方法调用。

2. **使用 `shallowMount` 替代 `mount`**：避免子组件副作用，提升测试速度。

3. **保持测试独立**：每个测试用例应独立运行，不依赖外部状态。

4. **覆盖率报告**：配置 Jest 生成覆盖率报告，查漏补缺：

   ```bash
   jest --coverage
   ```

------

### **六、总结**

通过 **Vue Test Utils + Jest** 的组合，可以高效完成组件渲染、交互、状态管理和异步操作的测试。重点在于模拟真实用户行为，确保组件功能符合预期，同时保持测试代码简洁可维护。