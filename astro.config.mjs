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
