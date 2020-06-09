import { FunctionalComponent, h } from 'vue';
import { JSX } from '@ionic/core';
import { tabNodes } from './tabs';

const name = 'ion-tab';
const componentProps: (keyof JSX.IonTab)[] = [ 'tab' ];

export const IonTab: FunctionalComponent<JSX.IonTab> = (props, { slots }) => {
  const vnode = h(name, props, slots.default && slots.default());
  tabNodes.value.set(props.tab, vnode);
  return vnode;
}

IonTab.displayName = name;
IonTab.props = componentProps;
