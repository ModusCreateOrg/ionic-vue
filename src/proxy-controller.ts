import * as apiUtils from './api-utils';
import { ProxyControllerInterface } from './interfaces';

// A proxy class that allows early access to controller methods
export default class ProxyController implements ProxyControllerInterface {
  constructor(public tag: string) {}

  create(opts: object = {}): Promise<HTMLElement> {
    return apiUtils.proxyMethod(this.tag, 'create', opts);
  }

  dismiss(data?: any, role?: string, id?: string): Promise<void> {
    return apiUtils.proxyMethod(this.tag, 'dismiss', data, role, id);
  }

  getTop(): Promise<HTMLElement> {
    return apiUtils.proxyMethod(this.tag, 'getTop');
  }
}
