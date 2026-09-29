import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const pages = JSON.parse(await readFile(new URL('../src/page-meta.json', import.meta.url), 'utf8'))
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const site = `${(process.env.SITE_URL || 'https://xattax.cloudlane.com.br/').replace(/\/+$/, '')}/`
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const pageUrl = path => site + (path ? `${path}/` : '')

const business = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  '@id': `${site}#business`,
  name: 'XattaX',
  description: 'Escritório contábil em Campo Grande, MS, com atendimento a pessoas físicas e negócios.',
  url: site,
  logo: `${site}brand/xattax-logo.svg`,
  telephone: '+55-67-3382-5699',
  email: 'xattax.2022@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Pindaíba, 244',
    addressLocality: 'Campo Grande',
    addressRegion: 'MS',
    addressCountry: 'BR',
  },
  areaServed: { '@type': 'City', name: 'Campo Grande' },
  sameAs: ['https://www.instagram.com/_xattax/'],
}

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
  for (const page of pages) {
    const url = pageUrl(page.path)
    const body = render(new URL(url).pathname)
    let html = template
      .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(page.description)}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(page.title)}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(page.description)}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    if (!page.path) {
      const json = JSON.stringify(business).replaceAll('<', '\\u003c')
      html = html.replace('</head>', `<script type="application/ld+json">${json}</script></head>`)
    }
    const directory = new URL(`../dist/${page.path ? page.path + '/' : ''}`, import.meta.url)
    await mkdir(directory, { recursive: true })
    await writeFile(new URL('index.html', directory), html)
  }
} finally {
  await vite.close()
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(page => `  <url><loc>${escape(pageUrl(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap)
await writeFile(new URL('../dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`)
await writeFile(new URL('../dist/404.html', import.meta.url), template.replace('</head>', '<meta name="robots" content="noindex"/></head>'))
await writeFile(new URL('../dist/.nojekyll', import.meta.url), '')
console.log(`Created ${pages.length} static page entry points, sitemap.xml and robots.txt.`)
