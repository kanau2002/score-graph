import React from "react";
import { profileService } from "@/core/profile/profileService";
import TestRead from "../../_components/TestRead";

type Props = {
  searchParams: { subject: string; year: string };
};

export default async function TestReadPage({ searchParams }: Props) {
  const subject = searchParams.subject;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const [studentData, friendsData, testStructureData] = await Promise.all([
    profileService.fetchStudentData(subject, year),
    profileService.fetchFriendsData(subject, year),
    profileService.fetchTestStructureData(subject, year),
  ]);

  return (
    <TestRead
      studentData={studentData}
      friendsData={friendsData}
      testStructureData={testStructureData}
    />
  );
}
