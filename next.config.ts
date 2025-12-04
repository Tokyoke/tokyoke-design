/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Esta regra pega /api/auth e garante que ela NÃO seja reescrita (opcional se o Next.js já priorizar o filesystem)
        // Mas o jeito mais fácil é fazer o rewrite do backend IGNORAR o auth
        source: "/api/:path((?!auth).*)", // Regex: pega tudo em /api, MENOS o que tiver 'auth' logo depois
        destination: "http://localhost:5000/:path*",
      },
    ];
  },
};

export default nextConfig;
