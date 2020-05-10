import VueRouter, { Route } from 'vue-router';
import { PluginFunction } from 'vue';
import { RouterArgs } from './interfaces';
import { RouterDirection } from '@ionic/core';
export default class Router extends VueRouter {
    direction: RouterDirection;
    directionOverride: RouterDirection | null;
    viewCount: number;
    prevRouteStack: Route[];
    cachedPrevRoute: Route;
    history: any;
    scroll: Map<string, {
        top: number;
        left: number;
    }>;
    static installed: boolean;
    static install: PluginFunction<never>;
    constructor(args?: RouterArgs);
    get prevRoute(): Route | undefined;
    extendTransitionConfirmation(): void;
    extendHistory(): void;
    canGoBack(): boolean;
    guessDirection(nextRoute: Route): RouterDirection;
    saveScroll(el: HTMLElement): Promise<void>;
    restoreScroll(el: HTMLElement, key: string): Promise<void>;
}
//# sourceMappingURL=router.d.ts.map