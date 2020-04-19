import {
  ActionSheetOptions,
  ModalOptions,
  PopoverOptions,
  actionSheetController,
  modalController,
  popoverController
} from '@ionic/core';
import { OverlayType, defineOverlay } from '../utils';

export const IonModal = defineOverlay<HTMLIonModalElement, ModalOptions>(
  OverlayType.Modal,
  modalController
);

export const IonActionSheet = defineOverlay<
  HTMLIonActionSheetElement,
  ActionSheetOptions
>(OverlayType.ActionSheet, actionSheetController);

export const IonPopover = defineOverlay<HTMLIonPopoverElement, PopoverOptions>(
  OverlayType.Popover,
  popoverController
);
