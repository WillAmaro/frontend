import MisLiquidaciones from "@/src/components/app/logistic/liquidacion/VistLiquidaciones";
interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
    return <MisLiquidaciones />
}