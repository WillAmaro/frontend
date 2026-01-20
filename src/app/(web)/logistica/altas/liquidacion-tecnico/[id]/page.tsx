import FormularioLiquidacion from "@/src/components/app/logistic/liquidacion/ForumularioLiquidacion";
interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <FormularioLiquidacion sot={id} />;
}
