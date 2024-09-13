### 1、实现的样式

![image](https://github.com/Sherlock-Homles/picx-images-hosting/raw/master/20240913/image.6wqokahhtz.webp)

### 2、实现过程

```vue
<template>
    <div class="app-container">
        <el-tabs tab-position="left" v-model="activeTab" class="custom-tabs">
            <el-tab-pane label="房屋信息" name="first">
            </el-tab-pane>
            <el-tab-pane label="楼栋配置" name="second">
                <template slot="label">
                    <div class="tab-label-second">
                        楼栋配置
                    </div>
                </template>
            </el-tab-pane>
            <el-tab-pane label="标签配置" name="third">
                <template slot="label">
                    <div class="tab-label-third">
                        标签配置
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeTab: 'first'
            }
        }
    }
</script>
<style scoped lang="scss">
    .app-container {
        /* 自定义 Tabs */
        .custom-tabs {
            height: 100%;
            display: flex;
            /* 定义 Tabs 左侧导航样式 */
            /deep/ .el-tabs__nav-wrap.is-left::after {
                display: none;
            }
            /deep/ .el-tabs__active-bar {
                display: none;
            }
            /deep/ .el-tabs__header {
                width: 50px;
                height: 100%;
                background-color: transparent; /* 背景色 */
                border: none;
                padding: 0;
            }
            /deep/ .el-tabs--left .el-tabs__nav {
                width: 100%;
                display: block;
            }
            /deep/ .el-tabs__item {
                writing-mode: vertical-lr; /* 从上到下竖向显示 */
                text-orientation: upright; /* 竖向文字方向为正立 */
                padding: 5px;
                font-size: 16px;
                text-align: center;
                width: 51px;
                height: 140px;
                font-size: 16px;
                color: #115fdf; /* 标签文字颜色 */
                box-shadow: 0 2px 5px 0 #5e6e9036;
                background-color: #ffffff;
            }
            /* 选中状态 */
            /deep/ .el-tabs__item.is-active {
                background-color: #809cdc; /* 选中项背景色 */
                color: #ffffff; /* 选中项文字颜色 */
                font-weight: 400;
                font-size: 16px;
            }
            /* 未选中项悬停效果 */
            /deep/ .el-tabs__item:hover {
                background-color: #f0f2f5; /* 悬停时背景色 */
                cursor: pointer;
            }
            /* 右侧内容样式 */
            /deep/ .el-tab-pane {
                width: 100%;
                height: 100%;
            }
            /deep/ #tab-first {
                /*clip-path: polygon(0 0, 76% 0, 24% 100%, 0% 100%);*/
                background: linear-gradient(45deg, transparent 35px, #ffffff 0) top
                    right;
                padding-bottom: 30px;
            }
            /deep/ #tab-second {
                transform: skewY(45deg);
                position: relative;
                top: -20px;
            }
            /deep/ .tab-label-second {
                /* div斜了会影响里面的文本，所以需要把div斜了，让文本正常，文本就要逆向倾斜，并且包裹文本的元素必须是块级元素 */
                transform: skewY(-45deg);
            }
            /deep/ #tab-third {
                transform: skewY(45deg);
                position: relative;
                top: -16px;
            }
            /deep/ .tab-label-third {
                transform: skewY(-45deg);
            }
            /deep/ #tab-first:hover {
                background: linear-gradient(45deg, transparent 35px, #809cdc 0) top
                    right;
                color: #ffffff; /* 选中项文字颜色 */
                transition: all 0.5s;
                transform: scale(0.95);
            }
            /deep/ #tab-first.is-active {
                background: linear-gradient(45deg, transparent 35px, #809cdc 0) top
                    right;
                color: #ffffff; /* 选中项文字颜色 */
                transition: all 0.5s;
                transform: scale(0.95);
            }
            /deep/ #tab-second:hover {
                background-color: #809cdc; /* 选中项背景色 */
                color: #ffffff; /* 选中项文字颜色 */
                transform: scale(0.95) skewY(45deg);
                transition: all 0.5s;
            }
            /deep/ #tab-third:hover {
                background-color: #809cdc; /* 选中项背景色 */
                color: #ffffff; /* 选中项文字颜色 */
                transform: scale(0.95) skewY(45deg);
                transition: all 0.5s;
            }
        }
    }
</style>
```

> 参考资料：[css实现div斜边](https://www.jianshu.com/p/047f42c3ffc7)

