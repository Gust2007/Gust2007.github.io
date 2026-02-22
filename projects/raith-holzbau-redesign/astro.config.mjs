import { defineConfig } from 'astro/config';

// Base path matches the subfolder served by GitHub Pages.
// For local dev: http://localhost:4321/projects/raith-holzbau-redesign/
export default defineConfig({
  site: 'https://gust2007.github.io',
  base: '/projects/raith-holzbau-redesign',
  trailingSlash: 'never',
  build: {
    // Output ueber-uns.astro → dist/ueber-uns.html (not dist/ueber-uns/index.html)
    // preserving the existing .html URL structure.
    format: 'file',
  },
});
