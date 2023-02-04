/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['kreatecube.com', 'i.ytimg.com', 'bayut-production.s3.eu-central-1.amazonaws.com']
  }
}

module.exports = nextConfig
