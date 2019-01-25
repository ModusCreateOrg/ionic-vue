import { PopoverOptions } from '@ionic/core';
import { OverlayBaseController } from '../util';
import { VueDelegate } from './vue-delegate';
export declare const CTRL = "ion-popover-controller";
export declare class PopoverController extends OverlayBaseController<PopoverOptions, HTMLIonPopoverElement> {
    private delegate;
    constructor(delegate: VueDelegate);
    create(opts: PopoverOptions): Promise<HTMLIonPopoverElement>;
}
//# sourceMappingURL=popover-controller.d.ts.map