import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const UPSTREAM = 'https://media.downshift.app';
const UPSTREAM_PATH = '/hiring/founding-engineer/items.json';
const proxyConfig = {
  '/api/items.json': {
    target: UPSTREAM,
    changeOrigin: true,
    rewrite: () => UPSTREAM_PATH,
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: proxyConfig },
  preview: { proxy: proxyConfig },
});
