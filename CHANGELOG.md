# [Unreleased](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.17...dev)

### Bug fixes
* Improve merging of Ionic and Vue classes

---

# [3.0.0-alpha.17](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.16...v3.0.0-alpha.17)

### Breaking changes
* In order to allow for Ionic to initialize it's custom elements it is now required to await for a `isReady` function before mounting the application. Similarly how it is done with VueRouter.
```
// v3.0.0-alpha.17 unwards
const app = createApp(App)
    .use(IonicVue, globalIonicConfig)
    .use(router);

IonicVue.isReady().then(() => {
    router.isReady().then(() => {
        app.mount("#app");
    });
});
```

### Bug fixes
* Fix swipe-back route props parsing
* Fix Ionic initialisation

# [3.0.0-alpha.16](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.15...v3.0.0-alpha.16)

### Features
* Improve tooling and IDE support by wrapping components with defineComponent
* Vetur support

### Bug fixes
* Fix IonBackButton props
* Fix IonSplitPane within IonRouterView being hidden after navigation
* Fix removal of ionic classes with dynamic Vue class property values
* Add missing component displayName props

# [3.0.0-alpha.15](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.14...v3.0.0-alpha.15)

### Features
* Added IonPage and IonRouterLink Ionic components
* Switched to eslint

### Bug fixes
* Fix handling of target attribute
* Fix IonTabs refs
* Fix switching between tabs with routes and plain tabs causing a redirect
* Fix IonRadioGroup v-model

# [3.0.0-alpha.14](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.13...v3.0.0-alpha.14)

### Bug fixes
* Fix rendering of route components when using swipe-back gesture

# [3.0.0-alpha.13](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.12...v3.0.0-alpha.13)

### Features
* Ionic components href attribute behaves like RouterLink's to attribute
* Support routerAnimation and routerDirection props for Ionic components

### Bug fixes
* Scroll is no longer reset if swipe back is cancelled
* Fix props no longer being applied correctly to overlay components
* Fix onClick overriding on certain Ionic components

# [3.0.0-alpha.12](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.11...v3.0.0-alpha.12)

### Features
* Export transition props when rendering children in RouterView

# [3.0.0-alpha.11](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.10...v3.0.0-alpha.11)

### Features
* IonRouterView - remove keepAlive prop and use v-slot prop instead

# [3.0.0-alpha.10](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.9...v3.0.0-alpha.10)

### Features
* Added onIonTabsDidChange and onIonTabsWillChange events to IonTabs component

### Bug fixes
* Fix ionic input events not firing (i.e. IonSelect's @ionChange)
* Fix ionic input value not being set when used without v-model (i.e. <IonInput value="foo" />)

# [3.0.0-alpha.9](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.8...v3.0.0-alpha.9)

### Features
* Improve component props typings and definitions

### Bug fixes
* Allow IonBackButton to be used without router
* Fix IonContent scoll element evaluating to false

# [3.0.0-alpha.8](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.7...v3.0.0-alpha.8)

### Features
* Added Keep Alive support to IonRouterView

### Bug fixes
* Fix default active tab selection

# [3.0.0-alpha.7](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.6...v3.0.0-alpha.7)

### Features
* Added routing to tabs
* Added the rest of the missing Ionic components

# [3.0.0-alpha.5](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.4...v3.0.0-alpha.5)

### Features
* Added tabs support (no routing yet) - IonTabs, IonTabBar, IonTab, IonTabButton
* Added IonIcon component
* Update to vue@3.0.0-beta.15
* Update to vue-router@4.0.0-alpha.12

### Bug fixes
* Fix setup of Ionic config

# [3.0.0-alpha.4](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.3...v3.0.0-alpha.4)

### Features
* Restore scroll on navigation
* Update to vue@3.0.0-beta.10
* Update to vue-router@4.0.0-alpha.10


# [3.0.0-alpha.3](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.2...v3.0.0-alpha.3)

### Features
* Swipe to go back for iOS mode
* Hardware back button support
* Update to vue@3.0.0-beta.5
* Update to vue-router@4.0.0-alpha.9

### Bug fixes
* Improve back button display logic

# [3.0.0-alpha.2](https://github.com/ModusCreateOrg/ionic-vue/compare/v3.0.0-alpha.1...v3.0.0-alpha.2)

### Features
* Router `<IonRouterView />`
* Native general components: `IonHeader`, `IonToolbar`, `IonTitle`, `IonContent`, `IonButtons`
* Native back button `IonBackButton`

### Performance Improvements
* Simplified navigation direction logic


# [3.0.0-alpha.1](https://github.com/ModusCreateOrg/ionic-vue/compare/v1.3.6...v3.0.0-alpha.1)

### BREAKING CHANGES
* `IonicVue` is now a named export
* Routing is temporarily disabled
* Ionic controllers are replaced with native components and are not longer exported, import from `@ionic/core` if needed
* Global `$ionic` property (`Vue.$ionic` and `this.$ionic`) are removed in favor of tree-shakable components

### Features
* Rewrite from ground up for Vue v3 support
* Native overlay components: `IonModal`, `IonActionSheet`, `IonPopover`
* Native input components: `IonInput`, `IonCheckbox`, `IonDatetime`, `IonRange`, `IonRadio`, `IonSearchbar`, `IonSelect`, `IonTextarea`, `IonToggle`
* Native general components: `IonItem`, `IonLabel`, `IonButton`
* `v-model` support for all components: `<IonModal v-model="isOpen">` or `<IonButton v-model:disabled="isOpen">`

### Performance Improvements
* Everything is (and will be) a functional component utilising Reactivity APIs
