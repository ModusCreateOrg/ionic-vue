import { FunctionalComponent, h } from 'vue';
import { JSX } from '@ionic/core';
import { tabNodes } from './tabs';
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
    tabBarRef.value && (tabBarRef.value.selectedTab = props?.tab);

    if (props.tab && props.href && router) {
      const location = tabNodes.value.get(props.tab)?.location || props.href;
      location && router.push(router.currentRoute.value.fullPath === location ? props.href : location);
      return;
    }

    setActiveTab(tabBarRef.value?.selectedTab);
  };

  return h(name, { ...props, onClick }, slots.default && slots.default());
}

IonTabButton.displayName = name;
IonTabButton.props = componentProps;
