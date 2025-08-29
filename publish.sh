sh /home/barba/DEV/SHELL_SCRIPTS/git_commit.sh
echo "Publish the 'jb-node-lib' package to NPM"
npm version minor
npm publish
