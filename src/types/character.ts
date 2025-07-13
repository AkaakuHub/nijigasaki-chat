// 感情やペルソナの状態を定義
export type EmotionalState = {
  name: string; // 例: "stable", "threatened"
  description: string;
  triggers: string[]; // この状態になるトリガー
  speechPattern: SpeechPattern;
};

// 話し方のパターン
export type SpeechPattern = {
  tone: string;
  firstPerson: string;
  endings?: string[]; // 例: ["〜だよ", "〜だよね"]
  keywords?: string[];
  exampleSentences: string[];
};

// 主要な人間関係
export type Relationship = {
  characterId: string; // 相手のID (例: 'yu_takasaki')
  name: string;
  callSign: string; // 呼び方 (例: "侑ちゃん")
  description: string;
};

// キャラクタープロファイルの全体像
export type CharacterProfile = {
  id: string; // 例: "ayumu_uehara"
  name: string;
  grade: number;
  unit: 'A・ZU・NA' | 'QU4RTZ' | 'DiverDiva' | 'R3BIRTH' | 'none';
  emoji: string; // UI用の絵文字
  uiDescription: string; // UI用の短い説明文
  
  // 基本プロフィール
  coreProfile: {
    birthday: string;
    bloodType: string;
    height: number;
    bwh: string;
    catchphrase: string;
  };

  // 心理分析
  psychology: {
    primaryMotivation: string;
    coreConflict: string;
    coreMemories: Array<{ title: string; description: string; }>;
  };

  // 感情モデルとペルソナ
  emotionalStates: EmotionalState[];

  // 人間関係
  relationships: Relationship[];
  
  // 特殊システム (該当キャラクターのみ)
  specialSystem?: {
    type: 'dual_channel' | 'pun_system' | 'persona_switching' | 'kasukasu_trigger' | 'passion_trigger' | 'growth_reflection' | 'queen_lonely_cycle' | 'diva_pure_switch' | 'active_healing' | 'energy_economy' | 'code_switching_japanglish';
    description?: string; // システムの説明
    rules: Record<string, unknown>; // システムごとに固有のルールを定義
  };
};

// メッセージの型定義
export type Message = {
  id: string;
  text: string;
  sender: 'user' | string; // user または characterId
  timestamp: number;
  rinaBoardState?: string; // 璃奈専用
};

// キャラクターの状態
export type CharacterState = {
  relationshipLevel: number;
  currentEmotionalState: string; // 'stable', 'threatened', etc.
  unlockedMemories: string[];
  threatScore?: number; // 脅威スコア (0-100)
  energy?: number; // エナジー経済システム用 (彼方専用)
};

// ゲーム全体の状態
export type GameState = {
  messages: Message[];
  currentCharacterId: string;
  characterStates: Record<string, CharacterState>;
};

// API応答の型
export type ApiResponse = {
  responseText: string;
  newEmotionalState: string;
  newThreatScore?: number;
  relationshipChange?: number; // 親密度の変動量
  threatScoreChange?: number;  // 脅威スコアの変動量
  rinaBoardState?: string;     // 璃奈ちゃんボードの状態
};