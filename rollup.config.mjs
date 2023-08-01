import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

import cleanup from 'rollup-plugin-cleanup'

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
            outputToFilesystem: true,
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
        json(),
        commonjs({ defaultIsModuleExports: false }),
        typescript({
            outputToFilesystem: true,
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
        resolve({ extensions }),
        json(),
        commonjs({ defaultIsModuleExports: false }),
        typescript({
            outputToFilesystem: true,
            tsconfig: './tsconfig.json',
            outDir: 'build/cjs',
            declarationDir: 'build/cjs',
            compilerOptions
        }),
        createPackageJSON('cjs', 'commonjs'),
        cleanup({ comments: 'none' })
    ],
    external: ['vscode']
}

/** @type {import('rollup').RollupOptions} */
const browser = {
    input: 'src/index.ts',
    output: {
        ...esm.output,
        dir: 'build/browser'
    },
    plugins: [
        resolve({ extensions, browser: true }),
        json(),
        commonjs({ defaultIsModuleExports: false }),
        typescript({
            outputToFilesystem: true,
            tsconfig: './tsconfig.json',
            outDir: 'build/browser',
            declarationDir: 'build/browser',
            compilerOptions
        }),
        createPackageJSON(),
        cleanup({ comments: 'none' }),
    ],
    external: ['vscode']
}

export default [webview, esm, browser, cjs]
