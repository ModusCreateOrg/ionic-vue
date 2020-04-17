import {
  PopoverOptions,
  popoverController as _popoverController
} from '@ionic/core';
import { VueDelegate } from './vue-delegate';

export const popoverController = () => {
  return {
    ..._popoverController,
    create(options: PopoverOptions) {
      return _popoverController.create({
        ...options,
        delegate: new VueDelegate()
      });
    }
  };
};
