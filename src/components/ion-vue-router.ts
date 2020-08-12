import Vue, { CreateElement, RenderContext, VNode, VNodeData } from 'vue';
import { NavDirection } from '@ionic/core';

type TransitionDone = () => void;

interface KeepAliveProps {
  include?: string | string[] | RegExp;
  exclude?: string | string[] | RegExp;
  max?: number;
}

interface Props {
  name?: string;
  animated?: boolean;
  keepAlive?: KeepAliveProps;
}

// Component entering the view
let enteringEl: HTMLElement;

export default {
  name: 'IonVueRouter',
  functional: true,

  props: {
    // Router view name
    name: { default: 'default', type: String },
    // Disable transitions
    animated: { default: true, type: Boolean },
    // keep-alive props
    keepAlive: { type: [String, Object as () => KeepAliveProps] }
  },

  render(h: CreateElement, { parent, props, data, children }: RenderContext) {
    if (!parent.$router) {
      throw new Error(
        'IonVueRouter requires an instance of either VueRouter or IonicVueRouter'
      );
    }

    const ionRouterOutletData: VNodeData = {
      ...data,
      ref: 'ionRouterOutlet',
      on: { click: (event: Event) => catchIonicGoBack(parent, event) }
    };
    const routerViewData: VNodeData = { props: { name: props.name } };
    const transitionData: VNodeData = {
      props: { css: false, mode: 'in-out' },
      on: {
        leave: (el: HTMLElement, done: TransitionDone) => {
          leave(parent, props as Props, el, done);
        },
        enter: (el: HTMLElement, done: TransitionDone) => {
          enter(parent, el, done);
        },
        beforeEnter,
        afterEnter,
        beforeLeave,
        afterLeave,
        enterCancelled,
        leaveCancelled
      }
    };
    const routerViewNode: VNode = h('router-view', routerViewData, children);
    const keepAliveNode: VNode = h(
      'keep-alive',
      { props: { ...props.keepAlive } },
      [routerViewNode]
    );
    const transitionNode: VNode = h('transition', transitionData, [
      props.keepAlive === undefined ? routerViewNode : keepAliveNode
    ]);

    return h('ion-router-outlet', ionRouterOutletData, [transitionNode]);
  }
};

function catchIonicGoBack(parent: Vue, event: Event): void {
  // In case of nested ion-vue-routers run only once
  event.stopImmediatePropagation();

  if (!event.target) return;

  // We only care for the event coming from Ionic's back button
  const backButton = (event.target as HTMLElement).closest(
    'ion-back-button'
  ) as HTMLIonBackButtonElement;
  if (!backButton) return;

  const $router = parent.$router;
  let defaultHref: string;

  // Explicitly override router direction to always trigger a back transition
  $router.directionOverride = 'back';

  // If we can go back - do so
  if ($router.canGoBack()) {
    event.preventDefault();
    $router.back();
    return;
  }

  // If there's a default fallback - use it
  defaultHref = backButton.defaultHref as string;
  if (undefined !== defaultHref) {
    event.preventDefault();
    $router.push(defaultHref);
  }
}

// Transition when we leave the route
async function leave(
  parent: Vue,
  props: Props,
  el: HTMLElement,
  done: TransitionDone
) {
  await parent.$router.saveScroll(el);

  // Perform navigation once the transition was finished
  parent.$router.transition = new Promise(async resolve => {
    await transition(parent, props, el);
    done();
    resolve();
  });
}

// Trigger the ionic/core transitions
function transition(parent: Vue, props: Props, leavingEl: HTMLElement) {
  const ionRouterOutlet = parent.$refs
    .ionRouterOutlet as HTMLIonRouterOutletElement;

  // The Ionic framework didn't load - skip animations
  if (typeof ionRouterOutlet.componentOnReady === 'undefined') {
    return;
  }

  // Skip animations if there's no component to navigate to
  // or the current and the "to-be-rendered" components are the same
  if (!enteringEl || enteringEl === leavingEl) {
    return;
  }

  // Add the proper Ionic classes, important for smooth transitions
  enteringEl.classList.add('ion-page', 'ion-page-invisible');

  // Reset the cached styling applied by ionic/core's:
  // .afterStyles({ 'display': 'none' })
  if (typeof props.keepAlive !== 'undefined') {
    enteringEl.style.display = '';
  }

  // Commit to the transition as soon as the Ionic Router Outlet is ready
  return ionRouterOutlet
    .componentOnReady()
    .then((el: HTMLIonRouterOutletElement) => {
      return el.commit(enteringEl, leavingEl, {
        deepWait: true,
        duration:
          !props.animated || parent.$router.direction === 'root'
            ? 0
            : undefined,
        direction: parent.$router.direction as NavDirection,
        showGoBack: parent.$router.canGoBack()
      });
    })
    .catch(console.error);
}

// Set the component to be rendered before we render the new route
function beforeEnter(el: HTMLElement) {
  enteringEl = el;
}

// Enter the new route
function enter(parent: Vue, el: HTMLElement, done: TransitionDone) {
  if (parent.$router.direction === 'back') {
    parent.$router
      .restoreScroll(el, parent.$router.currentRoute.fullPath)
      .then(done);
  } else {
    done();
  }
}

// Vue transition stub functions
function afterEnter(_el: HTMLElement) {
  /* */
}
function afterLeave(_el: HTMLElement) {
  /* */
}
function beforeLeave(_el: HTMLElement) {
  /* */
}
function enterCancelled(_el: HTMLElement) {
  /* */
}
function leaveCancelled(_el: HTMLElement) {
  /* */
}
