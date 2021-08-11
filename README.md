# vue_ros

## 介绍

> 基于Roslibjs和Websocket实现了Vue.js框架与ROS话题服务通信

## 演示

### 动画

![](screenshots/动画.gif)

### 首页

![](screenshots/首页.png)

### 面板

![](screenshots/面板.png)

## 项目依赖

### [roslibjs](http://wiki.ros.org/roslibjs)

> The Standard ROS JavaScript Library
>
> CDN https://static.robotwebtools.org/roslibjs/current/roslib.js
>
> DOC http://robotwebtools.org/jsdoc/roslibjs/current/

### [vuejs](https://cn.vuejs.org/)

> 渐进式JavaScript 框架
>
> 示例 https://cn.vuejs.org/v2/examples/
>
> DOC https://cn.vuejs.org/v2/api/

### [ROS](https://www.ros.org/)

> Robot Operating System, 机器人操作系统
>
> Core https://www.ros.org/core-components/
>
> DOC http://wiki.ros.org/Documentation

## 使用

### 下载项目
```shell
git clone https://github.com/gengwenhao/vue_ros
cd vue_ros
```

### 下载Node.js
```shell
nvm use 14.15.4
```

### 安装依赖

```shell
npm install yarn -g
yarn config set registry http://registry.npm.taobao.org
yarn install
```

### 启动项目

```shell
yarn serve
```
