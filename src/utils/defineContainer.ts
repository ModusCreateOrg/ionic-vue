import { FunctionalComponent, defineComponent, h } from 'vue';
import { useLink, useRouter } from 'vue-router';
import { NavigableRouter } from '../interfaces';
import { directionOverride } from '../router';
import { splitPropsAndEvents } from './splitPropsAndEvents';

export const defineContainer = <Props extends object>(name: string, componentProps: string[]) => {
  const Container: FunctionalComponent<Props> = defineComponent((props, { slots }) => {
    return () => h(name, props, slots);
  });

  Container.displayName = name;
  Container.props = componentProps;

  return Container;
};

export const defineNavigableContainer = <Props extends object>(name: string, componentPropsAndEvents: string[]) => {
  const Container: FunctionalComponent<Props & NavigableRouter> = defineComponent((props, { attrs, slots }) => {
    const router = useRouter();
    let { href } = props;
    let onClick: (e: MouseEvent) => void;

    if (router && href !== undefined) {
      const link = useLink({ to: href, replace: props.replace });
      const oldClick = attrs.onClick as any;

      href = link.href.value;
      onClick = (e: MouseEvent) => {
        oldClick && oldClick(e);
        directionOverride.value = props.routerDirection;

        if (e.defaultPrevented || (props.target && /\b_blank\b/i.test(props.target as string))) {
          return;
        }

        link.navigate(e);
        e.preventDefault();
      };
    }

    return () => h(name, { ...props, href, onClick }, slots);
  });

  const data = splitPropsAndEvents(componentPropsAndEvents);
  Container.displayName = name;
  Container.props = [...data.props, 'replace', 'routerDirection', 'routerAnimation'];
  Container.emits = [...data.events, 'onClick'];

  return Container;
};
