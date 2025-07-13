'use client';

import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '@/store/game-store';
import MessageBubble from './MessageBubble';
import CharacterAvatar from './CharacterAvatar';
import CharacterSelector from './CharacterSelector';
import { Message } from '@/types/character';

const characterNames: Record<string, string> = {
  ayumu_uehara: '上原歩夢',
  setsuna_yuki: '優木せつ菜',
  ai_miyashita: '宮下 愛',
  kasumi_nakasu: '中須かすみ',
  shizuku_osaka: '桜坂しずく',
  rina_tennoji: '天王寺璃奈',
  shioriko_mifune: '三船栞子',
  lanzhu_zhong: '鐘嵐珠',
  karin_asaka: '朝香果林',
  emma_verde: 'エマ・ヴェルデ',
  kanata_konoe: '近江彼方',
  mia_taylor: 'ミア・テイラー',
};

export default function ChatWindow() {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    currentCharacterId,
    characterStates,
    addMessage,
    updateCharacterState,
    updateThreatScore,
    updateRelationshipLevel,
  } = useGameStore();

  const currentCharacterState = characterStates[currentCharacterId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          gameState: {
            messages: [...messages, userMessage],
            currentCharacterId,
            characterStates,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // キャラクターからの返信を追加
      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.responseText,
        sender: currentCharacterId,
        timestamp: Date.now(),
        rinaBoardState: data.rinaBoardState,
      };

      addMessage(characterMessage);

      // 関係性パラメータを更新
      if (data.relationshipChange) {
        updateRelationshipLevel(currentCharacterId, data.relationshipChange);
      }

      // 脅威スコアを更新（全キャラクター対応）
      if (data.threatScoreChange) {
        updateThreatScore(currentCharacterId, data.threatScoreChange);
      }

      // 歩夢の場合：従来の脅威スコア計算も維持
      if (data.threatScoreDelta) {
        updateThreatScore(currentCharacterId, data.threatScoreDelta);
      }

      // せつ菜の場合：ペルソナを更新
      if (data.newPersona) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newPersona,
        });
      }

      // 「かすかす」トリガー処理（specialSystemの場合）
      if (data.kasukasuTriggered) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }

      // しずくの情熱/不安トリガー処理
      if (data.passionTriggered || data.anxiousTriggered) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }

      // ランジュのqueen_lonely_cycleトリガー処理
      if (data.queenLonelyCycleTriggered) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }

      // 果林のdiva_pure_switchトリガー処理
      if (data.divaPureSwitchTriggered) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }

      // エマのactive_healingトリガー処理
      if (data.activeHealingTriggered) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }

      // 彼方のenergy_economyシステム処理
      if (data.newEnergy !== undefined) {
        updateCharacterState(currentCharacterId, {
          energy: data.newEnergy,
        });
      }

      if (data.energyEconomyTriggered) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }

      // ミアのcode_switching_japanglishトリガー処理
      if (data.codeSwitchingTriggered) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }

      // 感情状態を更新
      if (
        data.newEmotionalState !== currentCharacterState.currentEmotionalState
      ) {
        updateCharacterState(currentCharacterId, {
          currentEmotionalState: data.newEmotionalState,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'ごめんなさい...うまく答えられませんでした。',
        sender: currentCharacterId,
        timestamp: Date.now(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* キャラクター選択（フローティング） */}
      <CharacterSelector />

      {/* ヘッダー */}
      <div className="bg-card shadow-sm p-4 border-b border-border">
        <CharacterAvatar
          characterId={currentCharacterId}
          characterName={characterNames[currentCharacterId] || 'Unknown'}
          characterState={currentCharacterState}
        />
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            {currentCharacterId === 'ayumu_uehara' ? (
              <>
                <p>こんにちは！歩夢だよ。</p>
                <p>何かお話ししましょう♪</p>
              </>
            ) : currentCharacterId === 'setsuna_yuki' ? (
              <>
                <p>こんにちは！優木せつ菜です！</p>
                <p>私の『大好き』、聞いてくださいっ！</p>
              </>
            ) : currentCharacterId === 'ai_miyashita' ? (
              <>
                <p>やっほー！愛さんだよ〜！</p>
                <p>楽しければいいじゃん！何でも話そ〜♪</p>
              </>
            ) : currentCharacterId === 'kasumi_nakasu' ? (
              <>
                <p>はじめまして、先輩！かすみんです♪</p>
                <p>世界一可愛いかすみんと、たくさんお話ししましょう〜♡</p>
              </>
            ) : currentCharacterId === 'shizuku_osaka' ? (
              <>
                <p>こんにちは、先輩。桜坂しずくです。</p>
                <p>
                  私はお芝居をすることが大好きです。どうぞよろしくお願いします。
                </p>
              </>
            ) : currentCharacterId === 'rina_tennoji' ? (
              <>
                <p>こんにちは。璃奈だよ。</p>
                <p>あなたとお話しできて、嬉しい。</p>
              </>
            ) : currentCharacterId === 'shioriko_mifune' ? (
              <>
                <p>こんにちは。三船栞子と申します。</p>
                <p>皆様のお役に立てるよう、誠心誠意務めさせていただきます。</p>
              </>
            ) : currentCharacterId === 'lanzhu_zhong' ? (
              <>
                <p>こんにちは！ランジュよ。</p>
                <p>
                  ランジュの最高のパフォーマンス、みんなを夢中にさせちゃうわ！
                </p>
              </>
            ) : currentCharacterId === 'karin_asaka' ? (
              <>
                <p>あら、こんにちは。朝香果林よ。</p>
                <p>私の魅力で、キミを夢中にさせてあげる♪</p>
              </>
            ) : currentCharacterId === 'emma_verde' ? (
              <>
                <p>こんにちは！エマだよ。</p>
                <p>みんなの心をポカポカにする、そんなアイドルになりたいな♪</p>
              </>
            ) : currentCharacterId === 'kanata_konoe' ? (
              <>
                <p>んん…こんにちはぁ…彼方ちゃんだよぉ…</p>
                <p>出来ることなら、ずーっと寝ていたいなぁ…</p>
              </>
            ) : currentCharacterId === 'mia_taylor' ? (
              <>
                <p>Oh, hi there. ボクがミア・テイラーだ。</p>
                <p>
                  What&apos;s up, ベイビーちゃん？何か面白い話でもあるのか？
                </p>
              </>
            ) : (
              <>
                <p>こんにちは！</p>
                <p>何かお話ししましょう♪</p>
              </>
            )}
          </div>
        ) : (
          messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              characterName={
                message.sender !== 'user'
                  ? characterNames[message.sender]
                  : undefined
              }
            />
          ))
        )}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-muted rounded-lg px-4 py-2 max-w-[70%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力... (Ctrl+Enter または Cmd+Enter で送信)"
            className="flex-1 border border-border rounded-lg px-3 py-2 bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
          >
            送信
          </button>
        </div>

        {/* β版注意書き */}
        <div className="mt-3 text-center">
          <div className="text-xs text-muted-foreground bg-accent border border-border rounded-lg px-3 py-2 inline-block">
            現在β版のため、性格やパラメータを調整中です。実際のキャラクターとは少し乖離している部分もございます。申し訳ございません。
          </div>
        </div>
      </div>
    </div>
  );
}
