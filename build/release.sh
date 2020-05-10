#!/bin/bash

set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo #move to new line

if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."
  VERSION=$VERSION npm run prod

  # commit
  npm version $VERSION --no-git-tag-version
  git add -A
  git commit -m "[build] $VERSION"
  git tag v$VERSION

  # publish
  git push
  git push --tags
  npm publish --tag next
fi
