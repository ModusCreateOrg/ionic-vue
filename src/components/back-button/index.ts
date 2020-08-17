import { FunctionalComponent, h } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';
import { NavigableBack } from '../../interfaces';

export const IonBackButton: FunctionalComponent<JSX.IonBackButton & NavigableBack> = props => {
  const router = useRouter();
  return h('ion-back-button', {
    ...props,
    onClick(e: MouseEvent) {
      props.onClick && props.onClick(e);

      if (e.defaultPrevented) {
        return;
      }

      props.defaultHref
        ? router?.replace(props.defaultHref)
        : router?.history.go(-1);
    }
  });
};

IonBackButton.props = [
  'defaultHref',
  'color',
  'disabled',
  'icon',
  'mode',
  'text',
  'type',
  'onClick',
];
