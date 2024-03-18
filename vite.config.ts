import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // SVG 파일을 React 컴포넌트로 가져오기 위해 추가된 부분
  optimizeDeps: {
    include: ["@svgr/webpack"],
  },
  // SVG 파일을 React 컴포넌트로 가져오기 위해 추가된 부분
  build: {
    rollupOptions: {
      plugins: [svgr()],
    },
  },
});
