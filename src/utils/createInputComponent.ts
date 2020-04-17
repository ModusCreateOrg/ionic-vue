import Vue, { CreateElement, RenderContext } from 'vue';

interface EventHandler {
  [key: string]: (e: Event) => void;
}

type Callback = (value: Event | string) => void;

// Events to register handlers for
const events: string[] = [
  'ionChange',
  'ionInput',
  'ionBlur',
  'ionFocus',
  'ionCancel',
  'ionSelect'
];

export function createInputComponent(
  name: string,
  coreTag: string,
  modelEvent = 'ionChange',
  valueProperty = 'value'
) {
  return Vue.extend({
    name,
    functional: true,
    model: {
      event: modelEvent,
      prop: valueProperty
    },
    render(h: CreateElement, { data, listeners, slots }: RenderContext) {
      return h(
        coreTag,
        {
          ...data,
          on: buildEventHandlers(listeners, modelEvent, valueProperty)
        },
        slots().default
      );
    }
  });
}

function buildEventHandlers(
  listeners: RenderContext['listeners'],
  modelEvent: string,
  valueProperty: string
) {
  const handlers: EventHandler = {};

  // Loop through all the events
  events.map((eventName: string) => {
    if (!listeners[eventName]) {
      return;
    }

    // Normalize listeners coming from context as Function | Function[]
    const callbacks: Callback[] = Array.isArray(listeners[eventName])
      ? (listeners[eventName] as Callback[])
      : [listeners[eventName] as Callback];

    // Assign handlers
    handlers[eventName] = (e: Event) => {
      callbacks.map(f => {
        if (e) {
          f(modelEvent === eventName ? (e.target as any)[valueProperty] : e);
        }
      });
    };
  });

  return handlers;
}
