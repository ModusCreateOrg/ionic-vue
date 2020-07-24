import { FunctionalComponent, VNode, h } from 'vue';
import { splitPropsAndEvents } from './splitPropsAndEvents';

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
  componentPropsAndEvents: string[],
  updateEvent = 'onIonChange',
  modelProp = 'value'
) {
  const Input: FunctionalComponent<Props & InputProps, (InputEvents | string)[]> = (
    props,
    { attrs, slots, emit }
  ) => {
    const { modelValue, ...restOfProps } = props;

    // @TODO hack to support CamelCase Ionic events
    const onVnodeBeforeMount = (vnode: VNode) => {
      if (vnode.el) {
        vnode.el.addEventListener(updateEvent.replace('onIon', 'ion'), (e: Event) => {
          emit(InputEvents.onUpdate, (e?.target as any)[modelProp]);
        });
        for (const [key, event] of Object.entries(attrs)) {
          if (key.startsWith('onIon')) {
            vnode.el.addEventListener(key.replace('onIon', 'ion'), event);
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

  const data = splitPropsAndEvents(componentPropsAndEvents);
  Input.displayName = name;
  Input.props = [modelProp, 'modelValue', ...data.props];
  Input.emits = [InputEvents.onUpdate, ...data.events];

  return Input;
}
