import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ضبط `base` حسب البيئة
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? "/myReactPortfolio/" : "./", // GitHub Pages يحتاج base، أما Netlify فيستخدم "./"
});