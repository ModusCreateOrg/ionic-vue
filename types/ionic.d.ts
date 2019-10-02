import { PluginFunction } from 'vue';
import { IonicConfig, MenuControllerI, OverlayController } from '@ionic/core';
export interface Controllers {
    actionSheetController: OverlayController;
    alertController: OverlayController;
    loadingController: OverlayController;
    menuController: Partial<MenuControllerI>;
    modalController: OverlayController;
    popoverController: OverlayController;
    toastController: OverlayController;
}
declare module 'vue/types/vue' {
    interface Vue {
        $ionic: Controllers;
    }
}
export declare const install: PluginFunction<IonicConfig>;
//# sourceMappingURL=ionic.d.ts.map