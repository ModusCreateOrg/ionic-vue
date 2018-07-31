import Vue from 'vue'
import API from '../src/api.js'

describe('API', () => {
  it('Installs correctly', () => {
    Vue.use(API)

    const app = new Vue()

    expect(typeof app.$ionic).toBe('object')
    expect(API.install()).toBeFalsy()
  })

  it('Creates nav controller', () => {
    expect.assertions(1)
    mockComponentOnReady()

    return API.newNavController('foo').then(c => {
      expect(c.root).toBe('foo')
      return releaseComponentOnReady()
    })
  })

  it('Creates alert controllers', () => {
    expect.assertions(3)
    mockComponentOnReady()

    // Creates initial element
    API.newAlertController({ foo: 'bar' })
      .then(c => {
        expect(c.foo).toBe('bar')
        return releaseComponentOnReady()
      })
      .catch(err => err)

    // Returns previous element with extra props
    return API.newAlertController({ bar: 'foo' }).then(c => {
      expect(c.foo).toBe('bar')
      expect(c.bar).toBe('foo')
      return releaseComponentOnReady()
    })
  })

  it('Creates loading controllers', done => {
    mockComponentOnReady()

    return API.newLoadingController({ bar: 'foo' }).then(c => {
      expect(c.bar).toBe('foo')
      releaseComponentOnReady()
      return done()
    })
  })
})

function mockComponentOnReady() {
  HTMLElement.prototype.componentOnReady = function() {
    const el = this
    el.create = function(props = {}) {
      return Object.assign(el, props)
    }
    return Promise.resolve(el)
  }
}

function releaseComponentOnReady() {
  HTMLElement.prototype.componentOnReady = undefined
}
