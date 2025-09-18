// Ação construída para rodar no servidor
'use server';
 
// Importando "entrada"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// Exportando a funcionalidade de "autenticar" para trabalhar com StateAction (adicionado no React 19)
export async function authenticate(
  // Recebe o estado anterior e os dados do formulário
  prevState: string | undefined,
  formData: FormData,
) {
  // Validação da autenticação
  try {
    // A entrada (login) será pelas credenciais do formulário
    await signIn('credentials', formData);
  // Tratando os tipos de erro
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    // Também se relança a exceção para propagá-la, não travando e nem impedindo o redirecionamento
    throw error;
  }
}