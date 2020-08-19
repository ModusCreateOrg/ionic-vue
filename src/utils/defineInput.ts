import { FunctionalComponent, VNode, defineComponent, h, ref } from 'vue';
import { getElementClasses, splitPropsAndEvents } from './common';

export interface InputProps extends Object {
  modelValue: string | boolean;
}

export enum InputEvents {
  onUpdate = 'update:modelValue'
}

// @TODO
// remove replace() when Vue supports camelCase events that Ionic uses
export function defineInput<Props>(
  name: string,
  displayName: string,
  componentPropsAndEvents: string[],
  updateEvent = 'onIonChange',
  modelProp = 'value'
) {
  const Input: FunctionalComponent<Props & InputProps, (InputEvents | string)[] | {}> = defineComponent((
    props,
    { attrs, slots, emit }
  ) => {
    const inputRef = ref<HTMLElement>();
    const classes: string[] = (attrs.class as string)?.split(' ') || [];

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
    return () => h(
      name,
      {
        ...props,
        onVnodeBeforeMount,
        class: getElementClasses(inputRef, classes),
        [modelProp]: props.hasOwnProperty('modelValue') ? props.modelValue : (props as any)[modelProp],
      },
      slots
    );
  });

  const data = splitPropsAndEvents(componentPropsAndEvents);
  Input.displayName = displayName;
  Input.props = [modelProp, 'modelValue', ...data.props];
  Input.emits = [InputEvents.onUpdate, ...data.events];

  return Input;
}
