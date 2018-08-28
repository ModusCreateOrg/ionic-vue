import ProxyController from './proxy-controller'
import ProxyMenuController from './proxy-menu-controller'

export default class Api {
  constructor() {
    // Cached controllers
    this._actionSheetController = null
    this._alertController = null
    this._loadingController = null
    this._modalController = null
  }

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
    return getOrCreateController(
      '_menuController',
      'ion-menu-controller',
      null,
      ProxyMenuController
    )
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

Api.install = function(Vue) {
  // If installed - skip
  if (Api.install.installed) {
    return
  }

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
function getOrCreateController(cache, tag, wrapper, proxy = ProxyController) {
  if (!Api[cache]) {
    Api[cache] = new proxy(tag, wrapper)
  }

  return Api[cache]
}
