// Importa o tipo de configuração
import type { NextAuthConfig } from 'next-auth';
 
// Exporta a configuração de autorização, que guarda: as páginas protegidas e como se quer acessá-las, os retornos de chamadas e provedores
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Objeto de autorização
    authorized({ auth, request: { nextUrl } }) {
      // Verifica se está logado e traz um booleano
      const isLoggedIn = !!auth?.user;
      // Verifica se está no dashboard
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // Caso esteja no dashboard e logado
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page

      // Caso esteja logado é redirecionado para dashboard
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;