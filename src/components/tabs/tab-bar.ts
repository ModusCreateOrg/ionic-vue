import { Component, FunctionalComponent, VNode, h, ref } from 'vue';
import { ShapeFlags } from '@vue/shared';
import { tabNodes } from './tabs';
import { JSX } from '@ionic/core';

const setActiveTab = (value?: string) => {
  tabNodes.value.forEach((node, tab) => {
    node.el!.active = tab === value;
  });
}

const componentProps: (keyof JSX.IonTabBar)[] = [
  'color',
  'mode',
  'selectedTab',
  'translucent',
];

export const IonTabBar: FunctionalComponent<JSX.IonTabBar> = (props, { slots }) => {
  const tabBarRef = ref<HTMLIonTabBarElement>();

  const children = slots.default && slots.default().map((child: VNode) => {
    if (child.shapeFlag & ShapeFlags.COMPONENT && (child.type as Component).displayName === 'ion-tab-button') {
      return { ...child, props: { ...child.props, onClick: () => {
        tabBarRef.value && (tabBarRef.value.selectedTab = child.props?.tab);
        setActiveTab(tabBarRef.value?.selectedTab);
      } } };
    }
    return child;
  });

  if (props.selectedTab) {
    setActiveTab(props.selectedTab);
  }

  return h('ion-tab-bar', { ...props, ref: tabBarRef }, children);
}

IonTabBar.displayName = 'ion-tab-bar';
IonTabBar.props = componentProps;
