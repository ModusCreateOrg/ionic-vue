import { Delegate } from './framework-delegate'

// A proxy method that initializes the controller and calls requested method
export function proxyMethod(tag, method, ...opts) {
  return initController(tag).then(ctrl => ctrl[method].apply(ctrl, opts))
}

// Initialize an Ionic controller and append it to DOM
export function initController(tag) {
  const element = getOrAppendElement(tag)

  // Set the framework-specific implementations for Ionic's internals
  element.delegate = Delegate

  // Return a Promise
  return element.componentOnReady()
}

// Return existing Element (tag) or create a new one
function getOrAppendElement(tag) {
  let element = document.querySelector(tag)

  if (element) {
    return element
  }

  return document.body.appendChild(document.createElement(tag))
}
