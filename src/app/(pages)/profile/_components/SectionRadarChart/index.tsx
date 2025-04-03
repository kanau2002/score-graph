//src/app/(pages)/profile/_components/SectionRadarChart/index.tsx
import {
  CustomTooltipType,
  FriendRadarChartProps,
  RaderChartData,
  SectionPercentages,
  StudentRadarChartProps,
} from "@/core/profile/type";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// カスタムツールチップ
const CustomTooltip = ({ active, payload, label }: CustomTooltipType) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded text-sm">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.dataKey === "target" ? "目標" : ""}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 保存済みのパーセンテージからチャートデータポイントを作成する関数（並び替え不要）
const createChartDataFromPercentages = (
  sectionPercentages: SectionPercentages,
  targetSectionPercentages?: SectionPercentages
): RaderChartData[] => {
  // データベースから取得したデータはすでに順序付けられていると仮定
  return Object.entries(sectionPercentages).map(([sectionKey, percentage]) => {
    const sectionNumber = parseInt(sectionKey);
    return {
      subject: `大問${sectionNumber}`,
      score: percentage,
      target: targetSectionPercentages
        ? targetSectionPercentages[sectionNumber]
        : undefined,
      fullMark: 100,
    };
  });
};

type Props = {
  data: RaderChartData[];
  color?: string;
  targetColor?: string;
  size?: number;
  showTarget?: boolean;
};

const SectionRadarChart: React.FC<Props> = ({
  data,
  color = "#8884d8",
  targetColor = "#9CA3AF", // グレーの色
  size = 200,
  showTarget = false,
}) => {
  return (
    <ResponsiveContainer width="100%" height={size}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#666", fontSize: 12 }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
        {showTarget && (
          <Radar
            dataKey="target"
            stroke={targetColor}
            fill="none" // 塗りつぶしを無効にする
          />
        )}
        <Radar dataKey="score" stroke={color} fill={color} fillOpacity={0.6} />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

// 学生用のレーダーチャート
export const StudentRadarChart: React.FC<StudentRadarChartProps> = ({
  studentData,
}) => {
  const chartData = createChartDataFromPercentages(
    studentData.sectionPercentages,
    studentData.targetSectionPercentages
  );

  const hasTargets =
    studentData?.targetSectionPercentages &&
    Object.keys(studentData.targetSectionPercentages).length > 0;

  if (!studentData || !chartData.length) {
    return (
      <div className="flex justify-center items-center p-4 text-gray-500">
        データ準備中...
      </div>
    );
  }

  return (
    <div className="w-full">
      <SectionRadarChart
        data={chartData}
        color="#2563eb"
        targetColor="#9CA3AF"
        size={180}
        showTarget={hasTargets}
      />
    </div>
  );
};

// フレンド用のレーダーチャート
export const FriendRadarChart: React.FC<FriendRadarChartProps> = ({
  friendData,
}) => {
  const chartData = createChartDataFromPercentages(
    friendData.sectionPercentages,
    friendData.targetSectionPercentages
  );

  const hasTargets =
    friendData?.targetSectionPercentages &&
    Object.keys(friendData.targetSectionPercentages).length > 0;

  if (!friendData || !chartData.length) {
    return (
      <div className="flex justify-center items-center p-4 text-gray-500">
        データ準備中...
      </div>
    );
  }

  return (
    <div className="w-full">
      <SectionRadarChart
        data={chartData}
        color="#10b981"
        targetColor="#9CA3AF"
        size={180}
        showTarget={hasTargets}
      />
    </div>
  );
};
export default SectionRadarChart;
