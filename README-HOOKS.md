# Git Hooks & Code Quality

このプロジェクトでは [lefthook](https://github.com/evilmartians/lefthook) を使用してコード品質を保持しています。

## 自動実行されるチェック

### Pre-commit（コミット前）
- **ESLint**: TypeScript/JSXの構文チェック
- **Prettier**: コードフォーマット
- **Tailwind色チェック**: 禁止されたTailwind色クラスの検出

### Pre-push（プッシュ前）
- **型チェック**: TypeScriptの型エラーチェック
- **テスト**: 全テストの実行
- **全色チェック**: 全TSX/JSXファイルの色クラスチェック

## Tailwind色ルール

### 🚫 禁止されている色クラス
```css
/* 基本色 */
bg-white, bg-black, bg-gray-*, text-gray-*, border-gray-*

/* 直接的な色指定 */
bg-blue-500, text-red-600, hover:bg-green-400

/* フォーカス色 */
focus:ring-blue-500, focus:ring-red-400
```

### ✅ 推奨されるテーマ色
```css
/* 背景 */
bg-background, bg-card, bg-primary, bg-secondary, bg-muted

/* テキスト */
text-foreground, text-card-foreground, text-primary, text-muted-foreground

/* ボーダー */
border-border, border-input

/* 状態 */
focus:ring-ring, hover:bg-primary/90, disabled:bg-muted
```

## コマンド

```bash
# 色チェックを手動実行
pnpm run check-colors

# フォーマット
pnpm run format

# 型チェック
pnpm run type-check

# 全体的なリント
pnpm run lint
```

## Hookをスキップする方法

### 一時的にスキップ
```bash
# 全hookをスキップ
git commit --no-verify -m "urgent hotfix"

# または環境変数で
LEFTHOOK=0 git commit -m "skip hooks"
```

### 特定のhookだけスキップ
```bash
# 色チェックのみスキップ
LEFTHOOK_EXCLUDE=check-tailwind-colors git commit -m "temp fix"
```

## カスタマイズ

`lefthook.yml`を編集してhookの設定をカスタマイズできます。

## 利点

1. **一貫したコード品質**: 全メンバーが同じ基準でコードを書ける
2. **ダークモード対応**: テーマ色の使用を強制することで自動的にダークモード対応
3. **早期エラー発見**: コミット前に問題を発見して修正
4. **レビュー効率化**: 基本的な問題はhookで解決済み