import { FunctionalComponent, defineComponent, h, ref } from 'vue';
import { getComponentClasses, getElementClasses } from '../../utils';

export const IonPage: FunctionalComponent = defineComponent((props, { attrs, slots }) => {
  const pageRef = ref<HTMLElement>();
  const classes = getComponentClasses(attrs.class);
  return () =>
    h('ion-page', { ...props, ref: pageRef, class: getElementClasses(pageRef, classes, ['ion-page']) }, slots);
});

IonPage.displayName = 'IonPage';
