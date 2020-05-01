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
  git add -A
  npm version $VERSION prerelease --preid=alpha --no-git-tag-version
  git commit -m "[build] $VERSION"
  git tag v$VERSION

  # publish
  git push --tags
  npm publish
fi
