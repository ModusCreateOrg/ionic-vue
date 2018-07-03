import VueRouter from 'vue-router'
import IonRouterView from './IonRouterView.vue'


export default class Router extends VueRouter {
    constructor(...args) {
        super(...args)
        this.direction = args.direction || 1
        this.viewCount = args.viewCount || 0
        this.prevRoute = this.history.current
        this.extendHistory()
    }
    extendHistory() {
        this.history._updateRoute = this.history.updateRoute
        this.history.updateRoute = (route) => {
            this.direction = this.guessDirection(route)
            this.viewCount += this.direction
            this.history._updateRoute(route)
        }
    }
    push(...args) {
        super.push(...args)
        this.direction = 1
        this.viewCount++
    }
    go(n) {
        super.go(n)
        this.viewCount += n
        this.direction = n > 0 ? 1 : -1
    }
    canGoBack() {
        return this.viewCount > 0 && this.currentRoute.path.length > 1
    }
    guessDirection(route) {
        if (this.prevRoute.fullPath === route.fullPath) {
            return -1
        }
        this.prevRoute = this.history.current
        return 1
    }
}

Router.install = function (Vue) {
    VueRouter.install(Vue)
    Vue.component('IonRouterView', IonRouterView)
}
