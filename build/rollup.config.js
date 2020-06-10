import path from "path";
// import vue from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { version as packageVersion } from "../package.json";

const resolve = _path => path.resolve(__dirname, "../", _path);
const version = process.env.VERSION || packageVersion;
const banner = `/*!
 * @modus/ionic-vue v${version}
 * ${new Date().getFullYear()} Michael Tintiuc - Modus Create
 * @license MIT
 */
`;

function outputConfig(suffix, format, opts = {}) {
  return Object.assign(
    {
      file: resolve(`./dist/ionic-vue${suffix}.js`),
      name: "IonicVue",
      exports: "named",
      sourcemap: true,
      format,
      banner
    },
    opts
  );
}

function baseConfig() {
  return {
    input: resolve("./src/index.ts"),
    output: [
      outputConfig("", "umd", {
        globals: {
          vue: "Vue"
        }
      }),
      outputConfig(".esm", "esm"),
      outputConfig(".common", "cjs")
    ],
    external: [
      "vue",
      "vue-router",
      "@ionic/core",
      "@ionic/core/loader",
      "ionicons",
      "ionicons/icons"
    ],
    treeshake: {
      moduleSideEffects: false
    },
    plugins: [
      // vue(),
      typescript({
        useTsconfigDeclarationDir: true,
        objectHashIgnoreUnknownHack: false,
        clean: true
      })
    ]
  };
}

export default args => {
  const configs = [baseConfig()];

  if (args.configProd === true) {
    const prodConfig = baseConfig();
    prodConfig.plugins.push(terser());

    for (const item of prodConfig.output) {
      item.file = item.file.replace(".js", ".min.js");
      item.sourcemap = false;
    }

    configs.push(prodConfig);
  }

  return configs;
};
