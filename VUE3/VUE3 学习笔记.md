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
