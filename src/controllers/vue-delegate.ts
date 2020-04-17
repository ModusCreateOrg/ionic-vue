import Vue, { VueConstructor } from 'vue';
import {
  FrameworkDelegate,
  LIFECYCLE_DID_ENTER,
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_ENTER,
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_WILL_UNLOAD
} from '@ionic/core';
import { EsModule, HTMLVueElement, WebpackFunction } from '../interfaces';

// Handle creation of sync and async components
async function createVueComponent(
  component: WebpackFunction | object | VueConstructor
): Promise<VueConstructor> {
  if (
    typeof component === 'function' &&
    (component as WebpackFunction).cid === undefined
  ) {
    const cmp = await (component as WebpackFunction)();
    return Vue.extend(isESModule(cmp) ? cmp.default : cmp);
  }
  return Vue.extend(component);
}

export class VueDelegate implements FrameworkDelegate {
  // Attach the passed Vue component to DOM
  async attachViewToDom(
    parentElement: HTMLElement,
    component: HTMLElement | WebpackFunction | object | VueConstructor,
    opts?: object,
    classes?: string[]
  ): Promise<HTMLElement> {
    // Handle HTML elements
    if (isElement(component)) {
      // Add any classes to the element
      addClasses(component as HTMLElement, classes);

      // Append the element to DOM
      parentElement.appendChild(component as HTMLElement);
      bindLifecycleEvents(component, parentElement);
      return Promise.resolve(component as HTMLElement);
    }

    // Get the Vue constructor
    const constructor = await createVueComponent(component);
    const componentInstance = new constructor(opts);
    componentInstance.$mount();

    // Add any classes to the Vue component's root element
    addClasses(componentInstance.$el as HTMLElement, classes);

    // Append the Vue component to DOM
    parentElement.appendChild(componentInstance.$el);
    return componentInstance.$el as HTMLElement;
  }

  // Remove the earlier created Vue component from DOM
  removeViewFromDom(
    _parentElement: HTMLElement,
    childElement: HTMLVueElement
  ): Promise<void> {
    // Destroy the Vue component instance
    if (childElement.__vue__) {
      childElement.__vue__.$destroy();
    }

    return Promise.resolve();
  }
}

const LIFECYCLES = [
  LIFECYCLE_WILL_ENTER,
  LIFECYCLE_DID_ENTER,
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_UNLOAD
];

export function bindLifecycleEvents(instance: any, element: HTMLElement) {
  LIFECYCLES.forEach(eventName => {
    element.addEventListener(eventName, (ev: any) => {
      if (typeof instance[eventName] === 'function') {
        instance[eventName](ev.detail);
      }
    });
  });
}

// Check Symbol support
const hasSymbol =
  typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

// Check if object is an ES module
function isESModule(obj: EsModule) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module');
}

// Check if value is an Element
function isElement(el: any) {
  return typeof Element !== 'undefined' && el instanceof Element;
}

// Add an array of classes to an element
function addClasses(element: HTMLElement, classes: string[] = []) {
  for (const cls of classes) {
    element.classList.add(cls);
  }
}
