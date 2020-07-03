### KNOWN ISSUES
* Some Ionic events and attributes do not work due to their camelCase naming (upstream Vue 3 issue)
* Routing related attributes on Ionic components are not yet supported

# Unreleased

### Features
* Improve component props typings and definitions

### Bug fixes
* Allow IonBackButton to be used without router

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
