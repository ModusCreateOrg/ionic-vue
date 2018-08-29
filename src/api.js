import ProxyController from './proxy-controller'
import ProxyMenuController from './proxy-menu-controller'

export let _Vue

export default class Api {
  // Create or return a ActionSheetController instance
  get actionSheetController() {
    return getOrCreateController('_actionSheetController', 'ion-action-sheet-controller')
  }

  // Create or return an AlertController instance
  get alertController() {
    return getOrCreateController('_alertController', 'ion-alert-controller')
  }

  // Create or return a LoadingController instance
  get loadingController() {
    return getOrCreateController('_loadingController', 'ion-loading-controller')
  }

  // Create or return a MenuController instance
  get menuController() {
    return getOrCreateController('_menuController', 'ion-menu-controller', ProxyMenuController)
  }

  // Create or return a ModalController instance
  get modalController() {
    return getOrCreateController('_modalController', 'ion-modal-controller')
  }

  // Create or return a PopoverController instance
  get popoverController() {
    return getOrCreateController('_popoverController', 'ion-popover-controller')
  }

  // Create or return a ToastController instance
  get toastController() {
    return getOrCreateController('_toastController', 'ion-toast-controller')
  }
}

// Cached controllers
Api._actionSheetController = null
Api._alertController = null
Api._loadingController = null
Api._menuController = null
Api._modalController = null
Api._popoverController = null
Api._toastController = null

Api.install = function(Vue) {
  // If installed - skip
  if (Api.install.installed && _Vue === Vue) {
    return
  }

  _Vue = Vue

  Api.install.installed = true

  // Ignore Ionic custom elements
  Vue.config.ignoredElements.push(/^ion-/)

  // Give access to the API methods
  Object.defineProperty(Vue.prototype, '$ionic', {
    get() {
      return new Api()
    },
  })
}

// Get existing controller instance or initialize a new one
function getOrCreateController(cache, tag, proxy = ProxyController) {
  if (!Api[cache]) {
    Api[cache] = new proxy(tag)
  }

  return Api[cache]
}
