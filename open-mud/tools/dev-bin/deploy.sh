#!/bin/sh

function silentSsh {
    local connectionString="$1"
    local commands="$2"
    if [ -z "$commands" ]; then
        commands=`cat`
    fi
    ssh -T $connectionString "$commands"
}

SPECIFIED_VERSION="$1"
REMOTE_CONNECTION="$2"

clear

if [ -z "$SPECIFIED_VERSION" ]
then
  echo "You must specify a version number"
  exit 1;
fi

if [ -z "$REMOTE_CONNECTION" ]
then
  echo "You must specify a connection string"
  exit 1;
fi

echo "Deploying OpenMud Version: $SPECIFIED_VERSION"

echo "Copying tarball to server"
scp "builds/openmud-$SPECIFIED_VERSION.tar.gz" "$REMOTE_CONNECTION:/deploy/openmud/releases"

silentSsh "$REMOTE_CONNECTION" <<EOC
  cd /deploy/openmud/releases

  echo "Creating release location"
  mkdir "openmud-$SPECIFIED_VERSION"
  cd "openmud-$SPECIFIED_VERSION"
  mv "../openmud-$SPECIFIED_VERSION.tar.gz" .

  echo "Extracting tarball"
  tar -xzf "openmud-$SPECIFIED_VERSION.tar.gz"

  echo "Installing dependancies"
  npm i -s --production
  cd ../../

  echo "Updating 'current' symlink"
  rm -f current
  ln -s "releases/openmud-$SPECIFIED_VERSION" current
  cd current
  cd ../

  echo "Restarting PM2 process"
  pm2 -s startOrRestart current/ecosystem.json
EOC