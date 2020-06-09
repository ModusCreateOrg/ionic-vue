import { FunctionalComponent, h } from 'vue';
import { isPlatform } from '@ionic/core';

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

export const IonIcon: FunctionalComponent<Props> = (props) => {
  const { md, ios } = props;
  const icon = (isPlatform(window, 'ios') ? ios ?? md : md ?? ios) ?? props.icon;
  return h('ion-icon', { ...props, icon });
}

IonIcon.displayName = 'ion-icon';
IonIcon.props = ['ariaLabel', 'color', 'flipRtl', 'icon', 'ios', 'lazy', 'md', 'mode', 'name', 'size', 'src'];
