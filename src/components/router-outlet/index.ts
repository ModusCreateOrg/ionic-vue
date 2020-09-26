import {
  BaseTransitionProps,
  Transition,
  TransitionProps,
  VNode,
  defineComponent,
  h,
  nextTick,
  ref,
  shallowRef
} from 'vue';
import {
  RouteLocationNormalizedLoaded,
  RouterView,
  useRouter,
} from 'vue-router';
import { JSX } from '@ionic/core';
import { keys } from 'ts-transformer-keys';
import { splitPropsAndEvents } from '../../utils';

// tslint:disable-next-line: no-import-side-effect
import '../../router';

export interface Props extends JSX.IonRouterOutlet {
  name?: string;
  route?: RouteLocationNormalizedLoaded;
  swipeBack?: boolean;
}

export const IonRouterView = defineComponent<Props>((props, { slots }) => {
  const router = useRouter();
  const ionRouterOutlet = ref<HTMLIonRouterOutletElement>();
  const enteringEl = ref<HTMLElement>();
  const newView = shallowRef<VNode>();

  let persisted = false;
  let progressAnimation = false;
  let inTransition = false;

  const transition = async (leavingEl: HTMLElement) => {
    if (!enteringEl.value || enteringEl.value === leavingEl) {
      return;
    }

    // ion-page class makes ion-split-pane invisible
    if (enteringEl.value.nodeName !== 'ION-SPLIT-PANE') {
      enteringEl.value.classList.add('ion-page', 'ion-page-invisible');
    }

    enteringEl.value.style.display = '';
    const outlet = await ionRouterOutlet.value?.componentOnReady();

    return outlet?.commit(enteringEl.value, leavingEl, {
      deepWait: true,
      direction: router.direction,
      showGoBack: newView.value ? router.history.state.back !== '/' : router.showBackButton,
      duration: persisted ? 0 : undefined,
      animationBuilder: router.animationOverride,
      progressAnimation,
    });
  };

  const transitionHooks: BaseTransitionProps<HTMLElement> = {
    async onEnter(el, done) {
      inTransition = true;
      enteringEl.value = el;

      if (router.direction === 'back') {
        await router.restoreScroll(
          el,
          progressAnimation
            ? router.history.state.back as any
            : router.currentRoute.value.fullPath
        );
      }

      done();
    },

    async onLeave(el, done) {
      if (!persisted) {
        await router.saveScroll(
          el,
          progressAnimation
            ? router.currentRoute.value.fullPath
            : router.history.state.back as any
        );
      }

      await transition(el);
      persisted ? setTimeout(done, 100) : done();

      inTransition = false;
      persisted = false;
    },
  };

  const routerView = h(RouterView, { name: props.name, route: props.route }, (...opts: any) => {
    const { Component, route: matchedRoute } = opts[0];
    const child = newView.value ?? Component;

    if (newView.value?.type === Component?.type) {
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

    const transitionProps = {
      css: false,
      mode: 'in-out',
      persisted,
      ...transitionHooks,
    } as TransitionProps;

    return slots.default
      ? slots.default({ Component: child, route: matchedRoute, transitionProps })
      : h(Transition, transitionProps, () => child);
  });

  return () => h(
    'ion-router-outlet',
    {
      ...props,
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
            router.directionOverride = 'back';

            const matchedRoutes = router.resolve(router.history.state.back as string);
            if (matchedRoutes.matched.length) {
              const matchedRoute = matchedRoutes.matched[0];
              const routePropsOption = matchedRoute.props[props.name || 'default'];
              const routeProps = routePropsOption
                ? routePropsOption === true
                ? matchedRoutes.params
                : typeof routePropsOption === 'function'
                  ? routePropsOption(matchedRoutes)
                  : routePropsOption
                    : null;
              newView.value = h(
                matchedRoute.components[props.name || 'default'],
                routeProps
              );
            }
          },
          onEnd(shouldComplete: boolean) {
            inTransition = false;
            progressAnimation = false;

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
    routerView
  );
});

const data = splitPropsAndEvents(keys<JSX.IonRouterOutlet>());
IonRouterView.displayName = 'IonRouterView';
IonRouterView.props = [ ...data.props, 'name', 'route' ];
IonRouterView.emits = data.events;
