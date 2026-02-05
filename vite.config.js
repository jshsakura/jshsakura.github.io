import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'

const lastCommitDate = execSync('git log -1 --format=%ci').toString().trim().slice(0, 16)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __LAST_COMMIT_DATE__: JSON.stringify(lastCommitDate),
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
