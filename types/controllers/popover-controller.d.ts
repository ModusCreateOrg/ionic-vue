import { PopoverOptions } from '@ionic/core';
import { VueDelegate } from './vue-delegate';
export declare const popoverController: (delegate?: VueDelegate | undefined) => {
    create(options: PopoverOptions<import("@ionic/core").ComponentRef>): Promise<HTMLIonPopoverElement>;
    dismiss(data?: any, role?: string | undefined, id?: string | undefined): Promise<boolean>;
    getTop(): Promise<HTMLIonPopoverElement | undefined>;
};
//# sourceMappingURL=popover-controller.d.ts.map