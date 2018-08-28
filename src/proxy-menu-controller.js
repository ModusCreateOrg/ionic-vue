import * as apiUtils from './api-utils'

// A proxy class that allows early access to controller methods
export default class ProxyMenuController {
  constructor(tag, wrapper) {
    this.tag = tag
    this.wrapper = wrapper
  }

  // Open a menu
  open(menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'open', menuId)
  }

  // Close a menu
  close(menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'close', menuId)
  }

  // Toggle a menu
  toggle(menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'toggle', menuId)
  }

  // Enable or disable a menu
  enable(shouldEnable, menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'enable', shouldEnable, menuId)
  }

  // Enable or disable the ability to swipe open the menu
  swipeEnable(shouldEnable, menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'swipeEnable', shouldEnable, menuId)
  }

  // Check if specific or any menu is open
  isOpen(menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'isOpen', menuId)
  }

  // Check is certain menu is enabled
  isEnabled(menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'isEnabled', menuId)
  }

  // Get specific or first menu instance
  get(menuId) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'get', menuId)
  }

  // Get an instance of an open menu
  getOpen() {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'getOpen')
  }

  // Get an array of all menus
  getMenus() {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'getMenus')
  }
}
