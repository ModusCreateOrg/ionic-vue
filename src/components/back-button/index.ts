import { FunctionalComponent, h } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';

export const IonBackButton: FunctionalComponent<JSX.IonBackButton> = props => {
  const router = useRouter();
  return h('ion-back-button', {
    props,
    onClick() {
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
  'type'
];
