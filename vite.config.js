import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  define: {
    global: {},  // 이 줄을 추가하여 브라우저 환경에서 global 변수를 정의
  },
});
