import { addIcons } from 'ionicons';
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

export { IonicVue } from './ionic-vue';
export * from './components';
export { createRouter } from './router';

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
