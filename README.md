# Ionic-Vue

[![CircleCI](https://circleci.com/gh/ModusCreateOrg/ionic-vue.svg?style=shield)](https://circleci.com/gh/ModusCreateOrg/ionic-vue)
[![codecov](https://codecov.io/gh/ModusCreateOrg/ionic-vue/branch/master/graph/badge.svg?token=mvAX8xwXDJ)](https://codecov.io/gh/ModusCreateOrg/ionic-vue)
[![SonarQube](https://sonarcloud.io/api/project_badges/measure?project=ionic_vue&metric=security_rating)](https://sonarcloud.io/dashboard?id=ionic_vue)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/ModusCreateOrg/ionic-vue/blob/master/LICENSE)

Ionic 5 integration adapters for Vue 3.

<p align="center">
    <img src="https://res.cloudinary.com/modus-labs/image/upload/w_560/v1535019553/labs/logo-ionic-vue.svg" width="260" alt="@modus/ionic-vue">
</p>

## Status: Alpha

This is a prerelease, most of the functionality is in there such as the router, animations, input and overlay components. Since we are building on top of prereleases of Vue and VueRouter there may be breaking changes and bugs. The prerelease is created for early adopters to test the library and provide feedback, bug reports and feature requests.

## Roadmap

Please consult the [projects page](https://github.com/ModusCreateOrg/ionic-vue/projects/1) for more details.

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up and running.

```sh
npm install @ionic/core @modus/ionic-vue
```

Now you can use it during the initialization step of your Vue app.
Note that `createRouter` is imported from `@modus/ionic-vue` and not `vue-router` this will allow you to get Ionic transitions between your routes out of the box.

```js
import { createApp } from "vue";
import { createWebHistory } from "vue-router";
import { IonicVue, createRouter } from "@modus/ionic-vue";

// Ionic core styles
import "@ionic/core/css/ionic.bundle.css";

import App from "./App.vue";
import Home from "./components/Home.vue";
import Page from "./components/Page.vue";

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    { path: "/", component: Home },
    { path: "/page", component: Page },
  ],
});

const globalIonicConfig = { mode: 'ios' };

const app = createApp(App)
  .use(IonicVue, globalIonicConfig)
  .use(router);

  IonicVue.isReady().then(() => {
    router.isReady().then(() => {
      app.mount("#app");
    });
  });
```

All components should be explicitly imported now, this allows for smaller build sizes and improved tree-shaking.
Import `IonApp` and `IonRouterView` from `@modus/ionic-vue`, this will be your app's entry point.

```vue
<template>
  <ion-app>
    <ion-router-view />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterView } from "@modus/ionic-vue";

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterView
  },
};
</script>
```

Everything is a component now, here's an example of how you could trigger a modal

```vue
<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <p>{{ msg }}</p>
      <ion-button @click="openModal">Open modal</ion-button>
    </ion-content>

    <ion-modal :isOpen="isOpen" @willDismiss="closeModal">
      <h1>My modal content</h1>
      <ion-item>
        <ion-label>My input</ion-label>
        <ion-input v-model="msg" :clearInput="true" />
      </ion-item>
    </ion-modal>
  </div>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonInput
} from '@modus/ionic-vue';

export default {
  name: 'Home',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
    IonModal,
    IonItem,
    IonLabel,
    IonInput,
  },
  data() {
    return {
      isOpen: false,
      msg: "",
    }
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal(e) {
      console.log(e);
      this.isOpen = false;
    },
  }
}
</script>
```

### IonicVue Router

IonicVue Router binds Ionic transitions and routing functionalities to Vue Router.
It is an extension of the official Vue Router thus it can be used as a drop-in replacement with all of the methods, hooks, etc. working as expected.

## Developing

Clone the repo's `dev` branch and install dependencies to get started with development.

```shell
git clone https://github.com/moduscreateorg/ionic-vue.git -b dev
cd ionic-vue/
npm install
```

We recommend trying out your `ionic-vue` changes in an actual app. You can do that with `npm link`:

```sh
cd ionic-vue/
npm link
cd ../sample-app/
npm link @modus/ionic-vue
```

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

