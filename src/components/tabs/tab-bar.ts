import { FunctionalComponent, defineComponent, h, ref } from 'vue';
import { JSX } from '@ionic/core';
import { keys } from 'ts-transformer-keys';
import { tabRefs } from './tabs';
import { splitPropsAndEvents } from '../../utils';

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

const data = splitPropsAndEvents(keys<JSX.IonTabBar>());
IonTabBar.displayName = 'IonTabBar';
IonTabBar.props = data.props;
IonTabBar.emits = data.events;
