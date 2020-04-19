import { ModalOptions } from "@ionic/core";
export declare const modalController: () => {
    create(options: ModalOptions<import("@ionic/core").ComponentRef>): Promise<HTMLIonModalElement>;
    dismiss(data?: any, role?: string | undefined, id?: string | undefined): Promise<boolean>;
    getTop(): Promise<HTMLIonModalElement | undefined>;
};
//# sourceMappingURL=modal-controller.d.ts.map