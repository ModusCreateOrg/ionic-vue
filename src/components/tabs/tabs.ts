import { Component, FunctionalComponent, VNode, h, ref } from 'vue';
import { ShapeFlags } from '@vue/shared';

// CSS for ion-tabs inner and outer elements
const hostStyles = {
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  contain: 'layout size style',
};

const innerStyles = {
  position: 'relative',
  flex: 1,
  contain: 'layout size style',
};

export const tabs = ref<VNode[]>([]);

export const IonTabs: FunctionalComponent = (props, { slots }) => {
  const children = slots.default && slots.default().map((child: VNode) => {
    if (child.shapeFlag & ShapeFlags.COMPONENT && (child.type as Component).displayName === 'ion-tab') {
      tabs.value.push(child);
    }
    return child;
  });

  return h('div', { ...props, style: hostStyles }, [
    slots.top && slots.top(),
    h('div', { class: 'tabs-inner', style: innerStyles }, children),
    slots.bottom && slots.bottom(),
  ]);
}

IonTabs.displayName = 'ion-tabs';
