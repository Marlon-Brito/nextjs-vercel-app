// export default function Loading() {
//   return <div>Loading...</div>;
// }

// Sombra que mostra os elementos da página sem dados
// E isolar esse carregamento apenas para esta página
import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}