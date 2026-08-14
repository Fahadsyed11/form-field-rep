import { FormPage } from "@/components/form/FormPage";

interface RootPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RootPage({ searchParams }: RootPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawId = resolvedSearchParams.id;
  const formId = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "abc123";

  return <FormPage formId={formId} />;
}
