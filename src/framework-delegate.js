import Vue from 'vue'

export function attachViewToDom(parentElement, vueComponent, propsOrData, classes) {
  const wrapper = document.createElement(shouldWrapInIonPage(parentElement) ? 'ion-page' : 'div')

  parentElement.appendChild(wrapper)
  const vueElement = Vue.extend(vueComponent)
  const page = new vueElement().$mount(wrapper)

  if (classes) {
    for (const cls of classes) {
      page.$el.classList.add(cls)
    }
  }

  return Promise.resolve(page.$el)
}

export function removeViewFromDom(parentElement, childElement) {
  if (childElement.hasOwnProperty('__vue__')) {
    childElement.__vue__.$destroy()
  }

  parentElement.removeChild(childElement)

  return Promise.resolve()
}

const Delegate = {
  attachViewToDom,
  removeViewFromDom,
}

export { Delegate }

function shouldWrapInIonPage(element) {
  return isElementModal(element) || isElementNav(element)
}

function isElementNav(element) {
  return element.tagName.toUpperCase() === 'ION-NAV'
}

function isElementModal(element) {
  return element.classList.contains('modal-wrapper')
}
