import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
})
