//src/app/(pages)/profile/english/2018/page.tsx
import React from "react";
import { profileService } from "@/app/services/profileService";
import TestResultClient from "../_components/TestResultClient";

// 型定義
export interface TestScore {
  questionNumber: number;
  score: number | null;
  correctAnswer: number;
}

export interface TestSection {
  section: number;
  questions: TestScore[];
  sectionTotal: {
    score: number;
  };
}

export interface TestData {
  subjectName: string,
  year: number;
  maxScore: number;
  testStructure: TestSection[];
}

export interface SectionPercentages {
  [sectionIndex: number]: number;
}

export interface StudentData {
  name: string;
  score: number;
  percentage: number;
  targetPercentage?: number;
  date: string;
  memo?: string;
  sectionTotals: {
    [sectionIndex: number]: number;
  };
  sectionPercentages: {
    [sectionIndex: number]: number;
  };
  targetSectionTotals?: {
    [sectionIndex: number]: number;
  };
  targetSectionPercentages?: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: number;
  };
}

export interface Friend {
  id: number;
  name: string;
  score: number;
  percentage: number;
  targetPercentage?: number;
  date: string;
  memo?: string;
  sectionTotals: {
    [sectionIndex: number]: number;
  };
  sectionPercentages: {
    [sectionIndex: number]: number;
  };
  targetSectionTotals?: {
    [sectionIndex: number]: number;
  };
  targetSectionPercentages?: {
    [sectionIndex: number]: number;
  };
  answers: {
    [questionNumber: number]: number;
  };
}

type Props = {
  params: { subject: string };
  searchParams: { year: string };
};

export default async function EnglishPage({ params, searchParams }: Props) {
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
