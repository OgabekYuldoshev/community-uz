import PageHeader from "@/components/page-header";
import { getBoardByIdAction } from "@/features/boards/actions";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [data, error] = await getBoardByIdAction({ id });

  if (error) throw error;

  console.log(data);

  return (
    <>
      <PageHeader breadcrumbs={[{ label: "Boards", url: "/boards" }]} />
    </>
  );
}
