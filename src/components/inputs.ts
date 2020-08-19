import { keys } from 'ts-transformer-keys';
import { JSX } from '@ionic/core';
import { defineInput } from '../utils';

export const IonCheckbox = /*@__PURE__*/defineInput<JSX.IonCheckbox>(
  'ion-checkbox',
  'IonCheckbox',
  keys<JSX.IonCheckbox>(),
  'onIonChange',
  'checked'
);
export const IonDatetime = /*@__PURE__*/defineInput<JSX.IonDatetime>('ion-datetime', 'IonDatetime', keys<JSX.IonDatetime>());
export const IonInput = /*@__PURE__*/defineInput<JSX.IonInput>('ion-input', 'IonInput', keys<JSX.IonInput>(), 'onIonInput');
export const IonRadio = /*@__PURE__*/defineInput<JSX.IonRadio>('ion-radio', 'IonRadio', keys<JSX.IonRadio>(), 'onIonSelect');
export const IonRadioGroup = /*@__PURE__*/defineInput<JSX.IonRadioGroup>('ion-radio-group', 'IonRadioGroup', keys<JSX.IonRadioGroup>(), 'onIonChange');
export const IonRange = /*@__PURE__*/defineInput<JSX.IonRange>('ion-range', 'IonRange', keys<JSX.IonRange>());
export const IonSearchbar = /*@__PURE__*/defineInput<JSX.IonSearchbar>(
  'ion-searchbar',
  'IonSearchbar',
  keys<JSX.IonSearchbar>(),
  'onIonInput'
);
export const IonSelect = /*@__PURE__*/defineInput<JSX.IonSelect>('ion-select', 'IonSelect', keys<JSX.IonSelect>());
export const IonTextarea = /*@__PURE__*/defineInput<JSX.IonTextarea>('ion-textarea', 'IonTextarea', keys<JSX.IonTextarea>());
export const IonToggle = /*@__PURE__*/defineInput<JSX.IonToggle>(
  'ion-toggle',
  'IonToggle',
  keys<JSX.IonToggle>(),
  'onIonChange',
  'checked'
);
