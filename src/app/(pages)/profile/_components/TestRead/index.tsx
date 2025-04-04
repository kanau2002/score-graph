"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Circle, UsersRound, X, Minus } from "lucide-react";
import React from "react";
import {
  FriendRadarChart,
  StudentRadarChart,
} from "@/app/(pages)/profile/_components/SectionRadarChart";
import Link from "next/link";
import { displaySubjectName } from "../TestResultCard";
import {
  Answer,
  AnsweredData,
  ClientTestSection,
  TestData,
} from "@/core/profile/type";
import FriendSelector from "../FriendSelecter";
import { useRouter } from "next/navigation";


interface Props {
  studentData: AnsweredData;
  friendsData: AnsweredData[];
  testData: TestData;
}

export default function TestRead({
  studentData,
  friendsData,
  testData,
}: Props) {
  const router = useRouter();
  // 選択中のフレンド（初期状態ではnull）
  const [selectedFriend, setSelectedFriend] = useState<AnsweredData | null>(
    null
  );

  // 初期化時に一度だけテストデータを構築
  const initialTestSections = React.useMemo(() => {
    if (!studentData.answers) return [];

    // ベーステストデータに学生の回答を追加
    return testData.testStructure.map((section) => {
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
  }, [studentData, testData.testStructure]);

  // テストデータを保持するstate（初期値を設定）
  const [testSections, setTestSections] =
    useState<ClientTestSection[]>(initialTestSections);

  // フレンド選択時にのみデータを更新
  useEffect(() => {
    if (!selectedFriend) return; // 選択されていない場合は何もしない

    // 選択されたフレンドの回答で更新したテストセクションを作成
    const updatedSections = initialTestSections.map((section) => {
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
  }, [selectedFriend, initialTestSections]);

  // 正解不正解の判定関数
  const isCorrect = (correct: number | null, answer: Answer | undefined) => {
    if (answer === Answer.CORRECT) return "bg-blue-100";
    if (answer === Answer.INCORRECT) return "bg-red-100";
    if (answer === Answer.SKIPPED) return false;
    if (String(correct) === answer) return "bg-blue-100";
    if (String(correct) !== answer) return "bg-red-100";
    return false;
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

  const renderAnswer = (answer: number | Answer | undefined) => {
    if (answer === Answer.CORRECT) return <Circle size={16} />;
    if (answer === Answer.INCORRECT) return <X size={16} />;
    if (answer === Answer.SKIPPED) return <Minus size={16} />;
    return answer;
  };


  const handleDeleteTestResult = async () => {
    if (
      window.confirm(
        "このテスト結果を削除してもよろしいですか？元に戻すことはできません。"
      )
    ) {
      try {
        const response = await fetch(
          `/api/tests/delete?subject=${testData.subject}&year=${testData.year}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (data.success) {
          alert("テスト結果を削除しました");
          // プロフィールページにリダイレクト
          router.push("/profile");
        } else {
          alert(`削除エラー: ${data.error || "不明なエラーが発生しました"}`);
        }
      } catch (error) {
        console.error("削除処理エラー:", error);
        alert("テスト結果の削除中にエラーが発生しました。");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md bg-gray-50 shadow rounded-lg">
      {/* ヘッダー部分 */}
      <div className="flex items-center p-4">
        <Link href="/profile" className="mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="flex-1 font-bold text-lg">
          {displaySubjectName(testData.subject)}-{testData.year}年度
        </h1>
        <div className="flex items-baseline">
          <p className="text-sm text-gray-500">
            （目標：{studentData.targetPercentage}%）
          </p>
          <span className="text-3xl font-bold text-blue-600">
            {studentData.percentage}%
          </span>
        </div>
      </div>
      {/* TOP */}
      <div className="p-4 rounded-lg">
        <div className="flex items-center px-2">
          <UsersRound size={24} className="text-blue-500" />
          <div className="w-full ml-4">
            <FriendSelector
              friendsData={friendsData}
              selectedFriend={selectedFriend}
              onFriendSelect={handleFriendSelect}
            />
          </div>
        </div>

        {/* スコア情報カード */}
        <div className="grid grid-cols-1 gap-4 mt-4">
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
                <span className="text-sm text-gray-500 ml-1">
                  /{testData.maxScore}
                </span>
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
                  <span className="text-sm text-gray-500 ml-1">
                    /{testData.maxScore}
                  </span>
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
      <table className="w-full border-collapse mt-4">
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
                    {question.correctAnswer !== null
                      ? question.correctAnswer
                      : "-"}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <div
                      className={`flex items-center justify-center rounded-full mx-auto w-8 h-8 ${isCorrect(
                        question.correctAnswer,
                        question.studentAnswer
                      )}`}
                    >
                      {renderAnswer(question.studentAnswer)}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {selectedFriend ? (
                      <div
                        className={`flex items-center justify-center rounded-full mx-auto w-8 h-8 ${isCorrect(
                          question.correctAnswer,
                          question.friendAnswer
                        )}`}
                      >
                        {renderAnswer(question.friendAnswer)}
                      </div>
                    ) : (
                      <div className="text-center">-</div>
                    )}
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
              合計 ({testData.maxScore})
            </td>
            <td className="border border-gray-300 px-3 py-2 text-center">
              {studentData.score}/{testData.maxScore}
            </td>
            <td className="border border-gray-300 px-3 py-2 text-center">
              {selectedFriend
                ? `${selectedFriend.score}/${testData.maxScore}`
                : "-"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* CRUD操作できるセクション */}
      <div className="bg-white rounded-lg shadow p-6 text-center mt-8 mb-64">
        <button
          onClick={handleDeleteTestResult}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          削除
        </button>
      </div>
    </div>
  );
}
