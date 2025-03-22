//src/app/(pages)/profile/english/2018/page.tsx
import React from "react";
import { profileService } from "@/core/profile/profileService";
import TestResultClient from "../_components/TestResultClient";

type Props = {
  params: { subject: string };
  searchParams: { year: string };
};

export default async function DetailDisplayPage({
  params,
  searchParams,
}: Props) {
  const { subject } = params;
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
