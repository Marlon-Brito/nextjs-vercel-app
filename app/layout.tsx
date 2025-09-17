// Introduzindo o Tailwind para afetar o projeto de forma global, agora já respeitando os estilos aplicados
// O "@" se refere a raiz do projeto
import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
