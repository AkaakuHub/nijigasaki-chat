'use client';

import { CharacterState } from '@/types/character';

interface CharacterAvatarProps {
  characterId: string;
  characterName: string;
  characterState: CharacterState;
}

export default function CharacterAvatar({ characterId, characterName, characterState }: CharacterAvatarProps) {
  const getEmotionalStateColor = (state: string) => {
    switch (state) {
      case 'stable':
        return 'bg-accent text-accent-foreground';
      case 'anxious':
        return 'bg-secondary text-secondary-foreground';
      case 'threatened':
        return 'bg-destructive/10 text-destructive';
      case 'setsuna_mode':
        return 'bg-destructive/10 text-destructive';
      case 'nana_mode':
        return 'bg-primary/10 text-primary';
      case 'otaku_mode':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getEmotionalStateLabel = (state: string) => {
    switch (state) {
      case 'stable':
        return '安定';
      case 'anxious':
        return '不安';
      case 'threatened':
        return '脅威';
      case 'setsuna_mode':
        return 'せつ菜モード';
      case 'nana_mode':
        return '菜々モード';
      case 'otaku_mode':
        return 'オタクモード';
      default:
        return state;
    }
  };

  const getThreatScoreColor = (score: number) => {
    if (score >= 70) return 'text-destructive';
    if (score >= 40) return 'text-secondary-foreground';
    return 'text-accent-foreground';
  };

  return (
    <div className="bg-card rounded-lg shadow-md border border-border p-4 mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center border border-border">
          <span className="text-primary font-bold text-lg">
            {characterName.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-card-foreground">{characterName}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getEmotionalStateColor(
                characterState.currentEmotionalState
              )}`}
            >
              {getEmotionalStateLabel(characterState.currentEmotionalState)}
            </span>
            <span className="text-sm text-muted-foreground">
              親密度: {characterState.relationshipLevel}/100
            </span>
          </div>
          {characterId === 'ayumu_uehara' && characterState.threatScore !== undefined && (
            <div className="mt-1">
              <span className="text-sm text-muted-foreground">脅威度: </span>
              <span className={`text-sm font-medium ${getThreatScoreColor(characterState.threatScore)}`}>
                {characterState.threatScore}/100
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}