import { UnitInfo } from '@/types/unit';

export const diverdivaUnit: UnitInfo = {
  id: 'diverdiva',
  name: 'DiverDiva',
  displayName: 'DiverDiva',
  members: ['karin_asaka', 'ai_miyashita'],
  coreValues: '未来的なダンスポップを舞台にした、1対1のライバル対決',
  debutSingle: 'SUPER NOVA',
  formation: 'fan_vote',
  description:
    '対照的な魅力のぶつかり合いを体現するデュオ。クールでセクシーな朝香果林とエネルギッシュでフレンドリーな宮下愛のライバル関係。',
  musicStyle: '激しいビートのEDM、シンセサイザーを多用したサウンド',
  themes: ['SF', 'サイバーポップ', '宇宙', '未来', 'ライバル対決'],
  philosophy:
    '仲間でありライバルという理念の「ライバル」側面を最も純粋に体現。競争をパフォーマンスとして昇華。',
};

export const diverdivaSongs = [
  'SUPER NOVA',
  'Love Triangle',
  'THE SECRET NiGHT',
];

// メンバー情報の詳細
export const diverdivaMembers = {
  karin_asaka: {
    role: 'クールでセクシーな読者モデル',
    characterType: 'Diva（歌姫）',
    style: 'クール系',
  },
  ai_miyashita: {
    role: 'エネルギッシュでフレンドリーな人気者',
    characterType: 'Diver（潜る者）',
    style: 'エネルギッシュ系',
    specialNote: 'ダジャレ好きでユニット名の由来にも関与',
  },
} as const;

// ユニット名の由来
export const diverdivaNameOrigin = {
  diva: '歌姫 - 卓越したパフォーマンス能力',
  diver: 'ファンの心の奥深くまで潜り込む + お台場（Daiba）の言葉遊び',
  concept: '未来的なサイバー空間での1対1の真剣勝負',
} as const;
