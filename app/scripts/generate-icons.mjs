// Genera los iconos PNG de la PWA a partir de la marca GeoGreen (sin logo AIEP).
// Uso: node scripts/generate-icons.mjs
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons')

const leaf = (rx) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${rx}" fill="#102A43"/>
  <path d="M256 92c108 46 140 212 0 332C116 304 148 138 256 92Z" fill="#3FAE6A"/>
  <path d="M256 132v260" stroke="#102A43" stroke-width="16" stroke-linecap="round"/>
  <path d="M256 210c34-22 64-26 92-22M256 282c-34-22-64-26-92-22"
        stroke="#102A43" stroke-width="14" stroke-linecap="round" fill="none"/>
</svg>`

await mkdir(OUT, { recursive: true })

const tasks = [
  { name: 'icon-192.png', size: 192, rx: 42 },
  { name: 'icon-512.png', size: 512, rx: 112 },
  // Maskable: fondo a sangre (sin esquinas redondeadas) para la zona segura.
  { name: 'icon-maskable-512.png', size: 512, rx: 0 },
]

for (const { name, size, rx } of tasks) {
  await sharp(Buffer.from(leaf(rx)))
    .resize(size, size)
    .png()
    .toFile(join(OUT, name))
  console.log('✓', name)
}
