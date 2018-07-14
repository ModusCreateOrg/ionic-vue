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
      <router-view/>
    </transition>
  </ion-router-outlet>
</template>

<script>
export default {
  name: 'IonRouterVue',
  props: {
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

      if (!enteringEl || enteringEl === leavingEl) {
        return
      }

      enteringEl.classList.add('ion-page', 'hide-page')

      return ionRouterOutlet
        .componentOnReady()
        .then(el => {
          return el.commit(enteringEl, leavingEl, {
            duration: !this.animated ? 0 : undefined,
            direction: this.$router.direction === 1 ? 'forward' : 'back',
            deepWait: true,
            showGoBack: this.$router.canGoBack(),
          })
        })
        .catch(err => console.error(err))
    },
    beforeEnter(el) {
      this.enteringEl = el
    },
    beforeLeave(el) {
      this.leavingEl = el
    },
    leave(el, done) {
      this.transition(this.enteringEl, el)
        .finally(() => done())
        .catch(err => console.error(err))
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
