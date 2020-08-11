import { RouteLocationRaw } from 'vue-router';
import { AnimationBuilder } from '@ionic/core';
import { Direction } from './router';

export interface Navigable {
  href?: RouteLocationRaw;
  target?: string;
  onClick?: (e: MouseEvent) => void;
}

export interface NavigableRouter extends Navigable {
  replace?: boolean;
  routerDirection?: Direction;
  routerAnimation?: AnimationBuilder;
}

export interface NavigableBack extends Omit<Navigable, 'href'> {
  defaultHref?: RouteLocationRaw;
}
