import Vue from 'vue'
import { Delegate } from '../src/framework-delegate.js'

describe('Framework delegation', () => {
  it('Attaches to DOM', () => {
    expect.assertions(2)
    const component = Vue.component('foo', {
      props: { foo: { default: '', type: String } },
      template: '<div>foo</div>',
    })

    return Delegate.attachViewToDom(document.body, component, { foo: 'bar' }, ['foo']).then(el => {
      expect(el.classList.contains('foo')).toBeTruthy()
      expect(el.__vue__.foo).toBe('bar')
      return
    })
  })

  it('Removes from DOM', () => {
    expect.assertions(1)
    const div = document.querySelector('div')
    return Delegate.removeViewFromDom(document.body, div).then(() => {
      return expect(div.__vue__).toBe(null)
    })
  })
})
