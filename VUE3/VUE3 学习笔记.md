## 1、创建Vue3.0工程

### 1.1、使用 vue-cli 创建

```shell
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或升级@vue/cli
npm install -g @vue/cli
## 创建
vue -creat vue3_first
## 启动
cd vue3_first
npm run server
```

### 1.2、使用 vite 创建

https://vitejs.cn/vite3-cn/guide/

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。

```shell
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

### 1.3、使用 pnpm 创建 vite 工程

```shell
# pnpm
pnpm create vite
# 可以通过附加的命令行选项直接指定项目名称和想要使用的模板。
pnpm create vite vite3-vue3 -- --template vue
```

![img](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/1693996119890.xv01d2kaz40.webp)

![img](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/1693996221191.3nx8bd9u2660.webp)

## 2、工程文件解析和基本配置

### 2.1、main.ts 入口文件

```typescript
// 引入的不再是Vue构造函数，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更"轻")
const app = createApp(App)
console.log('实例对象',app);
// 挂载
app.mount('#app')
```

![img](https://cdn.staticaly.com/gh/Sherlock-Homles/gallery@main/image.3nju8hxc8dm0.webp)

### 2.2、配置 eslint

安装 eslint

```shell
npm install -D eslint
```

初始化 eslint

```shell
npx eslint --init
```

在package.json中增加一句脚本用于检测和修复代码：

```json
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix"
```

### 2.3、配置 prettier

安装prettier

```shell
pnpm add prettier -D
```

在根目录下新建`.prettierrc.js`

```javascript
export const printWidth = 80;
export const tabWidth = 2;
export const useTabs = false;
export const singleQuote = true;
export const semi = false;
export const trailingComma = "none";
export const bracketSpacing = true;
```

在`package.json`中的`script`中添加以下命令

```json
{
    "scripts": {
        "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    }
}
```

### 2.4、配置 styleling

stylelint为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。

安装styleling

```shell
pnpm add stylelint postcss postcss-less postcss-html stylelint-config-prettier stylelint-config-recommended-less stylelint-config-standard stylelint-config-standard-vue stylelint-less stylelint-order -D
```

依赖说明

- [stylelint](https://link.juejin.cn?target=https%3A%2F%2Fstylelint.io%2F): `css`样式lint工具
- [postcss](https://link.juejin.cn?target=https%3A%2F%2Fwww.postcss.com.cn%2F): 转换`css`代码工具
- [postcss-less](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fshellscape%2Fpostcss-less): 识别`less`语法
- [postcss-html](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgucong3000%2Fpostcss-html): 识别html/vue 中的`<style></style>`标签中的样式
- [stylelint-config-standard](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fstylelint%2Fstylelint-config-standard): `Stylelint`的标准可共享配置规则，详细可查看官方文档
- [stylelint-config-prettier](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprettier%2Fstylelint-config-prettier): 关闭所有不必要或可能与`Prettier`冲突的规则
- [stylelint-config-recommended-less](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fssivanatarajan%2Fstylelint-config-recommended-less): `less`的推荐可共享配置规则，详细可查看官方文档
- [stylelint-config-standard-vue](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fota-meshi%2Fstylelint-config-standard-vue): lint`.vue`文件的样式配置
- [stylelint-less](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fssivanatarajan%2Fstylelint-less): `stylelint-config-recommended-less`的依赖，`less`的`stylelint`规则集合
- [stylelint-order](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fhudochenkov%2Fstylelint-order): 指定样式书写的顺序，在`.stylelintrc.js`中`order/properties-order`指定顺序

增加`.stylelintrc.js`配置文件

```javascript
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended-less',
    'stylelint-config-standard-vue'
  ],
  plugins: ['stylelint-order'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
```

在`package.json`中的`script`中添加以下命令

```json
{
    "scripts": {
        "lint:style": "stylelint \"./**/*.{css,less,vue,html}\" --fix"
    }
}
```

### 2.5、配置 husky

虽然上面已经配置好了`eslint`、`preitter`与`stylelint`，但是还是存在以下问题。对于不使用`vscode`的，或者没有安装`eslint`、`preitter`与`stylelint`插件的同学来说，就不能实现在保存的时候自动的去修复与和格式化代码。这样提交到`git`仓库的代码还是不符合要求的。因此需要引入强制的手段来保证提交到`git`仓库的代码时符合我们的要求的。

`husky`是一个用来管理`git hook`的工具，`git hook`即在我们使用`git`提交代码的过程中会触发的钩子。

安装husky

```shell
pnpm add husky -D
```

在`package.json`中的`script`中添加一条脚本命令

```shell
{
    "scripts": {
        "prepare": "husky install"
    },
}
```

该命令会在`pnpm install`之后运行，这样其他克隆该项目的同学就在装包的时候就会自动执行该命令来安装`husky`。这里我们就不重新执行`pnpm install`了，直接执行`pnpm prepare`，这个时候你会发现多了一个`.husky`目录。

然后使用`husky`命令添加`pre-commit`钩子，运行

```shell
pnpm husky add .husky/pre-commit "pnpm lint && pnpm format && pnpm lint:style"
```

执行完上面的命令后，会在`.husky`目录下生成一个`pre-commit`文件

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint && pnpm format
```

现在当我们执行`git commit`的时候就会执行`pnpm lint`与`pnpm format`，当这两条命令出现报错，就不会提交成功。以此来保证提交代码的质量和格式。

### 2.6、配置 Element Plus 组件库

安装Element Plus

```shell
pnpm install element-plus
```

全局引入：

``main.ts``

```typescript
// 完整引入Element Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
```

安装unplugin-vue-components 和 unplugin-auto-import这两款插件：

```shell
pnpm install -D unplugin-vue-components unplugin-auto-import
```

``vite.config.ts``

```typescript
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

``tsconfig.json``

```json
{
  "compilerOptions": {
    ···
    /* Element Plus */
    "types": ["element-plus/global"]
  }
}
```

### 2.7、配置 vue-router 路由

#### 2.7.1、安装Vue-Router最新版本

```shell
pnpm i vue-router@next -S
```

创建``router``文件夹``index.js``

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login/indedx.vue'

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'login', path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHashHistory(), //路由模式
  routes: routes,
})

// 导航守卫
export default router
```

在``main.js``中引入

```typescript
// 引入vue-router
import router from './router'
app.use(router)
```

在``app.vue``中写好路由容器

```vue
<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
```

#### 2.7.2、遇到的问题

错误：找不到模块“@/views/login/index.vue”或其相应的类型声明。ts(2307)

``src/vite-env.d.ts``

```typescript
/// <reference types="vite/client" />
// 配置这个文件是 解决错误：找不到模块“@/views/login/index.vue”或其相应的类型声明。ts(2307)
// 这段代码告诉 TypeScript，所有以 .vue 结尾的文件都是 Vue 组件，可以通过 import 语句进行导入。这样做通常可以解决无法识别模块的问题。
declare module '*.vue' {
  import { Component } from 'vue'
  const component: Component
  export default component
}
```

#### 2.7.3、页面中的路由跳转

``homeIndex.vue``

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
const text = 'welcome home!'
const router = useRouter()
const toLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="buttonBox">
    <el-button type="primary" plain @click="toLogin">登 录</el-button>
    <el-button type="primary" plain>注 册</el-button>
  </div>
  <div>{{ text }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
```

### 2.8、配置“@“绝对路径

在Vue2的时候项目中@路径可以直接使用，不需要额外配置，但是Vue3中却需要手动配置。

#### 2.8.1、需要用到node其中的path模块和__dirname

```shell
pnpm i @types/node --save-dev
```

#### 2.8.2、在vite.config.ts文件中进行配置

```typescript
// 引入path
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  ···
  /* 路径配置 */
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
})
```

#### 2.8.3、配置是解决TS不识别@的问题

``tsconfig.json``

```json
{
  "compilerOptions": {
    ···
    /* 解决深层获取不到路径的问题 */
    // "noImplicitAny": false,
    "allowJs": true,
    "baseUrl": "./",
    "paths": {
      // @ 路径配置
      "@/*": ["src/*"]
    }
  }
}
```

