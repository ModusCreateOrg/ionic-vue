import ProxyController from './proxy-controller'

// A proxy class that allows early access to controller methods
export default class ProxyDelegateController extends ProxyController {
  constructor(tag, delegate) {
    super(tag)
    this.delegate = delegate
  }

  create(opts = {}) {
    opts.delegate = this.delegate
    return super.create(opts)
  }
}
