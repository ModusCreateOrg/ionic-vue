import { FunctionalComponent, h } from 'vue';

export interface InputProps extends Object {
  modelValue: string | boolean;
}

export enum InputEvents {
  onUpdate = 'update:modelValue'
}

// @TODO
// remove replace() when Vue supports camelCase events that Ionic uses
// camelCase attributes don't work either
export function defineInput<Props>(
  name: string,
  ionTag: string,
  componentProps: string[],
  updateEvent = 'onIonChange',
  modelProp = 'value'
) {
  const Input: FunctionalComponent<Props & InputProps, InputEvents[]> = (
    props,
    { slots, emit }
  ) => {
    const { modelValue, ...restOfProps } = props;
    return h(
      ionTag,
      {
        ...restOfProps,
        [modelProp]: modelValue,
        [updateEvent.replace('Ion', '')]: (e: Event) =>
          emit(InputEvents.onUpdate, (e?.target as any)[modelProp])
      },
      slots.default && slots.default()
    );
  };

  Input.displayName = name;
  Input.props = [modelProp, 'modelValue', ...componentProps];
  Input.emits = [InputEvents.onUpdate];

  return Input;
}
