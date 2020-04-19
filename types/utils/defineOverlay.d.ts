import { FunctionalComponent } from 'vue';
export interface OverlayElement extends HTMLElement {
    present: () => Promise<void>;
    dismiss: (...args: any) => Promise<boolean>;
}
export interface OverlayProps {
    isOpen?: boolean;
    modelValue?: boolean;
}
export interface OverlayController<T> {
    create: (...args: any) => Promise<T>;
}
export declare type OverlayEventListeners = [string, Exclude<OverlayEvents, typeof OverlayEvents.onUpdate>][];
export declare enum OverlayEvents {
    onWillPresent = "onWillPresent",
    onDidPresent = "onDidPresent",
    onWillDismiss = "onWillDismiss",
    onDidDismiss = "onDidDismiss",
    onUpdate = "update:modelValue"
}
export declare enum OverlayType {
    Modal = "IonModal",
    ActionSheet = "IonActionSheet",
    Popover = "IonPopover"
}
export declare function defineOverlay<IonElement extends OverlayElement, IonProps>(name: OverlayType, controller: OverlayController<IonElement>): FunctionalComponent<OverlayProps & Pick<IonProps, Exclude<keyof IonProps, "component" | "componentProps" | "delegate">>, OverlayEvents[]>;
//# sourceMappingURL=defineOverlay.d.ts.map