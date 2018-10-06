import { HTMLStencilElement } from './types/interfaces'

// A proxy method that initializes the controller and calls requested method
export function proxyMethod(tag: string, method: string, ...opts: any[]) {
  return initController(tag).then((ctrl: any) => ctrl[method].apply(ctrl, opts))
}

// Initialize an Ionic controller and append it to DOM
export function initController(tag: string) {
  let element = <HTMLElement> document.querySelector(tag)

  if (!element) {
    element = document.body.appendChild(document.createElement(tag))
  }

  return (element as HTMLStencilElement).componentOnReady()
}
