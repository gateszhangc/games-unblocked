import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Disable image optimization; serve originals
  images: {
    unoptimized: true,
  },

  // Only allow /dublix.html; /dublix redirects there
  async redirects() {
    return [
      {
        source: '/dublix',
        destination: '/dublix.html',
        permanent: true,
      },
      {
        source: '/papas-scooperia',
        destination: '/papas-scooperia.html',
        permanent: true,
      },
    ];
  },

  // Serve static html from public/static-pages
  async rewrites() {
    return [
      { source: '/media/:path*', destination: '/media/:path*' },
      { source: '/games/:path*', destination: '/games/:path*' },
      { source: '/', destination: '/static-pages/index.html' },
      { source: '/index.html', destination: '/static-pages/index.html' },
      { source: '/dublix.html', destination: '/static-pages/dublix.html' },
      { source: '/:path*.html', destination: '/static-pages/:path*.html' },
    ];
  },
};

export default nextConfig;
