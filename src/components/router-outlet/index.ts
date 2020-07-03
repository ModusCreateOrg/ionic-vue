import {
  BaseTransitionProps,
  FunctionalComponent,
  KeepAlive,
  KeepAliveProps,
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
  keepAlive?: KeepAliveProps;
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

    enteringEl.value.classList.add('ion-page', 'ion-page-invisible');
    enteringEl.value.style.display = '';
    const outlet = await ionRouterOutlet.value?.componentOnReady();

    return outlet?.commit(enteringEl.value, leavingEl, {
      deepWait: true,
      direction: router.direction.value,
      showGoBack: router.showBackButton.value,
      duration: persisted ? 0 : undefined,
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
            ? router.history.state.back as any
            : router.currentRoute.value
        );
      }

      done();
    },

    async onLeave(el, done) {
      await transition(el);
      if (!persisted) {
        await router.saveScroll(el);
        done();
      } else {
        setTimeout(done, 100);
      }

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
                return r.path === router.history.state.back as any;
              }) as RouteRecordNormalized;

              newView.value = prevRoute && {
                component: prevRoute?.components[props.name || 'default'],
                props: prevRoute?.props,
              };
            },
            onEnd(shouldComplete: boolean) {
              inTransition = false;

              if (shouldComplete) {
                nextTick(() => {
                  persisted = false;
                  router.go(-1);
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
        : Component ? h(Component, componentProps) : null;

      if (newView.value?.component === Component.type) {
        newView.value = undefined;
      }

      if (child?.props) {
        child.props.class = {
          'can-go-back': !!router.history.state.back,
        };
      }

      if (persisted && child) {
        nextTick(() => {
          const leaveCb = (enteringEl.value as any)._leaveCb;
          leaveCb && leaveCb();
        });
      }

      return h(
        Transition,
        {
          css: false,
          mode: 'in-out',
          persisted,
          ...transitionHooks,
        },
        () => props.keepAlive !== undefined ? h(KeepAlive, props.keepAlive || null, [child]) : child
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
  'keepAlive',
];
