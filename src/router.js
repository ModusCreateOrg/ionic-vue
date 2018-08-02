import VueRouter from 'vue-router'
import IonVueRouter from './components/ion-vue-router.vue'

let globalVue = null
let globalVueRouter = null

// Detect environment (browser, module, etc.)
if (typeof window !== 'undefined' && window.Vue !== undefined) {
  globalVue = window.Vue
  globalVueRouter = window.VueRouter
} else if (typeof global !== 'undefined') {
  globalVue = global.Vue
  globalVueRouter = global.VueRouter
}

if (!globalVueRouter) {
  globalVueRouter = VueRouter
}

// Extend the official VueRouter
export default class Router extends globalVueRouter {
  constructor(...args) {
    super(...args)

    // The direction user navigates in
    this.direction = args.direction || 1

    // Number of views navigated
    this.viewCount = args.viewCount || 0

    // Stack of previous routes
    this.prevRouteStack = []

    // Extend the existing history object
    this.extendHistory()
  }
  extendHistory() {
    // Save a reference to the original method
    this.history._updateRoute = this.history.updateRoute

    this.history.updateRoute = nextRoute => {
      // Guesstimate the direction of the next route
      this.direction = this.guessDirection(nextRoute)

      // Increment or decrement the view count
      this.viewCount += this.direction

      // Call the original method
      this.history._updateRoute(nextRoute)
    }
  }
  canGoBack() {
    // We can display the back button if we're not on /
    // or there were more than 1 views rendered
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
  // If already installed - skip
  if (Router.install.installed) {
    return
  }

  Router.install.installed = true

  // Install the official VueRouter
  globalVueRouter.install(Vue)

  // Register the IonVueRouter component globally
  Vue.component('IonVueRouter', IonVueRouter)
}

// Auto-install when Vue is found (i.e. in browser via <script> tag)
if (globalVue) {
  globalVue.use(Router)
}
