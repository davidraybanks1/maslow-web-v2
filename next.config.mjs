/** @type {import('next').NextConfig} */
const nextConfig = {
  // The homepage is a self-contained static page (public/loam-home.html).
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/loam-home.html' }],
    }
  },
  // Memos used to live at /blog.
  async redirects() {
    return [
      { source: '/blog', destination: '/memos', permanent: true },
      { source: '/blog/:slug', destination: '/memos/:slug', permanent: true },
    ]
  },
}

export default nextConfig
