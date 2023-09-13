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

## 2、工程文件解析

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

### 2.2、集成 eslint 语法检查插件

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

### 2.3、集成prettier

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

### 2.4、配置 husky

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

### 2.3、集成Element Plus组件库

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

