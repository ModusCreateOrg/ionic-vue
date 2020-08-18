import { FunctionalComponent, defineComponent, h } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';
import { NavigableBack } from '../../interfaces';

const name = 'ion-back-button';
export const IonBackButton: FunctionalComponent<JSX.IonBackButton & NavigableBack> = defineComponent(props => {
  const router = useRouter();
  return () => h(name, {
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
});

IonBackButton.displayName = name;
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
