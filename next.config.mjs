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
};

export default nextConfig;
