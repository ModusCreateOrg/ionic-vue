import { defineComponent, h, ref } from 'vue';
import { JSX, isPlatform } from '@ionic/core';
import { keys } from 'ts-transformer-keys';
import { getComponentClasses, getElementClasses, splitPropsAndEvents } from '../../utils';

export const IonIcon = defineComponent<JSX.IonIcon>((props, { attrs }) => {
  const icon = (isPlatform(window, 'ios') ? props.ios ?? props.md : props.md ?? props.ios) ?? props.icon;
  const iconRef = ref<HTMLElement>();
  const classes = new Set(getComponentClasses(attrs.class));

  return () => {
    getComponentClasses(attrs.class).forEach(value => {
      classes.add(value);
    });
    return h('ion-icon', {
      ...props,
      icon,
      ref: iconRef,
      class: getElementClasses(iconRef, classes),
    });
  };
});

const data = splitPropsAndEvents(keys<JSX.IonIcon>());
IonIcon.displayName = 'IonIcon';
IonIcon.props = data.props;
IonIcon.emits = data.events;
