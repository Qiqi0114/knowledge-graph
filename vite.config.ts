import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "localhost",
    port: 8080,
    open: true,
    // 跨域的写法
        proxy: {
          '/api': {
            target: 'http://43.143.229.251:8001', // 实际请求地址
            changeOrigin: true, // 允许跨域
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
  resolve: {
    alias: [
      {
        find: '@',                                   // 别名
        replacement: resolve(__dirname, 'src'),      // 别名对应地址
      },
      {
        find: 'components',
        replacement: resolve(__dirname, 'src/components'),
      }
    ]
  }
  
})

