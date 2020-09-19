import { AnimationBuilder, NavDirection } from '@ionic/core';

export interface HistoryState {
    [x: number]: HistoryStateValue;
    [x: string]: HistoryStateValue;
}

declare interface HistoryStateArray extends Array<HistoryStateValue> {
}

declare type HistoryStateValue = string | number | boolean | null | undefined | HistoryState | HistoryStateArray;

export interface Navigable {
  href?: string | {
    query?: Record<string | number, string | number | undefined | (string | number | undefined)[]>;
    hash?: string;
    path?: string;
    replace?: boolean;
    force?: boolean;
    state?: HistoryState;
    name?: string | symbol;
    params?: Record<string, string | number | (string | number)[]>;
  };
  target?: string;
}

export interface NavigableRouter extends Navigable {
  replace?: boolean;
  routerDirection?: NavDirection;
  routerAnimation?: AnimationBuilder;
}
