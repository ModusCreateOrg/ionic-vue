// Core Ionic types
// tslint:disable-next-line:no-import-side-effect
import { IonicConfig } from '@ionic/core';

import { addIcons } from 'ionicons';
import { ICON_PATHS } from 'ionicons/icons';

import { defineCustomElements } from '@ionic/core/loader';
import { IonicWindow } from './interfaces';

export function appInitialize(config?: IonicConfig) {
  const win: IonicWindow = window as any;
  const Ionic = (win.Ionic = win.Ionic || {});

  Ionic.config = config;
  defineCustomElements(window);

  addIcons(ICON_PATHS);
}
