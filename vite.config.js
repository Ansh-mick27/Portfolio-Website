import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        // Three.js lives in its own lazily-loaded chunk (Scene3D), so a large chunk there is expected
        chunkSizeWarningLimit: 1100,
    },
})
