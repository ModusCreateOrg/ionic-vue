import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import { version } from '../package.json'

const banner = `
/*!
 * ion-router-vue v${version}
 * ${new Date().getFullYear()} Michael Tintiuc - Modus Create
 * @license MIT
 */
`

function outputConfig(suffix, format, opts = {}) {
  return Object.assign(
    {
      file: `./dist/ion-router-vue${suffix}.js`,
      name: 'IonRouterVue',
      sourcemap: true,
      format,
      banner,
    },
    opts
  )
}

function baseConfig() {
  return {
    input: './src/router.js',
    output: [
      outputConfig('', 'umd', { globals: {} }),
      outputConfig('.esm', 'esm'),
      outputConfig('.common', 'cjs'),
    ],
    external: ['vue-router'],
    plugins: [vue(), buble()],
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
