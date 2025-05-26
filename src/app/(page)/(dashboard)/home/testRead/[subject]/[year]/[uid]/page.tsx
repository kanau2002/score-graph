import React from "react";
import { testService } from "@/core/Service/testService";
import TestRead from "@/components/(test)/TestRead";
import { Subject } from "@/type/testType";

type Props = {
  params: Promise<{ uid: string; subject: Subject; year: string }>;
};

export default async function TestReadHomePage({ params }: Props) {
  const { uid, subject, year } = await params;

  // 先輩の回答データを取得 (返り値：返り値：AnsweredData[]型)
  // 自分の回答データを取得 (返り値：回答データがある場合はAnsweredData[]、無い場合は[]型)
  // 問題番号や配点などのテスト構造データを取得 (返り値：TestData型)
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
