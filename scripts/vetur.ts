import fs from 'fs';
import path from 'path';
import docs from '@ionic/docs';
import { paramCase } from 'change-case';

// const fs = require('fs');
// const path = require('path');
// const { paramCase } = require('change-case');
// const docs = require('@ionic/docs');

const ingnoredProps = ['component', 'componentProps', 'delegate'];
const ignoredTags = ['ion-nav', 'ion-nav-link', 'ion-router-outlet'];
const navigableTags = ['href', 'default-href'];
const tags: { [key: string]: any } = {
  'ion-page': {
    description:
      '`IonPage` is a specialized component that is meant to be the parent container for an Ionic Page, which typically consists of `IonHeader` and `IonContent` components.',
  },
  'ion-router-view': {
    description:
      '`IonRouterView` is built on top of official `<router-view>` that renders the matched component for the current location with added logic for providing a stacked navigation, animating views in and out and swipe-back gesture. Components rendered by `<ion-router-view>` can also contain their own `<ion-router-view>` to render nested routes and tabbed navigation.',
  },
};
const attrs: { [key: string]: any } = {
  replace: {
    type: 'boolean',
    description:
      'Setting replace prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will replace the current history entry.',
  },
};

docs.components.forEach(c => {
  if (ignoredTags.includes(c.tag)) {
    return;
  }

  const description =
    c.tag !== 'ion-router-link'
      ? c.docs
      : 'The router link component is used for navigating to a specified link. Similar to the browser\'s anchor tag, it can accept a href for the location, and a direction for the transition animation.';

  tags[c.tag] = {
    description,
    attributes: c.props
      .filter(p => !ingnoredProps.includes(p.name))
      .map(p => p.attr || paramCase(p.name)),
  };

  c.props.map(p => {
    if (navigableTags.includes(p.attr || '') && c.tag !== 'ion-tab-button') {
      tags[c.tag].attributes.push('replace');
    }

    const options: string[] = [];
    p.values.forEach(v => {
      if (v.value) {
        options.push(v.value);
      }
    });

    attrs[`${c.tag}/${p.attr || paramCase(p.name)}`] = {
      type: p.type,
      description: p.docs,
      ...(options.length ? { options } : {}),
    };
  });
});

writeOutput(tags, 'tags');
writeOutput(attrs, 'attributes');

function writeOutput(data: {}, type: string) {
  fs.writeFile(
    path.resolve(__dirname, `../dist/vetur-${type}.json`),
    JSON.stringify(data, null, 2),
    err => {
      if (err) {
        console.error(err);
      } else {
        console.info(`Generated vetur dist/vetur-${type}.json`);
      }
    }
  );
}
