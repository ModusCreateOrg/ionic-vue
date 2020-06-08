import { Component, FunctionalComponent, VNode, h, ref } from 'vue';
import { ShapeFlags } from '@vue/shared';
import { tabs } from './tabs';
import { JSX } from '@ionic/core';

const setActiveTab = (value?: string) => {
  tabs.value.map(tab => {
    tab.el!.active = tab.props?.tab === value;
  });
}

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
IonTabBar.props = [ 'selectedTab' ];
