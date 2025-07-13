'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/game-store';

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

const characters = [
  {
    id: 'ayumu_uehara',
    name: '上原歩夢',
    unit: 'A・ZU・NA',
    color: 'from-pink-300 to-rose-400',
    emoji: ayumuProfile.emoji,
    description: ayumuProfile.uiDescription
  },
  {
    id: 'setsuna_yuki',
    name: '優木せつ菜',
    unit: 'A・ZU・NA',
    color: 'from-red-300 to-pink-400',
    emoji: setsunaProfile.emoji,
    description: setsunaProfile.uiDescription
  },
  {
    id: 'ai_miyashita',
    name: '宮下 愛',
    unit: 'DiverDiva',
    color: 'from-yellow-300 to-orange-400',
    emoji: aiProfile.emoji,
    description: aiProfile.uiDescription
  },
  {
    id: 'kasumi_nakasu',
    name: '中須かすみ',
    unit: 'QU4RTZ',
    color: 'from-purple-300 to-pink-400',
    emoji: kasumiProfile.emoji,
    description: kasumiProfile.uiDescription
  },
  {
    id: 'shizuku_osaka',
    name: '桜坂しずく',
    unit: 'A・ZU・NA',
    color: 'from-blue-300 to-purple-400',
    emoji: shizukuProfile.emoji,
    description: shizukuProfile.uiDescription
  },
  {
    id: 'rina_tennoji',
    name: '天王寺璃奈',
    unit: 'QU4RTZ',
    color: 'from-gray-300 to-blue-400',
    emoji: rinaProfile.emoji,
    description: rinaProfile.uiDescription
  },
  {
    id: 'shioriko_mifune',
    name: '三船栞子',
    unit: 'R3BIRTH',
    color: 'from-indigo-300 to-purple-400',
    emoji: shiorikoProfile.emoji,
    description: shiorikoProfile.uiDescription
  },
  {
    id: 'lanzhu_zhong',
    name: '鐘嵐珠',
    unit: 'R3BIRTH',
    color: 'from-amber-300 to-yellow-400',
    emoji: lanzhuProfile.emoji,
    description: lanzhuProfile.uiDescription
  },
  {
    id: 'karin_asaka',
    name: '朝香果林',
    unit: 'DiverDiva',
    color: 'from-purple-400 to-pink-500',
    emoji: karinProfile.emoji,
    description: karinProfile.uiDescription
  },
  {
    id: 'emma_verde',
    name: 'エマ・ヴェルデ',
    unit: 'QU4RTZ',
    color: 'from-green-300 to-emerald-400',
    emoji: emmaProfile.emoji,
    description: emmaProfile.uiDescription
  },
  {
    id: 'kanata_konoe',
    name: '近江彼方',
    unit: 'QU4RTZ',
    color: 'from-purple-200 to-purple-300',
    emoji: kanataProfile.emoji,
    description: kanataProfile.uiDescription
  },
  {
    id: 'mia_taylor',
    name: 'ミア・テイラー',
    unit: 'R3BIRTH',
    color: 'from-cyan-300 to-blue-400',
    emoji: miaProfile.emoji,
    description: miaProfile.uiDescription
  },
];

export default function CharacterSelector() {
  const { currentCharacterId, setCurrentCharacter, resetConversation } = useGameStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const handleCharacterChange = (characterId: string) => {
    if (characterId !== currentCharacterId) {
      resetConversation();
      setCurrentCharacter(characterId);
    }
    setIsExpanded(false);
    setSelectedCharacter(null);
    setHoveredCharacter(null);
  };

  const handleMouseEnter = (characterId: string) => {
    setHoveredCharacter(characterId);
    setSelectedCharacter(characterId);
  };

  const currentCharacter = characters.find(char => char.id === currentCharacterId);
  const otherCharacters = characters.filter(char => char.id !== currentCharacterId);
  const displayCharacter = selectedCharacter 
    ? characters.find(char => char.id === selectedCharacter) 
    : currentCharacter;

  return (
    <>
      {/* 背景オーバーレイ（展開時のみ） */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* 右上のトリガーボタン */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentCharacter?.color} 
            flex items-center justify-center text-2xl shadow-xl border-3 border-card
            transition-all duration-300 hover:scale-110 ${
              isExpanded ? 'scale-90 opacity-50' : ''
            }`}
        >
          {currentCharacter?.emoji}
        </button>
        
        {/* 展開/閉じるアイコン */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full 
          flex items-center justify-center shadow-lg transition-all duration-300
          ${isExpanded ? 'bg-destructive' : 'bg-primary'}`}>
          <span className="text-card text-xs font-bold">
            {isExpanded ? '×' : '+'}
          </span>
        </div>
      </div>

      {/* 展開時の輪状配置 */}
      {isExpanded && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* キャラクター輪（真の中央配置） */}
          <div className="relative">
            {otherCharacters.map((character, index) => {
              const angle = (index * 360) / otherCharacters.length;
              const radius = 140; // 輪を少し大きく
              const radian = (angle * Math.PI) / 180;
              const x = Math.cos(radian) * radius;
              const y = Math.sin(radian) * radius;

              return (
                <button
                  key={character.id}
                  onClick={() => handleCharacterChange(character.id)}
                  onMouseEnter={() => handleMouseEnter(character.id)}
                  onMouseLeave={() => setHoveredCharacter(null)}
                  className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${character.color}
                    flex items-center justify-center text-2xl shadow-xl border-3 border-card
                    transition-all duration-300 hover:shadow-2xl hover:drop-shadow-2xl hover:scale-110
                    animate-in fade-in zoom-in`}
                  style={{
                    transform: `translate(${x - 32}px, ${y - 32}px)`, // ボタンサイズの半分を引いて中央揃え
                    animationDelay: `${index * 100}ms`,
                  }}
                  title={character.name}
                >
                  {character.emoji}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 情報表示カード（画面下部固定） */}
      {isExpanded && displayCharacter && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50
          bg-card/95 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl border border-border
          transition-all duration-300 min-w-64 max-w-80 mx-4">
          <div className="text-center">
            <div className="text-4xl mb-4">
              {displayCharacter.emoji}
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-3">
              {displayCharacter.name}
            </div>
            <div className="text-sm text-primary font-semibold mb-4 px-4 py-2 bg-primary/10 rounded-full inline-block">
              {displayCharacter.unit}
            </div>
            <div className="text-base text-muted-foreground leading-relaxed">
              {displayCharacter.description}
            </div>
          </div>
        </div>
      )}
    </>
  );
}