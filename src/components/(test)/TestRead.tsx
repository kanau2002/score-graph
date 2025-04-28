"use client";
import { useState } from "react";
import { ArrowLeft, UsersRound } from "lucide-react";
import React from "react";
import {
  Answer,
  AnsweredData,
  ClientTestSection,
  TestData,
} from "@/type/testType";
import { useRouter } from "next/navigation";
import { displaySubjectName } from "@/lib/display";
import { ROUTES } from "@/constants";
import FriendSelector from "./FriendSelecter";
import { FriendRadarChart, StudentRadarChart } from "./SectionRaderChart";
import AnswerIcon from "./AnswerIcon";
import { isCorrect, isMath } from "@/lib/test";

interface Props {
  leftData: AnsweredData;
  rightDatas: AnsweredData[];
  testStructureData: TestData;
  isHome: boolean;
}

export default function TestRead({
  leftData,
  rightDatas,
  testStructureData,
  isHome,
}: Props) {
  const router = useRouter();
  // 選択中のフレンド（初期状態ではnull）
  const [selectedFriend, setSelectedFriend] = useState<AnsweredData | null>(
    null
  );

  // 単純な値の計算
  const isThreeChoice = isMath(testStructureData.subject);
  const rightData = isHome ? rightDatas[0] : selectedFriend;

  // フレンド選択のハンドラー
  const handleFriendSelect = (friendId: string) => {
    if (friendId === "none") {
      setSelectedFriend(null);
      return;
    }
    const friend = rightDatas.find((f) => f.id === Number(friendId));
    if (friend) {
      setSelectedFriend(friend);
    }
  };

  // 背景スタイルの計算関数
  const bgStyle = (correct: number | null, answer: Answer | null) => {
    if (answer === null) return;
    const status = isCorrect(correct, answer, isThreeChoice);
    switch (status) {
      case Answer.CORRECT:
        return "bg-blue-100";
      case Answer.INCORRECT:
        return "bg-red-100";
      case Answer.SKIPPED:
        break;
    }
  };

  // 削除処理のハンドラー
  const handleDeleteTestResult = async () => {
    if (
      window.confirm(
        "このテスト結果を削除してもよろしいですか？元に戻すことはできません。"
      )
    ) {
      try {
        const response = await fetch(
          `/api/tests/delete?subject=${testStructureData.subject}&year=${testStructureData.year}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (data.success) {
          alert("テスト結果を削除しました");
          router.push(ROUTES.MYPAGE);
        } else {
          alert(`削除エラー: ${data.error || "不明なエラーが発生しました"}`);
        }
      } catch (error) {
        console.error("削除処理エラー:", error);
        alert("テスト結果の削除中にエラーが発生しました。");
      }
    }
  };

  // テストセクションを生成
  let testSections: ClientTestSection[] = [];

  if (leftData.answers) {
    // ベーステストデータに学生の回答を追加
    testSections = testStructureData.testStructure.map((section) => {
      // 各セクションの質問を更新
      const updatedQuestions = section.questions.map((question) => {
        return {
          ...question,
          studentAnswer:
            leftData.answers?.[question.questionNumber] || Answer.SKIPPED,
          friendAnswer: rightData
            ? rightData.answers[question.questionNumber] || 0
            : null,
        };
      });

      return {
        ...section,
        questions: updatedQuestions,
        sectionTotal: {
          ...section.sectionTotal,
          studentTotal: leftData.sectionTotals[section.section] || 0,
          friendTotal: rightData
            ? rightData.sectionTotals[section.section] || 0
            : 0,
        },
      };
    });
  }

  return (
    <div className="container mx-auto max-w-md bg-white shadow rounded-lg text-gray-600 pb-20">
      {/* ヘッダー部分 */}
      <div className="flex items-center p-4">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 font-bold text-lg">
          {displaySubjectName(testStructureData.subject)}-
          {testStructureData.year}年度
        </h1>
        <div className="flex items-baseline">
          <p className="text-sm text-gray-500">
            （目標：{leftData.targetPercentage}%）
          </p>
          <span className="text-3xl font-bold text-blue-600">
            {leftData.percentage}%
          </span>
        </div>
      </div>
      <div className="p-4 rounded-lg">
        <div className={`flex items-center px-2 ${isHome ? "hidden" : ""}`}>
          <UsersRound size={24} className="text-blue-500" />
          <div className="w-full ml-4">
            <FriendSelector
              friendsData={rightDatas}
              selectedFriend={selectedFriend}
              onFriendSelect={handleFriendSelect}
            />
          </div>
        </div>

        {/* スコア情報カード */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          {/* 私のスコアカード */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold">{isHome ? leftData.name : "自分"}</h3>
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-blue-600">
                  {leftData.score}
                </span>
                <span className="text-sm ml-1">
                  /{testStructureData.maxScore}
                </span>
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs py-0.5 px-2 rounded">
                  {leftData.percentage}%
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <div className="flex mb-1">
                <span>解いた日：</span>
                <span>{leftData.date}</span>
              </div>
              <div className="flex mb-1">
                <span>目標点：</span>
                <span>{leftData.targetPercentage}</span>
              </div>

              {leftData.memo && (
                <div className="mt-2">
                  <span className="block mb-1 ml-2">メモ</span>
                  <p className="bg-gray-50 p-2 rounded">{leftData.memo}</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h4 className="text-sm mb-2">大問別の正答率</h4>
              <StudentRadarChart studentData={leftData} />
            </div>
          </div>

          {/* フレンドのスコアカード (選択時のみ表示) */}
          {rightData && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">
                  {isHome ? "自分" : rightData.name}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-green-600">
                    {rightData.score}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    /{testStructureData.maxScore}
                  </span>
                  <span className="ml-2 bg-green-100 text-green-800 text-xs py-0.5 px-2 rounded">
                    {rightData.percentage}%
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <div className="flex mb-1">
                  <span>解いた日：</span>
                  <span>{rightData.date}</span>
                </div>
                <div className="flex mb-1">
                  <span>目標点：</span>
                  <span>{rightData.targetPercentage}</span>
                </div>
                {rightData.memo && (
                  <div className="mt-2">
                    <span className="block mb-1 ml-2">メモ</span>
                    <p className="bg-gray-50 p-2 rounded">{rightData.memo}</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-sm mb-2">大問別の正答率</h4>
                <FriendRadarChart friendData={rightData} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* テーブル部分 */}
      <div className="px-4 mt-2 pb-5">
        {testSections.map((section, sectionIndex) => (
          <div key={`section-group-${sectionIndex}`} className="mb-6">
            <div className="p-3 ml-2">
              <h3 className="font-bold">大問{section.section}</h3>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 mb-3">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-center text-xs">
                    <th className="p-3">問題</th>
                    <th className="p-3">配点</th>
                    <th className="p-3">正解</th>
                    <th className="p-3">{isHome ? "先輩" : "自分"}</th>
                    <th className="p-3">{isHome ? "自分" : "友達"}</th>
                  </tr>
                </thead>
                <tbody>
                  {section.questions.map((question, questionIndex) => (
                    <tr
                      key={`question-${sectionIndex}-${questionIndex}`}
                      className="border-b border-gray-100"
                    >
                      <td className="p-3 text-center">
                        {question.questionNumber}.
                      </td>
                      <td className="p-3 text-center text-gray-500">
                        {question.score !== null ? "+" + question.score : "-"}
                      </td>
                      <td className="p-3 text-center text-gray-500">
                        {question.correctAnswer !== null
                          ? question.correctAnswer
                          : "-"}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center">
                          <div
                            className={`flex items-center justify-center rounded-full w-8 h-8 shadow-sm ${bgStyle(
                              question.correctAnswer,
                              question.studentAnswer
                            )}`}
                          >
                            {AnswerIcon(question.studentAnswer)}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center">
                          {rightData ? (
                            <div
                              className={`flex items-center justify-center rounded-full w-8 h-8 shadow-sm ${bgStyle(
                                question.correctAnswer,
                                question.friendAnswer
                              )}`}
                            >
                              {AnswerIcon(question.friendAnswer)}
                            </div>
                          ) : (
                            <div className="text-center text-gray-300">−</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={3} className="px-4 py-3 text-sm text-right">
                      小計 ({section.sectionTotal.score})
                    </td>
                    <td className="p-3 text-center">
                      {section.sectionTotal.studentTotal}
                    </td>
                    <td className="p-3 text-center">
                      {rightData ? section.sectionTotal.friendTotal : "−"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}

        {/* 合計スコア表示 */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <span className="font-bold">
            合計 ({testStructureData.maxScore}点)
          </span>
          <div className="flex gap-8">
            <div className="flex flex-col items-center text-sm">
              <span className="mb-1">
                {isHome ? "先輩" : "自分"}
              </span>
              <span className="font-bold text-xl">{leftData.score}</span>
            </div>
            <div className="flex flex-col items-center text-sm">
              <span className="mb-1">
                {isHome ? "自分" : "友達"}
              </span>
              <span className="font-bold text-xl">
                {rightData ? rightData.score : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CRUD操作できるセクション */}
      <div className={`p-5 text-center ${isHome ? "hidden" : ""}`}>
        <button
          onClick={handleDeleteTestResult}
          className="px-5 py-3 border border-red-300 text-sm text-red-500 rounded-xl"
        >
          このテスト結果を削除
        </button>
      </div>
    </div>
  );
}
