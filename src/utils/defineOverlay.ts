import { FunctionalComponent, h, ref } from 'vue';

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
  const coreTag = name.charAt(0).toLowerCase() + name.slice(1);
  const eventListeners: OverlayEventListeners = Object.entries({
    [`${coreTag}WillPresent`]: OverlayEvents.onWillPresent,
    [`${coreTag}DidPresent`]: OverlayEvents.onDidPresent,
    [`${coreTag}WillDismiss`]: OverlayEvents.onWillDismiss,
    [`${coreTag}DidDismiss`]: OverlayEvents.onDidDismiss
  });

  const Overlay: FunctionalComponent<
    Props,
    OverlayEvents[]
  > = (props, { attrs, slots, emit }) => {
    const isOpen = props.isOpen === undefined ? props.modelValue : props.isOpen;

    if (!attrs.onDidDismiss) {
      attrs.onDidDismiss = () => emit(OverlayEvents.onUpdate, false);
    }

    return h(
      'div',
      {
        style: { display: 'none' },
        async onVnodeUpdated() {
          if (isOpen) {
            await (overlay.value?.present() || present(props, attrs));
          } else {
            await overlay.value?.dismiss();
            overlay.value = undefined;
          }
        },
        async onVnodeMounted() {
          isOpen && (await present(props, attrs));
        },
        async onVnodeBeforeUnmount() {
          await overlay.value?.dismiss();
          overlay.value = undefined;
          content.value = undefined;
        }
      },
      [h('div', { ref: content }, slots.default ? slots.default() : undefined)]
    );
  };

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

  async function present(props: Props, {
    onWillPresent,
    onDidPresent,
    onWillDismiss,
    onDidDismiss,
  }: Partial<Record<OverlayEvents, (...args: any) => void>>) {
    overlay.value = await controller.create({
      ...props,
      component: content.value
    });

    const listeners = {
      onWillPresent,
      onDidPresent,
      onWillDismiss,
      onDidDismiss
    };
    for (const [eventName, listener] of eventListeners) {
      const handlers = listeners[listener];
      if (handlers) {
        overlay.value?.addEventListener(eventName, (e: Event) => {
          Array.isArray(handlers) ? handlers.map(f => f(e)) : handlers(e);
        });
      }
    }

    await overlay.value?.present();
  }

  return Overlay;
}
