import { RouteLocationRaw } from 'vue-router';
import { AnimationBuilder } from '@ionic/core';
import { Direction } from './router';

export interface Navigable {
  href?: RouteLocationRaw;
  target?: string;
}

export interface NavigableRouter extends Navigable {
  replace?: boolean;
  routerDirection?: Direction;
  routerAnimation?: AnimationBuilder;
}
