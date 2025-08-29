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
  git commit -m "New version published: $newVersion"
  git push origin master
fi

echo ""
echo "Update version: $oldVersion  --->  $newVersion"
echo ""

npm publish

echo ""
git log -1
