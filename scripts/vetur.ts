import fs from 'fs';
import path from 'path';
import docs from '@ionic/docs';
import { paramCase } from 'change-case';
import { IonRouterView } from '../src/components/router-outlet';

const ignoredProps = ['component', 'componentProps', 'delegate'];
const ignoredTags = [
  'ion-nav',
  'ion-nav-link',
  'ion-router',
  'ion-route',
  'ion-route-redirect',
];
const navigableTags = ['href', 'default-href'];
const tags: { [key: string]: any } = {
  'ion-page': {
    description:
      '`IonPage` is a specialized component that is meant to be the parent container for an Ionic Page, which typically consists of `IonHeader` and `IonContent` components.',
  },
  'ion-router-view': {
    description:
      '`IonRouterView` is built on top of official `<router-view>` that renders the matched component for the current location with added logic for providing a stacked navigation, animating views in and out and swipe-back gesture. Components rendered by `<ion-router-view>` can also contain their own `<ion-router-view>` to render nested routes and tabbed navigation.',
    attributes: (IonRouterView.props as string[]).map(p => paramCase(p)),
  },
};
const attrs: { [key: string]: any } = {
  replace: {
    type: 'boolean',
    description:
      'Setting replace prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will replace the current history entry.',
  },
  'ion-router-view/name': {
    type: 'string | symbol',
    description:
      'When a `<ion-router-view>` has a `name` prop, it will render the component with the corresponding name in the matched route record\'s components option.',
  },
  'ion-router-view/route': {
    description:
      'When a `<ion-router-view>` has a `route` prop, it will use that resolved Route Location instead of the current location.',
  },
};

docs.components
  .filter(c => !ignoredTags.includes(c.tag))
  .forEach(c => {
    let tagName = c.tag;
    if (tagName === 'ion-router-outlet') {
      tagName = 'ion-router-view';
    } else {
      const description =
        tagName !== 'ion-router-link'
          ? c.docs
          : 'The router link component is used for navigating to a specified link. Similar to the browser\'s anchor tag, it can accept a href for the location, and a direction for the transition animation.';

      tags[tagName] = {
        description,
        attributes: c.props
          .filter(p => !ignoredProps.includes(p.name))
          .map(p => p.attr || paramCase(p.name)),
      };
    }

    c.props
      .filter(p => !ignoredProps.includes(p.name))
      .map(p => {
        if (
          navigableTags.includes(p.attr || '') &&
          tagName !== 'ion-tab-button'
        ) {
          tags[tagName].attributes.push('replace');
        }

        const options: string[] = [];
        p.values.forEach(v => {
          if (v.value) {
            options.push(v.value);
          }
        });

        attrs[`${tagName}/${p.attr || paramCase(p.name)}`] = {
          type: p.type,
          description: p.docs.replace(
            /router-outlet|ion-nav/g,
            'ion-router-view'
          ),
          ...(options.length ? { options } : {}),
        };
      });
  });

if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
  fs.mkdirSync(path.resolve(__dirname, '../dist'));
}

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
