import {defineConfig} from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.na-kavicku.cz',
  integrations: [
    tailwind({applyBaseStyles: false}),
    sitemap(),
  ],
  prefetch: true,
  trailingSlash: 'always',
})

