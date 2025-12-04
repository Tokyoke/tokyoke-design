/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Esta regra pega qualquer requisição que comece com /api
        // (exceto se tiver 'auth', para não quebrar o NextAuth se ele usar essa rota)
        source: "/api/:path((?!auth).*)",

        // AQUI ESTÁ A CORREÇÃO:
        // O Next.js vai receber o pedido em HTTPS e repassar para o seu backend em HTTP.
        // O navegador nem fica sabendo, então o erro de Mixed Content some.
        destination: "http://192.241.156.113:5000/:path*",
      },
    ];
  },
};

export default nextConfig;
