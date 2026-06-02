#!/usr/bin/env bash
# Corre la simulacion GeoGreen en Wokwi headless (sin VS Code).
# Lee el token gratuito desde ~/.wokwi_token para no exponerlo.
# Uso:  bash sim.sh            -> compila + corre 6s mostrando el serial
#       bash sim.sh shot       -> ademas saca un screenshot run.png
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PIO="$HOME/.local/bin/pio.exe"
WOKWI="$HOME/.local/bin/wokwi-cli.exe"

if [ -z "$WOKWI_CLI_TOKEN" ] && [ -f "$HOME/.wokwi_token" ]; then
  export WOKWI_CLI_TOKEN="$(tr -d '[:space:]' < "$HOME/.wokwi_token")"
fi
if [ -z "$WOKWI_CLI_TOKEN" ]; then
  echo "ERROR: falta WOKWI_CLI_TOKEN (crea ~/.wokwi_token con tu token de wokwi.com/dashboard/ci)" >&2
  exit 1
fi

"$PIO" run -d "$DIR"

if [ "$1" = "shot" ]; then
  "$WOKWI" "$DIR" --timeout 6000 --serial-log-file "$DIR/serial.log" \
    --screenshot-time 4000 --screenshot-file "$DIR/run.png"
else
  "$WOKWI" "$DIR" --timeout 6000 --serial-log-file "$DIR/serial.log"
fi
