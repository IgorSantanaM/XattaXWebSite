import { mkdir, readFile, writeFile } from 'node:fs/promises'

// Materialize each route for GitHub Pages, including direct links and refreshes.
const pages = JSON.parse(await readFile(new URL('../src/page-meta.json', import.meta.url), 'utf8'))
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const site = `${(process.env.SITE_URL || 'https://igorsantanam.github.io/XattaXWebSite/').replace(/\/+$/, '')}/`
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
for (const page of pages) {
  const url = site + (page.path ? `${page.path}/` : '')
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(page.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(page.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(page.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
  const directory = new URL(`../dist/${page.path ? page.path + '/' : ''}`, import.meta.url)
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), html)
}
await writeFile(new URL('../dist/404.html', import.meta.url), template)
await writeFile(new URL('../dist/.nojekyll', import.meta.url), '')
console.log(`Created ${pages.length} static page entry points.`)
