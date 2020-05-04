
# Ionic-Vue

[![CircleCI](https://circleci.com/gh/ModusCreateOrg/ionic-vue.svg?style=shield)](https://circleci.com/gh/ModusCreateOrg/ionic-vue)
[![codecov](https://codecov.io/gh/ModusCreateOrg/ionic-vue/branch/master/graph/badge.svg?token=mvAX8xwXDJ)](https://codecov.io/gh/ModusCreateOrg/ionic-vue)
[![SonarQube](https://sonarcloud.io/api/project_badges/measure?project=ionic_vue&metric=security_rating)](https://sonarcloud.io/dashboard?id=ionic_vue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

Ionic integration adapters for Vue.

<p align="center">
    <img src="https://res.cloudinary.com/modus-labs/image/upload/w_560/v1535019553/labs/logo-ionic-vue.svg" width="260" alt="@modus/ionic-vue">
</p>

## `Ionic-Vue` vs `@ionic/vue`
`Ionic-Vue` codebase has been contributed to the Ionic core and as [@ionic/vue](https://github.com/ionic-team/ionic/tree/master/vue). However, `@ionic/vue` provides limited support to Ionic v4.

The amazing Ionic team is always looking to bring the most modern of browser capabilities to their framework. The official Vue support will land after Vue 3 has stabilized.

Modus Create engineers continue to maintain this library to support the community that wants to create beautiful mobile apps with Vue and Ionic.

Our goal is to allow developers to be up to date with the latest advances of Ionic and Vue. Thus we are delivering features and bug fixes as fast as possible.


## Roadmap

Overview: all of the controllers and major features such as transitions and router have been implemented and tested for several months now.
Apart from minor improvements and further testing of various mixes of Ionic components and implementations this library is considered feature complete.

| Feature     | Status  | @ionic/vue | Notes |
|-------------|---------|------------|-------|
| Router      | :heavy_check_mark: | :heavy_check_mark: | Fully implemented |
| Router View | :heavy_check_mark: | :heavy_check_mark: | Fully implemented |
| Tabs        | :heavy_check_mark: | :heavy_check_mark: | Fully implemented |
| Controllers | :heavy_check_mark: | :heavy_check_mark: | Fully implemented |
| TypeScript  | :heavy_check_mark: | :heavy_check_mark: | Fully implemented |
| MS Edge Fix | :heavy_check_mark: | :heavy_check_mark: | Fully implemented |
| Router keep-alive | :heavy_check_mark: | [Pending](https://github.com/ionic-team/ionic/pull/18561) | - |
| Functional Inputs | :heavy_check_mark: | [Pending](https://github.com/ionic-team/ionic/pull/19087) | - |
| Import controllers directly | :heavy_check_mark: | [Pending](https://github.com/ionic-team/ionic/pull/19573) | Improve treeshaking and sync with react and angular implementations |
| Unit tests  | :x: | :x: |  Outdated as were originally written in plain JS, need to be updated for TS |

## Ionic versions 4 and 5
:warning: Moving forward all versions of `ionic-vue` will be supporting Ionic 5 only, if you'd like to continue using Ionic 4 please use `ionic-vue` version `1.3.4`

## Vue 3
:construction: We are actively developing the next major version of this library. It will support Vue 3 and all of the new APIs like Composition, new transition features, etc. 

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up and running.

```shell
npm install @ionic/core @modus/ionic-vue
```

Now you can use it during the initialization step of your Vue app.

```js
import Vue from 'vue'
import '@ionic/core/css/ionic.bundle.css'
import Ionic, { IonicVueRouter } from '@modus/ionic-vue'
import Home from './Home.vue'

Vue.use(Ionic)
Vue.use(IonicVueRouter)

new Vue({
  router: new IonicVueRouter({
    routes: [
      { path: '/', component: Home },
      { path: '/page', component: () => import('./Page.vue') }
    ],
  }),
}).$mount('ion-app')
```

Ionic requires a root element of `ion-app` in your HTML.

IonicVueRouter requires `ion-vue-router` element in order to render Ionic transitions. Otherwise you can use the [official VueRouter](https://router.vuejs.org/)

```html
<!DOCTYPE html>
<html lang="en">
  <head>...</head>

  <body>
    <ion-app>
      <ion-vue-router />
    </ion-app>
  </body>
</html>
```

### IonicVue

`IonicVue` abstracts DOM interaction of Ionic UI components inside a Vue application.

```js
import { alertController } from '@ionic/vue';

Vue.component('Foo', {
  methods: {
    notify() {
      alertController
        .create({
          header: 'Notification',
          subHeader: null,
          message: 'Hello World',
          buttons: ['Bye'],
        })
        .then(a => a.present())
        .catch(console.error)
    },
  },
})
```

IonicVue supports all of the Ionic controllers:

- [Action Sheet](https://github.com/ionic-team/ionic/tree/master/core/src/components/action-sheet-controller)
- [Alert](https://github.com/ionic-team/ionic/tree/master/core/src/components/alert-controller)
- [Loading](https://github.com/ionic-team/ionic/tree/master/core/src/components/loading-controller)
- [Menu](https://github.com/ionic-team/ionic/tree/master/core/src/components/menu-controller)
- [Modal](https://github.com/ionic-team/ionic/tree/master/core/src/components/modal-controller)
- [Picker](https://github.com/ionic-team/ionic/tree/master/core/src/components/picker-controller)
- [Popover](https://github.com/ionic-team/ionic/tree/master/core/src/components/popover-controller)
- [Toast](https://github.com/ionic-team/ionic/tree/master/core/src/components/toast-controller)

### IonicVueRouter

`IonicVueRouter` binds Ionic transitions and routing functionalities with Vue Router.

It is an extension of the official Vue Router thus it can be used as a drop-in replacement with all of the methods, hooks, etc. working as expected.

## Developing

### Setting up Dev

Simply clone the repo and install dependencies to get started with development.

```shell
git clone https://github.com/moduscreateorg/ionic-vue.git
cd ionic-vue/
npm install
```

Testing will require peer dependencies to be installed. Peer dependencies are:

- `vue`
- `vue-template-compiler`
- `vue-router`
- `@ionic/core`

You can install peer dependencies without modifying package.json.

```sh
npm run install.peer
```

We recommend trying out your `ionic-vue` changes in an actual app. You can do that with `npm link`:

```sh
cd ionic-vue/
npm link
cd ../sample-app/
npm link @modus/ionic-vue
```

[Beep](https://github.com/ModusCreateOrg/beep) is a fantastic sample application you can use to test `ionic-vue`.

### Building

Rollup automatically creates distribution packages.

For development build run:

```shell
npm run dev
```

For automatic rebuild on changes run:

```shell
npm run watch
```

For production build run:

```shell
npm run prod
```

## Tests

Make sure you have installed peer dependencies (explained above) before running tests.

```shell
npm test
```

## Static Analysis

The ionic-vue project uses SonarQube's SonarCloud product for static analysis scans.

Our publicly available dashboard for the project can be found [here](https://sonarcloud.io/dashboard?id=ionic_vue)

## Modus Create

[Modus Create](https://moduscreate.com) is a digital product consultancy. We use a distributed team of the best talent in the world to offer a full suite of digital product design-build services; ranging from consumer facing apps, to digital migration, to agile development training, and business transformation.

[![Modus Create](https://res.cloudinary.com/modus-labs/image/upload/h_80/v1533109874/modus/logo-long-black.png)](https://moduscreate.com)

This project is part of [Modus Labs](https://labs.moduscreate.com).

[![Modus Labs](https://res.cloudinary.com/modus-labs/image/upload/h_80/v1531492623/labs/logo-black.png)](https://labs.moduscreate.com)

## Licensing

This project is [MIT licensed](./LICENSE).

