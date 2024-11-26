/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'egpeqgon9nqy0dab.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // dynamicIO: true,
    // cacheLife: {},
    inlineCss: true,
    ppr: true,
    reactCompiler: true,
    typedRoutes: true,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
  },
}

export default nextConfig;
