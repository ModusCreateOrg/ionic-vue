import { App, Plugin } from 'vue';
import { IonicConfig, setupConfig } from '@ionic/core';
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';

const ael = (el: any, eventName: string, cb: any, opts: any) =>
  el.addEventListener(eventName.toLowerCase(), cb, opts);
const rel = (el: any, eventName: string, cb: any, opts: any) =>
  el.removeEventListener(eventName.toLowerCase(), cb, opts);

export const IonicVue: Plugin & { isReady: () => Promise<void> } = {
  async isReady() {
    await applyPolyfills();
    if (typeof window !== 'undefined') {
      await defineCustomElements(window, {
        exclude: ['ion-tabs'],
        ael,
        rel,
        ce: (eventName: string, opts: any) =>
          new CustomEvent(eventName.toLowerCase(), opts),
      } as any);
    }
  },
  install(app: App, config?: IonicConfig) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        `[ionic/vue] BREAKING CHANGE, call to isReady is required before mounting the app:\nconst app = createApp(App).use(IonicVue, { mode: 'ios' });\nIonicVue.isReady().then(() => app.mount("#app"));`
      );
    }
    app.config.isCustomElement = tag => tag.startsWith('ion-');
    config && setupConfig({ ...config, _ael: ael, _rel: rel });
  },
};
