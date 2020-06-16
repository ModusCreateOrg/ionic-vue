import VueImport, { PluginFunction } from 'vue';
import { IonicConfig, setupConfig } from '@ionic/core';
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';

let Vue: typeof VueImport;

export const install: PluginFunction<IonicConfig> = async (_Vue, config) => {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[Ionic] Plugin already installed. Vue.use(Ionic) should be called only once.'
      );
    }
    return;
  }
  Vue = _Vue;
  Vue.config.ignoredElements.push(/^ion-/);

  config && setupConfig(config);
  await applyPolyfills();
  defineCustomElements(window);
};
