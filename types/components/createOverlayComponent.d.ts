import { VueConstructor } from 'vue';
import { OverlayController } from '@ionic/core';
interface OverlayElement extends HTMLElement {
    present: () => Promise<void>;
    dismiss: (data?: any, role?: string | undefined) => Promise<boolean>;
}
interface Controller<T extends HTMLElement> extends OverlayController {
    create: (opts: any) => Promise<T>;
}
export declare function createOverlayComponent<T extends OverlayElement>(name: string, controller: Controller<T>): VueConstructor;
export {};
//# sourceMappingURL=createOverlayComponent.d.ts.map