## 一、VUE3

### 1. Vue3 的 Composition API 和 Options API 有哪些区别？

Composition API 允许将逻辑更加集中和复用，通过 setup 函数组合多个逻辑块。
相比于 Options API 的分散代码，Composition API 更加模块化和可维护。

##### 什么是组合式 API？

组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API：

- 响应式 API：例如 ref() 和 reactive()，使我们可以直接创建响应式状态、计算属性和侦听器。
- 生命周期钩子：例如 onMounted() 和 onUnmounted()，使我们可以在组件各个生命周期阶段添加逻辑。
- 依赖注入：例如 provide() 和 inject()，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

##### 什么是选项是 API？

选项式 API (Options API) 使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 `data`、`methods` 和 `mounted`。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

##### 组合式 API 对比 选项是 API 的优势？

- 更灵活的代码组织：组件逻辑可以按功能模块分组，减少代码的分散，提高代码可读性和维护性。
- 更好的逻辑复用：组合式 API 最基本的优势是它使我们能够通过组合函数来实现更加简洁高效的逻辑复用。在选项式 API 中我们主要的逻辑复用机制是 mixins，而组合式 API 解决了 mixins 的所有缺陷。
- 更好的类型推导：组合式 API 提供了更好的类型推断支持，更适合与 TypeScript 一起使用。
- 更小的生产包体积：由于 `<script setup>` 形式书写的组件模板被编译为了一个内联函数，和 `<script setup>` 中的代码位于同一作用域。不像选项式 API 需要依赖 this 上下文对象访问属性，被编译的模板可以直接访问 `<script setup>` 中定义的变量，无需从实例中代理。这对代码压缩更友好，因为本地变量的名字可以被压缩，但对象的属性名则不能。

### 2. 如何在 Vue3 中使用 ref 和 reactive？它们的区别是什么？

ref 用于创建一个响应式的基本类型或对象引用。
reactive 用于创建一个响应式的对象。
区别在于 `ref` 返回一个对象，值存储在 `.value` 属性中

##### ref 和 reactive

- 使用场景：`ref `更适合用于基本数据类型、单一变量、或需要在模板中绑定的值。而 `reactive` 更适合用于复杂的数据结构，如嵌套对象、数组等。
- 访问方式： `ref` 需要通过`.value `， `reactive` 不需要,其实 ref 调用的也是 reactive，见下面代码；
- 响应式处理：`reactive`修改整个对象都是响应式的， `ref` 只有第一层是响应式的。

```JavaScript
// 封装一个 ref 函数
function ref(val) {
  const wrapper = {
      value: val
  }
  return reactive(wrapper)
}
```

### 3. Vue3 中的 `<script setup>` 是什么？它的作用是什么？

`<script setup> `是一种编译时语法糖，可以在单文件组件（SFC）中更简洁地使用 Composition API。
所有在 `<script setup>` 中定义的内容都是模块化且作用域内的。

### 4. Vue3 的 Teleport 是什么？在什么场景下会用到？

Teleport 允许将组件的渲染内容移动到 DOM 的其他位置。常用于模态框、弹出菜单等需要脱离组件树布局的场景。

### 5. Vue3 中如何使用 provide 和 inject 实现依赖注入？它们的作用是什么？

provide 用于在上级组件中提供数据，inject 用于在下级组件中注入数据，适用于跨组件传递数据而无需通过 props 和 emits。

### 6. Vue3 中的 Suspense 是什么？如何使用它来处理异步组件？

`Suspense` 是 Vue3 提供的一个内置组件，用于处理异步组件和异步数据加载。它可以在等待异步内容加载完成时显示加载状态，并处理加载过程中可能发生的错误。

### 7. 请解释 Vue3 中响应式系统的工作原理。Vue3 如何优化性能？

Vue3 使用 Proxy 代替 Vue2 中的 Object.defineProperty 来实现响应式系统，这使得对整个对象的代理更加高效和全面。它通过依赖追踪和触发机制，确保只有实际变化的部分重新渲染，从而优化性能。

### 8. Vue3 中如何创建和使用自定义指令？

自定义指令可以通过 app.directive 创建，并在组件中使用。

### 9. 在 Vue3 中，如何使用 emits 选项来定义组件事件？它与 Vue2 的事件处理有何不同？

emits 选项用于显式定义组件可以发出的事件。相比于 Vue2 中的隐式事件，在 Vue3 中定义事件更加明确。

### 10. Vue3 中如何使用 v-model 在组件中实现双向数据绑定？请解释 v-model 的工作机制。

v-model 在 Vue3 中可以绑定到任意 prop，通过 modelValue 和自定义事件实现双向数据绑定。

### 11. v-if 与 v-for 的优先级对比？

vue2 中：`v-for`优先级比`v-if`高
vue3 中：`v-if`优先级比`v-for`高

### 12. 各种 watch 侦听器的区别？

- watch：其本质就是观测一个响应式数据，当数据发生变化时通知并执行相应的回调函数。
- watchEffect：立即运行。
- watchPostEffect()： DOM 更新完成后被调用。
- watchSyncEffect()：它是一个同步的监视器，每当依赖变化时立即触发回调函数，而不会等待下一次事件循环。

### 13. VUE3 有没有看过源码?核心模块有那些？

Vue 的三个核心模块：

- Reactivity Module 响应式模块
- Compiler Module 编译器模块
- Renderer Module 渲染模块

**响应式模块**：允许我们创建 JavaScript 响应对象并可以观察其变化。当使用这些对象的代码运行时，它们会被跟踪，因此，它们可以在响应对象发生变化后运行。

- **Proxy 对象**：Vue 3 使用 Proxy 对象来拦截对响应式对象的读写操作；
- **track 函数**：在 getter 函数内部，Vue 会调用 `track` 函数来记录依赖关系。这个函数会将当前执行的副作用函数（如渲染函数或计算属性）作为依赖记录下来，并与被访问的属性相关联。
- **trigger 函数**：在 setter 函数内部，Vue 会调用 `trigger` 函数来触发依赖更新。这个函数会通知所有依赖于被修改属性的观察者重新执行或重新渲染。

**编译器模块**：获取 HTML 模板并将它们编译成渲染函数。它的工作流程大致分为三个步骤：

- (1) 分析模板，将其解析为模板 AST。
- (2) 将模板 AST 转换为用于描述渲染函数的 JavaScript AST。
- (3) 根据 JavaScript AST 生成渲染函数代码。

**渲染模块**：将模板转换为真实的 DOM 节点，响应式数据变化时，更新节点。渲染组件的三个不同阶段：

- 渲染阶段：将调用 render 函数，它返回一个虚拟 DOM 节点。
- 挂载阶段：使用虚拟 DOM 节点并调用 DOM API 来创建网页。
- 补丁阶段：渲染器将旧的虚拟节点和新的虚拟节点进行比较并只更新网页变化的部分。

### 14. Proxy 相比于 defineProperty 的优势？

**defineProperty**：

- 只能对对象的单个属性进行监听和修改；
- 无法监听对象新增或删除属性的操作；
- 可以监听数组属性变化，但性能代价较大，Vue2 中因此放弃了这种方式。

**Proxy**：

- 可以对整个对象进行拦截和修改。
- 能够监听对象新增、删除属性的操作。
- 对数组的操作（如 push、pop 等）也可以被拦截和修改。

### 15. 什么是虚拟 DOM （Virtual DOM 简写 VDOM）

VDOM 其实就是用 JavaScript 对象来描述真实的 DOM 结构。

### 16. 什么是 diff 算法

渲染器的核心 Diff 算法。简单来说，当新旧 vnode 的子节点都是一组节点时，为了以最小的性能开销完成更
新操作，需要比较两组子节点，用于比较的算法就叫作 Diff 算法。

### 17. vue2 和 vue3 以及 react 中 diff 算法的区别

- vue1 简单 Diff 算法：简单 Diff 算法利用虚拟节点的 key 属性，尽可能地复用 DOM 元素，并通过移动 DOM 的方式来完成更新，从而减少不断地创建和销毁 DOM 元素带来的性能开销。
- vue2 双端 Diff 算法：新旧两组子节点的四个端点之间分别进行比较，并试图找到可复用的节点。相比简单 Diff 算法，双端 Diff 算法的优势在于，对于同样的更新场景，执行的 DOM 移动操作次数更少。
- vue3 快速 Diff 算法：在实测中性能最优。它借鉴了文本 Diff 中的预处理思路，先处理新旧两组子节点中相同的前置节点和相同的后置节点。当前置节点和后置节点全部处理完毕后，如果无法简单地通过挂载新节点或者卸载已经不存在的节点来完成更新，则需要根据节点的索引关系，构造出一个最长递增子序列。最长递增子序列所指向的节点即为不需要移动的节点。
- react 递增法：React 是 Fiber 架构的，Fiber 其实是一个单项链表，没有设置反向指针，没法使用双端比对的方式去优化 Diff 算法。

### 18. Pinia 相比 Vuex 有哪些优势

- **更简单的 API**：Pinia 去掉了 Vuex 中的 Mutation，只保留了 state、getter 和 action，使得 API 更加简洁。
- **类型安全**：Pinia 提供了类型安全的支持，使得在开发过程中更容易捕获潜在的错误。
- **更好的代码组织**：Pinia 不需要使用模块（module）对 store 进行分割，每个 store 都是一个独立的模块，这使得代码更加清晰和易于维护。
- **性能优化**：Pinia 只包含核心功能，相比 Vuex 的众多附加功能，其包体积更小，加载更快，减少了前端应用的资源占用。

### 19. Vite 相比 Webpack 有哪些优势？

- Vite 在开发阶段使用原生 ES 模块加载方式，跳过了打包操作，因此提供了更快的冷启动和即时的热模块更新。
- Vite 在构建阶段使用 Rollup 进行打包，以优化应用体积和性能。

## TypeScript

### 1. TypeScript与JavaScript的区别是什么？

TypeScript是JavaScript的超集，它扩展了JavaScript，主要区别包括：

- **类型系统**：TypeScript提供静态类型检查
- **面向对象特性**：提供接口、泛型、枚举等特性
- **开发工具支持**：更好的IDE支持，包括代码补全、重构等
- **及早发现错误**：在编译时就能发现潜在问题
- **JavaScript互操作性**：可以逐步将JavaScript代码迁移到TypeScript

### 2. TypeScript中的基本类型有哪些？

1. **基础类型**：
   - `number`：数字
   - `string`：字符串
   - `boolean`：布尔值
   - `null`和`undefined`
   - `void`：通常用于函数返回值
   - `any`：任意类型
   - `never`：永不存在的值的类型
2. **对象类型**：
   - `object`：对象类型
   - `array`：数组类型
   - `tuple`：元组类型

### 3. 什么是类型断言？如何使用？

类型断言用于告诉编译器"相信我，我知道自己在做什么"。它有两种形式：

1. 尖括号语法
2. as语法（推荐，特别是在JSX中）

### 4. 什么是泛型？为什么要使用泛型？

泛型是一种在定义函数、接口或类时不预先指定具体类型，而在使用时再指定类型的特性。

优点：

- 代码复用
- 类型安全
- 减少冗余代码

### 5. 装饰器是什么？如何使用？

装饰器是一种特殊类型的声明，可以附加到类、方法、访问符、属性或参数上。

### 6. TypeScript中如何实现接口继承？

接口继承允许我们从一个接口复制成员到另一个接口，实现代码重用。

### 7. 如何在TypeScript中处理异步操作？

TypeScript完全支持现代JavaScript的异步特性，包括Promise、async/await等。

### 8. 什么是条件类型？如何使用？

条件类型是TypeScript中的高级类型特性，允许我们基于类型关系进行类型选择。

### 9. 如何使用映射类型？

映射类型允许我们从现有类型创建新类型，通过映射现有类型的每个属性。

### 10. TypeScript项目中如何处理模块化？

TypeScript支持现代JavaScript的模块化语法，同时提供了额外的类型系统支持。

### 11. 什么是类型收窄（Type Narrowing）？

类型收窄是TypeScript中缩小类型范围的过程，有多种方式可以实现类型收窄。

### 12. TypeScript中的tsconfig.json重要配置有哪些？

tsconfig.json是TypeScript项目的配置文件，包含许多重要选项。

```json
{
    "compilerOptions": {
        // 目标JavaScript版本
        "target": "ES2020",
        
        // 模块系统
        "module": "CommonJS",
        
        // 严格类型检查
        "strict": true,
        
        // 允许从没有默认导出的模块中默认导入
        "allowSyntheticDefaultImports": true,
        
        // 生成声明文件
        "declaration": true,
        
        // 允许装饰器
        "experimentalDecorators": true,
        
        // 模块解析策略
        "moduleResolution": "node",
        
        // 基础目录
        "baseUrl": "./src",
        
        // 路径别名
        "paths": {
            "@/*": ["*"]
        }
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.spec.ts"]
}
```
### 13. 联合类型和交叉类型的区别是什么？

联合类型和交叉类型是TypeScript中两种重要的类型组合方式。

 **联合类型** (|)：Union Type，表示可以是多种类型中的一种

**交叉类型** (&)：Intersection Type，表示同时具有多种类型的特性

### 14. TypeScript 4.x和5.x有哪些重要新特性？

```typescript
// TypeScript 4.0+: 可变元组类型
type Strings = [string, string];
type Numbers = [number, number];
type StringsAndNumbers = [...Strings, ...Numbers];

// TypeScript 4.3+: override关键字
class Base {
    greet() {
        console.log("Hello");
    }
}

class Derived extends Base {
    override greet() {
        console.log("Hi");
    }
}

// TypeScript 4.4+: 控制流分析的改进
function example(value: string | number) {
    if (Math.random()) {
        value = "hello";
    }
    if (typeof value === "string") {
        // TypeScript知道这里value一定是string
        console.log(value.toUpperCase());
    }
}

// TypeScript 4.5+: Awaited类型
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number

// TypeScript 4.9+: satisfies操作符
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
} satisfies Record<string, string | number[]>;

// TypeScript 5.0+: const类型参数
function first<const T extends readonly unknown[]>(arr: T) {
    return arr[0];
}

// TypeScript 5.2+: using关键字和显式资源管理
class FileHandle implements Disposable {
    dispose() {
        // 清理资源
    }
}

{
    using handle = new FileHandle();
    // 使用handle
    // 作用域结束时自动调用dispose
}
```

### 15. TypeScript中的类型体操实战有哪些？

```typescript
// 实现Pick类型
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 实现Readonly类型
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 实现深度Readonly
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object 
        ? DeepReadonly<T[P]> 
        : T[P];
};

// 实现Partial类型
type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

// 实现Required类型
type MyRequired<T> = {
    [P in keyof T]-?: T[P];
};

// 实现Record类型
type MyRecord<K extends keyof any, T> = {
    [P in K]: T;
};

// 实现Exclude类型
type MyExclude<T, U> = T extends U ? never : T;

// 实现Extract类型
type MyExtract<T, U> = T extends U ? T : never;

// 实现ReturnType类型
type MyReturnType<T extends (...args: any) => any> = 
    T extends (...args: any) => infer R ? R : any;

// 实际应用示例
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// 只读的Todo类型
type ReadonlyTodo = MyReadonly<Todo>;

// 可选的Todo类型
type PartialTodo = MyPartial<Todo>;

// 提取Todo中的字符串类型属性
type StringProps = MyExtract<keyof Todo, string>;
```

> 参考：https://blog.csdn.net/weixin_63454527/article/details/146171717

### 16、什么是 TypeScript？为什么使用它比普通 JavaScript 更有优势？

TypeScript 是 JavaScript 的静态类型超集，可以编译为纯 JavaScript。通过引入静态类型，它允许开发人员在编译时而不是运行时捕获与类型相关的错误。

这可以减少错误，提高代码可读性，并通过增强的工具（例如自动完成和代码导航）提供[更高效](https://so.csdn.net/so/search?q=更高效&spm=1001.2101.3001.7020)的开发体验。