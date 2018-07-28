import Vue from 'vue'

describe('asd', () => {
  it('qqq', () => {
    window.Vue = undefined
    global.Vue = Vue
    require('../src/router.js')
  })
})
