# frontend-template-vue3

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Nightwatch](https://nightwatchjs.org/)

```sh
# When using CI, the project must be built first.
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chrome
npm run test:e2e -- --env chrome
# Runs the tests of a specific file
npm run test:e2e -- tests/e2e/example.js
# Runs the tests in debug mode
npm run test:e2e -- --debug
```
    
### Run Headed Component Tests with [Nightwatch Component Testing](https://nightwatchjs.org/guide/component-testing/introduction.html)
  
```sh
npm run test:unit
npm run test:unit -- --headless # for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## 代码结构
```
--- src 
  |--- api: 按模块配置接口路径，页面通过`proxy.$api.(自定义模块).(自定义接口名)` 
  |--- assets: 前端资源 
  |  |--- img 
  |  |--- theme：Elementplus样式配置 
  |  |--- scss：系统样式（含：参数、重置、通用、方法等） 
  |--- components：按模块归类系统组件 
  |  |--- common：全局通用系统组件 
  |  |--- mainContainer.vue：主体内容box 
  |--- plugins 
  |  |--- api.js: 接口挂载到vue 
  |  |--- utils.js：通用方法、filters方法，`proxy.$util.(方法名)`、`{{ proxy.$filters.方法(text) }}`、`proxy.$axios.post()` 
  |--- router：路由配置 
  |  |--- hooks：路由beforEach钩子函数配置 
  |  |--- index.js 
  |--- store：piana配置 
  |--- utils：通用方法、filter、axios拦截、错误处理等 
  |  |--- ajax.js 
  |  |--- apiErrorHandler.js 
  |  |--- filter.js 
  |  |--- index.js 
  |  |--- util.js 
  |  |--- wxConfig.js：微信公众号开发配置 
  |--- views：主体页面 
  |  |--- example：例子参考页面
  |  |   |---components：页面业务组件
  |  |   |--- index.vue
  |  |--- error：错误页面 
  |  |--- 按模块添加页面 
  |--- app.vue 
  |--- main.js 
```

## Vue、Vue-router、pinia 自动引入
```js
// import AutoImport from 'unplugin-auto-import/vite';
// 会自动生成auto-imports.d.ts文件
AutoImport({
  // 兼容jsx
  resolvers: [ElementPlusResolver()],
  imports: ['vue', 'vue-router', 'pinia'],
  // eslint报错解决
  // eg: toRef is not define
  eslintrc: {
    enabled: true, // Default `false`，true时会生成eslintrc-auto-import.json文件
    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  }
}),
```
## ElementPlus按需引入&主题色配置&icon引入

### 按需引入
```js
// unplugin-vue-components/resolvers
// unplugin-icons/resolver
// 会自动生成components.d.ts文件
Components({
  // 指定公用组件目录
  dirs: ['src/components/common'],
  // ui库解析器
  resolvers: [
    ElementPlusResolver({
      // 以scss引入样式，便于引入自定义主题色
      importStyle: 'sass'
    }),
    IconsResolver({
      prefix: 'icon', // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
      // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
      // alias: { park: 'icon-park' } 集合的别名
      enabledCollections: ['ep'] // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
    })
  ],
  extensions: ['vue', 'jsx'],
}),
```

### 主题色配置
```js
// 配置文件@assets/theme/index.scss
// elmentPlus在自动引入的时候，记得importStyle: 'sass'，否则不生效
css: {
  preprocessorOptions: {
    scss: {
      // 使用@use替代@import
      additionalData: `
        @use '@assets/theme/index.scss' as *;`
    }
  }
},
```
### elementPlus icon引入
```js
// Icon图标引入
// 结合IconsResolver按需引入
Icons({
  // scale: 1, // 缩放
  compiler: 'vue3', // 编译方式
  // defaultClass: '', // 默认类名
  // defaultStyle: '', // 默认样式
  autoInstall: true
  // jsx: 'react' // jsx支持
}),
```
