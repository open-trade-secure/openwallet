import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/openwallet/', // O el nombre exacto de tu repo con slash inicial y final
})