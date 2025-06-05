"use client";

import { useState, useRef, useEffect } from "react";
import { SquareUserRound, CircleUserRound, ChevronRight } from "lucide-react";
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
import { TestResult } from "@/type/testType";
import { displaySubjectName } from "@/lib/display";
import YearSelecter from "./YearSelecter";
import { ROUTES } from "@/constants";
import { CardAllData } from "@/type/cardType";
import SettingModal from "./SettingModal";
import { useRouter } from "next/navigation";

type Props = {
  cardAllData: CardAllData;
  where: "home" | "my" | "personal";
};

export default function CardRead({ cardAllData, where }: Props) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const profileInfoRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const [profileInfoHeight, setProfileInfoHeight] = useState<number>(0);
  const router = useRouter();

  let isCanEdit, isFull, isTarget;
  switch (where) {
    case "home":
      isCanEdit = false;
      isFull = false;
      isTarget = false;
      break;
    case "personal":
      isCanEdit = false;
      isFull = true;
      isTarget = false;
      break;
    case "my":
      isCanEdit = true;
      isFull = true;
      isTarget = true;
      break;
  }

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
    <div className="w-full rounded-lg shadow-sm bg-white pb-4 text-gray-700">
      {/* ヘッダー部分 */}
      <div
        className="flex items-center p-2"
        onClick={
          !isFull
            ? () =>
                router.push(
                  `${ROUTES.PERSONAL}/${cardAllData.profileData.userId}`
                )
            : undefined
        }
      >
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
        <div className="text-xs flex font-bold">
          <p className="mr-2">{cardAllData.profileData.userName}</p>
          <p> {displaySubjectName(cardAllData.subject)}</p>
        </div>
        {isCanEdit && (
          <div className="ml-auto mr-2">
            <SettingModal subject={cardAllData.subject} />
          </div>
        )}
      </div>

      {/* グラフ部分 */}
      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={2}>
          <ComposedChart
            data={cardAllData.chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: -10 }}
          >
            {/* 目標の得点率（線グラフ） - ホーム画面では非表示 */}
            {isTarget && (
              <Line
                type="monotone"
                dataKey="targetPercentage"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4, fill: "#8884d8" }}
                activeDot={{ r: 6 }}
                name="目標"
              />
            )}

            {/* 結果の得点率（棒グラフ） */}
            <Bar
              dataKey="percentage"
              fill="#8884d8"
              fillOpacity={0.8}
              barSize={20}
              name="結果"
              radius={[2, 2, 0, 0]}
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

            <YAxis domain={[0, 100]} />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  // 目標と結果のデータを取得
                  const targetData = payload.find(
                    (p) => p.dataKey === "targetPercentage"
                  );
                  const resultData = payload.find(
                    (p) => p.dataKey === "percentage"
                  );

                  return (
                    <div className="custom-tooltip bg-white border border-gray-200 px-2 py-3 rounded-lg shadow-lg">
                      {isTarget && (
                        <div
                          className="flex gap-1 items-center"
                          style={{ color: "#888888" }}
                        >
                          <span>{targetData?.name || "目標"}</span>:
                          <span className="font-bold text-lg">
                            {targetData?.value}
                          </span>
                        </div>
                      )}

                      <div
                        className="flex gap-1 items-center"
                        style={{ color: "#8884d8" }}
                      >
                        <span>{resultData?.name || "結果"}</span>:
                        <span className="font-bold text-lg">
                          {resultData?.value}
                        </span>
                      </div>

                      <div className="text-gray-400 text-xs text-right">
                        {payload[0].payload.month}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

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
        {isCanEdit && (
          <div className="ml-auto">
            <YearSelecter
              subject={cardAllData.subject}
              unAnsweredYears={cardAllData.unAnsweredYears}
            />
          </div>
        )}
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
          <div className="text-sm">
            〜受験校〜
            {cardAllData.profileData.targetUniversities.map((univ, index) => (
              <div key={index}>・{univ}</div>
            ))}
          </div>
          <p className="mt-1 text-sm">{cardAllData.profileData.memo}</p>
        </div>
      </div>

      {/* プロフィール情報の短縮表示（閉じているとき） */}
      {isFull === false && !showProfileInfo && (
        <div className="px-4 mt-2 text-gray-500">
          <p className="text-sm mb-2">
            〜受験校〜
            <br />・{cardAllData.profileData.targetUniversities[0]}
            <br />・
            {cardAllData.profileData.targetUniversities[1] &&
              cardAllData.profileData.targetUniversities[1].substring(0, 10) +
                "..."}
            <button
              className="text-gray-400 ml-1"
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
      {isFull === true && !showFullDescription && cardAllData.memo && (
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

      {!isFull && (
        <button
          onClick={() =>
            router.push(`${ROUTES.PERSONAL}/${cardAllData.profileData.userId}`)
          }
          aria-expanded={showProfileInfo}
          className="flex ml-auto mr-2"
        >
          <SquareUserRound className="w-5 h-5 text-gray-500" />
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      )}

      {/* テスト結果テーブル（アニメーション付きトグル表示） */}
      {isFull && (
        <div className="mt-4">
          <table className="w-full border-collapse text-sm text-gray-500">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-2 w-18">解いた日</th>
                <th className="p-2 w-12">結果</th>
                <th className="p-2 w-12">年度</th>
                <th className="p-2">メモ</th>
                <th className="pl-1 pr-3 w-12">詳細</th>
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
                    onClick={() => {
                      const url = isCanEdit
                        ? `${ROUTES.MYPAGE_TESTREAD}/${cardAllData.subject}/${result.year}`
                        : `${cardAllData.profileData.userId}/testRead/${cardAllData.subject}/${result.year}`;
                      router.push(url);
                    }}
                  >
                    <td className="px-2 py-3 text-center">{result.date}</td>
                    <td className="px-2 py-3 text-center font-bold">
                      {result.percentage}
                    </td>
                    <td className="px-2 py-3 text-center">{result.year}</td>
                    <td className="px-2 py-3 text-center truncate max-w-[150px]">
                      {result.memo}
                    </td>
                    <td className="pl-1 pr-3 py-3 text-gray-500">
                      <ChevronRight size={16} className="ml-2" />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
