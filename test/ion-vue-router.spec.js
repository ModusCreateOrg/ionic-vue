import Vue from 'vue'
import Router from '../src/router.js'
import IonVueRouter from '../src/components/ion-vue-router.vue'

describe('IonVueRouter', () => {
  it('Renders correctly', () => {
    Vue.use(Router)
    Vue.config.ignoredElements.push(/^ion-/)

    const app = new Vue({
      render(h) {
        return h('ion-vue-router')
      },
      router: new Router({
        routes: [{ path: '/', component: { template: '<h1>foo</h1>' } }],
      }),
    }).$mount()

    app.$router.push('/foo')
    app.$router.back()

    expect(app.$el.textContent).toBe('foo')
  })

  it('Sets the default data correctly', () => {
    expect(typeof IonVueRouter.data).toBe('function')
    expect(IonVueRouter.data()).toMatchObject({
      leavingEl: null,
      enteringEl: null,
    })
  })

  it('Sets the default props correctly', () => {
    const constructor = Vue.extend(IonVueRouter)
    const component = new constructor()
    expect(component.bindCss).toBeFalsy()
    expect(component.animated).toBeTruthy()
    expect(component.name).toBe('default')
  })
})
