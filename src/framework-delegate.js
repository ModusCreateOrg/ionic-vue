export default class Delegate {
  constructor(Vue) {
    this.Vue = Vue
  }

  // Attach the passed Vue component to DOM
  attachViewToDom(parentElement, component, propsData, classes) {
    // Create a Vue component constructor
    const vueController = this.Vue.extend(component)

    // Create a new instance of the Vue component
    const vueComponent = new vueController({ propsData }).$mount()

    // Add any classes the Vue component's root element
    if (classes) {
      for (const cls of classes) {
        vueComponent.$el.classList.add(cls)
      }
    }

    parentElement.appendChild(vueComponent.$el)

    // Resolve the Vue component element
    return Promise.resolve(vueComponent.$el)
  }

  // Remove the earlier created Vue component from DOM
  removeViewFromDom(parentElement, childElement) {
    // Destroy the Vue component instance
    if (childElement.__vue__) {
      childElement.__vue__.$destroy()
    }

    return Promise.resolve()
  }
}
