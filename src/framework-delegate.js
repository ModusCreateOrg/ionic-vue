export default class Delegate {
  constructor(Vue) {
    this.Vue = Vue
  }

  // Attach the passed Vue component to DOM
  attachViewToDom(parentElement, component, opts, classes) {
    // Get the Vue controller
    return this.vueController(component).then(controller => {
      const vueComponent = this.vueComponent(controller, opts)

      // Add any classes to the Vue component's root element
      addClasses(vueComponent.$el, classes)

      // Append the Vue component to DOM
      parentElement.appendChild(vueComponent.$el)
      return vueComponent.$el
    })
  }

  // Remove the earlier created Vue component from DOM
  removeViewFromDom(parentElement, childElement) {
    // Destroy the Vue component instance
    if (childElement.__vue__) {
      childElement.__vue__.$destroy()
    }

    return Promise.resolve()
  }

  // Handle creation of sync and async components
  vueController(component) {
    return Promise.resolve(
      typeof component === 'function' && component.cid === undefined
        ? component().then(c => this.Vue.extend(isESModule(c) ? c.default : c))
        : this.Vue.extend(component)
    )
  }

  // Create a new instance of the Vue component
  vueComponent(controller, opts) {
    return new controller(opts).$mount()
  }
}

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

function isESModule(obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

function addClasses(element, classes = []) {
  for (const cls of classes) {
    element.classList.add(cls)
  }
}
