#!/bin/sh

SPECIFIED_VERSION="$1"

clear

# if [ "`git status -s`" ]
# then
#     echo "The working directory is dirty. Please commit any pending changes."
#     exit 1;
# fi

if [ -z "$SPECIFIED_VERSION" ]
then
  echo "You must specify a version number"
  exit 1;
fi

echo "Building OpenMud Version: $SPECIFIED_VERSION"

# Get the current GIT branch
CURRENT_BRANCH_NAME=$(git symbolic-ref -q HEAD)
CURRENT_BRANCH_NAME=${CURRENT_BRANCH_NAME##refs/heads/}
CURRENT_BRANCH_NAME=${CURRENT_BRANCH_NAME:-HEAD}

echo "Checking out version tag"

git checkout $SPECIFIED_VERSION --quiet

# Get the version number specified in the package.json file
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

if [[ "$PACKAGE_VERSION" != "$SPECIFIED_VERSION" ]]
then
  echo "Your package.json file version number does not match the git tag."
  exit 1;
fi

echo "Cleaning up previous builds"
rm -rf dist/
mkdir -p builds

echo "Compiling application"
npx tsc

echo "Copying package*.json"
cp package.json package-lock.json dist/

echo "Creating Tarball"
cd dist
tar -zcf "../builds/openmud-$PACKAGE_VERSION.tar.gz" .
cd ..

echo "Cleaning temporary files"
rm -r dist/

echo "Returning to original GIT branch"

git checkout $CURRENT_BRANCH_NAME --quiet