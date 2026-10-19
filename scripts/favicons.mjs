// Генерує растрові фавікони з public/favicon.svg (того самого лого, що в AppLogo.vue).
// Запускати після зміни лого: `npm run favicons`.
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const svg = await readFile('public/favicon.svg')
const png = (size, opts = {}) => {
  let img = sharp(svg, { density: 72 * size / 40 * 4 }).resize(size, size)
  // iOS сам заокруглює кути іконки, тож прозорі кути заливаємо жовтим
  if (opts.flatten) img = img.flatten({ background: '#f5b800' })
  return img.png().toBuffer()
}

// Google показує фавікон у видачі; розмір має бути кратним 48 px
await writeFile('public/favicon-96.png', await png(96))
await writeFile('public/apple-touch-icon.png', await png(180, { flatten: true }))

// favicon.ico з PNG усередині (16, 32, 48 px) — браузери запитують його за замовчуванням
const sizes = [16, 32, 48]
const images = await Promise.all(sizes.map(s => png(s)))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = 6 + 16 * sizes.length
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(s, 0)
  e.writeUInt8(s, 1)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(images[i].length, 8)
  e.writeUInt32LE(offset, 12)
  offset += images[i].length
  return e
})
await writeFile('public/favicon.ico', Buffer.concat([header, ...entries, ...images]))
console.log('Фавікони: favicon.ico, favicon-96.png, apple-touch-icon.png')
