#!/usr/bin/env bash
# Test automatico del semaforo GeoGreen, 100% por CLI (sin VS Code).
# Para cada distancia simulada, verifica el % de llenado esperado en el serial.
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PIO="$HOME/.local/bin/pio.exe"
WOKWI="$HOME/.local/bin/wokwi-cli.exe"

if [ -z "$WOKWI_CLI_TOKEN" ] && [ -f "$HOME/.wokwi_token" ]; then
  export WOKWI_CLI_TOKEN="$(tr -d '[:space:]' < "$HOME/.wokwi_token")"
fi

"$PIO" run -d "$DIR" >/dev/null
echo "Firmware compilado. Corriendo casos..."
echo

fallos=0
run_case() {
  local dist="$1" expect="$2" estado="$3"
  local tmp="$DIR/.diagram.$dist.json"
  sed "s/\"distance\": \"[0-9]*\"/\"distance\": \"$dist\"/" "$DIR/diagram.json" > "$tmp"
  printf "  %3scm -> espero %-16s (%s) ... " "$dist" "\"$expect\"" "$estado"
  if "$WOKWI" "$DIR" --diagram-file "$tmp" --timeout 4000 --expect-text "$expect" --quiet >/dev/null 2>&1; then
    echo "PASS"
  else
    echo "FAIL"
    fallos=$((fallos+1))
  fi
  rm -f "$tmp"
}

run_case 80 "Llenado: 22 %" "verde"
run_case 50 "Llenado: 55 %" "amarillo"
run_case 20 "Llenado: 89 %" "rojo+buzzer"

echo
if [ "$fallos" -eq 0 ]; then
  echo "TODOS LOS CASOS PASARON ✓"
else
  echo "$fallos caso(s) fallaron ✗"
  exit 1
fi
