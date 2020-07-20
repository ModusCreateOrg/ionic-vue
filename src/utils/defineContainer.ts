import { FunctionalComponent, h } from 'vue';
import { useLink, useRouter } from 'vue-router';
import { NavigableRouter } from '../interfaces';
import { directionOverride } from '../router';

export const defineContainer = <Props extends object>(name: string, componentProps: string[]) => {
  const Container: FunctionalComponent<Props> = (props, { slots }) =>
    h(name, props, slots.default && slots.default());

  Container.displayName = name;
  Container.props = componentProps;

  return Container;
};

export const defineNavigableContainer = <Props extends object>(name: string, componentProps: string[]) => {
  const Container: FunctionalComponent<Props & NavigableRouter> = (props, { slots }) => {
    const router = useRouter();

    if (router && props.href !== undefined) {
      const link = useLink({ to: props.href, replace: props.replace });
      const oldClick = props.onClick;
      props.onClick = (e: MouseEvent) => {
        oldClick && oldClick(e);
        directionOverride.value = props.routerDirection;
        !e.defaultPrevented && link.navigate(e) && e.preventDefault();
      };
    }

    return h(name, props, slots.default && slots.default());
  };

  Container.displayName = name;
  Container.props = [...componentProps, 'onClick', 'replace', 'routerDirection', 'routerAnimation'];

  return Container;
};
