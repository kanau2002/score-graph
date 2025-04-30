import TestCreate from "@/components/(test)/TestCreate";
import { testService } from "@/core/Service/testService";

type Props = {
  searchParams: Promise<{ subject: string; year: string }>;
};

export default async function TestCreatePage({ searchParams }: Props) {
  const { subject, year } = await searchParams;
  const testStructureData = await testService.fetchTestStructureData(
    subject,
    Number(year)
  );

  return <TestCreate testStructureData={testStructureData} />;
}
