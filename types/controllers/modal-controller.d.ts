import { ModalOptions } from '@ionic/core';
import { VueDelegate } from './vue-delegate';
export declare const modalController: (delegate?: VueDelegate | undefined) => {
    create(options: ModalOptions<import("@ionic/core").ComponentRef>): Promise<HTMLIonModalElement>;
    dismiss(data?: any, role?: string | undefined, id?: string | undefined): Promise<boolean>;
    getTop(): Promise<HTMLIonModalElement | undefined>;
};
//# sourceMappingURL=modal-controller.d.ts.map