import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: {
                'amy' : 'src/amy.ts',
                'dracula': 'src/dracula.ts'
            },
            formats: ['es'],
        },
    },
    plugins: [
        dts({ include: ['src'], exclude: ['src/utils.ts'] })
    ]
});