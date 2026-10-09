/** @type {import('next').NextConfig} */
const nextConfig = {
  // The homepage is a self-contained static page (public/loam-home.html).
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/loam-home.html' }],
    }
  },
}

export default nextConfig
