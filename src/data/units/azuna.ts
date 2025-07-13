import { UnitInfo } from '@/types/unit';

export const azunaUnit: UnitInfo = {
  id: 'azuna',
  name: 'A・ZU・NA',
  displayName: 'A・ZU・NA',
  members: ['ayumu_uehara', 'shizuku_osaka', 'setsuna_yuki'],
  coreValues: '物語性と演劇性を軸にした、可能性の玉手箱',
  debutSingle: 'Dream Land! Dream World!',
  formation: 'fan_vote',
  description:
    'なんでもアリのおもちゃ箱として、無限の可能性を掲げるユニット。物語性や童話的な世界観を強く反映した楽曲や演出が特徴。',
  musicStyle: '演劇的な要素を含む鮮やかなポップス',
  themes: ['物語性', 'ファンタジー', '童話', 'テーマパーク', 'ミステリアス'],
  philosophy:
    '何にでもなれるという無限の可能性。それぞれ異なる「ヒロイン」像（少年マンガ、少女マンガ、バトルアニメ）の融合。',
};

export const azunaSongs = [
  'Dream Land! Dream World!',
  'Maze Town',
  'フォルクロア ～歓喜の歌～',
];

// メンバー情報の詳細
export const azunaMembers = {
  ayumu_uehara: {
    role: '少年マンガのヒロイン',
    characterType: '王道ヒロイン',
  },
  shizuku_osaka: {
    role: '少女マンガのヒロイン',
    characterType: 'ドラマチックヒロイン',
    specialNote: '演劇部所属により物語性を強化',
  },
  setsuna_yuki: {
    role: 'バトルアニメのヒロイン',
    characterType: 'パワフルヒロイン',
  },
} as const;
