# 🎮 Unity ミニゲーム集サイト

学生が制作したUnity製ミニゲームをブラウザ上で楽しく一覧・プレイできるWebサイトです。

## ✨ 機能

- **ゲーム一覧表示**: カード形式でゲームを見やすく表示
- **いいね機能**: 各ゲームにいいねを付けることができます（localStorage使用）
- **ランダムプレイ**: ランダムにゲームを選んでプレイ
- **レスポンシブデザイン**: PC・スマートフォン両対応
- **アニメーション効果**: 楽しいアニメーションでユーザー体験を向上

## 🚀 使用方法

1. `index.html` をブラウザで開いてください
2. ゲーム一覧から好きなゲームを選んでプレイするか、「ランダムで遊ぶ」ボタンを押してください
3. ゲームページでUnity WebGLゲームをプレイできます

## 📁 プロジェクト構成

```
/
├── index.html          # トップページ
├── game.html           # ゲームプレイページ
├── script.js           # JavaScript機能
├── style.css           # スタイルシート
├── README.md           # このファイル
├── CLAUDE.md          # Claude Code用の設定ファイル
├── images/            # サムネイル画像
│   ├── neko_thumb.png
│   ├── space_thumb.png
│   ├── puzzle_thumb.png
│   └── racing_thumb.png
└── games/             # ゲームフォルダ
    ├── neko/
    │   └── index.html  # Unity WebGLゲーム
    ├── space/
    │   └── index.html
    ├── puzzle/
    │   └── index.html
    └── racing/
        └── index.html
```

## 🎯 ゲーム追加方法

1. `games/` フォルダに新しいゲームフォルダを作成
2. Unity WebGLビルドファイルを配置（index.htmlを含む）
3. `script.js` の `games` 配列に新しいゲーム情報を追加
4. サムネイル画像を `images/` フォルダに追加

### ゲーム情報の例

```javascript
{
    id: "new_game",
    title: "新しいゲーム",
    author: "制作者名",
    description: "ゲームの説明文",
    howToPlay: "操作方法の説明",
    thumbnail: "images/new_game_thumb.png",
    folder: "games/new_game"
}
```

## 🛠️ 技術仕様

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **外部ライブラリ**: Font Awesome, Google Fonts
- **データ保存**: localStorage
- **レスポンシブ**: CSS Grid & Flexbox

## 🎨 デザイン特徴

- グラデーション背景でゲームポータルサイト風
- カードベースのUI設計
- ホバーアニメーションとトランジション効果
- いいねボタンのアニメーション
- フェードイン/アウト効果

## 📱 対応ブラウザ

- Chrome (推奨)
- Firefox
- Safari  
- Edge

## 🚧 現在の制限事項

- Unity WebGLゲームは各ゲームフォルダに実際のビルドファイルを配置する必要があります
- 現在はテスト用のHTMLファイルが配置されています
- サムネイル画像はSVG形式で提供されています（PNG形式に変換推奨）

## 🔧 カスタマイズ

- `style.css` でデザインをカスタマイズ
- `script.js` でゲーム情報や機能を調整
- サムネイル画像やアニメーション効果を追加・変更可能

---

**制作**: Claude Code による自動生成  
**更新日**: 2024年7月