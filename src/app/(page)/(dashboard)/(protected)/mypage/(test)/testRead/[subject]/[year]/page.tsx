import React from "react";
import { testService } from "@/core/Service/testService";
import TestRead from "@/components/(test)/TestRead";
import { Subject } from "@/type/testType";

type Props = {
  params: Promise<{ subject: Subject; year: number }>;
};

export default async function TestReadMyPage({ params }: Props) {
  const { subject, year } = await params;

  const [studentData, friendsData, testStructureData] = await Promise.all([
    testService.fetchTestResultStudentAtMy(subject, Number(year)),
    testService.fetchFriendsData(subject, Number(year)),
    testService.fetchTestStructureData(subject, Number(year)),
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
