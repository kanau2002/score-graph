'use client'

import { useEffect } from 'react'
import ReactGA from 'react-ga4'

export default function GoogleAnalyticsInitializer() {
  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

    if (measurementId) {
      ReactGA.initialize(measurementId)
    }
  }, [])
  return null
}

/**
 * Google Analyticsを初期化するコンポーネント
 *
 * アプリケーションのルートlayout.tsに配置し、
 * GAトラッキングの初期設定を行う。
 *
 * このコンポーネントはクライアントサイドでのみ動作し、
 * マウント時に一度だけGA初期化を実行します。
 */
