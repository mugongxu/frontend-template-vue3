import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import nightwatchPlugin from 'vite-plugin-nightwatch';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect';
import legacy from '@vitejs/plugin-legacy';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    // 打包构建
    build: {
      // 在 outDir 中生成 manifest.json
      manifest: true,
      // 基于rollup配置
      // https://rollupjs.org/configuration-options/
      rollupOptions: {
        // 拆包处理
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const url = id.toString().split('node_modules/')[1];
            if (url.includes('element_plus')) {
              return 'chunk-elementui';
            } else if (url.includes('vue')) {
              return 'chunk-vue';
            } else {
              return 'chunk-vendor';
            }
          }
        }
      }
    },
    server: {
      host: '0.0.0.0', // 解决不能通过ip访问
      open: true,
      proxy: {
        '/api': 'http://10.3.20.129:8110',
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 使用@use替代@import
          additionalData: `
            @use '@assets/theme/index.scss' as *;
            @use '@scss/variables.scss' as *;
            @use '@scss/mixins.scss' as *;
            @use '@scss/function.scss' as *;
            $src: '${env.BASE_VITE_URL}';`
        }
      }
    },
    plugins: [ 
      vue(),
      vueJsx(),
      nightwatchPlugin(),
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
      // Icon图标引入
      Icons({
        // scale: 1, // 缩放
        compiler: 'vue3', // 编译方式
        // defaultClass: '', // 默认类名
        // defaultStyle: '', // 默认样式
        autoInstall: true
        // jsx: 'react' // jsx支持
      }),
      /**
       * Inspect
       * 方便debugger，可以在 localhost:port/__inspect/ 检查开发环境的resolvers处理前后modules对比
       * vite build后，使用 npx serve .vite-inspect 检查客户端
       */
      Inspect({
        build: true,
        outputDir: '.vite-inspect'
      }),
      // 为打包后的文件提供传统浏览器兼容性支持
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@apis': fileURLToPath(new URL('./src/apis', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@scss': fileURLToPath(new URL('./src/assets/scss', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
        '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/views', import.meta.url))
      },
      extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    }
  };
});
