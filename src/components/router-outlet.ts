import {
  BaseTransitionProps,
  FunctionalComponent,
  Transition,
  h,
  ref
} from 'vue';
import { RouteLocationNormalized, View, useRouter } from 'vue-router';
import { RouterOutletOptions } from '@ionic/core';

export interface Props extends RouterOutletOptions {
  name?: string;
  route?: RouteLocationNormalized;
}

export const IonRouterView: FunctionalComponent<Props> = (props, { attrs }) => {
  const router = useRouter();
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
      duration: undefined,
      direction: router.history.state.forward ? 'back' : 'forward'
      // showGoBack: true,
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
    { ...attrs, ref: ionRouterOutlet },
    h(View, { name: props.name }, (...opts: any) => {
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

IonRouterView.props = ['name'];
