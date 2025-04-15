import { testService } from "@/core/Service/testService";
import TestCreate from "./_components/testCreate";

type Props = {
  searchParams: { subject: string; year: string };
};

export default async function testCreatePage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const testStructureData = await testService.fetchTestStructureData(
    subject,
    year
  );

  return <TestCreate testStructureData={testStructureData} />;
}
