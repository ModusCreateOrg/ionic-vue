import VueRouter from 'vue-router'
import IonVueRouter from './components/ion-vue-router.vue'

let globalVue = null
let globalVueRouter = null

if (typeof window !== 'undefined') {
  globalVue = window.Vue
  globalVueRouter = window.VueRouter
} else if (typeof global !== 'undefined') {
  globalVue = global.Vue
  globalVueRouter = global.VueRouter
}

if (!globalVueRouter) {
  globalVueRouter = VueRouter
}

export default class Router extends globalVueRouter {
  constructor(...args) {
    super(...args)
    this.direction = args.direction || 1
    this.viewCount = args.viewCount || 0
    this.prevRouteStack = []
    this.extendHistory()
  }
  extendHistory() {
    this.history._updateRoute = this.history.updateRoute
    this.history.updateRoute = nextRoute => {
      this.direction = this.guessDirection(nextRoute)
      this.viewCount += this.direction
      this.history._updateRoute(nextRoute)
    }
  }
  canGoBack() {
    return this.viewCount > 1 && this.currentRoute.fullPath.length > 1
  }
  guessDirection(nextRoute) {
    if (this.prevRouteStack.length !== 0) {
      const prevRoute = this.prevRouteStack[this.prevRouteStack.length - 1]

      // Last route is the same as the next one - go back
      // If we're going to / reset the stack otherwise pop a route
      if (prevRoute.fullPath === nextRoute.fullPath) {
        if (prevRoute.fullPath.length === 1) {
          this.prevRouteStack = []
        } else {
          this.prevRouteStack.pop()
        }
        return -1
      }
    }

    // Forward movement, push next route to stack
    if (this.history.current.fullPath !== nextRoute.fullPath) {
      this.prevRouteStack.push(this.history.current)
    }
    return 1
  }
}

Router.install = function(Vue) {
  if (Router.install.installed) {
    return
  }

  Router.install.installed = true

  globalVueRouter.install(Vue)
  Vue.component('IonVueRouter', IonVueRouter)
}

// Auto-install when Vue is found (i.e. in browser via <script> tag)
if (globalVue) {
  globalVue.use(Router)
}
