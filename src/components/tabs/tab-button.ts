import { FunctionalComponent, defineComponent, h } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';
import { tabLocations, tabsRef } from './tabs';
import { setActiveTab, tabBarRef } from './tab-bar';
import { Navigable } from '../../interfaces';

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

export const IonTabButton: FunctionalComponent<JSX.IonTabButton & Navigable> = defineComponent((props, { slots }) => {
  const router = useRouter();

  const onClick = async (e: MouseEvent) => {
    props.onClick && props.onClick(e);

    if (e.defaultPrevented) {
      return;
    }

    if (tabsRef.value && tabsRef.value.onIonTabsWillChange && props.tab) {
      tabsRef.value.onIonTabsWillChange(new CustomEvent('ionTabWillChange', { detail: { tab: props.tab } }));
    }

    const wasActiveTab = tabBarRef.value?.selectedTab === props.tab;
    tabBarRef.value && (tabBarRef.value.selectedTab = props?.tab);

    if (props.tab && props.href && router) {
      const location = tabLocations[props.tab] || props.href;
      const goToRoot = wasActiveTab && router.currentRoute.value.fullPath === location;
      setActiveTab(tabBarRef.value?.selectedTab);
      location && router.push(goToRoot ? props.href : location);
    } else {
      setActiveTab(tabBarRef.value?.selectedTab);
    }

    if (tabsRef.value && tabsRef.value.onIonTabsDidChange && props.tab) {
      tabsRef.value.onIonTabsDidChange(new CustomEvent('ionTabDidChange', { detail: { tab: props.tab } }));
    }

    e.preventDefault();
  };

  return () => h(name, { ...props, onClick }, slots);
});

IonTabButton.displayName = name;
IonTabButton.props = componentProps;
