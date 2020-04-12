import { IonicConfig } from '@ionic/core';
import { applyPolyfills, defineCustomElements } from '@ionic/core/loader';
import { IonicWindow } from './interfaces';

export async function appInitialize(config?: IonicConfig) {
  const win: IonicWindow = window as any;
  const Ionic = win?.Ionic || {};

  Ionic.config = config;

  await applyPolyfills();
  defineCustomElements(win);
}
