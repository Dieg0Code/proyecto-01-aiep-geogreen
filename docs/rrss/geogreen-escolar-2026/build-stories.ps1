$ErrorActionPreference = "Stop"

Push-Location $PSScriptRoot

try {
  node build-stories.js

  magick assets/fondo-portada-gptimage.png -resize 1080x1920! .base1.png
  magick assets/fondo-programa-gptimage.png -resize 1080x1920! .base2.png
  magick assets/lockup-aiep-vcm-white.png -resize 242x176! .logo1.png
  magick assets/lockup-aiep-vcm-white.png -resize 234x170! .logo2.png

  magick -background none -density 96 historia-01-portada-overlay.svg -resize 1080x1920! .overlay1.png
  magick -background none -density 96 historia-02-programa-overlay.svg -resize 1080x1920! .overlay2.png

  magick .base1.png .overlay1.png -composite .logo1.png -geometry +765+76 -composite historia-01-portada.png
  magick .base2.png .overlay2.png -composite .logo2.png -geometry +770+66 -composite historia-02-programa.png
}
finally {
  Remove-Item -LiteralPath .base1.png,.base2.png,.logo1.png,.logo2.png,.overlay1.png,.overlay2.png `
    -ErrorAction SilentlyContinue
  Pop-Location
}

