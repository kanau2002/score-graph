# ScoreGraph

共通テスト過去問の成績記録・分析アプリケーション

## 📖 概要

ScoreGraphは、受験生が共通テスト（センター試験）の過去問の成績を記録・分析・共有できるウェブアプリケーションです。目標設定から結果追跡まで、受験勉強を効率的にサポートします。

### 🎯 主な機能

- **成績記録**: 過去問の詳細な解答と得点を記録
- **進捗可視化**: グラフによる成績の推移表示
- **目標管理**: 月次目標の設定と達成度追跡
- **大問別分析**: セクション毎の正答率をレーダーチャートで可視化
- **フレンド機能**: 相互フォローによる成績共有と比較
- **先輩データ**: 合格者の過去問解答パターンの参照

## 🌐 デモ

- **URL**: [https://score-graph.vercel.app](https://score-graph.vercel.app)
- **テストアカウント**:
  - ID: `test@example.com`
  - Password: `Password123`

iPhoneでネイティブアプリのように利用可能：

1. Safariで本サイトにアクセス
2. 「共有」ボタンをタップ
3. 「ホーム画面に追加」を選択


## 📱 対応科目

- リーディング
- リスニング
- 数学IA・数学IIB
- 理科（化学・物理・生物）
- 社会（日本史・世界史・地理・公民）
- 情報

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 15.2.1** - React フレームワーク
- **TypeScript** - 型安全性の確保
- **Tailwind CSS 4** - スタイリング
- **Framer Motion** - アニメーション
- **Recharts** - グラフ描画
- **Lucide React** - アイコン

### バックエンド
- **Next.js API Routes** - サーバーレス関数
- **PostgreSQL** - メインデータベース
- **Supabase** - データベースホスティング

### 認証・セキュリティ
- **bcrypt** - パスワードハッシュ化
- **JSON Web Token** - セッション管理
- **HTTP-only Cookies** - セキュアな認証

### インフラ
- **Vercel** - ホスティング・デプロイ
- **PostgreSQL (Supabase)** - データベース

## 🚀 セットアップ

### 前提条件
- Node.js 18.0 以上
- PostgreSQL データベース

### 1. リポジトリのクローン
```bash
git clone https://github.com/yourusername/score-graph.git
cd score-graph
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
`.env.local` ファイルを作成し、以下の変数を設定：

```env
# データベース接続
DATABASE_URL=your_postgresql_connection_string
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=your_host
POSTGRES_PORT=5432
POSTGRES_DATABASE=your_database_name
POSTGRES_SSL=true

# JWT認証
JWT_SECRET=your_jwt_secret_key
```

### 4. データベースの初期化
```bash
# テーブル作成
npm run init-db

# サンプルデータの投入
npm run seed-db
```

### 5. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションが `http://localhost:3000` で起動します。

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── (page)/            # ページコンポーネント
│   ├── api/               # API ルート
│   └── globals.css        # グローバルスタイル
├── components/            # UIコンポーネント
│   ├── (auth)/           # 認証関連
│   ├── (card)/           # 科目カード関連
│   ├── (test)/           # テスト関連
│   └── general/          # 共通コンポーネント
├── constants/            # 定数定義
├── context/              # React Context
├── core/                 # ビジネスロジック
│   ├── Repository/       # データアクセス層
│   └── Service/          # ビジネスロジック層
├── lib/                  # ユーティリティ
└── type/                 # 型定義
```

## 📋 使用方法

### 1. アカウント作成・ログイン
- 新規登録またはテストアカウントでログイン

### 2. 科目カードの作成
- マイページから科目を選択してカードを作成
- 目標点と最低点を設定

### 3. 過去問の記録
- 科目カードから年度を選択して解答を入力
- 自動で得点計算とセクション別分析

### 4. 目標設定
- 月次目標を設定して進捗を可視化

### 5. フレンド機能
- ユーザーIDで友達を検索・フォロー
- 相互フォローで成績を比較

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番環境起動
npm start

# Lintチェック
npm run lint

# データベース初期化
npm run init-db

# サンプルデータ投入
npm run seed-db
```

## 🏗️ アーキテクチャ

### レイヤードアーキテクチャ
- **Presentation Layer**: Next.js Pages/Components
- **Service Layer**: ビジネスロジック
- **Repository Layer**: データアクセス
- **Database Layer**: PostgreSQL

### 認証フロー
1. ユーザーがログイン情報を送信
2. サーバーがJWTトークンを生成
3. HTTP-only Cookieでトークンを保存
4. 保護されたルートでトークンを検証

### データフロー
1. ユーザーがUIで操作
2. コンポーネントがServiceを呼び出し
3. ServiceがRepositoryを通じてDBアクセス
4. 結果をUIに反映

## 🔒 セキュリティ

- パスワードのbcryptハッシュ化
- JWT認証によるセッション管理
- HTTP-only Cookieによるトークン保護
- CSRFプロテクション
- SQLインジェクション対策

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します。

### 開発の流れ
1. フォーク
2. フィーチャーブランチを作成
3. 変更をコミット
4. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📞 お問い合わせ

- **アプリ内**: お問い合わせフォームから
- **GitHub**: Issues タブから報告

---

**受験勉強の効率化とモチベーション向上をサポートします！**