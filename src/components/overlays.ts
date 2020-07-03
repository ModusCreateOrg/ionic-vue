import {
  ActionSheetOptions,
  ModalOptions,
  PopoverOptions,
  actionSheetController,
  modalController,
  popoverController,
} from '@ionic/core';
import { keys } from 'ts-transformer-keys';
import { OverlayType, defineOverlay } from '../utils';

export const IonModal = /*@__PURE__*/defineOverlay<HTMLIonModalElement, ModalOptions>(
  OverlayType.Modal,
  modalController,
  keys<Omit<ModalOptions, 'component' | 'componentProps' | 'delegate'>>(),
);

export const IonActionSheet = /*@__PURE__*/defineOverlay<
  HTMLIonActionSheetElement,
  ActionSheetOptions
>(
  OverlayType.ActionSheet,
  actionSheetController,
  keys<ActionSheetOptions>(),
);

export const IonPopover = /*@__PURE__*/defineOverlay<HTMLIonPopoverElement, PopoverOptions>(
  OverlayType.Popover,
  popoverController,
  keys<Omit<PopoverOptions, 'component' | 'componentProps' | 'delegate'>>(),
);
