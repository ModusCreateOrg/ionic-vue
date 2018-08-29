import { _Vue } from './api'

export default {
  // Attach the passed Vue component to DOM
  attachViewToDom(parentElement, component, propsData, classes) {
    // Create a Vue component constructor
    const vueComponent = _Vue.extend(component)

    // Create a new instance of the Vue component
    const page = new vueComponent({ propsData }).$mount()

    // Add any classes the Vue component's root element
    if (classes) {
      for (const cls of classes) {
        page.$el.classList.add(cls)
      }
    }

    parentElement.appendChild(page.$el)

    // Resolve the Vue component element
    return Promise.resolve(page.$el)
  },

  // Remove the earlier created Vue component from DOM
  removeViewFromDom(parentElement, childElement) {
    // Destroy the Vue component instance
    if (childElement.hasOwnProperty('__vue__')) {
      childElement.__vue__.$destroy()
    }

    // Remove from DOM
    parentElement.removeChild(childElement)

    return Promise.resolve()
  },
}
