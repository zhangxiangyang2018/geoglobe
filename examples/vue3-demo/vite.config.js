import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // geoglobe 的 ESM 产物内含 Cesium，直接使用即可
  // 静态资源（Workers/Assets/Widgets/ThirdParty）放在 public/geoglobe/ 下
  optimizeDeps: {
    // geoglobe-3d 的 ESM 包较大，让 Vite 预构建
    include: ['geoglobe-3d']
  }
});
