import { App, Plugin } from 'vue';
import { IonicConfig, setupConfig } from '@ionic/core';
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';

export const IonicVue: Plugin & { isReady: () => Promise<void> } = {
  async isReady() {
    await applyPolyfills();
    window && await defineCustomElements(window);
  },
  install(_app: App, config?: IonicConfig) {
    config && setupConfig(config);
  }
};
