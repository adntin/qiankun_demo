#!/bin/bash

###### 1.拷贝代码文件 ######
# 微应用 --> 主应用
mkdir -p main/build/react18
# mkdir -p main/build/vue3
cp -a react18/build/* main/build/react18
# cp -a vue3/build/* main/build/vue3

###### 2.移动代码文件 ######
# 移除站点目录
rm -rf $HOME/Desktop/www
# 创建站点目录
mkdir -p $HOME/Desktop/www
# 拷贝文件
cp -a main/build/* $HOME/Desktop/www

###### 3.启动服务 ######
cd $HOME/Desktop/www
# http-server-spa <directory> <fallback> <port>
http-server-spa ./ ./index.html 8888
