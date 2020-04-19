import { FunctionalComponent, h } from 'vue';

type Data = {
  [key: string]: unknown;
};

export const defineContainer = (name: string) => {
  const Container: FunctionalComponent<Data> = (props, { slots }) =>
    h(name, props, slots.default && slots.default());

  Container.displayName = name;

  return Container;
};
