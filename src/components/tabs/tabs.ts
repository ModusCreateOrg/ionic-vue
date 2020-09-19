import { FunctionalComponent, InjectionKey, Ref, defineComponent, h, provide, ref } from 'vue';
import { keys } from 'ts-transformer-keys';
import { JSX } from '@ionic/core';
import { splitPropsAndEvents } from '../../utils';

// CSS for ion-tabs inner and outer elements
const hostStyles = {
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  contain: 'layout size style',
};

const innerStyles = {
  position: 'relative',
  flex: 1,
  contain: 'layout size style',
};

export const tabsRef = ref<HTMLIonTabsElement & JSX.IonTabs>();
export const tabRefs: { [key: string]: Ref<HTMLIonTabElement | undefined> } = {};
export const tabLocations: { [key: string]: string | undefined } = {};
export const onIonTabsWillChange: InjectionKey<((tab?: string) => void)> = Symbol();
export const onIonTabsDidChange: InjectionKey<((tab?: string) => void)> = Symbol();

const data = splitPropsAndEvents(keys<JSX.IonTabs>());
export const IonTabs: FunctionalComponent<JSX.IonTabs, typeof data.events | {}> = defineComponent((props, { slots, attrs }) => {
  provide(onIonTabsWillChange, attrs.onIonTabsWillChange);
  provide(onIonTabsDidChange, attrs.onIonTabsDidChange);

  return () => h('div', { ...props, style: hostStyles, ref: tabsRef }, [
    slots.top && slots.top(),
    h('div', { class: 'tabs-inner', style: innerStyles }, slots),
    slots.bottom && slots.bottom(),
  ]);
});

IonTabs.displayName = 'IonTabs';
IonTabs.emits = data.events;
