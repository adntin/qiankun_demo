import './index.scss';
import {
  registerMicroApps,
  start,
  initGlobalState,
  setDefaultMountApp,
  runAfterFirstMounted,
} from 'qiankun';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from './ReactRender';
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = (loading) => render({ loading });

/**
 * Step2 注册子应用
 */

// 部署之后注意三点：
// 1. activeRule 不能和微应用的真实访问路径一样，否则在主应用页面刷新会直接变成微应用页面。
// 2. 微应用的真实访问路径就是微应用的 entry，entry 可以为相对路径。
// 3. 微应用的 entry 路径最后面的 / 不可省略，否则 publicPath 会设置错误，例如子项的访问路径是 http://localhost:8080/app1,那么 entry 就是 http://localhost:8080/app1/。

registerMicroApps(
  [
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
    {
      name: 'react16',
      entry: '//localhost:7100',
      container: '#subapp-viewport',
      loader,
      activeRule: '/react16',
    },
    {
      name: 'react15',
      entry: '//localhost:7102',
      container: '#subapp-viewport',
      loader,
      activeRule: '/react15',
    },
    {
      name: 'vue',
      entry: '//localhost:7101',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue',
    },
    {
      name: 'angular9',
      entry: '//localhost:7103',
      container: '#subapp-viewport',
      loader,
      activeRule: '/angular9',
    },
    {
      name: 'purehtml',
      entry: '//localhost:7104',
      container: '#subapp-viewport',
      loader,
      activeRule: '/purehtml',
    },
    {
      name: 'vue3',
      entry: '//localhost:7105',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue3',
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log(
          '[LifeCycle] after unmount %c%s',
          'color: green;',
          app.name,
        );
      },
    ],
  },
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) =>
  console.log('[onGlobalStateChange - master]:', value, prev),
);

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/app-react18');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
