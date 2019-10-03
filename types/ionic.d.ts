import { PluginFunction } from 'vue';
import { IonicConfig, OverlayController } from '@ionic/core';
import { menuController } from './controllers';
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
export declare const install: PluginFunction<IonicConfig>;
//# sourceMappingURL=ionic.d.ts.map