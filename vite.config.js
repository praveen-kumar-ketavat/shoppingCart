import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   base:"/shoppingCart/",
//   plugins: [react()],
// })
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/shoppingCart/" : "/", // Use base path only for production
}));
