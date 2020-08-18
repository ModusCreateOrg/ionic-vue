import { FunctionalComponent, defineComponent, h } from 'vue';

export const IonPage: FunctionalComponent = defineComponent((props, { slots }) => {
  return () => h('ion-page', { ...props, class: 'ion-page' }, slots);
});

IonPage.displayName = 'ion-page';
