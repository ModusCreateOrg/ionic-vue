import { App, Plugin } from 'vue';
import { IonicConfig, setupConfig } from '@ionic/core';
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';

export const IonicVue: Plugin & { isReady: () => Promise<void> } = {
  async isReady() {
    await applyPolyfills();
    window && await defineCustomElements(window);
  },
  install(_app: App, config?: IonicConfig) {
    console.info(`[ionic/vue] BREAKING CHANGE, call to isReady is required before mounting the app:
const app = createApp(App).use(IonicVue, { mode: 'ios' });
IonicVue.isReady().then(() => {
  app.mount("#app");
});`);
    config && setupConfig(config);
  }
};
