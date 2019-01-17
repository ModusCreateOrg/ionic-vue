import { VueConstructor, default as Vue } from 'vue';
import { FrameworkDelegate } from '@ionic/core';
import { HTMLVueElement, WebpackFunction } from '../interfaces';
export declare class VueDelegate implements FrameworkDelegate {
    vue: VueConstructor;
    $root: Vue;
    constructor(vue: VueConstructor, $root: Vue);
    attachViewToDom(parentElement: HTMLElement, component: HTMLElement | WebpackFunction | object | VueConstructor, opts?: object, classes?: string[]): Promise<HTMLElement>;
    removeViewFromDom(_parentElement: HTMLElement, childElement: HTMLVueElement): Promise<void>;
}
export declare function bindLifecycleEvents(instance: any, element: HTMLElement): void;
//# sourceMappingURL=vue-delegate.d.ts.map