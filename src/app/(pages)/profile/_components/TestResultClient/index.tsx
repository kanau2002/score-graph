"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import React from "react";
import {
  FriendRadarChart,
  StudentRadarChart,
} from "@/app/(pages)/profile/_components/SectionRadarChart";
import FriendSelector from "@/app/(pages)/profile/_components/FriendSelecter";
import { Friend, StudentData, TestSection } from "../../[subject]/page";

// テスト問題の型定義
interface TestScore {
  questionNumber: number;
  score: number | null;
  correctAnswer: number;
  studentAnswer: number;
  friendAnswer?: number;
}

// テストセクションの型定義（クライアント側で扱う拡張型）
interface ClientTestSection {
  section: number;
  questions: TestScore[];
  sectionTotal: {
    score: number;
    studentTotal: number;
    friendTotal?: number;
  };
}

interface TestResultClientProps {
  studentData: StudentData;
  friendsData: Friend[];
  testStructure: TestSection[];
}

export default function TestResultClient({
  studentData,
  friendsData,
  testStructure,
}: TestResultClientProps) {
  // 選択中のフレンド（初期状態ではnull）
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  // テストデータを保持するstate
  const [testSections, setTestSections] = useState<ClientTestSection[]>([]);

  // 学生データが更新されたらテストデータを構築
  useEffect(() => {
    if (!studentData.answers) return;

    // ベーステストデータに学生の回答を追加
    const updatedSections = testStructure.map((section) => {
      // 各セクションの質問を更新
      const updatedQuestions = section.questions.map((question) => {
        return {
          ...question,
          studentAnswer: studentData.answers?.[question.questionNumber] || 0,
        };
      });

      return {
        ...section,
        questions: updatedQuestions,
        sectionTotal: {
          ...section.sectionTotal,
          studentTotal: studentData.sectionTotals[section.section] || 0,
        },
      };
    });

    setTestSections(updatedSections);
  }, [studentData, testStructure]);

  // フレンド選択時にデータを更新
  useEffect(() => {
    if (!selectedFriend || testSections.length === 0) return; // 選択されていない場合は何もしない

    // 選択されたフレンドの回答で更新したテストセクションを作成
    const updatedSections = testSections.map((section) => {
      // 各セクションの質問を更新
      const updatedQuestions = section.questions.map((question) => {
        // 元のquestionオブジェクトにfriendAnswerプロパティを追加
        return {
          ...question,
          friendAnswer: selectedFriend.answers[question.questionNumber] || 0,
        };
      });

      return {
        ...section,
        questions: updatedQuestions,
        sectionTotal: {
          ...section.sectionTotal,
          // DBから取得した小計を使用
          friendTotal: selectedFriend.sectionTotals[section.section] || 0,
        },
      };
    });

    setTestSections(updatedSections);
  }, [selectedFriend, testSections.length]);

  // 正解不正解の判定関数
  const isCorrect = (correct: number, answered: number | undefined) => {
    if (answered === undefined) return false;
    return correct === answered;
  };

  const handleFriendSelect = (friendId: string) => {
    if (friendId === "none") {
      setSelectedFriend(null);
      return;
    }
    const friend = friendsData.find((f) => f.id === Number(friendId));
    if (friend) {
      setSelectedFriend(friend);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-8">
      {/* TOP */}
      <div className="p-4 bg-gray-50 rounded-lg mb-4">
        <h3 className="text-base font-medium flex items-center">
          <Users size={18} className="mr-2 text-blue-500" />
          フレンドを選択
        </h3>
        <FriendSelector
          friendsData={friendsData}
          selectedFriend={selectedFriend}
          onFriendSelect={handleFriendSelect}
        />

        {/* スコア情報カード */}
        <div className="grid grid-cols-1 gap-4">
          {/* あなたのスコアカード */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-700">
                {studentData.name}
              </h3>
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-blue-600">
                  {studentData.score}
                </span>
                <span className="text-sm text-gray-500 ml-1">/200</span>
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium py-0.5 px-2 rounded">
                  {studentData.percentage}%
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <div className="flex mb-1">
                <span>解いた日：</span>
                <span>{studentData.date}</span>
              </div>
              <div className="flex mb-1">
                <span>目標点：</span>
                <span>{studentData.targetPercentage}</span>
              </div>

              {studentData.memo && (
                <div className="mt-2">
                  <span className="block mb-1 ml-2">メモ</span>
                  <p className="bg-gray-50 p-2 rounded">{studentData.memo}</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                大問別の正答率
              </h4>
              <StudentRadarChart studentData={studentData} />
            </div>
          </div>

          {/* フレンドのスコアカード (選択時のみ表示) */}
          {selectedFriend && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-700">
                  {selectedFriend.name}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-green-600">
                    {selectedFriend.score}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">/200</span>
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium py-0.5 px-2 rounded">
                    {selectedFriend.percentage}%
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <div className="flex mb-1">
                  <span>解いた日：</span>
                  <span>{selectedFriend.date}</span>
                </div>
                <div className="flex mb-1">
                  <span>目標点：</span>
                  <span>{selectedFriend.targetPercentage}</span>
                </div>
                {selectedFriend.memo && (
                  <div className="mt-2">
                    <span className="block mb-1 ml-2">メモ</span>
                    <p className="bg-gray-50 p-2 rounded">
                      {selectedFriend.memo}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  大問別の正答率
                </h4>
                <FriendRadarChart friendData={selectedFriend} />
              </div>
            </div>
          )}
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2 text-center w-16">
              問題番号
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center w-16">
              配点
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center w-16">
              正解
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center">
              {studentData.name}
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center w-26">
              フレンド
            </th>
          </tr>
        </thead>
        <tbody>
          {testSections.map((section, sectionIndex) => (
            <React.Fragment key={`section-group-${sectionIndex}`}>
              <tr key={`section-${sectionIndex}`} className="bg-gray-50">
                <td
                  colSpan={5}
                  className="border border-gray-300 px-3 py-2 font-semibold"
                >
                  大問{section.section}
                </td>
              </tr>
              {section.questions.map((question, questionIndex) => (
                <tr
                  key={`question-${sectionIndex}-${questionIndex}`}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {question.questionNumber}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {question.score !== null ? question.score : "*"}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {question.correctAnswer}
                  </td>
                  <td
                    className={`border border-gray-300 px-3 py-2 text-center ${
                      isCorrect(question.correctAnswer, question.studentAnswer)
                        ? "bg-blue-100"
                        : "bg-red-100"
                    }`}
                  >
                    {question.studentAnswer}
                  </td>
                  <td
                    className={`border border-gray-300 px-3 py-2 text-center ${
                      selectedFriend
                        ? isCorrect(
                            question.correctAnswer,
                            question.friendAnswer
                          )
                          ? "bg-blue-100"
                          : "bg-red-100"
                        : ""
                    }`}
                  >
                    {selectedFriend ? question.friendAnswer : "-"}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-semibold">
                <td
                  colSpan={3}
                  className="border border-gray-300 px-3 py-2 text-center"
                >
                  小計 ({section.sectionTotal.score})
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {section.sectionTotal.studentTotal}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {selectedFriend ? section.sectionTotal.friendTotal : "-"}
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr className="bg-gray-200 font-bold text-lg">
            <td
              colSpan={3}
              className="border border-gray-300 px-3 py-2 text-center"
            >
              合計 (200)
            </td>
            <td className="border border-gray-300 px-3 py-2 text-center">
              {studentData.score}
              /200
            </td>
            <td className="border border-gray-300 px-3 py-2 text-center">
              {selectedFriend ? `${selectedFriend.score}/200` : "-"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 分析できるセクション */}
      <div className="bg-white rounded-lg shadow p-6 text-center mt-8">
        ここにレーダーチャートを作成
      </div>
      {/* CRUD操作できるセクション */}
      <div className="bg-white rounded-lg shadow p-6 text-center mt-8">
        <button
          onClick={() =>
            alert("削除ボタンが押下されました。現在実装中の機能です。")
          }
        >
          削除
        </button>
      </div>
    </div>
  );
}
