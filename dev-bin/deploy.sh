#!/bin/sh

SPECIFIED_VERSION="$1"

clear

if [ -z "$SPECIFIED_VERSION" ]
then
  echo "You must specify a version number"
  exit 1;
fi

echo "Deploying OpenMud Version: $SPECIFIED_VERSION"

echo "Copying tarball to server"
scp "builds/openmud-$SPECIFIED_VERSION.tar.gz" matt@192.168.0.44:/deploy/openmud/releases

ssh -T matt@192.168.0.44 <<EOF
  cd /deploy/openmud/releases
  mkdir openmud-$SPECIFIED_VERSION
  cd openmud-$SPECIFIED_VERSION
  mv ../openmud-$SPECIFIED_VERSION.tar.gz .
  tar -xzf openmud-$SPECIFIED_VERSION.tar.gz
  npm i --production
  cd ../../
  rm -f current
  ln -s releases/openmud-$SPECIFIED_VERSION current
  cd current
  cd ../
  pm2 startOrRestart current/ecosystem.json
EOF