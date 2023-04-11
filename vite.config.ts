import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ELECTRON=="true" ? './' : ".",
  define: {
	  'global': {},
  },
  plugins: [
		vue({
      template: {
        compilerOptions: {
          // isCustomElement: (tag) => tag.includes('-')
        }
      }
    }),
		vuetify({ autoImport: true }),
	],
})
