import { Delegate } from './framework-delegate'

const api = {
  // Create or return a NavController instance and set root to a Vue component
  newNavController(root) {
    return Promise.resolve(
      initComponent('ion-nav', 'ion-app').then(ctrl => {
        ctrl.root = root
        return ctrl
      })
    )
  },
  // Create or return an AlertController instance and set it's properties
  newAlertController(props) {
    return this.newAbstractController('ion-alert-controller', props)
  },
  // Create or return a LoadingController instance and set it's properties
  newLoadingController(props) {
    return this.newAbstractController('ion-loading-controller', props)
  },
  // Create or return a ModalController  instance and set it's properties
  newModalController(props) {
    return this.newAbstractController('ion-modal-controller', props)
  },
  // Initialize an Ionic component and set it's properties
  newAbstractController(tag, props) {
    const controller = initComponent(tag).then(ctrl => ctrl.create(props))
    return Promise.resolve(controller)
  },
}

export default api

api.install = function(Vue) {
  // If installed - skip
  if (api.install.installed) {
    return
  }

  api.install.installed = true

  // Ignore Ionic custom elements
  Vue.config.ignoredElements.push(/^ion-/)

  // Give access to the API methods
  Object.defineProperty(Vue.prototype, '$ionic', {
    get() {
      return api
    },
  })
}

// Initialize an Ionic component and append it to DOM
function initComponent(tag, wrapper = 'body') {
  // If wrapper doesn't exist use body as fall-back
  const wrapperEl = document.querySelector(wrapper) || document.body
  const element = getOrAppendElement(tag, wrapperEl)

  // Set the framework-specific implementations for Ionic's internals
  element.delegate = Delegate

  // Return a Promise
  return element.componentOnReady()
}

// Return existing Element (tag) or create a new one
function getOrAppendElement(tag, wrapper) {
  let element = document.querySelector(tag)

  if (element) {
    return element
  }

  return wrapper.appendChild(document.createElement(tag))
}
