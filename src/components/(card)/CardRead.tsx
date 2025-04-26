"use client";

import { useState, useRef, useEffect } from "react";
import {
  SquareUserRound,
  MessageSquareText,
  ListFilter,
  ArrowRightToLine,
  CircleUserRound,
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
import { TestResult } from "@/type/testType";
import { displaySubjectName } from "@/lib/display";
import YearSelecter from "./YearSelecter";
import { ROUTES } from "@/constants";
import { CardAllData } from "@/type/cardType";
import SettingModal from "./SettingModal";

interface Props {
  cardAllData: CardAllData;
  isHome: boolean;
}

export default function CardRead({ cardAllData, isHome }: Props) {
  const [showTable, setShowTable] = useState(true);
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
  }, [showTable, cardAllData.subject]);

  // 説明文の高さを測定
  useEffect(() => {
    if (descriptionRef.current) {
      const height = descriptionRef.current.scrollHeight;
      setDescriptionHeight(showFullDescription ? height : 0);
    }
  }, [showFullDescription, cardAllData.memo]);

  // プロフィール情報の高さを測定
  useEffect(() => {
    if (profileInfoRef.current) {
      const height = profileInfoRef.current.scrollHeight;
      setProfileInfoHeight(showProfileInfo ? height : 0);
    }
  }, [showProfileInfo, cardAllData.profileData]);

  return (
    <div className="w-full rounded-lg shadow bg-white pb-4">
      {/* ヘッダー部分 */}
      <div className="flex items-center p-2 ">
        <div className="w-8 h-8 m-2 relative">
          {cardAllData.profileData.thumbnailUrl ? (
            <Image
              src="/profile/kanau.JPG"
              alt="プロフィール画像"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <CircleUserRound className="w-full h-full" />
          )}
        </div>
        <div className="text-xs flex">
          <p className="font-bold">{cardAllData.profileData.userName}</p>
          <p>　{displaySubjectName(cardAllData.subject)}</p>
        </div>
        <div className={`ml-auto mr-2 ${isHome ? "hidden" : ""}`}>
          <SettingModal subject={cardAllData.subject} />
        </div>
      </div>

      {/* グラフ部分 */}
      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={2}>
          <ComposedChart
            data={cardAllData.chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: -10 }}
          >
            {/* 目標の得点率（線グラフ） */}
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
              y={cardAllData.finalScoreTarget}
              stroke="orange"
              strokeDasharray="3 3"
              label={{
                value: `${cardAllData.finalScoreTarget}点`,
                position: "insideRight",
                fill: "orange",
                fontSize: 12,
                dy: -10,
              }}
            />

            {/* 最低ラインのリファレンスライン */}
            <ReferenceLine
              y={cardAllData.finalScoreLowest}
              stroke="red"
              strokeDasharray="3 3"
              label={{
                value: `${cardAllData.finalScoreLowest}点`,
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
          <MessageSquareText
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
        <div className={`ml-auto ${isHome ? "hidden" : ""}`}>
          <YearSelecter
            subject={cardAllData.subject}
            unAnsweredYears={cardAllData.unAnsweredYears}
          />
        </div>
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
            〜{isHome ? "合格大学" : "志望校"}〜
            {cardAllData.profileData.targetUniversities.map((univ, index) => (
              <div key={index}>・{univ}</div>
            ))}
          </p>
          <p className="mt-1 text-sm">{cardAllData.profileData.memo}</p>
        </div>
      </div>

      {/* プロフィール情報の短縮表示（閉じているとき） */}
      {isHome === true && !showProfileInfo && (
        <div className="px-4 mt-2">
          <p className="text-sm mb-2">
            〜{isHome ? "合格大学" : "志望校"}〜
            <br />・{cardAllData.profileData.targetUniversities[0]}
            <br />・
            {cardAllData.profileData.targetUniversities[1] &&
              cardAllData.profileData.targetUniversities[1].substring(0, 10) +
                "..."}
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
          <p className="text-sm">{cardAllData.memo}</p>
        </div>
      </div>
      {isHome === false && !showFullDescription && cardAllData.memo && (
        <div className="px-4 mt-2 text-sm">
          <p className="truncate">
            {cardAllData.memo.substring(0, 20) + "..."}
            <button
              className="text-gray-500 font-medium ml-1"
              onClick={() => setShowFullDescription(true)}
            >
              続きを読む
            </button>
          </p>
        </div>
      )}

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
                <th className="p-2 w-18">解いた日</th>
                <th className="p-2 w-12">結果</th>
                <th className="p-2 w-12">年度</th>
                <th className="p-2">メモ</th>
                <th className="p-2 w-12">詳細</th>
              </tr>
            </thead>
            <tbody>
              {cardAllData.testResults.map(
                (result: TestResult, index: number) => (
                  <tr
                    key={index}
                    className={`${
                      index < cardAllData.testResults.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
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
                        href={`${ROUTES.TEST_READ}?subject=${cardAllData.subject}&year=${result.year}`}
                      >
                        <ArrowRightToLine size={16} className="ml-2" />
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
