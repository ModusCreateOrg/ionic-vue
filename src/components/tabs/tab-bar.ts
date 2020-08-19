import { FunctionalComponent, defineComponent, h, ref } from 'vue';
import { JSX } from '@ionic/core';
import { tabRefs } from './tabs';

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
  return () => h('ion-tab-bar', { ...props, selectedTab, ref: tabBarRef }, slots);
});

IonTabBar.displayName = 'IonTabBar';
IonTabBar.props = componentProps;
