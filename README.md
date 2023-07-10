# 步骤

## 创建 React 主应用

1. 创建仓库配置，命令如下

```shell
yarn init -y
```

2. 创建工程项目，命令如下

```shell
yarn create react-app main
```

4. 修改文件`main/public/index.html`
5. 修改文件`main/src/index.js`
6. 修改文件`main/src/index.scss`

## 创建 React 微应用

1. 创建工程项目，命令如下

```shell
yarn create react-app react18
```

2. 弹出工程配置，命令如下

```shell
yarn eject
```

3. 创建文件`react18/.env`，配置端口，内容如下

```shell
  # 主应用 + 微应用，端口唯一
  PORT=8101
  # `yarn start` 可验证
```

4. 创建文件`react18/src/public-path.js`，内容如下

```js
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

5. 修改文件`react18/src/index.js`，并导入`public-path.js`
6. 修改文件`react18/config/webpack.config.js`，内容如下

```js
const packageName = require('../package.json').name;
return {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    // jsonpFunction: `webpackJsonp_${packageName}`, // Webpack 5.x 不支持，注释即可
  },
};
```

7. 修改文件`/package.json`，内容如下

```json
{
  "scripts": {
    "start": "npm-run-all --parallel start:*",
    "start:main": "cd ./main && yarn start",
    "start:react18": "cd ./react18 && yarn start"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

8. 根目录下运行命令

```shell
yarn start
```

## 打包部署

1. 修改文件`/package.json`，内容如下

```json
{
  "scripts": {
    "build": "npm-run-all --parallel build:*",
    "build:main": "cd ./main && yarn build",
    "build:react18": "cd ./react18 && yarn build",
    "deploy:local": "bash scripts/deploy-local.sh",
    "deploy:server": "bash scripts/deploy-server.sh"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

2. 添加服务`http-server-spa`，命令如下

```shell
sudo npm install http-server-spa -g
```

3. 构建应用

```shell
# 构建文件
yarn build
# 本地验证
yarn deploy:local
# 正式环境
yarn deploy:server
```

## Nginx 配置

```
server {
  listen       443;
  server_name  localhost;

  location / {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }

  location /react18 {
    root   html;
    index  index.html index.htm;
    try_files $uri $uri/ /react18/index.html;
  }
  # 其它微应用配置同上
}
```
