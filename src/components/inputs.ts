import { keys } from 'ts-transformer-keys';
import { JSX } from '@ionic/core';
import { defineInput } from '../utils';

export const IonCheckbox = /*@__PURE__*/defineInput<JSX.IonCheckbox>(
  'IonCheckbox',
  'ion-checkbox',
  keys<JSX.IonCheckbox>(),
  'onIonChange',
  'checked'
);
export const IonDatetime = /*@__PURE__*/defineInput<JSX.IonDatetime>('IonDatetime', 'ion-datetime', keys<JSX.IonDatetime>());
export const IonInput = /*@__PURE__*/defineInput<JSX.IonInput>('IonInput', 'ion-input', keys<JSX.IonInput>(), 'onIonInput');
export const IonRadio = /*@__PURE__*/defineInput<JSX.IonRadio>('IonRadio', 'ion-radio', keys<JSX.IonRadio>(), 'onIonSelect');
export const IonRange = /*@__PURE__*/defineInput<JSX.IonRange>('IonRange', 'ion-range', keys<JSX.IonRange>());
export const IonSearchbar = /*@__PURE__*/defineInput<JSX.IonSearchbar>(
  'IonSearchbar',
  'ion-searchbar',
  keys<JSX.IonSearchbar>(),
  'onIonInput'
);
export const IonSelect = /*@__PURE__*/defineInput<JSX.IonSelect>('IonSelect', 'ion-select', keys<JSX.IonSelect>());
export const IonTextarea = /*@__PURE__*/defineInput<JSX.IonTextarea>('IonTextarea', 'ion-textarea', keys<JSX.IonTextarea>());
export const IonToggle = /*@__PURE__*/defineInput<JSX.IonToggle>(
  'IonToggle',
  'ion-toggle',
  keys<JSX.IonToggle>(),
  'onIonChange',
  'checked'
);
