import { HTMLStencilElement } from '@ionic/core';
export interface IonBackButton extends HTMLStencilElement {
    defaultHref?: string;
}
export interface IonRouterOutlet extends HTMLStencilElement {
    commit(enterinEl: HTMLElement, leavingEl: HTMLElement | undefined, opts?: object | undefined): Promise<boolean>;
}
//# sourceMappingURL=interfaces.d.ts.map