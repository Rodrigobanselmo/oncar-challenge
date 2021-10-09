/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
      "placeimg.com",
      "i.pinimg.com",
      "tonyveiculos.s3.sa-east-1.amazonaws.com",
    ],
  },
});
