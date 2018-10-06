import Vue from 'vue';
import { VueConstructor } from 'vue/types/vue';

declare module 'vue/types/vue' {
  interface Vue {
    $ionic: object;
  }
}

export interface HTMLVueElement extends HTMLElement {
  __vue__: Vue;
}

export interface WebpackFunction extends Function {
  cid: number;
}

export interface HTMLStencilElement extends HTMLElement {
  componentOnReady(): Promise<this>;
  componentOnReady(done: (el?: this) => void): void;
  forceUpdate(): void;
}

export interface FrameworkDelegate {
  attachViewToDom(parentElement: HTMLElement, component: HTMLElement | WebpackFunction | object | Vue, opts?: object, classes?: string[]): Promise<HTMLElement>;
  removeViewFromDom(parentElement: HTMLElement, childElement: HTMLVueElement): Promise<void>;
}

export interface IonBackButton extends HTMLElement {
  defaultHref?: string;
}

export interface ApiCache {
  [key: string]: any;
}

export interface ProxyControllerInterface {
  create(opts: object): Promise<any>;
  dismiss(): Promise<any>;
  getTop(): Promise<any>;
}
