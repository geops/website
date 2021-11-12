#!/bin/sh


if grep "Could not get image size for"; then
  echo "Problem with images, check the log of the build."
  exit 1 # terminate and indicate error
else
  echo "No problem with images"
  exit 0
fi
