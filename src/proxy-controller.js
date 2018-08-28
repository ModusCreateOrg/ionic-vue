import * as apiUtils from './api-utils'

// A proxy class that allows early access to controller methods
export default class ProxyController {
  constructor(tag, wrapper) {
    this.tag = tag
    this.wrapper = wrapper
  }

  create(opts) {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'create', opts)
  }

  dismiss() {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'dismiss')
  }

  getTop() {
    return apiUtils.proxyMethod(this.tag, this.wrapper, 'getTop')
  }
}
