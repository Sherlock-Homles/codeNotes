## 1、安装和设置 Git

安装好 Git 之后，在命令行中输入以下命令来设置你的 GitHub 用户名和电子邮件：

```shell
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

## 2、创建一个新的 GitHub 仓库

在 GitHub 网站上创建一个新的仓库。点击右上角的 "+" 图标，然后选择 "New repository"。给你的仓库命名，你也可以选择添加一个描述。然后，选择是否要将这个仓库设为公开或私有，是否要初始化这个仓库，以及你想要添加的许可证和 .gitignore 文件。最后，点击 "Create repository"。

## 3、在本地初始化你的项目

打开一个终端，然后导航到你的项目目录。然后，初始化一个新的 Git 仓库：

```shell
cd 项目路径
git init
```

## 4、添加文件到你的 Git 仓库

使用以下命令将你的文件添加到新创建的 Git 仓库：

这个命令将会将你的所有文件和文件夹添加到仓库。如果你只想添加特定的文件，你可以替换 `.` 为你想要添加的文件名。

```shell
git add .
```

## 5、提交你的改动

所有的改动都已经被添加到了暂存区，现在你需要提交这些改动。使用以下命令来提交：

```shell
git commit -m "你的提交信息"
```

提交信息应该是描述你所做改动的简短的信息。

## 6、连接你的 GitHub 仓库

你的本地仓库需要知道你的 GitHub 仓库的地址。使用以下命令来添加这个地址：

```shell
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

## 7、将你的改动推送到 GitHub

最后，使用以下命令将你的改动推送到你的 GitHub 仓库：

```shell
git push -u origin master
```

如果你创建仓库时选择了 "Initialize this repository with a README"，那么可能会因为远程仓库比本地仓库多一个 README 文件而导致推送失败。在这种情况下，你需要先用以下命令将远程仓库的改动拉取到本地：

```shell
git pull origin master
```

然后，再执行 `git push -u origin master`。

如果你设置了双重身份验证，你可能需要生成一个访问令牌，并在被要求输入密码时使用这个访问令牌。