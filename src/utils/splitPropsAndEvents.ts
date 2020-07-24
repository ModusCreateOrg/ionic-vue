export const splitPropsAndEvents = (propsAndEvents: string[]) => {
  const props: string[] = [];
  const events: string[] = [];
  propsAndEvents.map(i => (i.startsWith('on') ? events : props).push(i));
  return { props, events };
};
