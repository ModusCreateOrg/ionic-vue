import { FunctionalComponent, h } from 'vue';
import { JSX } from '@ionic/core';
import { tabNodesRef, tabsRef } from './tabs';
import { setActiveTab, tabBarRef } from './tab-bar';
import { useRouter } from 'vue-router';

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

export const IonTabButton: FunctionalComponent<JSX.IonTabButton> = (props, { slots }) => {
  const router = useRouter();

  const onClick = async () => {
    console.log('clicl', tabsRef.value?.onIonTabsWillChange);
    if (tabsRef.value && tabsRef.value.onIonTabsWillChange && props.tab) {
      tabsRef.value.onIonTabsWillChange(new CustomEvent('ionTabWillChange', { detail: { tab: props.tab } }));
    }

    tabBarRef.value && (tabBarRef.value.selectedTab = props?.tab);

    if (props.tab && props.href && router) {
      const location = tabNodesRef.value.get(props.tab)?.location || props.href;
      location && router.push(router.currentRoute.value.fullPath === location ? props.href : location);
    } else {
      setActiveTab(tabBarRef.value?.selectedTab);
    }

    if (tabsRef.value && tabsRef.value.onIonTabsDidChange && props.tab) {
      tabsRef.value.onIonTabsDidChange(new CustomEvent('ionTabDidChange', { detail: { tab: props.tab } }));
    }
  };

  return h(name, { ...props, onClick }, slots.default && slots.default());
};

IonTabButton.displayName = name;
IonTabButton.props = componentProps;
