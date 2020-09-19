import { keys } from 'ts-transformer-keys';
import { defineComponent, h, ref } from 'vue';
import { useRouter } from 'vue-router';
import { JSX } from '@ionic/core';
import { getComponentClasses, getElementClasses, splitPropsAndEvents } from '../../utils';

export const IonBackButton = defineComponent<JSX.IonBackButton>((props, { attrs }) => {
  const router = useRouter();
  const buttonRef = ref<HTMLElement>();
  const classes = new Set(getComponentClasses(attrs.class));

  return () => {
    getComponentClasses(attrs.class).forEach(value => {
      classes.add(value);
    });
    return h('ion-back-button', {
      ...props,
      ref: buttonRef,
      class: getElementClasses(buttonRef, classes),
      onClick(e: MouseEvent) {
        attrs.onClick && (attrs.onClick as any)(e);

        if (e.defaultPrevented || !router) {
          return;
        }

        router.animationOverride = props.routerAnimation;

        props.defaultHref
          ? router.replace(props.defaultHref)
          : router.history.go(-1);
      }
    });
  };
});

const data = splitPropsAndEvents(keys<JSX.IonBackButton>());
IonBackButton.displayName = 'IonBackButton';
IonBackButton.props = data.props;
IonBackButton.emits = ['onClick', ...data.events];
