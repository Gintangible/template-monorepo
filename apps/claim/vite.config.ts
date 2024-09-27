import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
    plugins: [
      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue'],
        routesFolder: 'src/views',
        dts: 'src/typed-router.d.ts',
      }),
      vue(),
      // https://github.com/antfu/unocss
      UnoCSS(),
      AutoImport({
        resolvers: [VantResolver()],
        imports: [
          'vue',
          'vitest',
          '@vueuse/core',
          VueRouterAutoImports,
          {
            'vue-router/auto': ['useLink'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
      }),
      Components({
        resolvers: [VantResolver()],
        dts: 'src/components.d.ts',
      }),
    ],
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/custom_theme.scss";`,
        },
      },
    },
  };
});
