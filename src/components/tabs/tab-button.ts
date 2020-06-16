import { FunctionalComponent, h } from 'vue';
import { JSX } from '@ionic/core';
import { setActiveTab, tabBarRef } from './tab-bar';

const name = 'ion-tab-button';
const componentProps: (keyof JSX.IonTabButton)[] = [
  'disabled',
  'download',
  'href',
  'layout',
  'mode',
  'rel',
  'selected',
  'tab',
  'target',
];

export const IonTabButton: FunctionalComponent<JSX.IonTabButton> = (props, { slots }) =>
  h(name, { ...props, onClick() {
    tabBarRef.value && (tabBarRef.value.selectedTab = props?.tab);
    setActiveTab(tabBarRef.value?.selectedTab);
  } }, slots.default && slots.default());

IonTabButton.displayName = name;
IonTabButton.props = componentProps;
