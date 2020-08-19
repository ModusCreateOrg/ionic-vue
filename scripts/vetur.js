'use strict';

const fs = require('fs');
const path = require('path');
const meta = require('@ionic/core/dist/html.html-data.json');

const tags = {
  'ion-page': {
    description:
      '`IonPage` is a specialized component that is meant to be the parent container for an Ionic Page, which typically consists of `IonHeader` and `IonContent` components.',
  },
};
const attrs = {
  replace: {
    type: 'boolean',
    description:
      'Setting replace prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will replace the current history entry.',
  },
};

for (const key of Object.keys(meta.tags)) {
  const tag = meta.tags[key];
  tags[tag.name] = {
    attributes: tag.attributes.map(attr => attr.name),
    description: tag.description.value,
  };

  if (
    tags[tag.name].attributes.includes('href') &&
    tag.name !== 'ion-tab-button'
  ) {
    tags[tag.name].attributes.push('replace');
  }

  tag.attributes.map(attr => {
    attrs[`${tag.name}/${attr.name}`] = {
      description: attr.description,
      ...(attr.values ? { options: attr.values.map(v => v.name) } : {}),
    };
  });
}

fs.writeFile(
  path.resolve(__dirname, '../vetur/tags.json'),
  JSON.stringify(tags, null, 2),
  err => {
    if (err) {
      console.error(err);
    } else {
      console.info('Generated vetur tags.json');
    }
  }
);

fs.writeFile(
  path.resolve(__dirname, '../vetur/attributes.json'),
  JSON.stringify(attrs, null, 2),
  err => {
    if (err) {
      console.error(err);
    } else {
      console.info('Generated vetur attributes.json');
    }
  }
);
