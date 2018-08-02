import Vue from 'vue'

let globalVue = null

// Detect environment (browser, module, etc.)
if (typeof window !== 'undefined' && window.Vue !== undefined) {
  globalVue = window.Vue
} else if (typeof global !== 'undefined') {
  globalVue = global.Vue
}

if (!globalVue) {
  globalVue = Vue
  globalVue.config.productionTip = false
}

// Attach the passed Vue component to DOM
export function attachViewToDom(parentElement, vueComponent, propsData, classes) {
  // Create an appropriate wrapper for the component
  const wrapper = document.createElement(shouldWrapInIonPage(parentElement) ? 'ion-page' : 'div')

  parentElement.appendChild(wrapper)

  // Create a Vue component constructor
  const vueElement = globalVue.extend(vueComponent)

  // Create a new instance of the Vue component
  const page = new vueElement({ propsData }).$mount(wrapper)

  // Add any classes the Vue component's root element
  if (classes) {
    for (const cls of classes) {
      page.$el.classList.add(cls)
    }
  }

  // Resolve the Vue component element
  return Promise.resolve(page.$el)
}

// Remove the earlier created Vue component from DOM
export function removeViewFromDom(parentElement, childElement) {
  // Destroy the Vue component instance
  if (childElement.hasOwnProperty('__vue__')) {
    childElement.__vue__.$destroy()
  }

  // Remove from DOM
  parentElement.removeChild(childElement)

  return Promise.resolve()
}

const Delegate = {
  attachViewToDom,
  removeViewFromDom,
}

export { Delegate }

// Detect wrapper to be used
function shouldWrapInIonPage(element) {
  return isElementModal(element) || isElementNav(element)
}

// Check if element is ION-NAV
function isElementNav(element) {
  return element.tagName.toUpperCase() === 'ION-NAV'
}

// Check if element has modal-wrapper class
function isElementModal(element) {
  return element.classList.contains('modal-wrapper')
}
