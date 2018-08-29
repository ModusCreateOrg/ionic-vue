import Vue from 'vue'
import API from '../src/api'
import Delegate from '../src/framework-delegate.js'

// Make sure the _Vue variable is accessible
API.install(Vue)

const app = document.createElement('div')
app.id = 'app'
document.body.appendChild(app)

describe('Framework delegation', () => {
  it('Attaches to DOM', () => {
    expect.assertions(2)

    const component = {
      props: { foo: { default: '', type: String } },
      template: '<p>foo</p>',
    }

    return Delegate.attachViewToDom(app, component, { foo: 'bar' }, ['foo']).then(el => {
      expect(el.classList.contains('foo')).toBeTruthy()
      expect(el.__vue__.foo).toBe('bar')
      return
    })
  })

  it('Removes from DOM', () => {
    expect.assertions(2)
    const div = document.querySelector('p')
    expect(typeof div.__vue__).toBe('object')

    return Delegate.removeViewFromDom(app, div).then(() => {
      return expect(div.__vue__).toBe(null)
    })
  })
})
