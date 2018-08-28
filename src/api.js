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

  // Set the ActionSheetController
  set actionSheetController(value) {
    this._actionSheetController = value
  }

  // Create or return an AlertController instance
  get alertController() {
    return getOrCreateController('_alertController', 'ion-alert-controller')
  }

  // Set the AlertController
  set alertController(value) {
    this._alertController = value
  }

  // Create or return a LoadingController instance
  get loadingController() {
    return getOrCreateController('_loadingController', 'ion-loading-controller')
  }

  // Set the LoadingController
  set loadingController(value) {
    this._loadingController = value
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

  // Set the menuController
  set menuController(value) {
    this._menuController = value
  }

  // Create or return a ModalController instance
  get modalController() {
    return getOrCreateController('_modalController', 'ion-modal-controller')
  }

  // Set the ModalController
  set modalController(value) {
    this._modalController = value
  }

  // Create or return a PopoverController instance
  get popoverController() {
    return getOrCreateController('_popoverController', 'ion-popover-controller')
  }

  // Set the PopoverController
  set popoverController(value) {
    this._popoverController = value
  }

  // Create or return a ToastController instance
  get toastController() {
    return getOrCreateController('_toastController', 'ion-toast-controller')
  }

  // Set the ToastController
  set toastController(value) {
    this._toastController = value
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
