import { Ref } from 'vue';

export const getComponentClasses = (classes: unknown) => {
  return (classes as string)?.split(' ') || [];
};

export const getElementClasses = (ref: Ref<HTMLElement | undefined>, componentClasses: string[], defaultClasses: string[] = []) => {
  return [ ...Array.from(ref.value?.classList || []), ...defaultClasses ]
    .filter((c: string, i, self) => !componentClasses.includes(c) && self.indexOf(c) === i);
};

export const splitPropsAndEvents = (propsAndEvents: string[]) => {
  const props: string[] = [];
  const events: string[] = [];
  const ignoredProps = ['component', 'componentProps', 'delegate'];
  propsAndEvents.map(i => (i.startsWith('on') ? events : props).push(i));
  return { props: props.filter(p => !ignoredProps.includes(p)), events };
};
