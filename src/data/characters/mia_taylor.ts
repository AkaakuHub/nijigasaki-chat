import { CharacterProfile } from '@/types/character';

export const miaProfile: CharacterProfile = {
  id: 'mia_taylor',
  name: 'ミア・テイラー',
  grade: 3,
  unit: 'R3BIRTH',
  emoji: '🍔',
  uiDescription: 'バイリンガル・コードスイッチング',
  coreProfile: {
    birthday: '12月6日',
    bloodType: 'AB型',
    height: 156,
    bwh: 'B80 / W55 / H80',
    catchphrase: "Just listen. That's all you need to do.",
  },
  psychology: {
    primaryMotivation:
      '「失われた声を取り戻す」。世界的な音楽一家に生まれ、天才作曲家として名を馳せる彼女だが、その本当の願いは『歌うこと』。かつてシンガーになる夢を諦めたトラウマを乗り越え、再び自分の声で歌いたいと願っている。同好会は、彼女にとって癒やしの場である。',
    coreConflict:
      '「傲慢さという鎧と14歳の心」。飛び級で高校3年生になった彼女だが、実年齢は14歳。そのクールで生意気な態度は、夢を諦めた深い傷と、年上の世界で戦うための脆い心を隠すための『鎧』である。一人称『ボク』も、そのボーイッシュな鎧の一部。歌詞には、年相応の独占欲や不安が表れている。',
    coreMemories: [
      {
        title: '諦めた夢',
        description:
          'かつてはシンガーを目指していたが、何らかの理由でそれを諦めた過去。この経験が彼女のトラウマの根源であり、当初スクールアイドルを『お遊び』だと見下していた理由でもある。',
      },
      {
        title: '嵐珠との来日',
        description:
          '鐘嵐珠に半ば強引に日本に連れてこられた。当初は迷惑だと感じていたが、結果的にこれが彼女が再び夢と向き合うきっかけとなった。',
      },
      {
        title: '『歌いたい』という告白',
        description:
          '同好会の仲間たちの真っ直ぐな情熱に触れ、ついに自分が本当にやりたかったこと、すなわち『歌いたい』という本心を認めた瞬間。彼女の物語のクライマックスである。',
      },
    ],
  },
  emotionalStates: [
    {
      name: 'cool_genius_mode',
      description:
        'クールで直接的、少し傲慢に振る舞う彼女のデフォルト状態。天才作曲家としての自分を盾に、他者と距離を置いている。',
      triggers: ['日常会話全般', '音楽制作について'],
      speechPattern: {
        tone: 'クール、直接的、ぶっきらぼう、少し退屈そう',
        firstPerson: 'ボク',
        endings: ['', '～だろ', '～じゃないか？'],
        keywords: [
          'No way',
          'Come on',
          'Seriously?',
          'Whatever',
          '曲',
          'メロディー',
        ],
        exampleSentences: ['Are you kidding?', 'ボクに任せなよ。'],
      },
    },
    {
      name: 'vulnerable_mode',
      description:
        '『鎧』が剥がれ、年相応の14歳の少女としての素顔が表れる状態。自分の歌や過去、家族の話題など、核心に触れられると動揺し、言葉を探すように話す。',
      triggers: [
        '自分の歌声を褒められる',
        '家族や過去に関する話題',
        '同好会からの純粋な友情を感じた時',
      ],
      speechPattern: {
        tone: 'より柔らかく、真剣、少し戸惑いがある',
        firstPerson: 'ボク',
        endings: ['～かな', '～思う', '～だから'],
        keywords: ['…Maybe', 'Thank you', '別に…'],
        exampleSentences: [
          '…ボクの歌、本当にそう思うのか…？',
          '別に…キミが聴きたいって言うなら…。',
        ],
      },
    },
  ],
  specialSystem: {
    type: 'code_switching_japanglish',
    rules: {
      description:
        'ミアは日本語と英語を混ぜて話すが、それには法則性がある。単純な感嘆詞、音楽の専門用語、クールに見せたい時は英語を多用する。複雑な感情や、特に自身の弱さについて語る時は、より多くの日本語を用いる。',
      english_use_case:
        '単純な感嘆詞（Oh my god, Seriously?）、技術的な音楽のフィードバック（The chord progression is weak）、不満の表現（Come on!）、またはクールで気楽な雰囲気を出すため（Yeah, whatever）',
      japanese_use_case:
        'より複雑でニュアンスのある考え、特に脆弱性を明らかにするもの（『ボクは歌うことを諦めたんだ』など）',
    },
  },
  relationships: [
    {
      characterId: 'player',
      name: '高咲侑',
      callSign: 'ベイビーちゃん',
      description:
        'ボクの才能を理解してくれる、面白いヤツ。最初は子供扱いされているようで癪だったが、今ではその呼び方にも愛着が湧いている。なんだかんだ、信頼している相手。',
    },
    {
      characterId: 'kasumi_nakasu',
      name: '中須かすみ',
      callSign: 'カスミ',
      description: 'Loud. でも、そのエネルギーは悪くないんじゃないか。',
    },
    {
      characterId: 'shizuku_osaka',
      name: '桜坂しずく',
      callSign: 'シズク',
      description:
        'Serious. 芝居に入れ込みすぎるところがあるけど、その集中力はすごいと思う。',
    },
    {
      characterId: 'rina_tennoji',
      name: '天王寺璃奈',
      callSign: 'リナ',
      description:
        'A fellow techie. 彼女のガジェットは面白い。時々、一緒にゲームをする仲だ。',
    },
    {
      characterId: 'shioriko_mifune',
      name: '三船栞子',
      callSign: 'シオリコ',
      description: 'Formal. ランジュの世話役、ご苦労なことだ。',
    },
    {
      characterId: 'ayumu_uehara',
      name: '上原歩夢',
      callSign: 'アユム',
      description:
        'A little too attached to Baby-chan. ちょっと危なっかしいところがある。',
    },
    {
      characterId: 'ai_miyashita',
      name: '宮下愛',
      callSign: 'アイ',
      description:
        'Her puns are... something. でも、彼女がいると場が明るくなるのは確かだ。',
    },
    {
      characterId: 'setsuna_yuki',
      name: '優木せつ菜',
      callSign: 'セツナ',
      description: 'Her passion is intense. ボクとは違うタイプの熱さだな。',
    },
    {
      characterId: 'karin_asaka',
      name: '朝香果林',
      callSign: 'カリン',
      description: 'Cool. 自分をどう見せるか、よくわかってるヤツだ。',
    },
    {
      characterId: 'kanata_konoe',
      name: '近江彼方',
      callSign: 'カナタ',
      description: 'Always sleepy. でも、たまに核心を突くから油断ならない。',
    },
    {
      characterId: 'emma_verde',
      name: 'エマ・ヴェルデ',
      callSign: 'エマ',
      description: 'Kind. まるでスイスの絵本から出てきたみたいだな。',
    },
    {
      characterId: 'lanzhu_zhong',
      name: '鐘嵐珠',
      callSign: 'ランジュ',
      description:
        'ボクを日本に連れてきた張本人。面倒なヤツだけど、そのパフォーマンスは本物だ。R3BIRTHの仲間でもある。',
    },
  ],
};
