import { FunctionalComponent } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { JSX } from '@ionic/core';
export interface Props extends JSX.IonRouterOutlet {
    name?: string;
    route?: RouteLocationNormalizedLoaded;
}
export declare const IonRouterView: FunctionalComponent<Props>;
//# sourceMappingURL=index.d.ts.map