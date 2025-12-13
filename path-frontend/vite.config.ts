import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // 正确使用 env 变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    define: {
      // 将环境变量注入到全局对象中
      'process.env': env,
      global: 'globalThis'
    },
    // 其他配置...
  }
})