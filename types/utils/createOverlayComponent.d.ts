import Vue, { VueConstructor } from 'vue';
export interface OverlayElement extends HTMLElement {
    present: () => Promise<void>;
    dismiss: (data?: any, role?: string | undefined) => Promise<boolean>;
}
export interface Data<T> {
    overlay: T | null;
}
export interface Methods {
    present: () => Promise<void>;
}
export interface Props {
    isOpen: boolean;
}
export declare function createOverlayComponent<T extends OverlayElement>(name: string, controller: {
    create: (opts: any) => Promise<T>;
}): VueConstructor<Data<T> & Methods & Props & Vue>;
//# sourceMappingURL=createOverlayComponent.d.ts.map