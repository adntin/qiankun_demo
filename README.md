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

4. 修改文件`main/public/index.html`，内容看具体文件
5. 修改文件`main/src/index.js`，内容看具体文件
6. 修改文件`main/src/index.scss`，内容看具体文件

## 创建 React 微应用

1. 创建工程项目，命令如下

```shell
yarn create react-app react18
```

2. 弹出工程配置，命令如下

```shell
yarn eject
```

3. 创建文件`react18/.env.development`，内容看具体文件

4. 创建文件`react18/src/public-path.js`，内容看具体文件

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

1. 修改主应用`main/src/index.js`文件，内容如下

```js
// Step2 注册子应用
registerMicroApps([
  {
    name: 'react18', // 微应用的名称，微应用之间必须确保唯一。建议跟`package.json#name`一致。
    entry:
      process.env.NODE_ENV === 'development'
        ? `//localhost:8801` // 本地调试，端口来自`/react18/.env.development`配置
        : '/react18/', // 生产环境，微应用的真实访问路径，结尾必须包含`/`
    container: '#subapp-viewport',
    loader,
    activeRule: '/app-react18', // 微应用的路由访问路径，不能与`entry`一样，否则在主应用页面刷新会直接变成微应用页面。
  },
  // ...
]);
// Step3 设置默认进入的子应用
setDefaultMountApp('/app-react18');
```

3. 修改主应用`main/public/index.html`文件，内容如下

```html
<li onclick="push('/app-react18')">React18</li>
```

4. 修改微应用`react18/src/App.js`文件，内容如下

```js
// `/app-react18`结尾不能加`/`，因为主应用注册子应用时`activeRule`属性结尾没有`/`
const basename = window.__POWERED_BY_QIANKUN__
  ? '/app-react18'
  : process.env.NODE_ENV === 'development'
  ? '/'
  : '/react18/';
```

5. 创建文件`react18/.env.production`文件，内容看具体文件

6. 创建文件`/scripts/deploy-local.sh`，内容看具体文件

7. 创建文件`/scripts/deploy-server.sh`，内容看具体文件

8. 修改文件`/package.json`，内容如下

```json
{
  "scripts": {
    "build": "npm-run-all --parallel build:*",
    "build:main": "cd ./main && yarn build",
    "build:react18": "cd ./react18 && yarn build",
    "deploy:local": "yarn build && bash scripts/deploy-local.sh",
    "deploy:server": "yarn build && bash scripts/deploy-server.sh"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

2. 添加服务`http-server`，命令如下

```shell
sudo npm install http-server -g
```

3. 构建应用

```shell
# 构建文件(可省略)
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
