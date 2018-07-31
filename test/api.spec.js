import Vue from 'vue'
import API from '../src/api.js'

beforeEach(() => {
  HTMLElement.prototype.componentOnReady = function() {
    const el = this
    el.create = function(props = {}) {
      return Object.assign(el, props)
    }
    return Promise.resolve(el)
  }
})

afterEach(() => {
  HTMLElement.prototype.componentOnReady = undefined
})

describe('API', () => {
  it('Installs correctly', () => {
    Vue.use(API)

    const app = new Vue()

    expect(typeof app.$ionic).toBe('object')
    expect(API.install()).toBeFalsy()
  })

  it('Creates nav controller', () => {
    expect.assertions(1)

    return API.newNavController('foo').then(c => {
      return expect(c.root).toBe('foo')
    })
  })

  it('Creates alert controllers', () => {
    expect.assertions(3)

    // Creates initial element
    API.newAlertController({ foo: 'bar' })
      .then(c => {
        return expect(c.foo).toBe('bar')
      })
      .catch(err => err)

    // Returns previous element with extra props
    return API.newAlertController({ bar: 'foo' }).then(c => {
      expect(c.foo).toBe('bar')
      return expect(c.bar).toBe('foo')
    })
  })

  it('Creates loading controllers', done => {
    return API.newLoadingController({ bar: 'foo' }).then(c => {
      expect(c.bar).toBe('foo')
      return done()
    })
  })
})
