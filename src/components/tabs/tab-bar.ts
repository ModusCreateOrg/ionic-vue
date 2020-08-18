import { FunctionalComponent, defineComponent, h, ref } from 'vue';
import { tabRefs } from './tabs';
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
  Object.keys(tabRefs).forEach((tabName) => {
    const tab = tabRefs[tabName]?.value;
    tab && (tab.active = tabName === value);
  });
};

export const IonTabBar: FunctionalComponent<JSX.IonTabBar> = defineComponent((props, { slots }) => {
  const tabs = Object.keys(tabRefs);
  const selectedTab = tabBarRef.value?.selectedTab || props.selectedTab || (tabs.length && tabs[0]) || undefined;
  return () => h(name, { ...props, selectedTab, ref: tabBarRef }, slots);
});

IonTabBar.displayName = name;
IonTabBar.props = componentProps;
