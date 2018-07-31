<template>
  <ion-router-outlet
    ref="ionRouterOutlet"
    @click="catchIonicGoBack">
    <transition
      :css="bindCss"
      mode="in-out"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
    >
      <router-view :name="name"/>
    </transition>
  </ion-router-outlet>
</template>

<script>
export default {
  name: 'IonVueRouter',
  props: {
    name: {
      type: String,
      default: 'default',
    },
    bindCss: {
      type: Boolean,
      default: false,
    },
    animated: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      leavingEl: null,
      enteringEl: null,
    }
  },
  methods: {
    catchIonicGoBack(event) {
      const backButton = event.target && event.target.closest('ion-back-button')
      if (!backButton) return

      let defaultHref

      if (this.$router.canGoBack()) {
        event.preventDefault()
        this.$router.back()
      } else if (undefined !== (defaultHref = backButton.defaultHref)) {
        event.preventDefault()
        this.$router.push(defaultHref)
      }
    },
    transition(enteringEl, leavingEl) {
      const ionRouterOutlet = this.$refs.ionRouterOutlet

      if (typeof ionRouterOutlet.componentOnReady === 'undefined') {
        return
      }

      if (!enteringEl || enteringEl === leavingEl) {
        return
      }

      enteringEl.classList.add('ion-page', 'ion-page-invisible')

      return ionRouterOutlet.componentOnReady().then(el => {
        return el.commit(enteringEl, leavingEl, {
          deepWait: true,
          duration: this.getDuration(),
          direction: this.getDirection(),
          showGoBack: this.$router.canGoBack(),
        })
      })
    },
    getDuration() {
      return !this.animated ? 0 : undefined
    },
    getDirection() {
      return this.$router.direction === 1 ? 'forward' : 'back'
    },
    beforeEnter(el) {
      this.enteringEl = el
    },
    beforeLeave(el) {
      this.leavingEl = el
    },
    leave(el, done) {
      const promise = this.transition(this.enteringEl, el)
      if (!promise) return done()
      return promise.then(() => done(true))
    },
    enter(el, done) {
      done()
    },
    afterEnter(/* el */) {},
    enterCancelled(/* el */) {},
    afterLeave(/* el */) {},
    leaveCancelled(/* el */) {},
  },
}
</script>
