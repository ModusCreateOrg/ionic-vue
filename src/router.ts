import { ref } from 'vue';
import {
  Router,
  RouterOptions,
  createRouter as createVueRouter,
} from 'vue-router';
import { AnimationBuilder, BackButtonEvent, NavDirection } from '@ionic/core';

declare module 'vue-router' {
  interface Router {
    readonly history: RouterHistory;
    readonly direction: NavDirection;
    readonly showBackButton: boolean;
    animationOverride: AnimationBuilder | undefined;
    directionOverride: NavDirection | undefined;
    saveScroll: (el: HTMLElement, key: string) => Promise<void>;
    restoreScroll: (el: HTMLElement, key: string) => Promise<void>;
  }
}

export const createRouter = (opts: RouterOptions): Router => {
  const direction = ref<NavDirection>('forward');
  const animationOverride = ref<AnimationBuilder>();
  const directionOverride = ref<NavDirection>();
  const showBackButton = ref<boolean>(false);
  const scroll = new Map<string, { top: number; left: number }>();

  const router: Router = {
    ...createVueRouter(opts),
    history: opts.history,

    async saveScroll(el, key) {
      const ionContent = el.querySelector('ion-content');
      const scrollElement = ionContent && (await ionContent.getScrollElement());

      if (scrollElement && key) {
        scroll.set(key, {
          top: scrollElement?.scrollTop || 0,
          left: scrollElement?.scrollLeft || 0,
        });
      }
    },

    async restoreScroll(el, key) {
      const ionContent = el.querySelector('ion-content');
      const scrollElement =
        (ionContent && (await ionContent.getScrollElement())) || undefined;
      scrollElement?.scrollTo(
        scroll.get(key) || {
          top: 0,
          left: 0,
        }
      );
    },
  };

  router.history.listen((_to, _from, info) => {
    directionOverride.value = (info.direction as unknown) as NavDirection;
  });

  router.beforeEach((to, from, next) => {
    showBackButton.value = to.fullPath !== '/' || !!router.history.state.back;

    direction.value =
      directionOverride.value ||
      (to.fullPath.startsWith(from.fullPath) ? 'forward' : 'back');
    directionOverride.value = undefined;

    next();
  });

  router.afterEach(to => {
    showBackButton.value = to.fullPath !== '/' || !!router.history.state.back;
    animationOverride.value = undefined;
  });

  Object.defineProperties(router, {
    direction: {
      get() {
        return directionOverride.value || direction.value;
      },
    },
    showBackButton: {
      get() {
        return showBackButton.value;
      }
    },
    directionOverride: {
      get() {
        return directionOverride.value;
      },
      set(value: NavDirection) {
        directionOverride.value = value;
      }
    },
    animationOverride: {
      get() {
        return animationOverride.value;
      },
      set(value: AnimationBuilder) {
        animationOverride.value = value;
      }
    }
  });

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
