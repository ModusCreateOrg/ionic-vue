import { Ref, ref } from 'vue';
import {
  Router,
  RouterOptions,
  createRouter as createVueRouter,
} from 'vue-router';
import { BackButtonEvent, NavDirection } from '@ionic/core';

enum Direction {
  forward = 'forward',
  back = 'back',
}

declare module 'vue-router' {
  interface Router {
    direction: Ref<NavDirection>;
    showBackButton: Ref<boolean>;
    saveScroll: (el: HTMLElement) => Promise<void>;
    restoreScroll: (el: HTMLElement, key: string) => Promise<void>;
  }
}

export const createRouter = (opts: RouterOptions): Router => {
  const direction = ref<Direction>(Direction.forward);
  const directionOverride = ref<Direction>();
  const showBackButton = ref<boolean>(false);
  const scroll = new Map<string, { top: number; left: number }>();

  const router = {
    ...createVueRouter(opts),
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
  });

  router.saveScroll = async el => {
    const ionContent = el.querySelector('ion-content');
    const scrollElement = ionContent && (await ionContent.getScrollElement());

    scroll.set((router.history.state.back as any).fullPath, {
      top: scrollElement?.scrollTop || 0,
      left: scrollElement?.scrollLeft || 0,
    });
  };

  router.restoreScroll = async (el, key) => {
    const ionContent = el.querySelector('ion-content');
    const scrollElement = ionContent && (await ionContent.getScrollElement());
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
