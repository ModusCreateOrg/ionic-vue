import { FunctionalComponent, VNode, h } from 'vue';

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

    // @TODO hack to support CamelCase Ionic events
    const onVnodeBeforeMount = (vnode: VNode) => {
      if (vnode.el) {
        vnode.el.addEventListener(updateEvent.replace('onIon', 'ion'), (e: Event) => {
          emit(InputEvents.onUpdate, (e?.target as any)[modelProp]);
        });
        for (const [key, prop] of Object.entries(props)) {
          if (key.startsWith('onIon')) {
            vnode.el.addEventListener(key.replace('onIon', 'ion'), prop);
          }
        }
      }
    };
    return h(
      ionTag,
      {
        ...restOfProps,
        onVnodeBeforeMount,
        [modelProp]: props.hasOwnProperty('modelValue') ? modelValue : (props as any)[modelProp],
      },
      slots.default && slots.default()
    );
  };

  Input.displayName = name;
  Input.props = [modelProp, 'modelValue', ...componentProps];
  Input.emits = [InputEvents.onUpdate];

  return Input;
}
