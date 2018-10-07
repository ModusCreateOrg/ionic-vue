import Vue, { VueConstructor } from 'vue';
import VueRouter from 'vue-router';
import { RouterOptions } from 'vue-router/types/router';

declare module 'vue/types/vue' {
  interface Vue {
    $ionic: any;
  }
}

export interface HTMLVueElement extends HTMLElement {
  __vue__: Vue;
}

export interface VueWindow extends Window {
  Vue: typeof Vue;
  VueRouter: typeof VueRouter;
  disableIonicTransitions: boolean;
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

export interface RouterArgs extends RouterOptions {
  direction: number;
  viewCount: number;
}

export interface ProxyControllerInterface {
  create(opts: object): Promise<any>;
  dismiss(): Promise<void>;
  getTop(): Promise<any>;
}

export interface ProxyDelegateOptions extends Object {
  [key: string]: any;
  delegate: FrameworkDelegate;
}

export interface ProxyMenuControllerInterface {
  open(menuId?: string): Promise<boolean>;
  close(menuId?: string): Promise<boolean>;
  toggle(menuId?: string): Promise<boolean>;
  enable(shouldEnable: boolean, menuId?: string): Promise<HTMLElement>;
  swipeEnable(shouldEnable: boolean, menuId?: string): Promise<HTMLElement>;
  isOpen(menuId?: string): Promise<boolean>;
  isEnabled(menuId?: string): Promise<boolean>;
  get(menuId?: string): Promise<HTMLElement>;
  getOpen(): Promise<HTMLElement>;
  getMenus(): Promise<HTMLElement>;
}
