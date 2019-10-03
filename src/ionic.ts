import { PluginFunction, VueConstructor, default as VueImport } from 'vue';
import {
  IonicConfig,
  OverlayController
} from '@ionic/core';
import {
  actionSheetController,
  alertController,
  loadingController,
  menuController,
  pickerController,
  toastController,
} from './controllers';
import { modalController } from './controllers/modal-controller';
import { popoverController } from './controllers/popover-controller';
import { appInitialize } from './app-initialize';
import { VueDelegate } from './controllers/vue-delegate';
import IonTabs from './components/navigation/ion-tabs';
import IonPage from './components/navigation/ion-page';
import { createInputComponents } from './components/inputs';

export interface Controllers {
  actionSheetController: OverlayController;
  alertController: OverlayController;
  loadingController: OverlayController;
  menuController: typeof menuController;
  modalController: OverlayController;
  popoverController: OverlayController;
  toastController: OverlayController;
  pickerController: OverlayController;
}

declare module 'vue/types/vue' {
  interface Vue {
    $ionic: Controllers;
  }
}

function createApi(vueInstance: VueConstructor) {
  const cache: Partial<Controllers> = {};
  const vueDelegate = new VueDelegate(vueInstance);

  return {
    get actionSheetController() {
      if (!cache.actionSheetController) {
        cache.actionSheetController = actionSheetController;
      }
      return cache.actionSheetController;
    },
    get alertController() {
      if (!cache.alertController) {
        cache.alertController = alertController;
      }
      return cache.alertController;
    },
    get loadingController() {
      if (!cache.loadingController) {
        cache.loadingController = loadingController;
      }
      return cache.loadingController;
    },
    get menuController() {
      if (!cache.menuController) {
        cache.menuController = menuController;
      }
      return cache.menuController;
    },
    get modalController() {
      if (!cache.modalController) {
        cache.modalController = modalController(vueDelegate);
      }
      return cache.modalController;
    },
    get popoverController() {
      if (!cache.popoverController) {
        cache.popoverController = popoverController(vueDelegate);
      }
      return cache.popoverController;
    },
    get toastController() {
      if (!cache.toastController) {
        cache.toastController = toastController;
      }
      return cache.toastController;
    },
    get pickerController() {
      if (!cache.pickerController) {
        cache.pickerController = pickerController;
      }
      return cache.pickerController;
    }
  };
}

let Vue: typeof VueImport;

export const install: PluginFunction<IonicConfig> = (_Vue, config) => {
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
  Vue.component('IonTabs', IonTabs);
  Vue.component('IonPage', IonPage);

  createInputComponents();

  appInitialize(config);

  const api = createApi(Vue);

  Object.defineProperty(Vue.prototype, '$ionic', {
    get() {
      console.warn('[Ionic] The usage of the global $ionic Vue property is deprecated and will be removed in the future versions.\nInstead import controllers directly with "import { alertController } from \'@ionic/vue\'"');
      return api;
    }
  });
};
