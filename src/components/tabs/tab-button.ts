import { FunctionalComponent, defineComponent, h } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';
import { keys } from 'ts-transformer-keys';
import { tabLocations, tabsRef } from './tabs';
import { setActiveTab, tabBarRef } from './tab-bar';
import { Navigable } from '../../interfaces';
import { splitPropsAndEvents } from '../../utils';

export const IonTabButton: FunctionalComponent<JSX.IonTabButton & Navigable> = defineComponent((props, { attrs, slots }) => {
  const router = useRouter();

  const onClick = async (e: MouseEvent) => {
    attrs.onClick && (attrs.onClick as any)(e);

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

  return () => h('ion-tab-button', { ...props, onClick }, slots);
});


const data = splitPropsAndEvents(keys<JSX.IonTabButton>());
IonTabButton.displayName = 'IonTabButton';
IonTabButton.props = data.props;
IonTabButton.emits = ['onClick', ...data.events];
