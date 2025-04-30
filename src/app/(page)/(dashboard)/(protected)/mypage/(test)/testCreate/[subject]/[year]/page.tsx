import TestCreate from "@/components/(test)/TestCreate";
import { testService } from "@/core/Service/testService";

type Props = {
  params: Promise<{ subject: string; year: string }>;
};

export default async function TestCreatePage({ params }: Props) {
  const { subject, year } = await params;
  const testStructureData = await testService.fetchTestStructureData(
    subject,
    Number(year)
  );

  return <TestCreate testStructureData={testStructureData} />;
}
