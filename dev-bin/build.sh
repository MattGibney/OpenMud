clear

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "Building OpenMud $PACKAGE_VERSION"

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