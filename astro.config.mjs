import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://izzycode-two.vercel.app",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // The archived v1 design and the printable résumé are both noindex.
      filter: (page) => !/\/(v1|resume)\/?$/.test(page),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-US",
          ru: "ru-RU",
          uz: "uz-UZ",
        },
      },
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
});
