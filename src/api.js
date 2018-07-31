import { Delegate } from './framework-delegate'

const api = {
  newNavController(root) {
    return Promise.resolve(
      initComponent('ion-nav', 'ion-app').then(ctrl => {
        ctrl.root = root
        return ctrl
      })
    )
  },
  newAlertController(props) {
    return this.newAbstractController('ion-alert-controller', props)
  },
  newLoadingController(props) {
    return this.newAbstractController('ion-loading-controller', props)
  },
  newAbstractController(tag, props) {
    const controller = initComponent(tag).then(ctrl => ctrl.create(props))
    return Promise.resolve(controller)
  },
}

export default api

api.install = function(Vue) {
  if (api.install.installed) {
    return
  }

  api.install.installed = true

  Vue.config.ignoredElements.push(/^ion-/)

  Object.defineProperty(Vue.prototype, '$ionic', {
    get() {
      return api
    },
  })
}

function initComponent(tag, wrapper = 'body') {
  const wrapperEl = document.querySelector(wrapper) || document.body
  const element = getOrAppendElement(tag, wrapperEl)
  element.delegate = Delegate
  return element.componentOnReady()
}

function getOrAppendElement(tag, wrapper) {
  let element = document.querySelector(tag)

  if (element) {
    return element
  }

  return wrapper.appendChild(document.createElement(tag))
}
