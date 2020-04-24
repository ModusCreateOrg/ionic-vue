import {
  BaseTransitionProps,
  FunctionalComponent,
  Transition,
  h,
  ref
} from 'vue';
import { RouteLocationNormalizedLoaded, View, useRouter } from 'vue-router';
import { JSX } from '@ionic/core';

export interface Props extends JSX.IonRouterOutlet {
  name?: string;
  route?: RouteLocationNormalizedLoaded;
}

export const IonRouterView: FunctionalComponent<Props> = props => {
  const router = useRouter();
  const { name, route, ...outletProps } = props;
  const ionRouterOutlet = ref<HTMLIonRouterOutletElement | null>(null);
  const enteringEl = ref<HTMLElement | null>(null);

  const transition = async (leavingEl: HTMLElement) => {
    if (!enteringEl.value || enteringEl.value === leavingEl) {
      return;
    }

    enteringEl.value?.classList.add('ion-page', 'ion-page-invisible');
    const el = await ionRouterOutlet.value?.componentOnReady();

    return el?.commit(enteringEl.value, leavingEl, {
      deepWait: true,
      direction: router.direction?.value,
      showGoBack: router.showGoBack?.value
    });
  };

  const transitionHooks: BaseTransitionProps<HTMLElement> = {
    onBeforeEnter(el) {
      enteringEl.value = el;
    },

    async onLeave(el, done) {
      await transition(el);
      done();
    }
  };

  return h(
    'ion-router-outlet',
    { ...outletProps, ref: ionRouterOutlet },
    h(View, { name, route }, (...opts: any) => {
      const { Component, props: componentProps } = opts[0];
      return h(
        Transition,
        {
          css: false,
          mode: 'in-out',
          ...transitionHooks
        },
        () => h(Component, componentProps)
      );
    })
  );
};

IonRouterView.props = ['name', 'route', 'animated', 'animation', 'mode'];
