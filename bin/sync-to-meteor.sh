#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

SRC=~/Sites/enliven-coming-soon/dist
DST=~/Sites/enliven-frontend

# build
gulp package

# rsync everything but HTML
rsync -vam \
  --exclude=*.html \
  --exclude=*.html \
  $SRC/ \
  $DST/public/

rsync -vam \
  --exclude=404.html \
  --exclude=/index.html \
  --exclude=images/ \
  --exclude=fonts/ \
  --exclude=scripts/ \
  --exclude=styles/ \
  --include=/*.bhtml \
  $SRC/ \
  $DST/packages/enliven-pages/lib/server/assets/
