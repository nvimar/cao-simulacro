/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Optimizaciones para producción
  experimental: {
    optimizeCss: true,
  },
  // Configuración para mejor SEO
  generateEtags: false,
  poweredByHeader: false,
}

export default nextConfig
