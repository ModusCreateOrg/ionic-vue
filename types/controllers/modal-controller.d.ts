import { ModalOptions, OverlayController } from '@ionic/core';
export interface ModalController extends OverlayController {
    create(options: ModalOptions): Promise<HTMLIonModalElement>;
}
export declare const modalController: () => ModalController;
//# sourceMappingURL=modal-controller.d.ts.map