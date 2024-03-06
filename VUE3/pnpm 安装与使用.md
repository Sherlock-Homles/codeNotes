### 一、概念

performant npm ，意味 “高性能的 npm”。[pnpm](https://so.csdn.net/so/search?q=pnpm&spm=1001.2101.3001.7020) 由 npm/yarn 衍生而来，解决了 npm/yarn 内部潜在的 bug，极大的优化了性能，扩展了使用场景。被誉为 “最先进的包管理工具”

### 二、特点

速度快、节约磁盘空间、支持 monorepo、安全性高

pnpm 相比较于 yarn/npm 这两个常用的包管理工具在性能上也有了极大的提升，根据目前官方提供的 [benchmark](https://so.csdn.net/so/search?q=benchmark&spm=1001.2101.3001.7020) 数据可以看出在一些综合场景下比 npm/yarn 快了大概两倍。

### 三、存储管理

按内容寻址、采用 symlink

### 四、依赖管理

npm1、npm2 采用递归管理，npm3、npm3+、yarn 依赖扁平化管理消除依赖提升。

pnpm 依赖策略：消除依赖提升、规范拓扑结构

### 五、安全

之前在使用 npm/yarn 的时候，由于 node_module 的扁平结构，如果 A 依赖 B， B 依赖 C，那么 A 当中是可以直接使用 C 的，但问题是 A 当中并没有声明 C 这个依赖。因此会出现这种非法访问的情况。 但 pnpm 自创了一套依赖管理方式，很好地解决了这个问题，保证了安全性。

### 六、安装

npm i pnpm -g

### 七、查看版本信息

![img](https://img-blog.csdnimg.cn/d854e76e78644d249c6a27d5e2fd7f0b.png)

### 八、升级版本

pnpm add -g pnpm to update

### 九、设置源

pnpm config get registry // 查看源

pnpm config set registry https://registry.npmmirror.com // 切换淘宝源

![img](https://img-blog.csdnimg.cn/e55740b3fccb4e64841b84fdada92caa.png)

### 十、安装项目依赖

pnpm install

### 十一、运行项目

pnpm run dev

### 十二、pnpm-workspace 实现单一代码库

[架构 - 单一代码库 - monorepo-pnpm-workspace：基本使用\_snow@li 的博客 - CSDN 博客](https://blog.csdn.net/snowball_li/article/details/129699389)

### 十三、相关记录

13.1、出现类似包不能解析的问题

![img](https://img-blog.csdnimg.cn/4f3c7e5551f2497999e1e4b0c8dc5c5b.png)

解决：

根目录创建 .npmrc 文件

```json
shamefully-hoist = true
```

删除 node_modules，再次执行 pnpm install ，解决成功

有些包仅在根目录的 node_modules 时才有效，可以通过此配置，提升那些不在 node_modules 根目录的包。

或者执行：

pnpm i --shamefully-hoist

两种方法均测试成功。

### 十四、参考链接

[Fast, disk space efficient package manager | pnpm 官网](https://pnpm.io/)

[百度安全验证](https://baijiahao.baidu.com/s?id=1712299680972583580&wfr=spider&for=pc)

[pnpm 简述\_一只小白菜~ 的博客 - CSDN 博客\_pnpm](https://blog.csdn.net/weixin_43106777/article/details/121745882)

[pnpm 使用教程\_小沈曰的博客 - CSDN 博客\_pnpm 使用](https://blog.csdn.net/shentian885/article/details/122237746)

[Vite+TS 带你搭建一个属于自己的 Vue3 组件库 - 哔哩哔哩](https://www.bilibili.com/read/cv17485496)

### 十五、设置全局包的安装路径

在使用[PNPM](https://link.juejin.cn/?target=https%3A%2F%2Fpnpm.io 'https://pnpm.io')默认的全局配置时，它会在系统盘存储你全局安装的 NPM 包，使用久了，安装全局的包多了，自然就会占用很多系统盘的存储空间，对于给系统盘分配较小的存储空间的小伙伴是不太友好的，而且重装系统时也同样会被格式化。 在安装 PNPM 时给它改变全局安装的位置，让系统盘的做它应该做的事

#### 配置

主要分为 2 个步骤：

1. 配置 PNPM 全局安装路径
2. 配置 PNPM 环境变量
3. 加载配置

#### 配置 PNPM 全局安装路径

在 pnpm 的配置文件中配置以下配置:

1. 配置 PNPM 全局安装路径
2. 配置 PNPM 全局 bin 文件安装路径
3. 配置 PNPM cache 路径
4. 配置 PNPM state 路径

把 `E:\.pnpm-store`替换成 PNP 全局安装的路径

```powershell
pnpm config set global-bin-dir "E:\.pnpm-store"
pnpm config set cache-dir "E:\.pnpm-store\cache"
pnpm config set state-dir "E:\.pnpm-store\state"
pnpm config set global-dir "E:\.pnpm-store\global"
```

OR：

修改 `C:\Users\<User>\AppData\Local\pnpm\config\rc`或者 `C:\Users\<User>\.npmrc`文件： 把 `F:\.pnpm-store`替换成 PNP 全局安装的路径

```json
global-bin-dir=F:\.pnpm-store
cache-dir=F:\.pnpm-store\cache
state-dir=F:\.pnpm-store\state
global-dir=F:\.pnpm-store\global
```

#### 验证设置是否正确:

```powershell
pnpm c get
```

如果正确则不输入任何内容, 错误时显示格式化 JSON 错误项,修改对应错误即可

#### 配置 PNPM 环境变量

> 给 PNPM 找到你配置的全局安装路径

1. `WIN`+`S`快捷键 -> 编辑系统环境变量 -> 环境变量 -> 新建系统变量
2. 设置 PNPM 环境变量映射:
   1. PNPM 仓库名: `PNPM_HOME`
   2. PNPM global-bin-dir 全局安装路径, 例如: `E:/.pnpm-store`
3. 系统的 `Path`变量变量添加`%PNPM_HOME%值

#### 加载配置

```powershell
pnpm setup
```

#### 检验

测试设置的路径是否是自己设置

```powershell
pnpm c list
```
