import { FunctionalComponent, h } from 'vue';
import { useLink, useRouter } from 'vue-router';
import { NavigableRouter } from '../interfaces';
import { directionOverride } from '../router';
import { splitPropsAndEvents } from './splitPropsAndEvents';

export const defineContainer = <Props extends object>(name: string, componentProps: string[]) => {
  const Container: FunctionalComponent<Props> = (props, { slots }) =>
    h(name, props, slots.default && slots.default());

  Container.displayName = name;
  Container.props = componentProps;

  return Container;
};

export const defineNavigableContainer = <Props extends object>(name: string, componentPropsAndEvents: string[]) => {
  const Container: FunctionalComponent<Props & NavigableRouter> = (props, { attrs, slots }) => {
    const router = useRouter();

    if (router && props.href !== undefined) {
      const link = useLink({ to: props.href, replace: props.replace });
      const oldClick = attrs.onClick as any;

      props.href = link.href.value;
      attrs.onClick = (e: MouseEvent) => {
        oldClick && oldClick(e);
        directionOverride.value = props.routerDirection;

        if (e.defaultPrevented || (props.target && /\b_blank\b/i.test(props.target))) {
          return;
        }

        link.navigate(e);
        e.preventDefault();
      };
    }

    return h(name, props, slots.default && slots.default());
  };

  const data = splitPropsAndEvents(componentPropsAndEvents);
  Container.displayName = name;
  Container.props = [...data.props, 'replace', 'routerDirection', 'routerAnimation'];
  Container.emits = [...data.events, 'onClick'];

  return Container;
};
