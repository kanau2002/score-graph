import React from "react";
import { testService } from "@/core/Service/testService";
import TestRead from "@/components/(test)/TestRead";

type Props = {
  searchParams: { subject: string; year: string };
};

export default async function TestReadPage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const [studentData, friendsData, testStructureData] = await Promise.all([
    testService.fetchStudentData(subject, year),
    testService.fetchFriendsData(subject, year),
    testService.fetchTestStructureData(subject, year),
  ]);

  return (
    <TestRead
      studentData={studentData}
      friendsData={friendsData}
      testStructureData={testStructureData}
    />
  );
}
