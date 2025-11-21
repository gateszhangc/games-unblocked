import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Disable image optimization; serve originals
  images: {
    unoptimized: true,
  },

  // Serve static html from public/static-pages
  async rewrites() {
    return [
      // Media and games assets
      { source: '/media/:path*', destination: '/media/:path*' },
      { source: '/games/:path*', destination: '/games/:path*' },
      { source: '/assets/:path*', destination: '/assets/:path*' },
      
      // Main pages
      { source: '/', destination: '/static-pages/index.html' },
      { source: '/index.html', destination: '/static-pages/index.html' },
      
      // Category pages with trailing slash
      { source: '/2-player/', destination: '/static-pages/2-player/index.html' },
      { source: '/2d/', destination: '/static-pages/2d/index.html' },
      { source: '/3d/', destination: '/static-pages/3d/index.html' },
      { source: '/action/', destination: '/static-pages/action/index.html' },
      { source: '/adventure/', destination: '/static-pages/adventure/index.html' },
      { source: '/arcade/', destination: '/static-pages/arcade/index.html' },
      { source: '/car/', destination: '/static-pages/car/index.html' },
      { source: '/clicker/', destination: '/static-pages/clicker/index.html' },
      { source: '/crazy/', destination: '/static-pages/crazy/index.html' },
      { source: '/drift/', destination: '/static-pages/drift/index.html' },
      { source: '/driving/', destination: '/static-pages/driving/index.html' },
      { source: '/girl/', destination: '/static-pages/girl/index.html' },
      { source: '/io-games/', destination: '/static-pages/io-games/index.html' },
      { source: '/kids/', destination: '/static-pages/kids/index.html' },
      { source: '/minecraft/', destination: '/static-pages/minecraft/index.html' },
      { source: '/mobile/', destination: '/static-pages/mobile/index.html' },
      { source: '/multiplayer/', destination: '/static-pages/multiplayer/index.html' },
      { source: '/pixel/', destination: '/static-pages/pixel/index.html' },
      { source: '/puzzle/', destination: '/static-pages/puzzle/index.html' },
      { source: '/racing/', destination: '/static-pages/racing/index.html' },
      { source: '/shooting/', destination: '/static-pages/shooting/index.html' },
      { source: '/simulator/', destination: '/static-pages/simulator/index.html' },
      { source: '/sniper/', destination: '/static-pages/sniper/index.html' },
      { source: '/sports/', destination: '/static-pages/sports/index.html' },
      { source: '/strategy/', destination: '/static-pages/strategy/index.html' },
      { source: '/premium/', destination: '/static-pages/premium/index.html' },
      { source: '/unblocked/', destination: '/static-pages/unblocked/index.html' },
      { source: '/unity/', destination: '/static-pages/unity/index.html' },
      
      // Category pages with index.html
      { source: '/2-player/index.html', destination: '/static-pages/2-player/index.html' },
      { source: '/2d/index.html', destination: '/static-pages/2d/index.html' },
      { source: '/3d/index.html', destination: '/static-pages/3d/index.html' },
      { source: '/action/index.html', destination: '/static-pages/action/index.html' },
      { source: '/adventure/index.html', destination: '/static-pages/adventure/index.html' },
      { source: '/arcade/index.html', destination: '/static-pages/arcade/index.html' },
      { source: '/car/index.html', destination: '/static-pages/car/index.html' },
      { source: '/clicker/index.html', destination: '/static-pages/clicker/index.html' },
      { source: '/crazy/index.html', destination: '/static-pages/crazy/index.html' },
      { source: '/drift/index.html', destination: '/static-pages/drift/index.html' },
      { source: '/driving/index.html', destination: '/static-pages/driving/index.html' },
      { source: '/girl/index.html', destination: '/static-pages/girl/index.html' },
      { source: '/io-games/index.html', destination: '/static-pages/io-games/index.html' },
      { source: '/kids/index.html', destination: '/static-pages/kids/index.html' },
      { source: '/minecraft/index.html', destination: '/static-pages/minecraft/index.html' },
      { source: '/mobile/index.html', destination: '/static-pages/mobile/index.html' },
      { source: '/multiplayer/index.html', destination: '/static-pages/multiplayer/index.html' },
      { source: '/pixel/index.html', destination: '/static-pages/pixel/index.html' },
      { source: '/puzzle/index.html', destination: '/static-pages/puzzle/index.html' },
      { source: '/racing/index.html', destination: '/static-pages/racing/index.html' },
      { source: '/shooting/index.html', destination: '/static-pages/shooting/index.html' },
      { source: '/simulator/index.html', destination: '/static-pages/simulator/index.html' },
      { source: '/sniper/index.html', destination: '/static-pages/sniper/index.html' },
      { source: '/sports/index.html', destination: '/static-pages/sports/index.html' },
      { source: '/strategy/index.html', destination: '/static-pages/strategy/index.html' },
      { source: '/premium/index.html', destination: '/static-pages/premium/index.html' },
      { source: '/unblocked/index.html', destination: '/static-pages/unblocked/index.html' },
      { source: '/unity/index.html', destination: '/static-pages/unity/index.html' },
      
      // All other HTML files (game pages, etc.)
      { source: '/:path*.html', destination: '/static-pages/:path*.html' },
    ];
  },
};

export default nextConfig;
