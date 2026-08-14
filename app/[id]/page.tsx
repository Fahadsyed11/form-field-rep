import { FormPage } from "@/components/form/FormPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DynamicEventPage({ params }: PageProps) {
  const { id } = await params;
  return <FormPage formId={id} />;
}
