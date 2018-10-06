import Vue from 'vue';

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

interface IonBackButton extends HTMLElement {
  defaultHref?: string;
}
