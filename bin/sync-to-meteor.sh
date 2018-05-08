#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

SRC=~/Sites/enliven-coming-soon/dist
DST=~/Sites/enliven-frontend

# use absolute paths for scripts & styles
# grep -rl -E '(src|href)="(scripts|styles)' $SRC \
#   | xargs perl -npi -e 's#(src|href)="(scripts|styles)#$1="/$2#g'

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
