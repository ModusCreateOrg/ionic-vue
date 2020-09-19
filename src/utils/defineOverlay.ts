import { FunctionalComponent, defineComponent, h, ref } from 'vue';

export interface OverlayElement extends HTMLElement {
  present: () => Promise<void>;
  dismiss: (...args: any) => Promise<boolean>;
}

export interface OverlayProps {
  isOpen?: boolean;
  modelValue?: boolean;
}

export interface OverlayController<T> {
  create: (...args: any) => Promise<T>;
}

export type OverlayEventListeners = [
  string,
  Exclude<OverlayEvents, typeof OverlayEvents.onUpdate>
][];

export enum OverlayEvents {
  onWillPresent = 'onWillPresent',
  onDidPresent = 'onDidPresent',
  onWillDismiss = 'onWillDismiss',
  onDidDismiss = 'onDidDismiss',
  onUpdate = 'update:modelValue'
}

export enum OverlayType {
  Modal = 'IonModal',
  ActionSheet = 'IonActionSheet',
  Popover = 'IonPopover'
}

export function defineOverlay<IonElement extends OverlayElement, IonProps>(
  name: OverlayType,
  controller: OverlayController<IonElement>,
  componentProps: string[]
) {
  type Props = OverlayProps & Omit<IonProps, 'component' | 'componentProps' | 'delegate'>;

  const overlay = ref<IonElement>();
  const content = ref();
  const coreTag = name.toLowerCase();
  const eventListeners: OverlayEventListeners = Object.entries({
    [`${coreTag}willpresent`]: OverlayEvents.onWillPresent,
    [`${coreTag}didpresent`]: OverlayEvents.onDidPresent,
    [`${coreTag}willdismiss`]: OverlayEvents.onWillDismiss,
    [`${coreTag}diddismiss`]: OverlayEvents.onDidDismiss
  });

  const Overlay: FunctionalComponent<
    Props,
    OverlayEvents[] | {}
    > = defineComponent((props, { attrs, slots, emit }) => {
      return () => h(
        'div',
        {
          style: { display: 'none' },
          async onVnodeUpdated() {
            const isOpen = props.isOpen ?? props.modelValue;
            if (isOpen) {
              await (overlay.value?.present() || present(props, attrs, emit));
            } else {
              await overlay.value?.dismiss();
              overlay.value = undefined;
            }
          },
          async onVnodeMounted() {
            const isOpen = props.isOpen ?? props.modelValue;
            isOpen && (await present(props, attrs, emit));
          },
          async onVnodeBeforeUnmount() {
            await overlay.value?.dismiss();
            overlay.value = undefined;
            content.value = undefined;
          }
        },
        [h('div', { ref: content }, slots)]
      );
    });

  Overlay.displayName = name;
  Overlay.inheritAttrs = false;
  Overlay.props = ['isOpen', 'modelValue', ...componentProps];
  Overlay.emits = [
    OverlayEvents.onUpdate,
    OverlayEvents.onWillPresent,
    OverlayEvents.onDidPresent,
    OverlayEvents.onWillDismiss,
    OverlayEvents.onDidDismiss
  ];

  async function present(
    props: Readonly<Props>,
    listeners: Partial<Record<OverlayEvents, (...args: any) => void>>,
    emit: (event: OverlayEvents, ...args: any[]) => void
  ) {
    overlay.value = await controller.create({
      ...props,
      component: content.value
    });

    if (!overlay.value) {
      return;
    }

    overlay.value.addEventListener(eventListeners[1][0], () => emit(OverlayEvents.onUpdate, true));
    overlay.value.addEventListener(eventListeners[3][0], () => emit(OverlayEvents.onUpdate, false));

    for (const [eventName, listener] of eventListeners) {
      const handlers = listeners[listener];
      if (handlers) {
        overlay.value.addEventListener(eventName, (e: Event) => {
          Array.isArray(handlers) ? handlers.map(f => f(e)) : handlers(e);
        });
      }
    }

    await overlay.value.present();
  }

  return Overlay;
}
