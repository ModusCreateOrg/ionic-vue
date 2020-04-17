import {
  ModalOptions,
  OverlayController,
  modalController as _modalController
} from '@ionic/core';
import { VueDelegate } from './vue-delegate';

export interface ModalController extends OverlayController {
  create(options: ModalOptions): Promise<HTMLIonModalElement>;
}

export const modalController = (): ModalController => {
  return {
    ..._modalController,
    create(options: ModalOptions) {
      return _modalController.create({
        ...options,
        delegate: new VueDelegate()
      });
    }
  };
};
