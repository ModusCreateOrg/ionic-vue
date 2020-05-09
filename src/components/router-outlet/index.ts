import {
  BaseTransitionProps,
  FunctionalComponent,
  Transition,
  h,
  nextTick,
  ref,
  shallowRef,
} from 'vue';
import {
  RouteLocationNormalizedLoaded,
  RouteRecordNormalized,
  RouterView,
  useRouter,
} from 'vue-router';
import { JSX } from '@ionic/core';

export interface Props extends JSX.IonRouterOutlet {
  name?: string;
  route?: RouteLocationNormalizedLoaded;
  swipeBack?: boolean;
}

export const IonRouterView: FunctionalComponent<Props> = props => {
  const router = useRouter();
  const { name, route, ...outletProps } = props;
  const ionRouterOutlet = ref<HTMLIonRouterOutletElement>();
  const enteringEl = ref<HTMLElement>();
  const newView = shallowRef();

  let persisted = false;
  let progressAnimation = false;
  let inTransition = false;

  const transition = async (leavingEl: HTMLElement) => {
    if (!enteringEl.value || enteringEl.value === leavingEl) {
      return;
    }

    enteringEl.value?.classList.add('ion-page', 'ion-page-invisible');
    const outlet = await ionRouterOutlet.value?.componentOnReady();

    return outlet?.commit(enteringEl.value, leavingEl, {
      deepWait: true,
      direction: router.direction.value,
      showGoBack: router.showBackButton.value,
      progressAnimation,
    });
  };

  const transitionHooks: BaseTransitionProps<HTMLElement> = {
    async onEnter(el, done) {
      inTransition = true;
      enteringEl.value = el;

      if (router.direction.value === 'back') {
        await router.restoreScroll(
          el,
          progressAnimation
            ? (router.history.state.back as any).fullPath
            : router.currentRoute.value.fullPath
        );
      }

      done();
    },

    async onLeave(el, done: any) {
      await transition(el);

      if (!persisted) {
        await router.saveScroll(el);
      }

      setTimeout(done, persisted ? 100 : 0);

      inTransition = false;
      progressAnimation = false;
      persisted = false;
    },
  };

  return h(
    'ion-router-outlet',
    {
      ...outletProps,
      ref: ionRouterOutlet,

      // workaround for Vue 3 camelCase prop issue
      onVnodeMounted(vnode) {
        vnode?.el &&
          (vnode.el.swipeHandler = {
            canStart() {
              return (
                !inTransition &&
                !!router.history.state.back &&
                props.swipeBack !== false &&
                ionRouterOutlet.value?.mode === 'ios'
              );
            },
            onStart() {
              progressAnimation = true;
              inTransition = true;
              router.direction.value = 'back';

              const prevRoute = router.getRoutes().find(r => {
                return r.path === (router.history.state.back as any).fullPath;
              }) as RouteRecordNormalized;

              newView.value = {
                component: prevRoute?.components[props.name || 'default'],
                props: prevRoute?.props,
              };
            },
            onEnd(shouldComplete: any) {
              inTransition = false;

              if (shouldComplete) {
                nextTick(() => {
                  persisted = false;
                  router.history.go(-1);
                });
                return;
              }

              persisted = true;
              newView.value = undefined;
            },
          });
      },
    },
    h(RouterView, { name, route }, (...opts: any) => {
      const { Component, props: componentProps } = opts[0];

      const child = newView.value
        ? h(newView.value.component, newView.value.props)
        : h(Component, componentProps);

      if (newView.value?.component === Component) {
        newView.value = undefined;
      }

      return h(
        Transition,
        {
          css: false,
          mode: 'in-out',
          persisted,
          class: {
            'can-go-back': !!router.history.state.back,
          },
          ...transitionHooks,
        },
        () => child
      );
    })
  );
};

IonRouterView.props = [
  'name',
  'route',
  'animated',
  'animation',
  'mode',
  'swipeBack',
];
