//app/(pages)/profile/(test)/testCreate/page.tsx
import { profileService } from "@/core/profile/profileService";
import TestCreateClient from "../../_components/TestCreateClient";

type Props = {
  searchParams: { subject: string; year: string };
};

export default async function testCreatePage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const testStructureData = await profileService.fetchTestStructureData(subject, year);

  return <TestCreateClient testStructureData={testStructureData} />;
}
