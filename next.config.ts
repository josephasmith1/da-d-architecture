import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Exact page redirects with .html extension
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/faq.html',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/projects.html',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/people.html',
        destination: '/people',
        permanent: true,
      },
      {
        source: '/fire-mitigation.html',
        destination: '/fire-mitigation',
        permanent: true,
      },
      // Redirect all old project URLs to the new projects page
      // This will catch any /projects/*.html URLs
      {
        source: '/projects/:path*.html',
        destination: '/projects',
        permanent: true,
      },
      // Also redirect non-.html project paths that don't exist
      {
        source: '/projects/ivarene',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/projects/ivarene.html',
        destination: '/projects',
        permanent: true,
      },
      // Common old project URLs that might have been bookmarked
      {
        source: '/portfolio/:path*',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/work/:path*',
        destination: '/projects',
        permanent: true,
      },
      // Redirect index.html to home
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Redirect home.html to home
      {
        source: '/home.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
