import { FunctionalComponent, Ref, getCurrentInstance, h, onActivated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { JSX } from '@ionic/core';
import { tabNodes } from './tabs';
import { tabBarRef } from './tab-bar';

const name = 'ion-tab';
const componentProps: (keyof JSX.IonTab)[] = [ 'tab' ];
const refs: { [key: string]: Ref<HTMLIonTabElement | undefined> } = {};

export const IonTab: FunctionalComponent<Omit<JSX.IonTab, 'component'>> = (props, { slots }) => {
  let tabNode = tabNodes.value.get(props.tab);
  let active = tabBarRef.value?.selectedTab === props.tab;
  const instance = getCurrentInstance()!;
  const route = useRoute();

  if (tabBarRef.value?.selectedTab === undefined) {
    tabBarRef.value && (tabBarRef.value.selectedTab = props.tab);
    active = true;
  }

  if (!tabNode) {
    refs[props.tab] = ref<HTMLIonTabElement>();
    tabNodes.value.set(props.tab, { ref: refs[props.tab] });
  }
  tabNode = tabNodes.value.get(props.tab)!;

  // Only add Lifecycle.ACTIVATE hooks once
  // @ts-ignore
  if (!instance?.a || instance?.a.length === 0) {
    onActivated(() => {
      const tabRef = refs[props.tab].value;
      tabBarRef.value && (tabBarRef.value.selectedTab = props.tab);
      tabRef && (tabRef.active = true);
    }, instance);
  }

  const onVnodeUpdated = () => {
    if (tabBarRef.value?.selectedTab === props.tab) {
      tabNode && route && (tabNode.location = route.fullPath);
    }
  };
  const onVnodeBeforeUnmount = () => {
    tabBarRef.value && (tabBarRef.value.selectedTab = undefined);
  };

  return h(name, { ...props, active, onVnodeUpdated, onVnodeBeforeUnmount, ref: refs[props.tab] }, slots.default && slots.default());
};

IonTab.displayName = name;
IonTab.props = componentProps;
