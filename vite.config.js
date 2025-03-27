import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isCodeSandbox = !!process.env.SANDBOX_URL;

export default defineConfig({
  root: "src/",
  publicDir: "../public/",
  base: "/MyOffice/",
  plugins: [react()],
  server: {
    host: true,
    open: !isCodeSandbox
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true
  }
});