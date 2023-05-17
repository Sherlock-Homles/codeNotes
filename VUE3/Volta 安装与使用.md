## Volta 初识

本文引用官方地址: [https://docs.volta.sh/guide/understanding](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.volta.sh%2Fguide%2Funderstanding)

### 什么是 Volta

官方说法: Volta’s job is to manage your JavaScript command-line tools, such as `node`, `npm`, `yarn`, or executables shipped as part of JavaScript packages.

即 Volta 是一个 node/npm/yarn 的管理工具, 可以快速切换项目中使用的 node 版本而无需重装 node.

### 安装 Volta

[安装链接](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvolta-cli%2Fvolta%2Freleases%2Fdownload%2Fv1.0.8%2Fvolta-1.0.8-windows-x86_64.msi): [https://github.com/volta-cli/volta/releases/download/v1.0.8/volta-1.0.8-windows-x86_64.msi](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fvolta-cli%2Fvolta%2Freleases%2Fdownload%2Fv1.0.8%2Fvolta-1.0.8-windows-x86_64.msi)

与安装 node 类似, 一直点下一步即可 (这里默认是装到 C 盘, 安装时不能选择安装位置需要额外进行配置, 是挺坑的)

安装成功之后, 在命令行中输入: `volta` , 如果能正常显示内容即表明安装成功

### 配置 Volta

一般来说, volta 安装成功之后就能正常使用了, 但默认是装到 C 盘, 后续可能会安装各种不同版本的 node/npm/yarn, 很占据 C 盘空间, 因此需要迁移到 C 盘之外 (如果 C 盘空间足够大, 可忽视这一步)

1. 在 D 盘新建一个文件夹, 用于存放 volta 相关东西, 如`D:\epositorysVolta`

将 C 盘中原来的 volta 文件迁移到 epositorysVolta 文件夹中 (原 volta 应在位置: `C:\Program Files\Volta`)

2. 在系统环境变量中配置:

​		2.1 新建环境变量: `VOLTA_HOME` 其值为: `D:\epositorysVolta`

​		2.2 修改 path 文件中原来 volta 的值, 改为: `%VOLTA_HOME%`

3. 在用户环境变量中设置:

​		3.1 在原来的 volta\bin 改为: `%VOLTA_HOME%\bin`

4. 重新打开命令行, 重新输入 volta, 此时还能正常显示即为修改成功

### 使用 Volta

Volta 的使用相对简单

#### 安装 nodejs

首先全局安装 Volta 的 node 版本

```json
volta install node@14.15.5
```

其中 14.15.5 就是假设你可能需要需要的版本

您不需要指定精确的版本，在这种情况下，Volta 会选择一个合适的版本来匹配您的请求：

```json
volta install node@14
```

当前, 如果你需要安装最新的 nodejs 版本则更加简单

```json
volta install node
```

此时, 命令行执行: `volta list` 就可以看到你之前安装的 node 版本, 正常安装的 nodejs 版本一样, 安装成功之后会附带一个 npm 版本, 当然也可以使用 volta 进行版本控制, 安装方式跟上述的一样

#### 切换至当前项目指定的 node 版本

进入项目的根目录, 并执行

```
volta pin node@14.15.5
```

此时, 项目的`package.json`就会多出

```json
{
    "volta": {
        "node": "14.15.5"
    }
}
```

值得注意是, 如果项目中没有 package.json 文件时, 指定版本会直接报错

版本切换确认

在两个设置了 node 版本的项目中分别执行: `node --version`, 如果得出两个不同的值, 则表示切换成功

#### 常用命令

```json
volta list //查看存在的版本
volta install node //安装最新版的nodejs
volta install node@12.2.0 //安装指定版本
volta install node@12 //volta将选择合适的版本安装
volta pin node@10.15 //将更新项目的package.json文件以使用工具的选定版本
volta pin yarn@1.14 //将更新项目的package.json文件以使用工具的选定版本
```

