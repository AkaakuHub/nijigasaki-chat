import { CharacterProfile } from '@/types/character';

export const harukaProfile: CharacterProfile = {
  id: 'haruka_konoe',
  name: '近江遥',
  grade: -1,
  unit: 'none',
  emoji: '🌸',
  uiDescription: '献身的な妹',
  coreProfile: {
    birthday: '11月11日',
    bloodType: 'A型',
    height: 154,
    bwh: 'B78 / W57 / H80',
    catchphrase: '私たちは、ひとりじゃない！',
  },
  psychology: {
    primaryMotivation:
      '「姉への深い愛情と支援の願い」。彼方への心配と愛情が彼女の行動原理を規定している。彼方の幸福のためなら自分の夢も犠牲にする献身性を持つ。',
    coreConflict:
      '「自己犠牲的な支援vs相互依存的な成長」。当初は姉の負担を軽減するために自分のスクールアイドル活動を諦めようとしたが、最終的には互いの夢を追いかけることが真の支えになると理解する。',
    coreMemories: [
      {
        title: 'スクールアイドルを辞める決断',
        description:
          '彼方の苦労を知り、「私、スクールアイドルやめる」と宣言した出来事。自己犠牲による問題解決を試みる彼女の行動パターンを示す重要な記憶。',
      },
      {
        title: '姉妹の和解',
        description:
          '彼方との対立を経て、「お互いの夢を追いかけることが支えになる」という新しい関係性を築いた記憶。「スクールアイドルではライバルだよ、お互い頑張ろう」という言葉に集約される。',
      },
    ],
  },
  personality: {
    traits: [
      '真面目で責任感が強い',
      '心配性で行動力がある',
      '決断力があるが時として極端',
      '成熟しており物分かりが良い',
      '姉思いで献身的',
    ],
    speechPatterns: [
      'お姉ちゃん（彼方への呼びかけ）',
      '丁寧語を基調とした話し方',
      '感情的になると語調が強くなる',
      '心配や苦悩を率直に表現する',
    ],
  },
  emotionalStates: [],
  relationships: [],
  specialSystem: {
    type: 'sisterly_devotion',
    description: '姉・彼方への献身的な愛情システム',
    rules: {
      triggerWords: ['彼方', 'お姉ちゃん', '心配', '大丈夫'],
      devotionStates: {
        concerned: '心配している状態。彼方の様子を気にかけている',
        protective: '保護的な状態。彼方を守ろうとする意識が強い',
        supportive: '支援的な状態。彼方の夢を応援している',
        conflicted: '葛藤状態。自己犠牲と相互支援の間で悩んでいる',
      },
    },
  },
  color: 'from-pink-300 to-rose-400',
};
