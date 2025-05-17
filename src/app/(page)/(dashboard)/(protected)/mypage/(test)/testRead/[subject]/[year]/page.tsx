import React from "react";
import { testService } from "@/core/Service/testService";
import TestRead from "@/components/(test)/TestRead";
import { Subject } from "@/type/testType";

type Props = {
  params: Promise<{ subject: Subject; year: number }>;
};

export default async function TestReadMyPage({ params }: Props) {
  const { subject, year } = await params;

  // 問題番号や配点などのテスト構造データを取得 (返り値：TestData型)
  // 自分の回答データを取得 (返り値：返り値：AnsweredData[]型)
  // フレンドの回答データを取得 （返り値：回答データがある場合はAnsweredData[]、無い場合は[]型)
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
