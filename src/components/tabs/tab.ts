import { FunctionalComponent, defineComponent, getCurrentInstance, h, onActivated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { JSX } from '@ionic/core';
import { keys } from 'ts-transformer-keys';
import { tabBarRef } from './tab-bar';
import { tabLocations, tabRefs } from './tabs';
import { splitPropsAndEvents } from '../../utils';

export const IonTab: FunctionalComponent<Omit<JSX.IonTab, 'component'>> = defineComponent((props, { slots }) => {
  let tabNode = tabRefs[props.tab];
  let active = tabBarRef.value?.selectedTab === props.tab;
  const instance = getCurrentInstance()!;
  const route = useRoute();

  if (tabBarRef.value?.selectedTab === undefined) {
    tabBarRef.value && (tabBarRef.value.selectedTab = props.tab);
    active = true;
  }

  if (!tabNode) {
    tabRefs[props.tab] = ref<HTMLIonTabElement>();
  }
  tabNode = tabRefs[props.tab];

  // Only add Lifecycle.ACTIVATE hooks once
  // @ts-ignore
  if (!instance?.a || instance?.a.length === 0) {
    onActivated(() => {
      const tabRef = tabRefs[props.tab].value;
      tabBarRef.value && (tabBarRef.value.selectedTab = props.tab);
      tabRef && (tabRef.active = true);
    }, instance);
  }

  const onVnodeUpdated = () => {
    if (tabBarRef.value?.selectedTab === props.tab) {
      route && (tabLocations[props.tab] = route.fullPath);
    }
  };
  const onVnodeBeforeUnmount = () => {
    tabBarRef.value && (tabBarRef.value.selectedTab = undefined);
  };

  return () => h('ion-tab', { ...props, active, onVnodeUpdated, onVnodeBeforeUnmount, ref: tabRefs[props.tab] }, slots);
});

const data = splitPropsAndEvents(keys<JSX.IonTab>());
IonTab.displayName = 'IonTab';
IonTab.props = data.props;
IonTab.emits = data.events;
