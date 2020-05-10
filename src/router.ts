import VueRouter, { Route } from 'vue-router';
import { PluginFunction } from 'vue';
import { RouterArgs } from './interfaces';
import IonVueRouter from './components/ion-vue-router';
import { BackButtonEvent, RouterDirection } from '@ionic/core';

// Extend the official VueRouter
export default class Router extends VueRouter {
  direction: RouterDirection;
  directionOverride: RouterDirection | null;
  viewCount: number;
  prevRouteStack: Route[];
  cachedPrevRoute: Route;
  history: any;
  scroll: Map<string, { top: number; left: number }>;
  static installed: boolean;
  static install: PluginFunction<never>;

  constructor(args: RouterArgs = {} as RouterArgs) {
    super(args);

    // Set default scroll stack
    this.scroll = new Map();

    // The direction user navigates in
    this.direction = args.direction || 'forward';

    // Override normal direction
    this.directionOverride = null;

    // Number of views navigated
    this.viewCount = args.viewCount || 0;

    // Stack of previous routes
    this.prevRouteStack = [];

    // Extend the existing history object
    this.extendHistory();

    // Wait for transition to finish before confirming navigation
    this.extendTransitionConfirmation();

    // Listen to Ionic's back button event
    document.addEventListener('ionBackButton', (e: Event) => {
      (e as BackButtonEvent).detail.register(0, () => this.back());
    });
  }

  get prevRoute(): Route | undefined {
    return this.prevRouteStack[this.prevRouteStack.length - 1];
  }

  extendTransitionConfirmation() {
    this.history._confirmTransition = this.history.confirmTransition;
    this.history.confirmTransition = async (...opts: any) => {
      if (undefined !== this.transition) {
        await this.transition;
      }
      this.history._confirmTransition(...opts);
    };
  }

  extendHistory() {
    // Save a reference to the original method
    this.history._updateRoute = this.history.updateRoute;

    this.history.updateRoute = (nextRoute: Route) => {
      // Guesstimate the direction of the next route
      this.direction = this.guessDirection(nextRoute);

      // Override the direction
      if (this.directionOverride) {
        this.direction = this.directionOverride;
      }

      // Increment or decrement the view count
      this.viewCount += this.direction === 'back' ? -1 : 1;

      // Call the original method
      this.history._updateRoute(nextRoute);

      // Reset direction overrides
      this.directionOverride = null;
    };
  }

  canGoBack(): boolean {
    // We can display the back button if we're not on /
    // or there were more than 1 views rendered
    return this.viewCount > 1 && this.currentRoute.fullPath.length > 1;
  }

  guessDirection(nextRoute: Route): RouterDirection {
    this.cachedPrevRoute = this.history.current;

    if (this.prevRoute) {
      // Last route is the same as the next one - go back
      // If we're going to / reset the stack otherwise pop a route
      if (this.prevRoute.fullPath === nextRoute.fullPath) {
        if (this.prevRoute.fullPath.length === 1) {
          this.prevRouteStack = [];
        } else {
          this.prevRouteStack.pop();
        }
        return 'back';
      }
    }

    // Forward movement, push next route to stack
    if (this.history.current.fullPath !== nextRoute.fullPath) {
      this.prevRouteStack.push(this.history.current);
    }

    return 'forward';
  }

  async saveScroll(el: HTMLElement): Promise<void> {
    const ionContent = el.querySelector('ion-content');
    const scrollElement = ionContent && (await ionContent.getScrollElement());

    if (scrollElement) {
      this.scroll.set(this.cachedPrevRoute.fullPath, {
        top: scrollElement?.scrollTop || 0,
        left: scrollElement?.scrollLeft || 0,
      });
    }
  }

  async restoreScroll(el: HTMLElement, key: string): Promise<void> {
    const ionContent = el.querySelector('ion-content');
    const scrollElement = ionContent && (await ionContent.getScrollElement());
    scrollElement?.scrollTo(this.scroll.get(key) || { top: 0, left: 0 });
  }
}

Router.install = (Vue) => {
  // If already installed - skip
  if (Router.installed) {
    return;
  }

  Router.installed = true;

  // Install the official VueRouter
  VueRouter.install(Vue);

  // Register the IonVueRouter component globally
  Vue.component('IonVueRouter', IonVueRouter);
};
