import buble from 'rollup-plugin-buble'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'


function outputConfig(suffix, format, opts={}) {
    return Object.assign({
        file: `./dist/ion-router-vue${suffix}.js`,
        name: 'IonRouterVue',
        sourcemap: true,
        format,
    }, opts)
}

function baseConfig() {
    return {
        input: './src/router.js',
        output: [
            outputConfig('', 'umd', { globals: {} }),
            outputConfig('.esm', 'esm'),
            outputConfig('.common', 'cjs')
        ],
        external: ['vue-router'],
        plugins: [
            vue(),
            buble(),
        ]
    }
}

export default args => {
    const configs = [ baseConfig() ]

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
