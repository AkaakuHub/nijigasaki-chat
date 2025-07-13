'use client';

import { useState, useEffect } from 'react';

interface GameStateNotificationProps {
  relationshipLevel: number;
  characterName: string;
  onClose: () => void;
}

export default function GameStateNotification({
  relationshipLevel,
  characterName,
  onClose,
}: GameStateNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [notificationType, setNotificationType] = useState<
    'clear' | 'over' | null
  >(null);

  useEffect(() => {
    let newNotificationType: 'clear' | 'over' | null = null;

    if (relationshipLevel >= 100) {
      newNotificationType = 'clear';
    } else if (relationshipLevel <= 0) {
      newNotificationType = 'over';
    }

    console.log('GameStateNotification Debug:', {
      relationshipLevel,
      newNotificationType,
      currentNotificationType: notificationType,
      shouldUpdate:
        newNotificationType && newNotificationType !== notificationType,
    });

    if (newNotificationType && newNotificationType !== notificationType) {
      console.log('通知タイプを設定:', newNotificationType);
      setNotificationType(newNotificationType);
      setIsVisible(true);
    }
  }, [relationshipLevel]);

  // コンポーネントがマウントされた時に即座に表示開始
  useEffect(() => {
    if (notificationType) {
      setIsVisible(true);
    }
  }, [notificationType]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setNotificationType(null);
      onClose();
    }, 300);
  };

  if (!notificationType) return null;

  const isGameClear = notificationType === 'clear';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div
        className={`max-w-md mx-4 p-8 rounded-xl shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        } ${
          isGameClear
            ? 'bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-300'
            : 'bg-card border-2 border-border'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
          {/* アイコン */}
          <div className="mb-6">
            {isGameClear ? (
              <div className="text-6xl">💕</div>
            ) : (
              <div className="text-6xl">💔</div>
            )}
          </div>

          {/* タイトル */}
          <h2
            className={`text-2xl font-bold mb-4 ${
              isGameClear ? 'text-pink-800' : 'text-foreground'
            }`}
          >
            {isGameClear ? 'GAME CLEAR!' : 'GAME OVER'}
          </h2>

          {/* メッセージ */}
          <p
            className={`text-lg mb-6 ${
              isGameClear ? 'text-pink-700' : 'text-foreground'
            }`}
          >
            {isGameClear
              ? `${characterName}との関係が最高レベルに達しました！`
              : `${characterName}との関係が破綻してしまいました...`}
          </p>

          {/* 親密度表示 */}
          <div className="mb-6">
            <div
              className={`text-sm font-medium mb-2 ${
                isGameClear ? 'text-pink-600' : 'text-muted-foreground'
              }`}
            >
              親密度レベル
            </div>
            <div
              className={`text-3xl font-bold ${
                isGameClear ? 'text-pink-800' : 'text-foreground'
              }`}
            >
              {relationshipLevel} / 100
            </div>
          </div>

          {/* 継続メッセージ */}
          <p
            className={`text-sm mb-6 ${
              isGameClear ? 'text-pink-600' : 'text-muted-foreground'
            }`}
          >
            {isGameClear
              ? 'おめでとうございます！これからもお話を続けられます。'
              : '会話は続けられますが、関係を修復するのは困難です...'}
          </p>

          {/* 閉じるボタン */}
          <button
            onClick={handleClose}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isGameClear
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
            }`}
          >
            続ける
          </button>
        </div>
      </div>
    </div>
  );
}
