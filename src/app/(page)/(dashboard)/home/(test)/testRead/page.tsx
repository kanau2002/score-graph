import React from "react";
import { testService } from "@/core/Service/testService";
import TestRead from "@/components/(test)/TestRead";

type Props = {
  searchParams: { subject: string; year: string; uid: string };
};

export default async function TestReadHomePage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  const uid = Number(searchParams.uid);

  const [seniorData, studentData, testStructureData] = await Promise.all([
    testService.fetchTestResultSenior(subject, year, uid),
    testService.fetchTestResultStudentAtHome(subject, year),
    testService.fetchTestStructureData(subject, year),
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
