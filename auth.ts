import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from './app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

// Busca usuário pelo e-mail via consulta SQL
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    // Retorna o primeiro usuário (linha) obtida
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
// Exporta funções de autorização, entrada e saída da lib NextAuth (versão beta)
export const { auth, signIn, signOut } = NextAuth({
  // Arquivo que declara as principais características da camada de autenticação, passando os provedores com a ideia de credenciais para autorização
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          // Estrutura do objeto de credenciais para popular e configurar
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        // Credenciais aceitas
        if (parsedCredentials.success) {
          // Desestruturas as credenciais convertidas
          const { email, password } = parsedCredentials.data;
          // Pegando usuário do BD via e-mail informado
          const user = await getUser(email);
          // Verifica se o usuário existe
          if (!user) return null;
          // Verifica se ambas as senhas são iguais
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // Caso elas coincidam retornará o usuário
          if (passwordsMatch) return user;
        }
 
        // Credenciais recusadas
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});