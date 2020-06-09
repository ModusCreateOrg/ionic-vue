import { FunctionalComponent, h } from 'vue';
import { JSX } from '@ionic/core';
import { tabNodes } from './tabs';

const componentProps: (keyof JSX.IonTab)[] = [ 'tab' ];

export const IonTab: FunctionalComponent<JSX.IonTab> = (props, { slots }) => {
  const vnode = h('ion-tab', props, slots.default && slots.default());
  tabNodes.value.set(props.tab, vnode);
  return vnode;
}

IonTab.displayName = 'ion-tab';
IonTab.props = componentProps;
