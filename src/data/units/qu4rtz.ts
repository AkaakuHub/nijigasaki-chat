import { UnitInfo } from '@/types/unit';

export const qu4rtzUnit: UnitInfo = {
  id: 'qu4rtz',
  name: 'QU4RTZ',
  displayName: 'QU4RTZ',
  members: ['kasumi_nakasu', 'kanata_konoe', 'emma_verde', 'rina_tennoji'],
  coreValues: '純粋なハーモニーと調和を重視した、伝統的アイドル像の探求',
  debutSingle: 'Sing & Smile!!',
  formation: 'fan_vote',
  description:
    '柔らかく、優しく、より「クラシックなアイドル」像を持つメンバーで編成。美しいボーカルのハーモニーと姉妹のような一体感を強調。',
  musicStyle:
    '豊かなボーカルアレンジと複雑なハーモニー、優しくメロディアスな楽曲',
  themes: ['調和', 'ハーモニー', '四季', '純粋さ', '透明感', '輝き'],
  philosophy:
    '個々の輝きを尊重する虹ヶ咲において「仲間」という側面を体現。穏やかで統一された友情のメッセージ。',
};

export const qu4rtzSongs = [
  'Sing & Smile!!',
  'Beautiful Moonlight',
  'Swinging!',
];

// メンバー情報の詳細
export const qu4rtzMembers = {
  kasumi_nakasu: {
    role: '可愛さを追求するアイドル',
    seasonSymbol: '春',
    characterType: 'キュート系',
  },
  kanata_konoe: {
    role: '眠そうだが面倒見の良い先輩',
    seasonSymbol: '夏',
    characterType: 'ゆるふわ系',
  },
  emma_verde: {
    role: '温かく包容力のある国際派',
    seasonSymbol: '秋',
    characterType: 'ナチュラル系',
  },
  rina_tennoji: {
    role: '内気ながらも心優しい技術者',
    seasonSymbol: '冬',
    characterType: 'クール系',
  },
} as const;

// ユニット名の由来
export const qu4rtzNameOrigin = {
  quartz: '石英 - 純粋さ、透明感、輝きを象徴',
  number4: '4人組であることを示す',
  concept: '純粋さと調和を体現する宝石のような存在',
} as const;
