import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatePrompt, calculateThreatScoreDelta, detectPersonaSwitch, shouldGeneratePun } from '@/lib/prompt-generator';
import { GameState, ApiResponse } from '@/types/character';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, gameState }: { message: string; gameState: GameState } = await request.json();

    if (!message || !gameState) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // キャラクタープロファイルを取得
    const characterId = gameState.currentCharacterId;
    const profileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/characters/${characterId}`
    );
    
    if (!profileResponse.ok) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }
    
    const profile = await profileResponse.json();

    // 脅威スコアの変動を計算（歩夢の場合のみ）
    let threatScoreDelta = 0;
    if (characterId === 'ayumu_uehara') {
      threatScoreDelta = calculateThreatScoreDelta(message);
    }

    // ペルソナ切り替えを検出（せつ菜の場合のみ）
    let newPersona = null;
    if (profile.specialSystem?.type === 'persona_switching') {
      newPersona = detectPersonaSwitch(message, profile);
    }

    // ダジャレシステムを検出（愛の場合のみ）
    let punType = null;
    if (profile.specialSystem?.type === 'pun_system') {
      punType = shouldGeneratePun(message, profile);
    }

    // 「かすかす」トリガー検出（specialSystemがkasukasu_triggerの場合）
    let kasukasuTriggered = false;
    if (profile.specialSystem?.type === 'kasukasu_trigger') {
      const rules = profile.specialSystem.rules as { triggerWord: string };
      kasukasuTriggered = message.includes(rules.triggerWord);
    }

    // しずくの情熱トリガー検出（specialSystemがpassion_triggerの場合）
    let passionTriggered = false;
    let anxiousTriggered = false;
    if (profile.specialSystem?.type === 'passion_trigger') {
      const rules = profile.specialSystem.rules as { 
        passionTriggers: string[]; 
        anxiousTriggers: string[] 
      };
      passionTriggered = rules.passionTriggers.some(trigger => message.includes(trigger));
      anxiousTriggered = rules.anxiousTriggers.some(trigger => message.includes(trigger));
    }

    // プロンプトを生成
    const prompt = generatePrompt(profile, gameState, message);

    // Gemini APIを呼び出し
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // JSONレスポンスを抽出
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini API');
    }

    // JSONを清潔化
    let cleanJson = jsonMatch[1]
      .replace(/": \+(\d+)/g, '": $1')     // +記号を削除
      .replace(/": -(\d+)/g, '": -$1')     // -記号は保持
      .replace(/,\s*}/g, '}')              // 末尾のカンマを削除
      .replace(/,\s*]/g, ']')              // 配列末尾のカンマを削除
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // 制御文字を削除
      .replace(/　/g, ' ')                 // 全角スペースを半角スペースに変換
      .replace(/…/g, '...')                // 三点リーダーをピリオド3つに変換
      .trim();
    
    let aiResponse: any;
    try {
      aiResponse = JSON.parse(cleanJson);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      console.error('Original JSON:', jsonMatch[1]);
      console.error('Cleaned JSON:', cleanJson);
      throw new Error('Failed to parse JSON response from Gemini API');
    }

    // レスポンスを組み立て
    const response: ApiResponse & { 
      threatScoreDelta?: number; 
      newPersona?: string; 
      punType?: string;
      kasukasuTriggered?: boolean;
      passionTriggered?: boolean;
      anxiousTriggered?: boolean;
    } = {
      ...aiResponse,
    };

    if (characterId === 'ayumu_uehara') {
      response.threatScoreDelta = threatScoreDelta;
    }

    if (newPersona) {
      response.newPersona = newPersona;
    }

    if (punType) {
      response.punType = punType;
    }

    if (kasukasuTriggered) {
      response.kasukasuTriggered = kasukasuTriggered;
      const rules = profile.specialSystem!.rules as { triggeredState: string };
      response.newEmotionalState = rules.triggeredState;
    }

    if (passionTriggered || anxiousTriggered) {
      const rules = profile.specialSystem!.rules as { 
        triggeredState: string; 
        anxiousState: string 
      };
      response.passionTriggered = passionTriggered;
      response.anxiousTriggered = anxiousTriggered;
      response.newEmotionalState = anxiousTriggered ? rules.anxiousState : rules.triggeredState;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}