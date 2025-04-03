//src/app/(pages)/profile/_components/TestResultCard/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  SquareUserRound,
  MessageCircleMore,
  ListFilter,
  ArrowRightToLine,
} from "lucide-react";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import Image from "next/image";
import Link from "next/link";
import {
  CardData,
  ProfileData,
  Subject,
  TestResult,
} from "@/core/profile/type";
import YearSelecter from "../YearSelecter";

interface Props {
  profileInfo: ProfileData;
  cardData: CardData;
}

export const displaySubjectName = (subject: Subject): string => {
  switch (subject) {
    case Subject.READING:
      return "英語";
    case Subject.MATH1A:
      return "数1A";
    case Subject.MATH2B:
      return "数2B";
    case Subject.CHEMISTRY:
      return "化学";
    case Subject.BIOLOGY:
      return "生物";
    default:
      return "不明な科目";
  }
};

export default function TestResultCard({ profileInfo, cardData }: Props) {
  const [showTable, setShowTable] = useState(false);
  const [tableHeight, setTableHeight] = useState<number>(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const profileInfoRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const [profileInfoHeight, setProfileInfoHeight] = useState<number>(0);

  // テーブルの高さを測定
  useEffect(() => {
    if (tableRef.current) {
      const height = tableRef.current.scrollHeight;
      setTableHeight(showTable ? height : 0);
    }
  }, [showTable, cardData.subject]);

  // 説明文の高さを測定
  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.scrollHeight;
      setDescriptionHeight(showFullDescription ? height : 0);
    }
  }, [showFullDescription, cardData.memo]);

  // プロフィール情報の高さを測定
  useEffect(() => {
    if (profileInfoRef.current) {
      const height = profileInfoRef.current.scrollHeight;
      setProfileInfoHeight(showProfileInfo ? height : 0);
    }
  }, [showProfileInfo, profileInfo]);

  // プロフィール情報の短縮表示用
  const shortProfileInfo =
    profileInfo.targetUniversities[1].substring(0, 10) + "...";

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow">
      {/* ヘッダー部分 */}
      <div className="flex items-center p-2 ">
        <div className="w-8 h-8 m-2 relative">
          <Image
            src="/profile/kanau.JPG"
            alt="プロフィール画像"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-xs flex">
          <p className="font-bold">{profileInfo.userName}</p>
          <p>　{displaySubjectName(cardData.subject)}</p>
        </div>
      </div>

      {/* グラフ部分 */}
      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={2}>
          <ComposedChart
            data={cardData.chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: -10 }}
          >
            {/* 目標の得点率（線グラフ） */}
            <Line
              type="monotone"
              dataKey="targetPercentage"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 4, fill: "#6366F1" }}
              activeDot={{ r: 6 }}
              name="目標"
            />

            {/* 結果の得点率（棒グラフ） */}
            <Bar dataKey="percentage" fill="#8884d8" barSize={20} name="結果" />

            <CartesianGrid
              stroke="#ccc"
              strokeDasharray="5 5"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickFormatter={(tick: string) => {
                const month = tick.split("/")[1].replace(/^0/, "");
                return month + "月";
              }}
            />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            {/* 目標スコアのリファレンスライン */}
            <ReferenceLine
              y={cardData.finalScoreTarget}
              stroke="orange"
              strokeDasharray="3 3"
              label={{
                value: `${cardData.finalScoreTarget}点`,
                position: "insideRight",
                fill: "orange",
                fontSize: 12,
                dy: -10,
              }}
            />

            {/* 最低ラインのリファレンスライン */}
            <ReferenceLine
              y={cardData.finalScoreLowest}
              stroke="red"
              strokeDasharray="3 3"
              label={{
                value: `${cardData.finalScoreLowest}点`,
                position: "insideRight",
                fill: "red",
                fontSize: 12,
                dy: 15,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* アクションボタン */}
      <div className="flex items-center px-2">
        <button
          className="p-2"
          onClick={() => setShowProfileInfo(!showProfileInfo)}
          aria-expanded={showProfileInfo}
        >
          <SquareUserRound
            className={`w-6 h-6 transform transition-transform duration-300 ${
              showProfileInfo ? "text-blue-500" : ""
            }`}
          />
        </button>
        <button
          className="p-2"
          onClick={() => setShowFullDescription(!showFullDescription)}
          aria-expanded={showFullDescription}
        >
          <MessageCircleMore
            className={`w-6 h-6 transform transition-transform duration-300 ${
              showFullDescription ? "text-blue-500" : ""
            }`}
          />
        </button>
        <button
          className="p-2 "
          onClick={() => setShowTable(!showTable)}
          aria-expanded={showTable}
        >
          <ListFilter
            className={`w-6 h-6 transform transition-transform duration-300 ${
              showTable ? "text-blue-500" : ""
            }`}
          />
        </button>
        <YearSelecter
          subject={cardData.subject}
          unAnsweredYears={cardData.unAnsweredYears}
        />
      </div>

      {/* プロフィール情報（アニメーション付きトグル表示） */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: profileInfoHeight,
          opacity: profileInfoHeight > 0 ? 1 : 0,
          paddingTop: profileInfoHeight > 0 ? "8px" : "0px",
        }}
      >
        <div ref={profileInfoRef} className="px-4 pb-4">
          <p className="text-sm">
            〜志望校〜
            <br />・{profileInfo.targetUniversities[0]}
            <br />・{profileInfo.targetUniversities[1]}
            <br />・{profileInfo.targetUniversities[2]}
          </p>
          <p className="mt-1 text-sm">{profileInfo.memo}</p>
        </div>
      </div>

      {/* プロフィール情報の短縮表示（閉じているとき） */}
      {!showProfileInfo &&
        showFullDescription === false &&
        showTable === false && (
          <div className="px-4 mt-2">
            <p className="text-sm mb-2">
              〜志望校〜
              <br />・{profileInfo.targetUniversities[0]}
              <br />・{shortProfileInfo}
              <button
                className="text-gray-500 font-medium ml-1"
                onClick={() => setShowProfileInfo(true)}
              >
                続きを読む
              </button>
            </p>
          </div>
        )}

      {/* 説明文（アニメーション付きトグル表示） */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: descriptionHeight,
          opacity: descriptionHeight > 0 ? 1 : 0,
          paddingTop: descriptionHeight > 0 ? "8px" : "0px",
        }}
      >
        <div ref={descriptionRef} className="px-4 pb-2">
          <p className="text-sm">
            ＜{displaySubjectName(cardData.subject)}＞<br />
            {cardData.memo}
          </p>
        </div>
      </div>

      {/* テスト結果テーブル（アニメーション付きトグル表示） */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out mt-4"
        style={{
          maxHeight: tableHeight,
          opacity: tableHeight > 0 ? 1 : 0,
        }}
      >
        <div ref={tableRef}>
          <table className="w-full border-collapse text-sm text-gray-600">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-2 w-12">解いた日</th>
                <th className="p-2 w-12">結果</th>
                <th className="p-2 w-12">年度</th>
                <th className="p-2">メモ</th>
                <th className="p-2 w-12">詳細</th>
              </tr>
            </thead>
            <tbody>
              {cardData.testResults.map((result: TestResult, index: number) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2 text-center">{result.date}</td>
                  <td className="p-2 text-center font-bold">
                    {result.percentage}
                  </td>
                  <td className="p-2 text-center">{result.year}</td>
                  <td className="p-2 text-center truncate max-w-[150px]">
                    {result.memo}
                  </td>
                  <td className="p-2 text-gray-400">
                    <Link
                      href={`/profile/testRead?subject=${cardData.subject}&year=${result.year}`}
                    >
                      <ArrowRightToLine size={16} className="ml-2" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
