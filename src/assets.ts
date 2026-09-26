/** Keep public assets valid at the GitHub Pages project subpath and locally. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
