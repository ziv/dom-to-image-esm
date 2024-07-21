import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: {
                'index' : 'src/index.ts',
                'utils': 'src/utils.ts'
            },
            formats: ['es'],
        },
    },
    plugins: [
        dts({ include: ['src'], exclude: ['src/demo.ts'] })
    ]
});