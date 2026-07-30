$ErrorActionPreference = "Stop"

Push-Location $PSScriptRoot

try {
  node build-publicaciones.js

  1..4 | ForEach-Object {
    $n = $_.ToString("00")
    $background = Get-ChildItem -LiteralPath "assets" -Filter "fondo-$n-*-gptimage.png" |
      Select-Object -First 1

    magick $background.FullName -resize "1080x1350^" -gravity center -extent 1080x1350 ".base$n.png"
    magick -background none -density 96 "publicacion-$n-overlay.svg" -resize 1080x1350! ".overlay$n.png"
  }

  magick assets/lockup-aiep-vcm-white.png -resize 210x152! .logo.png

  1..4 | ForEach-Object {
    $n = $_.ToString("00")
    magick ".base$n.png" ".overlay$n.png" -composite .logo.png -geometry +804+46 -composite `
      "publicacion-$n.png"
  }
}
finally {
  1..4 | ForEach-Object {
    $n = $_.ToString("00")
    Remove-Item -LiteralPath ".base$n.png",".overlay$n.png" -ErrorAction SilentlyContinue
  }
  Remove-Item -LiteralPath .logo.png -ErrorAction SilentlyContinue
  Pop-Location
}

