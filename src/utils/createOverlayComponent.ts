import Vue, { CreateElement, VueConstructor } from 'vue';

export interface OverlayElement extends HTMLElement {
  present: () => Promise<void>;
  dismiss: (data?: any, role?: string | undefined) => Promise<boolean>;
}

export interface Data<T> {
  overlay: T | null;
}

export interface Methods {
  present: () => Promise<void>;
}

export interface Props {
  isOpen: boolean;
}

export function createOverlayComponent<T extends OverlayElement>(
  name: string,
  controller: { create: (opts: any) => Promise<T> }
): VueConstructor<Data<T> & Methods & Props & Vue> {
  const coreTag = name.charAt(0).toLowerCase() + name.slice(1);
  const eventHandlers = Object.entries({
    [`${coreTag}WillPresent`]: 'onWillPresent',
    [`${coreTag}DidPresent`]: 'onDidPresent',
    [`${coreTag}WillDismiss`]: 'onWillDismiss',
    [`${coreTag}DidDismiss`]: 'onDidDismiss',
  });

  return Vue.extend<Data<T>, Methods, {}, Props>({
    name: `${name}Vue`,
    data() {
      return {
        overlay: null,
      };
    },
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    watch: {
      async isOpen(newVal: boolean) {
        console.log(newVal);
        if (newVal) {
          if (this.overlay) {
            await this.overlay.present();
          } else {
            await this.present();
          }
        } else {
          await this.overlay?.dismiss();
          this.overlay = null;
        }
      }
    },
    async mounted() {
      console.log(this.isOpen);
      this.isOpen && await this.present();
    },
    async beforeDestroy() {
      console.log('bye');
      await this.overlay?.dismiss();
    },
    render(h: CreateElement) {
      for (const [eventName, handler] of eventHandlers) {
        console.log(eventName, handler);
        if (this.$listeners[handler]) {
          this.overlay?.addEventListener(eventName, (e: Event) => {
            const handlers = this.$listeners[handler];
            if (Array.isArray(handlers)) {
              handlers.map(f => f(e));
              return;
            }
            handlers(e);
          });
        }
      }
      return h('div', [h('div', { ref: 'overlay' }, this.overlay ? this.$slots.default : null)]);
    },
    methods: {
      async present() {

        // const children = this.$slots.default;
        this.overlay = await controller.create({
          ...this.$attrs,
          component: this.$refs.overlay,
          componentProps: { parent: this },
        });

        console.log(this.overlay);

        await this.overlay.present();
      }
    }
  });
}
