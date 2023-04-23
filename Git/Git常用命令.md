# 常用Git命令清单

一般来说，日常使用只要记住下图6个命令，就可以了。但是熟练使用，恐怕要记住60～100个命令。

[![img](https://camo.githubusercontent.com/0fb4f6a72339b5b1ef5998b0c44a022852c7741b77fd9190717c97e527869cc5/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353132303930312e706e67)](https://camo.githubusercontent.com/0fb4f6a72339b5b1ef5998b0c44a022852c7741b77fd9190717c97e527869cc5/687474703a2f2f7777772e7275616e796966656e672e636f6d2f626c6f67696d672f61737365742f323031352f6267323031353132303930312e706e67)

下面是我整理的常用 Git 命令清单。几个专用名词的译名如下。

> - Workspace：工作区
> - Index / Stage：暂存区
> - Repository：仓库区（或本地仓库）
> - Remote：远程仓库

## 一、新建代码库

```
# 在当前目录新建一个Git代码库
$ git init

# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

# 下载一个项目和它的整个代码历史
$ git clone [url]
```

## 二、配置

Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

```
# 显示当前的Git配置
$ git config --list

# 编辑Git配置文件
$ git config -e [--global]

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```

## 三、增加/删除文件

```
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```

## 四、代码提交

```
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```

## 五、分支

```
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

## 六、标签

```
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```

## 七、查看信息

```
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog
```

## 八、远程同步

```
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all
```

## 九、撤销

```
# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```

## 十、常用操作组合

### 1. 修改本地分支名和远程分支名

```
git branch -m old_branch new_branch # 重命名本地分支
git push origin :old_branch # 删除远程旧分支（分支名前有冒号）
git push --set-upstream origin new_branch # 推送新的分支，并设置本地分支跟踪新的远程分支
```

**相关文章：**

[《如何撤销 Git 操作？》](http://www.ruanyifeng.com/blog/2019/12/git-undo.html)

[《git cherry-pick 教程》](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html) 复制某分支上的部分提交到另一个分支上（相对于可以选择指定提交的 rebase 操作）。

> 命令清单来源：https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html





# rebase分支合并

## 说明

以下 `v2` 是某个需求的开发分支， `dev`是总的开发分支，`v2` 是基于`dev`分支签出的。

当完成`v2`的开发后，需要把代码合并到`dev`，我们可以使用`rebase`进行合并：

```
# 首先将 v2 push到远程仓库
git add .
git commit -m 'xxx'
git push origin v2

# 切换到 dev 拉取最新代码
git checkout dev
git pull origin dev

# 切换到 v2
git checkout v2
git rebase dev # 将 v2 的所有[commit] 变基到(应用到) dev

# 切换到 dev
git checkout dev
git merge v2  # 将 dev分支 快进合并 （此时 (HEAD -> dev, v2) [commit] 两个分支指向同一个提交）

# 查看 原v2的[commit]记录 是否在dev分支的最前面（变基成功会把v2的提交记录应用到dev分支的最前面）
git log

	# 如果到这一步发现有问题，尝试使用 git --abort中止变基，如果还是有问题的可以在dev分支上使用《后悔药》操作， 再到v2分支上使用《后悔药》操作，即可使两个分支都回退到 rebase变基 之前的状态

# 试运行项目是否有问题
yarn start

git status # 查看状态是否有问题
git push origin dev # 推送到远程仓库的 dev
```

### 变基要遵守的准则

**几个人同时在一个分支上进行开发和提交时，开发中途请不要私自执行变基，只有在大家都完成工作之后才可以执行变基。**

### 变基的实质

变基操作的实质是丢弃一些现有的提交，然后相应地新建一些内容一样但实际上不同的提交。 因此，**变基操作过后的分支将不要再使用**。

## 后悔药

```
# 查看HEAD指针变动记录
git reflog
# 记录示例(当前分支是v2):
07c398f (HEAD -> v2, master) HEAD@{0}: checkout: moving from master to v2
07c398f (HEAD -> v2, master) HEAD@{1}: rebase (finish): returning to refs/heads/master
07c398f (HEAD -> v2, master) HEAD@{2}: rebase (start): checkout v2
15a97d8 HEAD@{3}: reset: moving to 15a97d8
07c398f (HEAD -> v2, master) HEAD@{4}: merge v2: Fast-forward
15a97d8 HEAD@{5}: checkout: moving from v2 to master
07c398f (HEAD -> v2, master) HEAD@{6}: rebase (finish): returning to refs/heads/v2
07c398f (HEAD -> v2, master) HEAD@{7}: rebase (pick): C
15a97d8 HEAD@{8}: rebase (start): checkout master # 首次rebase
d278ecd HEAD@{9}: checkout: moving from master to v2 # rebase前的状态
15a97d8 HEAD@{10}: commit: D

# 可见，示例中最初的 rebase 操作是 HEAD@{8}，想回退到变基前的状态需让指针指向 HEAD@{9}
git reset --hard d278ecd  # 重置当前分支的HEAD为指定[commit]，同时重置暂存区和工作区，与指定[commit]一致

# 此时打印 log 查看是否回到之前的状态
git log
```

**注意：此操作只能回退当前的分支，如其他分支也要回退，需要切换到该分支并执行上面操作。**

## 开发期间的rebase操作

### 背景

有两个分支：

```
dev
*v2
```

`v2` 是基于`dev`切出来的。

提交记录如下：

```
		dev
a - b - c
		v2
```

开发期间，两个分支同时有新的commit ：

```
				dev
a - b - c - d - e
		\ - f - g
				v2
```

当前你正在`v2`进行开发，`dev`也同时进行开发，并有重大的改变，你需要把`dev`的提交同步到`v2`。

**需求： 把`dev`中新的提交同步到`v2`，且不能影响`dev`分支。**

### 操作步骤

1. 基于最新的 `dev` 切一个新的分支 `dev-copy`

   > `dev-copy` 和 `dev` 两者的 commit ID 一致。

2. 在`dev-copy`中执行rebase，将 `dev-copy` 的提交变基到 `v2`

   ```
   git rebase v2 # 将 dev-copy 的提交[commit] 变基到(应用到) v2
   ```

3. 删除原`v2`分支，将`dev-copy`分支名改为`v2`

   ```
   # 当前在 dev-copy 分支
   git branch -d v2 # 删除分支
   git branch -m dev-copy v2 # 重命名
   ```

## git cherry-pick

来源：[《git cherry-pick 教程》](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

用于将单个或几个`[commit]`复制到另一个分支。

### 基本应用

```
git cherry-pick <commitHash> # 将commitHash应用于当前分支
```

上面命令就会将指定的提交`commitHash`，应用于当前分支。这会在当前分支产生一个新的提交，当然它们的**哈希值会不一样**。

git cherry-pick命令的参数，不一定是提交的哈希值，分支名也是可以的，表示转移该分支的最新提交。

### 转移多个提交

Cherry pick 支持一次转移多个提交。

```
git cherry-pick <HashA> <HashB> # A和B提交
```

上面的命令将 A 和 B 两个提交应用到当前分支。这会在当前分支生成两个对应的新提交。

如果想要转移一系列的连续提交，可以使用下面的简便语法。

```
git cherry-pick A..B # A到B提交，不包含A
```

上面的命令可以转移从 A 到 B 的所有提交。它们必须按照正确的顺序放置：提交 A 必须早于提交 B，否则命令将失败，但不会报错。

**注意，使用上面的命令，提交 A 将不会包含在 Cherry pick 中。如果要包含提交 A，可以使用下面的语法。**

```
git cherry-pick A^..B # A到B提交，包含A
```