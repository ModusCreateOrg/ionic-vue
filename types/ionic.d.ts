import { PluginFunction } from 'vue';
import { ActionSheetController, AlertController, LoadingController, MenuController, ModalController, PopoverController, ToastController } from './controllers';
import { IonicConfig } from '@ionic/core';
export interface Controllers {
    actionSheetController: ActionSheetController;
    alertController: AlertController;
    loadingController: LoadingController;
    menuController: MenuController;
    modalController: ModalController;
    popoverController: PopoverController;
    toastController: ToastController;
}
declare module 'vue/types/vue' {
    interface Vue {
        $ionic: Controllers;
    }
}
export declare const install: PluginFunction<IonicConfig>;
//# sourceMappingURL=ionic.d.ts.map