import { FunctionalComponent, defineComponent, h, ref } from 'vue';
import { isPlatform } from '@ionic/core';
import { getComponentClasses, getElementClasses } from '../../utils';

interface Props {
  ariaLabel?: string;
  color?: string;
  flipRtl?: boolean;
  icon?: string;
  ios?: string;
  lazy?: boolean;
  md?: string;
  mode?: 'ios' | 'md';
  name?: string;
  size?: string;
  src?: string;
}

export const IonIcon: FunctionalComponent<Props> = defineComponent((props, { attrs }) => {
  const icon = (isPlatform(window, 'ios') ? props.ios ?? props.md : props.md ?? props.ios) ?? props.icon;
  const iconRef = ref<HTMLElement>();
  const classes = getComponentClasses(attrs.class);

  return () => h('ion-icon', {
    ...props,
    icon,
    ref: iconRef,
    class: getElementClasses(iconRef, classes),
  });
});

IonIcon.displayName = 'IonIcon';
IonIcon.props = ['ariaLabel', 'color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'size', 'src'];
