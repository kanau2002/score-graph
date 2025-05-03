import { targetService } from "@/core/Service/targetService";
import TargetUpsert from "../../../../../../../../components/(target)/TargetUpsert";
import { Subject } from "@/type/testType";

type Props = {
  params: Promise<{ subject: Subject }>;
};

const targetMonthTemplate = [
  "2025-01",
  "2025-03",
  "2025-05",
  "2025-07",
  "2025-09",
  "2025-11",
  "2026-01",
];

export default async function taregetUpsertPage({ params }: Props) {
  const { subject } = await params;

  // 目標データの取得
  const targetUpsertData = await targetService.fetchTargetUpsertData(subject);

  // データ取得に失敗した場合はエラーメッセージを表示
  if (!targetUpsertData.success) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">目標設定</h1>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          データの取得に失敗しました：{targetUpsertData.error || "不明なエラー"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <TargetUpsert
        subject={subject as Subject}
        targetMonthTemplate={targetMonthTemplate}
        existingData={targetUpsertData.existing}
      />
    </div>
  );
}
