import TestCreate from "@/components/(test)/TestCreate";
import { testService } from "@/core/Service/testService";

type Props = {
  searchParams: { subject: string; year: string };
};

export default async function TestCreatePage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const testStructureData = await testService.fetchTestStructureData(
    subject,
    year
  );

  return <TestCreate testStructureData={testStructureData} />;
}
