### 1、创建和合并分支

>- *分支创建：git branch*
>- *分支切换：git checkout*
>- *分支创建并切换：git checkout -b*
>- *分支合并：git merge*
>- *分支查看：git branch*
>- *分支删除：git branch -d*

### 2、流程

> 1.基于远程库分支创建分支
>
> ```shell
> # 以远程库中的master分支为起点，在本地创建一个master分支
> git checkout -b master origin/master
> ```
>
> 2.切换分支
>
> ```shell
> # 切换到master分支
> git checkout master
> ```
>
> 3.查看本地分支列表
>
> ```shell
> # 查看当前分支
> $ git branch
>   develop
>   feature-hz
> * master
> 
> ```
>
> 4.合并master分支到feature-hz分支
>
> ```shell
> # 合并本地分支
> $ git merge master
> Already up to date.
> # 合并远程分支
> git merge origin/<remote-branch-name>
> ```
>
> 5.填写合并信息
>
> 退出编辑模式到命令模式，保存并退出
>
> ```shell
> ESC
> :wq
> ```
>
> 6.执行git status查看状态
>
> 7.通过git log --graph查看分支图