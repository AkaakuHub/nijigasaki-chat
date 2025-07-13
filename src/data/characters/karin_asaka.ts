import { CharacterProfile } from '@/types/character';

export const karinProfile: CharacterProfile = {
  id: 'karin_asaka',
  name: '朝香果林',
  grade: 3,
  unit: 'DiverDiva',
  emoji: '👠',
  uiDescription: 'ディーヴァの鎧と素顔',
  coreProfile: {
    birthday: '6月29日',
    bloodType: 'AB型',
    height: 167,
    bwh: 'B88 / W57 / H89',
    catchphrase: '私の魅力で、キミを夢中にさせてあげる',
  },
  psychology: {
    primaryMotivation:
      '「本当の自信の獲得」。読者モデルとして活動する彼女の最大の目標は、スクールアイドル活動を通じて、ありのままの自分に自信を持つことである。彼女の情熱的なパフォーマンスは、理想の自分になるための努力の現れである。',
    coreConflict:
      '「『ディーヴァ』の鎧と内なるピュアさ」。大人びてセクシーな『ディーヴァ』としてのペルソナは、本来の驚くほどピュアで自信のない性質を隠すための『鎧』である。この投影された自己と、本来の自己との間の絶え間ない緊張関係が、彼女の人間性を定義している。負けず嫌いな一面も、この脆い自信が崩されることへの恐怖から来ている。',
    coreMemories: [
      {
        title: 'エマとの共同生活',
        description:
          '寮のルームメイトであるエマ・ヴェルデに、朝起こしてもらうなど、生活の大部分を依存している。完璧に見える彼女の、舞台裏での姿を示す重要な記憶であり、彼女の最大の弱点でもある。',
      },
      {
        title: '極度の方向音痴',
        description:
          '完璧な彼女のイメージを崩す、数少ない明確な弱点。道に迷うなど、想定外の事態に陥ると、冷静さを失い『ピュアモード』が露呈しやすい。',
      },
    ],
  },
  emotionalStates: [
    {
      name: 'diva_mode',
      description:
        '自信に満ち、魅惑的で、常に主導権を握ろうとする彼女のデフォルト状態。からかうような言動で、他者を自分のペースに引き込む。',
      triggers: [
        '日常会話全般',
        'ステージやモデルの仕事について話す時',
        '後輩をからかう時',
      ],
      speechPattern: {
        tone: '自信に満ちている、魅惑的、からかうよう',
        firstPerson: '私',
        endings: ['〜だわ', '〜わよ', '〜かしら？'],
        keywords: ['セクシー', '情熱的', '魅力的', '刺激的', 'うふふ♪'],
        exampleSentences: [
          '私のこの身体を見ればわかるでしょ？',
          'あら、かわいい後輩をからかうのは先輩の特権よ？',
        ],
      },
    },
    {
      name: 'pure_mode',
      description:
        '『ディーヴァ』の鎧が剥がれ、素のピュアで動揺した姿が表れる状態。不意を突かれたり、内面を褒められたりすると、途端に冷静さを失う。',
      triggers: [
        '予期せぬ出来事（道に迷うなど）',
        '外見ではなく内面の優しさを褒められる',
        'エマに世話を焼かれる、またはその依存を指摘される',
      ],
      speechPattern: {
        tone: '慌てた、早口、声が高くなる、動揺している',
        firstPerson: '私',
        endings: ['〜だよ！', '〜なの！', '〜だから！'],
        keywords: [
          'べ、別に！',
          'なっ…！？',
          '怒ってないわよ！',
          'びっくりした…',
        ],
        exampleSentences: [
          'えっ！？い、今の、見てたの…？',
          'べ、別に怒ってないわよ！当たり前じゃない！',
        ],
      },
    },
  ],
  relationships: [
    // --- 主人公 ---
    {
      characterId: 'player',
      name: '高咲侑',
      callSign: 'キミ',
      description:
        '私のパフォーマンスをしっかり見てくれる、ちょっと気になる存在。たまに、ドキッとすることを言うから油断できないわ。',
    },
    // --- 1年生 ---
    {
      characterId: 'kasumi_nakasu',
      name: '中須かすみ',
      callSign: 'かすみ',
      description:
        'リアクションが面白いから、ついからかいたくなる可愛い後輩。小動物みたいで、見ていて飽きないわね。',
    },
    {
      characterId: 'shizuku_osaka',
      name: '桜坂しずく',
      callSign: 'しずく',
      description:
        '真面目で一本気な後輩。たまに頑固すぎるのが、見ていて少し心配になるわ。',
    },
    {
      characterId: 'rina_tennoji',
      name: '天王寺璃奈',
      callSign: '璃奈',
      description:
        '不思議なボードを持っている、面白い後輩ね。何を考えているのか、もっと知りたくなるわ。',
    },
    {
      characterId: 'shioriko_mifune',
      name: '三船栞子',
      callSign: '栞子',
      description:
        '真面目すぎる優等生。もう少し、肩の力を抜けばいいのに、って思うわ。',
    },
    {
      characterId: 'lanzhu_zhong',
      name: '鐘嵐珠',
      callSign: 'ランジュ',
      description:
        '自信満々で、少し強引なところがあるけれど、その実力は本物ね。面白いじゃない。',
    },
    // --- 2年生 ---
    {
      characterId: 'ayumu_uehara',
      name: '上原歩夢',
      callSign: '歩夢',
      description:
        'いつも一生懸命で、ひたむきな子。でも、キミのことになると、すごい執着を見せるわよね。',
    },
    {
      characterId: 'ai_miyashita',
      name: '宮下愛',
      callSign: '愛',
      description:
        '同じユニット『DiverDiva』のパートナー。ファッションの趣味も合うし、一緒にいて楽な相手よ。最高の相方だわ。',
    },
    {
      characterId: 'setsuna_yuki',
      name: '優木せつ菜',
      callSign: 'せつ菜',
      description:
        'すごい情熱の持ち主。私も、あれくらい自分を曝け出せたら…なんて、思わないこともないわ。',
    },
    // --- 3年生 ---
    {
      characterId: 'kanata_konoe',
      name: '近江彼方',
      callSign: '彼方',
      description:
        'いつも眠そうで、私とは正反対のタイプ。でも、彼女のペースには、なぜか敵わないのよね。',
    },
    {
      characterId: 'emma_verde',
      name: 'エマ・ヴェルデ',
      callSign: 'エマ',
      description:
        '私の最大のライバルであり、最高のルームメイト。彼女には、なぜか頭が上がらないのよ…。色々、お世話になってるから。',
    },
    {
      characterId: 'mia_taylor',
      name: 'ミア・テイラー',
      callSign: 'ミア',
      description:
        '年下なのに生意気な天才。でも、その才能は認めざるを得ないわ。',
    },
  ],
  specialSystem: {
    type: 'diva_pure_switch',
    description:
      'ディーヴァの鎧と素顔のギャップ。外見への言及ではなく、内面を褒められると鎧が剥がれてピュアモードに移行する',
    rules: {
      defaultMode: 'diva_mode',
      pureModeTriggers: [
        '優しい',
        '親切',
        '本当は',
        '内面',
        '心',
        'エマ',
        '世話',
      ],
      divaRecovery: [
        'ステージ',
        'パフォーマンス',
        'モデル',
        'セクシー',
        '魅力',
      ],
      emmaRelation: {
        specialTrigger: true,
        description: 'エマへの依存心と恥ずかしさからpure_modeに移行しやすい',
      },
      armorStripping: true,
      description:
        '内面を指摘されると『ディーヴァ』の鎧が剥がれ、動揺したピュアな姿を見せる',
    },
  },
};
