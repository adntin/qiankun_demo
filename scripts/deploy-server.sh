#!/bin/bash

###### 1.拷贝代码文件 ######
# 微应用 --> 主应用
mkdir -p main/build/react18
# mkdir -p main/build/vue3
cp -a react18/build/* main/build/react18
# cp -a vue3/build/* main/build/vue3

###### 2.压缩代码文件 ######
# 解压文件，不想包含多层目录，需要进入具体目录
cd ./main/build
# 包含`*.map`调试文件，用于备份
# zip -r build-1.2.3.zip ./main/build/*
# 剔除`*.map`调试文件，用于发布
# zip -r build.zip ./main/build/* -x "*.map"
zip -r build.zip ./* -x "*.map"

###### 3.移动压缩文件 ######
# 移除站点目录
rm -rf $HOME/Desktop/www
# 创建站点目录
mkdir -p $HOME/Desktop/www
# 移动文件
mv ./build.zip $HOME/Desktop/www

###### 4.解压代码文件 ######
cd $HOME/Desktop/www
unzip ./build.zip

###### 5.删除压缩文件 ######
rm -rf $HOME/Desktop/www/build.zip

###### 6.启动服务 ######
cd $HOME/Desktop/www
# http-server-spa <directory> <fallback> <port>
http-server-spa ./ ./index.html 9999