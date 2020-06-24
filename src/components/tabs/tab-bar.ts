import { FunctionalComponent, h, ref } from 'vue';
import { tabNodes } from './tabs';
import { JSX } from '@ionic/core';

const name = 'ion-tab-bar';
const componentProps: (keyof JSX.IonTabBar)[] = [
  'color',
  'mode',
  'selectedTab',
  'translucent',
];

export const tabBarRef = ref<HTMLIonTabBarElement>();

export const setActiveTab = (value?: string) => {
  tabNodes.value.forEach((tab, tabName) => {
    // already unref-ed thus casting
    tab.ref && ((tab.ref as unknown as HTMLIonTabElement).active = tabName === value);
  });
};

export const IonTabBar: FunctionalComponent<JSX.IonTabBar> = (props, { slots }) => {
  const selectedTab = tabBarRef.value?.selectedTab || props.selectedTab || (tabNodes?.value.size && tabNodes.value.entries().next().value[0]) || undefined;
  return h(name, { ...props, selectedTab, ref: tabBarRef }, slots.default && slots.default());
};

IonTabBar.displayName = name;
IonTabBar.props = componentProps;
