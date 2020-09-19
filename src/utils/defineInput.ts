import { defineComponent, h, ref } from 'vue';
import { getComponentClasses, getElementClasses, splitPropsAndEvents } from './common';

export interface InputProps extends Object {
  modelValue: string | boolean;
}

export enum InputEvents {
  onUpdate = 'update:modelValue'
}

export function defineInput<Props>(
  name: string,
  displayName: string,
  componentPropsAndEvents: string[],
  updateEvent = 'onIonChange',
  modelProp = 'value'
) {
  const Input = defineComponent<Props & InputProps>((
    props,
    { attrs, slots, emit }
  ) => {
    const inputRef = ref<HTMLElement>();
    const classes = new Set(getComponentClasses(attrs.class));

    return () => {
      getComponentClasses(attrs.class).forEach(value => {
        classes.add(value);
      });
      return h(
        name,
        {
          ...props,
          ...attrs,
          class: getElementClasses(inputRef, classes),
          [updateEvent]: (e: Event) => emit(InputEvents.onUpdate, (e?.target as any)[modelProp]),
          [modelProp]: props.hasOwnProperty('modelValue') ? props.modelValue : (props as any)[modelProp],
        },
        slots
      );
    };
  });

  const data = splitPropsAndEvents(componentPropsAndEvents);
  Input.displayName = displayName;
  Input.props = [modelProp, 'modelValue', ...data.props];
  Input.emits = [InputEvents.onUpdate, ...data.events];

  return Input;
}
