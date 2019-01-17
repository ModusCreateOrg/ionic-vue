import { ModalOptions } from '@ionic/core';
import { OverlayBaseController } from '../util';
import { VueDelegate } from './vue-delegate';
export declare const CTRL = "ion-modal-controller";
export declare class ModalController extends OverlayBaseController<ModalOptions, HTMLIonModalElement> {
    private delegate;
    constructor(delegate: VueDelegate);
    create(opts: ModalOptions): Promise<HTMLIonModalElement>;
}
//# sourceMappingURL=modal-controller.d.ts.map