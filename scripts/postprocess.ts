import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

/**
 * some transient dependency loads a json file from `is-core-module` that we can not
 * transpile and would cause into an error. This is a workaround to replace the
 * `require.resolve` call with a string.
 */
const files = [
    path.resolve(__dirname, '..', 'build', 'cjs', 'index.js'),
    path.resolve(__dirname, '..', 'build', 'esm', 'index.js')
]
await Promise.all(files.map(async (file) => {
    const content = (await fs.readFile(file, 'utf-8')).toString()
    const processedContent = content.replace(
        /String\(\w\w\.readFileSync\(\w\w\.join\(\w\w\.dirname\(require\.resolve\("is-core-module\/package.json"\)\),"core.json"\)\)\)/g,
        '"{}"'
    )
    await fs.writeFile(file, processedContent)
}))

console.log('Postprocessing successful ✅')
