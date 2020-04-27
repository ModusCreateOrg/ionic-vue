import { FunctionalComponent } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { JSX } from '@ionic/core';
export interface Props extends JSX.IonRouterOutlet {
    name?: string;
    route?: RouteLocationNormalizedLoaded;
    swipeBack?: boolean;
}
export declare const IonRouterView: FunctionalComponent<Props>;
//# sourceMappingURL=index.d.ts.map