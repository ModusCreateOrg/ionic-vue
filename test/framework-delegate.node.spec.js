import Vue from 'vue'

describe('Framework delegation node', () => {
  it('Sets globals correctly', () => {
    window.Vue = undefined
    global.Vue = Vue
    require('../src/framework-delegate.js')
  })
})
