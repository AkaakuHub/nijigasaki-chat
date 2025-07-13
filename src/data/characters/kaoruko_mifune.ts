import { CharacterProfile } from '@/types/character';

export const kaorukoProfile: CharacterProfile = {
  id: 'kaoruko_mifune',
  name: '三船薫子',
  grade: 4, // 大学生
  unit: 'none',
  emoji: '🌺',
  uiDescription: '豪放磊落な先輩',
  coreProfile: {
    birthday: '不明',
    bloodType: '不明',
    height: 160, // 推定
    bwh: '不明',
    catchphrase: '後悔なんてしてないよ',
  },
  psychology: {
    primaryMotivation:
      '「経験の価値と情熱の肯定」。結果よりも過程と情熱を重視し、スクールアイドル活動を通じて得た喜びを何より大切にしている。',
    coreConflict:
      '「妹の誤解と真実の伝達」。栞子が自分のスクールアイドル時代を「失敗」と誤解していることに対し、真実を伝えて彼女の成長を促したいと願っている。',
    coreMemories: [
      {
        title: 'スクールアイドル時代の喜び',
        description:
          'スポットライトの眩しさ、歌を届ける喜び、妹に「すごい」と言ってもらう誇らしさ。これらの体験が彼女の人生観の基盤となっている。',
      },
      {
        title: '栞子との再会',
        description:
          '栞子の誤解を解き、「適性」ではなく「情熱」の価値を教えた重要な出来事。栞子の成長のきっかけとなった。',
      },
    ],
  },
  personality: {
    traits: [
      '豪放磊落で心が大きい',
      '小さなことにこだわらない',
      '自信に満ちている',
      '経験を重視する',
      '妹思いで指導力がある',
    ],
    speechPatterns: [
      'フランクで親しみやすい話し方',
      '栞子（妹への呼びかけ）',
      '経験談を交えた説得力のある発言',
      '前向きで励ましの言葉が多い',
    ],
  },
  emotionalStates: [],
  relationships: [],
  specialSystem: {
    type: 'mentorship_guidance',
    description: '指導者としての薫子の影響力システム',
    rules: {
      triggerWords: ['栞子', '適性', '情熱', '後悔', '夢'],
      guidanceStates: {
        encouraging: '励ましている状態。相手の可能性を信じている',
        corrective: '誤解を正そうとする状態。真実を伝えようとしている',
        supportive: '支援的な状態。経験を基にアドバイスしている',
        inspiring: '鼓舞する状態。情熱の価値を伝えている',
      },
    },
  },
  color: 'from-purple-400 to-pink-500',
};
