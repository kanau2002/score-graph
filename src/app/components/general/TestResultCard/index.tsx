// app/components/general/TestResultCard/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
  SquareUserRound,
  MessageCircleMore,
  ListFilter,
  BookmarkIcon,
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

// 型定義
interface TestResult {
  date: string;
  year: string;
  teacherScore: number;
  studentScore: number;
}

interface TestResultCardProps {
  userName: string;
  testResults: TestResult[];
  subject: string;
  referenceScoreTarget?: number;
  referenceScoreLowest?: number;
  description?: string;
  profileInfo: { targetUniversity: string[]; comment: string };
}

export default function TestResultCard({
  userName,
  subject,
  testResults,
  referenceScoreTarget = 80,
  referenceScoreLowest = 70,
  description = "",
  profileInfo,
}: TestResultCardProps) {
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
  }, [showTable, testResults]);

  // 説明文の高さを測定
  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.scrollHeight;
      setDescriptionHeight(showFullDescription ? height : 0);
    }
  }, [showFullDescription, description]);

  // プロフィール情報の高さを測定
  useEffect(() => {
    if (profileInfoRef.current) {
      const height = profileInfoRef.current.scrollHeight;
      setProfileInfoHeight(showProfileInfo ? height : 0);
    }
  }, [showProfileInfo, profileInfo]);

  // グラフデータの作成
  const chartData = testResults
    .map((result: TestResult) => {
      const date = new Date(result.date);
      const month = date.getMonth() + 1; // JavaScriptの月は0から始まるため+1
      const year = date.getFullYear();

      return {
        month: `${year}/${month.toString().padStart(2, "0")}`,
        teacherScore: result.teacherScore,
        studentScore: result.studentScore,
      };
    })
    .reverse(); // 古い順に並べ替え

  // プロフィール情報の短縮表示用
  const shortProfileInfo =
    profileInfo.targetUniversity[1].substring(0, 10) + "...";

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow">
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
        <div className="text-xs font-bold">{userName}</div>
      </div>

      {/* グラフ部分 */}
      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={2}>
          <ComposedChart
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: -10 }}
          >
            {/* 講師の点数（線グラフ） */}
            <Line
              type="monotone"
              dataKey="teacherScore"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 4, fill: "#6366F1" }}
              activeDot={{ r: 6 }}
              name="講師評価"
            />

            {/* 生徒の点数（棒グラフ） */}
            <Bar
              dataKey="studentScore"
              fill="#8884d8"
              barSize={20}
              name="自己評価"
            />

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

            <YAxis
              domain={[0, 100]}
              label={{ value: "%", position: "insideLeft", angle: -90, dy: 10 }}
            />

            <Tooltip />

            {/* 目標スコアのリファレンスライン */}
            <ReferenceLine
              y={referenceScoreTarget}
              stroke="orange"
              strokeDasharray="3 3"
              label={{
                value: `${referenceScoreTarget}点`,
                position: "insideRight",
                fill: "orange",
                fontSize: 12,
                dy: -10,
              }}
            />

            {/* 最低ラインのリファレンスライン */}
            <ReferenceLine
              y={referenceScoreLowest}
              stroke="red"
              strokeDasharray="3 3"
              label={{
                value: `${referenceScoreLowest}点`,
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
          className="p-2 text-gray-500"
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
          className="p-2 text-gray-500"
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
          className="p-2 text-gray-500"
          onClick={() => setShowTable(!showTable)}
          aria-expanded={showTable}
        >
          <ListFilter
            className={`w-6 h-6 transform transition-transform duration-300 ${
              showTable ? "text-blue-500" : ""
            }`}
          />
        </button>
        <button className="p-2 ml-auto text-gray-500">
          <BookmarkIcon className="w-6 h-6" />
        </button>
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
            <br />・{profileInfo.targetUniversity[0]}
            <br />・{profileInfo.targetUniversity[1]}
            <br />・{profileInfo.targetUniversity[2]}
          </p>
          <p className="mt-1 text-sm">{profileInfo.comment}</p>
        </div>
      </div>

      {/* プロフィール情報の短縮表示（閉じているとき） */}
      {!showProfileInfo &&
        showFullDescription === false &&
        showTable === false && (
          <div className="px-4 mt-2">
            <p className="text-sm mb-2">
              〜志望校〜
              <br />・{profileInfo.targetUniversity[0]}
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
            ＜{subject}＞<br />
            {description}
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
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="px-4 py-3 text-left">
                  解いた日 <span className="inline-block ml-1">↓</span>
                </th>
                <th className="px-4 py-3 text-left">年度</th>
                <th className="px-4 py-3 text-left">点数</th>
                <th className="w-10 px-4 py-3 text-center">✕</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((result: TestResult, index: number) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">{result.date}</td>
                  <td className="px-4 py-3">{result.year}</td>
                  <td className="px-4 py-3">{result.teacherScore}</td>
                  <td className="px-4 py-3 text-center text-gray-400">✕</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
