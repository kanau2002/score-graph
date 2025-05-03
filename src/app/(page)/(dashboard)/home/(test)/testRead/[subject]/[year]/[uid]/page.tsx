import React from "react";
import { testService } from "@/core/Service/testService";
import TestRead from "@/components/(test)/TestRead";
import { Subject } from "@/type/testType";

type Props = {
  params: Promise<{ subject: Subject; year: string; uid: string }>;
};

export default async function TestReadHomePage({ params }: Props) {
  const { subject, year, uid } = await params;

  const [seniorData, studentData, testStructureData] = await Promise.all([
    testService.fetchTestResultSenior(subject, Number(year), Number(uid)),
    testService.fetchTestResultStudentAtHome(subject, Number(year)),
    testService.fetchTestStructureData(subject, Number(year)),
  ]);

  return (
    <TestRead
      leftData={seniorData}
      rightDatas={studentData}
      testStructureData={testStructureData}
      isHome={true}
    />
  );
}
