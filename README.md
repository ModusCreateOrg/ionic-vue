# Ionic-Vue

[![CircleCI](https://circleci.com/gh/ModusCreateOrg/ionic-vue.svg?style=shield)](https://circleci.com/gh/ModusCreateOrg/ionic-vue)
[![codecov](https://codecov.io/gh/ModusCreateOrg/ionic-vue/branch/master/graph/badge.svg?token=mvAX8xwXDJ)](https://codecov.io/gh/ModusCreateOrg/ionic-vue)
[![SonarQube](https://sonarcloud.io/api/project_badges/measure?project=ionic_vue&metric=security_rating)](https://sonarcloud.io/dashboard?id=ionic_vue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

Ionic integration adapters for Vue.

<p align="center">
    <img src="https://res.cloudinary.com/modus-labs/image/upload/w_800/v1533141242/ionic-vue/ionic-vue-banner.png"
    width="400"
    alt="@modus/ionic-vue">
</p>

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
npm install @modus/ionic-vue
```

Now you can use it during the initialization step of your Vue app.

```js
import Vue from 'vue'
import { IonicVueRouter, IonicAPI } from '@modus/ionic-vue'
import Home from './Home.vue'
import Page from './Page.vue'

Vue.use(IonicVueRouter)
Vue.use(IonicAPI)

new Vue({
  router: new IonicVueRouter({
    routes: [{ path: '/', component: Home }, { path: '/page', component: Page }],
  }),
}).$mount('ion-app')
```

Ionic requires a root element of `ion-app` in your HTML.

IonicVueRouter requires `ion-vue-router` element in order to render the components.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="https://unpkg.com/@ionic/core@4.0.0-beta.0/dist/ionic.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@ionic/core@4.0.0-beta.0/css/ionic.min.css"/>
    </head>

    <body>
        <ion-app>
            <ion-vue-router/>
        </ion-app>
    </body>
</html>
```

### IonicAPI

`IonicAPI` abstracts DOM interaction of Ionic UI components inside a Vue application and can be used ia `this.$ionic`.

```js
Vue.component('Foo', {
  methods: {
    notify() {
      this.$ionic
        .newAlertController({
          header: 'Notification',
          subHeader: null,
          message: 'Hello World',
          buttons: ['Bye'],
        })
        .then(o => o.present())
        .catch(err => console.error(err))
    },
  },
})
```

### IonicVueRouter

Some Ionic components, such as [`NavController`](https://ionicframework.com/docs/api/navigation/NavController/), require routing support. `IonicVueRouter` binds Ionic routing functionalities with Vue Router.

It is an extension of the Vue Router thus it can be used as a drop-in replacement with all of the methods, hooks, etc. working as expected.

### Cookbook examples

- [Basic routing](cookbook/index.html)
- [Named views](cookbook/named-views.html)
- [Named views with transitions](cookbook/named-views-transitions.html)
- [IonNav routing](cookbook/ion-nav-routing.html)
- [Custom transitions](cookbook/custom-transitions.html)
- [Mix Ionic and custom transitions](cookbook/mixed-transitions.html)

## Developing

### Setting up Dev

Simly clone the repo and install dependencies to get started with development.

```shell
git clone https://github.com/moduscreateorg/ionic-vue.git
cd ionic-vue/
npm install
```

Testing will require peer dependencies to be installed. Peer dependencies are:

- `vue`
- `vue-template-compiler`
- `vue-router`

You can install peer dependencies without modifying package.json.

```sh
npm install vue vue-template-compiler vue-router --no-save
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

Our publically available dashboard for the project can be found [here](https://sonarcloud.io/dashboard?id=ionic_vue)

## Modus Create

[Modus Create](https://moduscreate.com) is a digital product consultancy. We use a distributed team of the best talent in the world to offer a full suite of digital product design-build services; ranging from consumer facing apps, to digital migration, to agile development training, and business transformation.

[![Modus Create](https://res.cloudinary.com/modus-labs/image/upload/h_80/v1533109874/modus/logo-long-black.png)](https://moduscreate.com)

This project is part of [Modus Labs](https://labs.moduscreate.com).

[![Modus Labs](https://res.cloudinary.com/modus-labs/image/upload/h_80/v1531492623/labs/logo-black.png)](https://labs.moduscreate.com)

## Licensing

This project is [MIT licensed](./LICENSE).

