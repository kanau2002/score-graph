import React from "react";
import { testService } from "@/core/Service/testService";
import TestRead from "@/components/(test)/TestRead";

type Props = {
  searchParams: { subject: string; year: string };
};

export default async function TestReadMyPage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const [studentData, friendsData, testStructureData] = await Promise.all([
    testService.fetchTestResultStudentAtMy(subject, year),
    testService.fetchFriendsData(subject, year),
    testService.fetchTestStructureData(subject, year),
  ]);

  return (
    <TestRead
      leftData={studentData}
      rightDatas={friendsData}
      testStructureData={testStructureData}
      isHome={false}
    />
  );
}
