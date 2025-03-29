//src/app/(pages)/profile/english/2018/page.tsx
import React from "react";
import { profileService } from "@/core/profile/profileService";
import TestResultClient from "../../_components/TestResultClient";

type Props = {
  searchParams: { subject: string; year: string };
};

export default async function TestReadPage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const [studentData, friendsData, testData] = await Promise.all([
    profileService.fetchStudentData(subject, year),
    profileService.fetchFriendsData(subject, year),
    profileService.fetchTestStructure(subject, year),
  ]);

  return (
    <TestResultClient
      studentData={studentData}
      friendsData={friendsData}
      testData={testData}
    />
  );
}
