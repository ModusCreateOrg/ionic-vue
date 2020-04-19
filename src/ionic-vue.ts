import { App, Plugin } from 'vue';
import { IonicConfig } from '@ionic/core';
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';

interface IonicWindow extends Window {
  Ionic: {
    config?: IonicConfig;
  };
}

export const IonicVue: Plugin = {
  async install(_app: App, config?: IonicConfig) {
    const win: IonicWindow = window as any;
    const Ionic = win?.Ionic || {};
    Ionic.config = config || {};

    await applyPolyfills();
    defineCustomElements(win);
  }
};
