/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    isLocaleDomain: true,
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig
