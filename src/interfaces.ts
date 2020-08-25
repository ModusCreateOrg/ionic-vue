import { RouteLocationRaw } from 'vue-router';
import { AnimationBuilder, NavDirection } from '@ionic/core';

export interface Navigable {
  href?: RouteLocationRaw;
  target?: string;
}

export interface NavigableRouter extends Navigable {
  replace?: boolean;
  routerDirection?: NavDirection;
  routerAnimation?: AnimationBuilder;
}
