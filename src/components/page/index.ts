import { FunctionalComponent, defineComponent, h } from 'vue';

const name = 'ion-page';
export const IonPage: FunctionalComponent = defineComponent((props, { slots }) => {
  return () => h(name, { ...props, class: 'ion-page' }, slots);
});

IonPage.displayName = name;
