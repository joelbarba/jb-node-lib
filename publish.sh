#!/bin/bash

echo "Publish the 'jb-node-lib' package to NPM"
oldVersion=$(node -p "require('./package.json').version");
npm version minor --force
newVersion=$(node -p "require('./package.json').version");

if changes=$(git status --porcelain) && [[ -z "$changes" ]]; then
  echo "Working directory clean. Nothing to commit."
else
  echo "There are changes to commit."
  git add -A
  git status

  msg=`New version published: ${newVersion}`
  x=$1
  if [[ "$x" == "" ]]; then
    echo ""
    echo -n "Type the commit message: "
    read x
    msg=`${x}\n\n New version published: ${newVersion}`
  fi
  git commit -m "$msg"
  git push origin master
fi

echo ""
echo "Update version: $oldVersion  --->  $newVersion"
echo ""

npm publish

echo ""
git log -1
echo ""
