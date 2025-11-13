#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }

  export husky_skip_init=1
  [ "$HUSKY" = "0" ] || [ "$HUSKY" = "false" ] && debug "HUSKY env variable is set to $HUSKY, skipping hooks" && exit 0
  command -v pnpm >/dev/null 2>&1 || { echo >&2 "pnpm is required to run husky hooks"; exit 1; }
fi
