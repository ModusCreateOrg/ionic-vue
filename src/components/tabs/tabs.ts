import { FunctionalComponent, Ref, VNode, h, ref } from 'vue';
import { JSX } from '@ionic/core';

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

export interface Tab {
  ref: Ref<HTMLIonTabElement | undefined>;
  location?: string;
}

export const tabNodesRef = ref<Map<string, Tab>>(new Map());
export const tabsRef = ref<HTMLIonTabsElement & JSX.IonTabs>();

export const IonTabs: FunctionalComponent<JSX.IonTabs> = (props, { slots }) => {
  const { onIonTabsWillChange, onIonTabsDidChange, ...restProps } = props;

  // @TODO remove when Vue3 allows for camelCase props and events
  const onVnodeMounted = ({ el }: VNode) => {
    if (el) {
      el.onIonTabsDidChange = onIonTabsDidChange;
      el.onIonTabsWillChange = onIonTabsWillChange;
    }
  };

  return h('div', { ...restProps, onVnodeMounted, style: hostStyles, ref: tabsRef }, [
    slots.top && slots.top(),
    h('div', { class: 'tabs-inner', style: innerStyles }, slots.default && slots.default()),
    slots.bottom && slots.bottom(),
  ]);
};

IonTabs.displayName = 'ion-tabs';
IonTabs.emits = ['onIonTabsWillChange', 'onIonTabsDidChange'];
