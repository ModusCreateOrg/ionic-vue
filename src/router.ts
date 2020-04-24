import { Ref, ref } from 'vue';
import {
  Router,
  RouterHistory,
  RouterOptions,
  createRouter as createVueRouter
} from 'vue-router';
import { NavDirection } from '@ionic/core';

declare module 'vue-router' {
  interface Router {
    direction: Ref<NavDirection>;
    showGoBack: Ref<boolean>;
  }
}

export const createRouter = (opts: RouterOptions): Router => {
  const direction = ref<NavDirection>('forward');
  const showGoBack = ref<boolean>(true);

  const setShowBack = (path: string) => {
    showGoBack.value = path !== '/';
  };

  const history: RouterHistory = {
    ...opts.history,
    push(to, ...args) {
      opts.history.push(to, ...args);
      setShowBack(opts.history.location.fullPath);
    },
    replace(...args) {
      opts.history.replace(...args);
      setShowBack(opts.history.location.fullPath);
    }
  };

  history.listen(to => {
    setShowBack(to.fullPath);
  });

  return {
    ...createVueRouter({ ...opts, history }),
    direction,
    showGoBack
  };
};
