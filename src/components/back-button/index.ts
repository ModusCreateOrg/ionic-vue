import { keys } from 'ts-transformer-keys';
import { FunctionalComponent, defineComponent, h, ref } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';
import { animationOverride } from '../../router';
import { getComponentClasses, getElementClasses, splitPropsAndEvents } from '../../utils';

export const IonBackButton: FunctionalComponent<JSX.IonBackButton> = defineComponent((props, { attrs }) => {
  const router = useRouter();
  const buttonRef = ref<HTMLElement>();
  const classes = getComponentClasses(attrs.class);

  return () => h('ion-back-button', {
    ...props,
    ref: buttonRef,
    class: getElementClasses(buttonRef, classes),
    onClick(e: MouseEvent) {
      attrs.onClick && (attrs.onClick as any)(e);

      if (e.defaultPrevented || !router) {
        return;
      }

      animationOverride.value = props.routerAnimation;

      props.defaultHref
        ? router.replace(props.defaultHref)
        : router.history.go(-1);
    }
  });
});

const data = splitPropsAndEvents(keys<JSX.IonBackButton>());
IonBackButton.displayName = 'IonBackButton';
IonBackButton.props = data.props;
IonBackButton.emits = ['onClick', ...data.events];
