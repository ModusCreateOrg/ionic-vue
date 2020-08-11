import { FunctionalComponent, h } from 'vue';

export const IonPage: FunctionalComponent = (props, { slots }) => {
  return h('ion-page', { ...props, class: 'ion-page' }, slots);
};

IonPage.displayName = 'ion-page';
