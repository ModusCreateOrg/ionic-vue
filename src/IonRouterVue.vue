<template>
    <ion-router-outlet ref="ionRouterOutlet" @click="catchIonicGoBack">
        <transition
            mode="in-out"
            v-bind:css="bindCss"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-on:enter-cancelled="enterCancelled"
            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave"
            v-on:leave-cancelled="leaveCancelled"
        >
            <router-view></router-view>
        </transition>
    </ion-router-outlet>
</template>

<script>
export default {
    name: 'IonRouterVue',
    data() {
        return {
            leavingEl: null,
            enteringEl: null,
        }
    },
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
    methods: {
        catchIonicGoBack(event) {
            if (!event.target) {
                return
            }

            const backButton = event.target.closest('ion-back-button')

            if (!backButton) {
                return
            }

            let defaultHref

            if (this.$router.canGoBack()) {
                event.preventDefault()
                this.$router.back()
            } else if (undefined !== (defaultHref = backButton.defaultHref)) {
                event.preventDefault()
                this.$router.push(defaultHref)
            }
        },
        transition(enteringEl, leavingEl, done) {
            const ionRouterOutlet = this.$refs.ionRouterOutlet

            if (!enteringEl || enteringEl === leavingEl) {
                return
            }

            enteringEl.classList.add('ion-page', 'hide-page')

            ionRouterOutlet.componentOnReady().then((el) => {
                el.commit(enteringEl, leavingEl, {
                    duration: !this.animated ? 0 : undefined,
                    direction: this.$router.direction === 1 ? 'forward' : 'back',
                    deepWait: true,
                    showGoBack: this.$router.canGoBack(),
                }).then(() => done())
            }).catch(err => console.error(err))
        },
        beforeEnter(element) {
            this.enteringEl = element
        },
        beforeLeave(element) {
            this.leavingEl = element
        },
        leave(element, done) {
            this.transition(this.enteringEl, element, done)
        },
        enter(element, done) {
            done()
        },
        afterEnter(el) {},
        enterCancelled(el) {},
        afterLeave(el) {},
        leaveCancelled(el) {},
    },
}
</script>
