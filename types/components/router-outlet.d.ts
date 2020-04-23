import { FunctionalComponent } from "vue";
import { RouteLocationNormalized } from "vue-router";
import { RouterOutletOptions } from "@ionic/core";
export interface Props extends RouterOutletOptions {
    name?: string;
    route?: RouteLocationNormalized;
}
export declare const IonRouterView: FunctionalComponent<Props>;
//# sourceMappingURL=router-outlet.d.ts.map