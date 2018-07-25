import path from 'path'
import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import { version } from '../package.json'

const banner = `
/*!
 * ionic-vue v${version}
 * ${new Date().getFullYear()} Michael Tintiuc - Modus Create
 * @license MIT
 */
`

const resolve = _path => path.resolve(__dirname, '../', _path)

function outputConfig(suffix, format, opts = {}) {
  return Object.assign(
    {
      file: resolve(`./dist/ionic-vue${suffix}.js`),
      name: 'IonVueRouter',
      sourcemap: true,
      format,
      banner,
    },
    opts
  )
}

function baseConfig() {
  return {
    input: resolve('./src/index.js'),
    output: [
      outputConfig('', 'umd', { globals: {} }),
      outputConfig('.esm', 'esm'),
      outputConfig('.common', 'cjs'),
    ],
    external: ['vue', 'vue-router'],
    plugins: [
      vue(),
      buble({
        transforms: {
          dangerousForOf: true,
        },
      }),
    ],
  }
}

export default args => {
  const configs = [baseConfig()]

  if (args.configProd === true) {
    const prodConfig = baseConfig()
    prodConfig.plugins.push(terser())

    for (const item of prodConfig.output) {
      item.file = item.file.replace('.js', '.min.js')
      item.sourcemap = false
    }

    configs.push(prodConfig)
  }

  return configs
}
