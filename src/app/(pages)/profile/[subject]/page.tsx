//src/app/(pages)/profile/english/2018/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

export default async function English2018Page({ params, searchParams }: Props) {
  const { subject } = params;
  const year = Number(searchParams.year);
  // サーバーコンポーネントでデータを取得
  const [studentData, friendsData, testStructure] = await Promise.all([
    profileService.fetchStudentData(subject, year),
    profileService.fetchFriendsData(subject, year),
    profileService.fetchTestStructure(subject, year),
  ]);

  return (
    <div className="container mx-auto max-w-xl bg-gray-50 shadow rouded-lg">
      {/* ヘッダー部分 */}
      <div className="flex items-center p-4 border-b border-gray-400">
        <Link href="/profile" className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="flex-1 font-bold text-lg">英語-2018年度</h1>
        <div className="flex items-baseline">
          <p className="text-sm text-gray-500">
            （目標：{studentData.targetPercentage}%）
          </p>
          <span className="text-3xl font-bold text-blue-600">
            {studentData.percentage}%
          </span>
        </div>
      </div>

      {/* クライアントコンポーネントで状態管理と表示を行う */}
      <TestResultClient
        studentData={studentData}
        friendsData={friendsData}
        testStructure={testStructure}
      />
    </div>
  );
}
