import { Ref } from "vue";
import { Router, RouterOptions } from "vue-router";
import { NavDirection } from "@ionic/core";
declare module "vue-router" {
    interface Router {
        direction: Ref<NavDirection>;
        showGoBack: Ref<boolean>;
    }
}
export declare const createRouter: (opts: RouterOptions) => Router;
//# sourceMappingURL=router.d.ts.map