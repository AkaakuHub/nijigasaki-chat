import { UnitInfo } from '@/types/unit';

export const r3birthUnit: UnitInfo = {
  id: 'r3birth',
  name: 'R3BIRTH',
  displayName: 'R3BIRTH',
  members: ['shioriko_mifune', 'mia_taylor', 'lanzhu_zhong'],
  coreValues: 'グローバルな音楽性を取り入れた、革命と再生の象徴',
  debutSingle: 'MONSTER GIRLS',
  formation: 'story_born',
  description:
    '明確に「国際色」を打ち出したユニット。既存のスクールアイドル同好会の理念に挑戦するライバルとして登場し、同好会の進化のきっかけを作った。',
  musicStyle:
    '現代のK-POPや欧米のポップスに強く影響された、攻撃的なエレクトロニック・ビート、複雑なダンス、多言語歌詞',
  themes: ['革命', '再生', 'グローバル', '破壊と創造', '国際性', 'モダン'],
  philosophy:
    'よりグローバルな視点と高いパフォーマンス性を備えた、新しいスクールアイドルの在り方を提示。『ラブライブ！』の音楽的領域を押し広げる存在。',
};

export const r3birthSongs = [
  'MONSTER GIRLS',
  '翠いカナリア', // 栞子ソロ
  "I'm Still...", // ミアソロ
  'Queendom', // ランジュソロ
  'Vroom Vroom',
];

// メンバー情報の詳細
export const r3birthMembers = {
  shioriko_mifune: {
    role: '日本の伝統的な美意識の代表',
    origin: '日本',
    specialNote: '厳格で完璧主義的なアプローチ',
    characterType: '伝統美系',
  },
  mia_taylor: {
    role: 'ニューヨーク出身のプロフェッショナル',
    origin: 'アメリカ（ニューヨーク）',
    specialNote: 'ラップが大きな比重を占める楽曲',
    characterType: 'プロフェッショナル系',
  },
  lanzhu_zhong: {
    role: '香港を拠点とする現代的なポップスター',
    origin: '中国（香港）',
    specialNote: 'スター性と圧倒的な存在感',
    characterType: 'スター系',
  },
} as const;

// ユニット名の由来
export const r3birthNameOrigin = {
  rebirth: '再生・復活',
  number3: 'メンバー数である3を表現',
  concept: '既存の枠組みを破壊し、新たな価値観で再生する',
  purpose: 'スクールアイドルという概念のグローバル化',
} as const;
