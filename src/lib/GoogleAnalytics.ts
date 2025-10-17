import ReactGA from 'react-ga4'

export const GoogleAnalytics = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    ReactGA.event(eventName, params)
  }
}

/**
 * Google Analyticsにカスタムイベントを送信する関数
 *
 * ユーザーの行動やアプリケーション内のイベントをトラッキングするために使用します。
 * 環境変数にGA測定IDが設定されている場合のみイベントを送信します。
 *
 * @param eventName - イベント名（例: 'roadMap_register', 'roadMap_edit'など）
 * @param params - イベントに付与する追加パラメータ（オプション）
 *                 whereやtimestampなど、イベントのコンテキスト情報を含めることができます
 *
 * @example
 * // 使用例（パラメータなし、イベント名が１箇所のみで使用される場合）
 * GoogleAnalytics('roadMap_register')
 *
 * @example
 * // 使用例（パラメータ付き、イベント名が複数箇所のみで使用される場合）
 * GoogleAnalytics('roadMap_register', {
 *   where: '治療の歩み_登録',
 *   timestamp: new Date().toISOString(),
 * })
 */
