import { defineComponent, h, inject } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';
import { keys } from 'ts-transformer-keys';
import { onIonTabsDidChange, onIonTabsWillChange, tabLocations } from './tabs';
import { setActiveTab, tabBarRef } from './tab-bar';
import { Navigable } from '../../interfaces';
import { splitPropsAndEvents } from '../../utils';

export const IonTabButton = defineComponent<JSX.IonTabButton & Navigable>((props, { attrs, slots }) => {
  const router = useRouter();
  const tabsWillChange = inject(onIonTabsWillChange) ?? (() => void 0);
  const tabsDidChange = inject(onIonTabsDidChange) ?? (() => void 0);

  const onClick = async (e: MouseEvent) => {
    attrs.onClick && (attrs.onClick as any)(e);

    if (e.defaultPrevented) {
      return;
    }

    tabsWillChange(props.tab);

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

    tabsDidChange(props.tab);

    e.preventDefault();
  };

  return () => h('ion-tab-button', { ...props, onClick }, slots);
});


const data = splitPropsAndEvents(keys<JSX.IonTabButton>());
IonTabButton.displayName = 'IonTabButton';
IonTabButton.props = data.props;
IonTabButton.emits = ['onClick', ...data.events];
