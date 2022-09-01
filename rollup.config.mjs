import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.js', '.ts']
const compilerOptions = { declaration: true, declarationMap: true }
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const createPackageJSON = (dir = 'esm', type = 'module') => ({
    name: 'create-package-json',
    writeBundle: () => fs.promises.writeFile(
        path.join(__dirname, 'build', dir, 'package.json'),
        JSON.stringify({ type }, null, 4),
        'utf-8'
    )
})

/** @type {import('rollup').RollupOptions} */
const webview = {
    input: 'src/webview/index.ts',
    output: {
        file: './build/webview.js',
        format: 'esm',
        sourcemap: true,
    },
    external: ['vscode'],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            declarationDir: 'build',
            compilerOptions
        }),
        resolve({ extensions, browser: true }),
    ]
}

/** @type {import('rollup').RollupOptions} */
const esm = {
    input: 'src/index.ts',
    output: {
        format: 'esm',
        dir: 'build/esm',
        exports: 'auto',
        ...(process.env.NODE_ENV === 'production'
            ? { plugins: [terser()] }
            : {}
        )
    },
    plugins: [
        resolve({ extensions }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            outDir: 'build/esm',
            declarationDir: 'build/esm',
            compilerOptions
        }),
        createPackageJSON(),
        cleanup({ comments: 'none' }),
    ],
    external: ['vscode']
}

/** @type {import('rollup').RollupOptions} */
const cjs = {
    ...esm,
    output: {
        ...esm.output,
        format: 'cjs',
        dir: 'build/cjs'
    },
    plugins: [
        ...esm.plugins.slice(0, 2),
        typescript({
            tsconfig: './tsconfig.json',
            outDir: 'build/cjs',
            declarationDir: 'build/cjs',
            compilerOptions
        }),
        createPackageJSON('cjs', 'commonjs'),
        ...esm.plugins.slice(4)
    ],
    external: ['vscode']
}

export default [webview, esm, cjs]
