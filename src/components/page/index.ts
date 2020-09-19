import { defineComponent, h, ref } from 'vue';
import { getComponentClasses, getElementClasses } from '../../utils';

export const IonPage = defineComponent((props, { attrs, slots }) => {
  const pageRef = ref<HTMLElement>();
  const classes = new Set(getComponentClasses(attrs.class));
  return () => {
    getComponentClasses(attrs.class).forEach(value => {
      classes.add(value);
    });
    return h('ion-page', { ...props, ref: pageRef, class: getElementClasses(pageRef, classes, ['ion-page']) }, slots);
  };
});

IonPage.displayName = 'IonPage';
