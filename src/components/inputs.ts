import { defineInput } from '../utils';

export const IonCheckbox = defineInput(
  'IonCheckbox',
  'ion-checkbox',
  'onIonChange',
  'checked'
);
export const IonDatetime = defineInput('IonDatetime', 'ion-datetime');
export const IonInput = defineInput('IonInput', 'ion-input', 'onIonInput');
export const IonRadio = defineInput('IonRadio', 'ion-radio', 'onIonSelect');
export const IonRange = defineInput('IonRange', 'ion-range');
export const IonSearchbar = defineInput(
  'IonSearchbar',
  'ion-searchbar',
  'onIonInput'
);
export const IonSelect = defineInput('IonSelect', 'ion-select');
export const IonTextarea = defineInput('IonTextarea', 'ion-textarea');
export const IonToggle = defineInput(
  'IonToggle',
  'ion-toggle',
  'onIonChange',
  'checked'
);
