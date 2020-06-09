import { FunctionalComponent, VNode, h, ref } from 'vue';

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

export const tabNodes = ref<Map<string, VNode>>(new Map());

export const IonTabs: FunctionalComponent = (props, { slots }) => {
  return h('div', { ...props, style: hostStyles }, [
    slots.top && slots.top(),
    h('div', { class: 'tabs-inner', style: innerStyles }, slots.default && slots.default()),
    slots.bottom && slots.bottom(),
  ]);
}

IonTabs.displayName = 'ion-tabs';
