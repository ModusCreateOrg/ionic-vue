import { Ref, ref } from 'vue';
import {
  Router,
  RouterOptions,
  createRouter as createVueRouter,
} from 'vue-router';
import { AnimationBuilder, BackButtonEvent, NavDirection } from '@ionic/core';

export enum Direction {
  forward = 'forward',
  back = 'back',
}

declare module 'vue-router' {
  interface Router {
    history: RouterHistory;
    direction: Ref<NavDirection>;
    showBackButton: Ref<boolean>;
    saveScroll: (el: HTMLElement, key: string) => Promise<void>;
    restoreScroll: (el: HTMLElement, key: string) => Promise<void>;
  }
}

export const directionOverride = ref<Direction>();
export const animationOverride = ref<AnimationBuilder>();

export const createRouter = (opts: RouterOptions): Router => {
  const direction = ref<Direction>(Direction.forward);
  const showBackButton = ref<boolean>(false);
  const scroll = new Map<string, { top: number; left: number }>();

  const router = {
    ...createVueRouter(opts),
    history: opts.history,
    direction,
    showBackButton,
  };

  router.history.listen((_to, _from, info) => {
    directionOverride.value = (info.direction as unknown) as Direction;
  });

  router.beforeEach((to, from, next) => {
    showBackButton.value = to.fullPath !== '/' || !!router.history.state.back;

    direction.value =
      directionOverride.value ||
      (to.fullPath.startsWith(from.fullPath)
        ? Direction.forward
        : Direction.back);
    directionOverride.value = undefined;

    next();
  });

  router.afterEach(to => {
    showBackButton.value = to.fullPath !== '/' || !!router.history.state.back;
    animationOverride.value = undefined;
  });

  router.saveScroll = async (el, key) => {
    const ionContent = el.querySelector('ion-content');
    const scrollElement = ionContent && (await ionContent.getScrollElement());

    if (scrollElement && key) {
      scroll.set(key, {
        top: scrollElement?.scrollTop || 0,
        left: scrollElement?.scrollLeft || 0,
      });
    }
  };

  router.restoreScroll = async (el, key) => {
    const ionContent = el.querySelector('ion-content');
    const scrollElement = ionContent && (await ionContent.getScrollElement()) || undefined;
    scrollElement?.scrollTo(
      scroll.get(key) || {
        top: 0,
        left: 0,
      }
    );
  };

  if (document) {
    document.addEventListener('ionBackButton', (e: Event) => {
      (e as BackButtonEvent).detail.register(0, (next: () => void) => {
        router.history.go(-1);
        next();
      });
    });
  }

  return router;
};
