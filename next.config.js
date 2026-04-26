/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ye line Render Static Site ke liye zaroori hai
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
