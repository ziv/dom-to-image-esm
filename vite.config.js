import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: {
                'index' : 'src/imagify.ts',
                'utils': 'src/utils.ts'
            },
            formats: ['es'],
        },
    },
    plugins: [
        dts({ include: ['src'] })
    ]
});