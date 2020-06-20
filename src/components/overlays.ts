import {
  ActionSheetOptions,
  ModalOptions,
  PopoverOptions,
  actionSheetController,
  modalController,
  popoverController
} from '@ionic/core';
import { OverlayType, defineOverlay } from '../utils';

export const IonModal = /*@__PURE__*/defineOverlay<HTMLIonModalElement, ModalOptions>(
  OverlayType.Modal,
  modalController
);

export const IonActionSheet = /*@__PURE__*/defineOverlay<
  HTMLIonActionSheetElement,
  ActionSheetOptions
>(OverlayType.ActionSheet, actionSheetController);

export const IonPopover = /*@__PURE__*/defineOverlay<HTMLIonPopoverElement, PopoverOptions>(
  OverlayType.Popover,
  popoverController
);
