import VueRouter, { Route } from 'vue-router';
import { PluginFunction } from 'vue';
import { RouterArgs } from './interfaces';
import { RouterDirection } from '@ionic/core';
export default class Router extends VueRouter {
    direction: RouterDirection;
    directionOverride: RouterDirection | null;
    viewCount: number;
    prevRouteStack: Route[];
    history: any;
    static installed: boolean;
    static install: PluginFunction<never>;
    constructor(args?: RouterArgs);
    extendTransitionConfirmation(): void;
    extendHistory(): void;
    canGoBack(): boolean;
    guessDirection(nextRoute: Route): RouterDirection;
}
//# sourceMappingURL=router.d.ts.map