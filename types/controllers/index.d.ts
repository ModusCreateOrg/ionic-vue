export { actionSheetController, alertController, loadingController, menuController, toastController, pickerController, } from '@ionic/core';
export declare const modalController: import("./modal-controller").ModalController;
export declare const popoverController: {
    create(options: import("@ionic/core").PopoverOptions<import("@ionic/core").ComponentRef>): Promise<HTMLIonPopoverElement>;
    dismiss(data?: any, role?: string | undefined, id?: string | undefined): Promise<boolean>;
    getTop(): Promise<HTMLIonPopoverElement | undefined>;
};
//# sourceMappingURL=index.d.ts.map