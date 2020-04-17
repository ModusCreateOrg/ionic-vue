import { createOverlayComponent } from '../utils';
import {
  actionSheetController,
  modalController,
  popoverController
} from '../controllers';

export const IonModalVue = createOverlayComponent<HTMLIonModalElement>(
  'IonModal',
  modalController
);

export const IonActionSheetVue = createOverlayComponent<
  HTMLIonActionSheetElement
>('IonActionSheet', actionSheetController);

export const IonPopoverVue = createOverlayComponent<HTMLIonPopoverElement>(
  'IonPopover',
  popoverController
);
