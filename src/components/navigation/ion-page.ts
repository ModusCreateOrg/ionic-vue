import { CreateElement, RenderContext } from 'vue';

export const IonPageVue = {
  name: 'IonPageVue',
  functional: true,
  render(h: CreateElement, { children }: RenderContext) {
    return h('div', { class: { 'ion-page': true } }, children);
  }
};
