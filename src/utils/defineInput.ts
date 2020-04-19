import { FunctionalComponent, h } from 'vue';

export interface InputProps {
  modelValue: string | boolean;
  [key: string]: unknown;
}

export enum InputEvents {
  onUpdate = 'update:modelValue'
}

// @TODO
// remove replace() when Vue supports camelCase events that Ionic uses
// camelCase attributes don't work either
export function defineInput(
  name: string,
  ionTag: string,
  updateEvent = 'onIonChange',
  modelProp = 'value'
) {
  const Input: FunctionalComponent<InputProps, InputEvents[]> = (
    props,
    { attrs, slots, emit }
  ) => {
    return h(
      ionTag,
      {
        ...attrs,
        [modelProp]: props.modelValue,
        [updateEvent.replace('Ion', '')]: (e: Event) =>
          emit(InputEvents.onUpdate, (e?.target as any)[modelProp])
      },
      slots.default && slots.default()
    );
  };

  Input.displayName = name;
  Input.props = [modelProp, 'modelValue'];
  Input.emits = [InputEvents.onUpdate];

  return Input;
}
