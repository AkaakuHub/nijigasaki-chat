// ユニットの基本情報
export type UnitInfo = {
  id: string; // 'azuna', 'diverdiva', 'qu4rtz', 'r3birth'
  name: string; // 正式名称
  displayName: string; // 表示用名称（記号付き）
  members: string[]; // メンバーのcharacterID配列
  coreValues: string; // コアコンセプト
  debutSingle: string; // デビューシングル
  formation: 'fan_vote' | 'story_born'; // 結成経緯
  description: string; // 詳細説明
  musicStyle: string; // 音楽スタイル
  themes: string[]; // テーマ
  philosophy: string; // 理念・哲学
};

// ユニットID
export type UnitId = 'azuna' | 'diverdiva' | 'qu4rtz' | 'r3birth' | 'none';

// ユニット名
export type UnitName =
  | 'A・ZU・NA'
  | 'DiverDiva'
  | 'QU4RTZ'
  | 'R3BIRTH'
  | 'none';
