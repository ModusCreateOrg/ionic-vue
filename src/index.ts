import { addIcons } from 'ionicons';
export {
  createAnimation,
  createGesture,
  AlertButton,
  AlertInput,
  Gesture,
  GestureConfig,
  GestureDetail,
  mdTransitionAnimation,
  iosTransitionAnimation,
  setupConfig
} from '@ionic/core';
import {
  arrowBackSharp,
  caretBackSharp,
  chevronBack,
  chevronForward,
  close,
  closeCircle,
  closeSharp,
  menuOutline,
  menuSharp,
  reorderThreeOutline,
  reorderTwoSharp,
  searchOutline,
  searchSharp
} from 'ionicons/icons';
import { install } from './ionic';

export default {
  install,
  version: '__VERSION__'
};

export { default as IonicVueRouter } from './router';

export * from './controllers';
export * from './components/inputs';

// Icons that are used by internal components
addIcons({
  'arrow-back-sharp': arrowBackSharp,
  'caret-back-sharp': caretBackSharp,
  'chevron-back': chevronBack,
  'chevron-forward': chevronForward,
  close,
  'close-circle': closeCircle,
  'close-sharp': closeSharp,
  'menu-outline': menuOutline,
  'menu-sharp': menuSharp,
  'reorder-two-sharp': reorderTwoSharp,
  'reorder-three-outline': reorderThreeOutline,
  'search-outline': searchOutline,
  'search-sharp': searchSharp
});
