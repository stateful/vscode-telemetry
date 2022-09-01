import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const extensions = ['.js', '.ts']

/** @type {import('rollup').RollupOptions} */
const option = {
    input: 'src/webview/index.ts',
    output: {
        file: './build/webview.js',
        format: 'cjs',
        sourcemap: true,
    },
    external: ['vscode'],
    plugins: [
        typescript({ tsconfig: './tsconfig.json', compilerOptions: { module: 'ESNext' } }),
        resolve({ extensions, browser: true }),
    ]
}

export default option
