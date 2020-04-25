import { Ref, ref } from 'vue';
import {
  Router,
  RouterOptions,
  createRouter as createVueRouter
} from 'vue-router';
import { NavDirection } from '@ionic/core';

enum Direction {
  forward = 'forward',
  back = 'back'
}

declare module 'vue-router' {
  interface Router {
    direction: Ref<NavDirection>;
    showBackButton: Ref<boolean>;
  }
}

export const createRouter = (opts: RouterOptions): Router => {
  const direction = ref<Direction>(Direction.forward);
  const directionOverride = ref<Direction>();
  const showBackButton = ref<boolean>(false);

  const router = {
    ...createVueRouter(opts),
    direction,
    showBackButton
  };

  router.history.listen((_to, _from, info) => {
    directionOverride.value =
      info.distance > 0 ? Direction.forward : Direction.back;
  });

  router.beforeEach((to, from, next) => {
    showBackButton.value = to.fullPath !== '/';

    direction.value =
      directionOverride.value ||
      (to.fullPath.startsWith(from.fullPath)
        ? Direction.forward
        : Direction.back);
    directionOverride.value = undefined;

    next();
  });

  return router;
};
