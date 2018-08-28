import { Delegate } from './framework-delegate'

// A proxy method that initializes the controller and calls requested method
export function proxyMethod(tag, wrapper, method, ...opts) {
  return initController(tag, wrapper).then(ctrl => ctrl[method].apply(ctrl, opts))
}

// Initialize an Ionic controller and append it to DOM
export function initController(tag, wrapper = 'body') {
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
