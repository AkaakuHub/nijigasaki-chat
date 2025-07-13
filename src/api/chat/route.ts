import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatePrompt } from '@/lib/prompt-generator';
import { GameState } from '@/types/character';

// キャラクタープロファイルをインポート
import { ayumuProfile } from '@/data/characters/ayumu_uehara';
import { setsunaProfile } from '@/data/characters/setsuna_yuki';
import { aiProfile } from '@/data/characters/ai_miyashita';
import { kasumiProfile } from '@/data/characters/kasumi_nakasu';
import { shizukuProfile } from '@/data/characters/shizuku_osaka';
import { rinaProfile } from '@/data/characters/rina_tennoji';
import { shiorikoProfile } from '@/data/characters/shioriko_mifune';
import { lanzhuProfile } from '@/data/characters/lanzhu_zhong';
import { karinProfile } from '@/data/characters/karin_asaka';
import { emmaProfile } from '@/data/characters/emma_verde';
import { kanataProfile } from '@/data/characters/kanata_konoe';
import { miaProfile } from '@/data/characters/mia_taylor';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const characterProfiles = {
  ayumu_uehara: ayumuProfile,
  setsuna_yuki: setsunaProfile,
  ai_miyashita: aiProfile,
  kasumi_nakasu: kasumiProfile,
  shizuku_osaka: shizukuProfile,
  rina_tennoji: rinaProfile,
  shioriko_mifune: shiorikoProfile,
  lanzhu_zhong: lanzhuProfile,
  karin_asaka: karinProfile,
  emma_verde: emmaProfile,
  kanata_konoe: kanataProfile,
  mia_taylor: miaProfile,
};

export async function POST(request: NextRequest) {
  try {
    const { message, gameState }: { message: string; gameState: GameState } =
      await request.json();

    if (!message || !gameState) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const profile =
      characterProfiles[
        gameState.currentCharacterId as keyof typeof characterProfiles
      ];
    if (!profile) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      );
    }

    const prompt = generatePrompt(profile, gameState, message);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSONレスポンスをパース
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const responseData = JSON.parse(jsonMatch[1]);

    // ペルソナ切り替えロジック（せつ菜用）
    if (profile.id === 'setsuna_yuki') {
      const personaSwitchTriggers = {
        setsuna_mode: [
          '好き',
          '大好き',
          'love',
          'スクールアイドル',
          '情熱',
          '歌',
        ],
        nana_mode: ['生徒会', '会長', '責任', '規則', '義務', '学校'],
        otaku_mode: ['アニメ', '漫画', 'ゲーム', 'オタク', '趣味', '同人'],
      };

      for (const [mode, triggers] of Object.entries(personaSwitchTriggers)) {
        if (triggers.some(trigger => message.includes(trigger))) {
          responseData.newPersona = mode;
          break;
        }
      }
    }

    // かすみの「かすかす」トリガーチェック
    if (profile.id === 'kasumi_nakasu' && message.includes('かすかす')) {
      responseData.kasukasuTriggered = true;
      responseData.newEmotionalState = 'kasukasu_rage_mode';
    }

    // しずくの情熱/不安トリガーチェック
    if (profile.id === 'shizuku_osaka') {
      const passionTriggers = [
        '演劇',
        '舞台',
        '映画',
        'オフィーリア',
        '役',
        '演技',
      ];
      const anxiousTriggers = ['アドリブ', '即興', '素', '自分らしく'];

      if (passionTriggers.some(trigger => message.includes(trigger))) {
        responseData.passionTriggered = true;
        responseData.newEmotionalState = 'passion_mode';
      } else if (anxiousTriggers.some(trigger => message.includes(trigger))) {
        responseData.anxiousTriggered = true;
        responseData.newEmotionalState = 'anxious_mode';
      }
    }

    // ランジュのqueen_lonely_cycleトリガーチェック
    if (profile.id === 'lanzhu_zhong') {
      const lonelyTriggers = ['断る', '拒絶', '理解されない', '遠慮'];
      const queenRecovery = ['褒める', '受け入れる', '感謝', '最高'];

      if (lonelyTriggers.some(trigger => message.includes(trigger))) {
        responseData.queenLonelyCycleTriggered = true;
        responseData.newEmotionalState = 'lonely_mode';
      } else if (queenRecovery.some(trigger => message.includes(trigger))) {
        responseData.queenLonelyCycleTriggered = true;
        responseData.newEmotionalState = 'queen_mode';
      }
    }

    // 果林のdiva_pure_switchトリガーチェック
    if (profile.id === 'karin_asaka') {
      const pureModeTriggers = [
        '優しい',
        '親切',
        '本当は',
        '内面',
        '心',
        'エマ',
        '世話',
      ];
      const divaRecovery = [
        'ステージ',
        'パフォーマンス',
        'モデル',
        'セクシー',
        '魅力',
      ];

      if (pureModeTriggers.some(trigger => message.includes(trigger))) {
        responseData.divaPureSwitchTriggered = true;
        responseData.newEmotionalState = 'pure_mode';
      } else if (divaRecovery.some(trigger => message.includes(trigger))) {
        responseData.divaPureSwitchTriggered = true;
        responseData.newEmotionalState = 'diva_mode';
      }
    }

    // エマのactive_healingトリガーチェック
    if (profile.id === 'emma_verde') {
      const firmKindnessTriggers = [
        '不当',
        '非難',
        '諦め',
        '無理',
        'ダメ',
        'やめろ',
      ];
      const healingTriggers = [
        '悲しい',
        '不安',
        '辛い',
        '疲れた',
        '落ち込む',
        '心配',
      ];

      if (firmKindnessTriggers.some(trigger => message.includes(trigger))) {
        responseData.activeHealingTriggered = true;
        responseData.newEmotionalState = 'firm_kindness_mode';
      } else if (healingTriggers.some(trigger => message.includes(trigger))) {
        responseData.activeHealingTriggered = true;
        responseData.newEmotionalState = 'warm_shepherd_mode';
      }
    }

    // 彼方のenergy_economyシステム処理
    if (profile.id === 'kanata_konoe') {
      const passionTriggers = [
        '遥',
        '妹',
        '料理',
        'お弁当',
        'スクールアイドル',
        '楽しい',
      ];
      const currentEnergy = gameState.characterStates[profile.id].energy || 60;

      let newEnergy = currentEnergy - 3; // 基本消費

      if (passionTriggers.some(trigger => message.includes(trigger))) {
        newEnergy += 25; // 情熱トリガーでエナジー回復
        responseData.energyEconomyTriggered = true;
        responseData.newEmotionalState = 'passion_mode';
      }

      newEnergy = Math.max(0, Math.min(100, newEnergy));
      responseData.newEnergy = newEnergy;

      if (newEnergy < 30 && !responseData.energyEconomyTriggered) {
        responseData.newEmotionalState = 'low_energy_mode';
      }
    }

    // ミアのcode_switching_japanglishトリガーチェック
    if (profile.id === 'mia_taylor') {
      const vulnerabilityTriggers = ['歌', '家族', '過去', '夢', '諦め', '声'];
      const currentState =
        gameState.characterStates[profile.id].currentEmotionalState;

      if (
        vulnerabilityTriggers.some(trigger => message.includes(trigger)) &&
        currentState === 'cool_genius_mode'
      ) {
        responseData.codeSwitchingTriggered = true;
        responseData.newEmotionalState = 'vulnerable_mode';
      } else if (
        currentState === 'vulnerable_mode' &&
        !vulnerabilityTriggers.some(trigger => message.includes(trigger))
      ) {
        responseData.codeSwitchingTriggered = true;
        responseData.newEmotionalState = 'cool_genius_mode';
      }
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
