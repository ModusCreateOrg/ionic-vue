import { FunctionalComponent, defineComponent, h, ref } from 'vue';
import { useLink, useRouter } from 'vue-router';
import { NavigableRouter } from '../interfaces';
import { animationOverride, directionOverride } from '../router';
import { getElementClasses, splitPropsAndEvents } from './common';

export const defineContainer = <Props extends object>(name: string, displayName: string, componentProps: string[]) => {
  const Container: FunctionalComponent<Props> = defineComponent((props, { attrs, slots }) => {
    const containerRef = ref<HTMLElement>();
    const classes: string[] = (attrs.class as string)?.split(' ') || [];
    return () =>
      h(name, { ...props, ref: containerRef, class: getElementClasses(containerRef, classes) }, slots);
  });

  Container.displayName = displayName;
  Container.props = componentProps;

  return Container;
};

export const defineNavigableContainer = <Props extends object>(name: string, displayName: string, componentPropsAndEvents: string[]) => {
  const Container: FunctionalComponent<Props & NavigableRouter> = defineComponent((props, { attrs, slots }) => {
    const classes: string[] = (attrs.class as string)?.split(' ') || [];
    const containerRef = ref<HTMLElement>();
    const router = useRouter();
    let { href } = props;
    let onClick: (e: MouseEvent) => void;

    if (router && href !== undefined) {
      const link = useLink({ to: href, replace: props.replace });

      href = link.href.value;
      onClick = (e: MouseEvent) => {
        attrs.onClick && (attrs.onClick as any)(e);

        if (e.defaultPrevented || (props.target && /\b_blank\b/i.test(props.target as string))) {
          return;
        }

        directionOverride.value = props.routerDirection;
        animationOverride.value = props.routerAnimation;

        link.navigate(e);
        e.preventDefault();
      };
    }

    return () =>
      h(name, { ...props, href, onClick, ref: containerRef, class: getElementClasses(containerRef, classes) }, slots);
  });

  const data = splitPropsAndEvents(componentPropsAndEvents);
  Container.displayName = displayName;
  Container.props = [...data.props, 'replace'];
  Container.emits = [...data.events, 'onClick'];

  return Container;
};
