import { create } from 'zustand';
import { Message, CharacterState, GameState } from '@/types/character';

interface GameStore extends GameState {
  setCurrentCharacter: (id: string) => void;
  addMessage: (message: Message) => void;
  updateCharacterState: (id: string, newState: Partial<CharacterState>) => void;
  updateThreatScore: (characterId: string, delta: number) => void;
  updateRelationshipLevel: (characterId: string, delta: number) => void;
  resetConversation: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  messages: [],
  currentCharacterId: 'ayumu_uehara',
  characterStates: {
    ayumu_uehara: {
      relationshipLevel: 50,
      currentEmotionalState: 'stable',
      unlockedMemories: [],
      threatScore: 0,
    },
    setsuna_yuki: {
      relationshipLevel: 50,
      currentEmotionalState: 'setsuna_mode',
      unlockedMemories: [],
    },
    ai_miyashita: {
      relationshipLevel: 50,
      currentEmotionalState: 'social_mode',
      unlockedMemories: [],
    },
    kasumi_nakasu: {
      relationshipLevel: 50,
      currentEmotionalState: 'kasumin_mode',
      unlockedMemories: [],
    },
    shizuku_osaka: {
      relationshipLevel: 50,
      currentEmotionalState: 'formal_mode',
      unlockedMemories: [],
    },
    rina_tennoji: {
      relationshipLevel: 50,
      currentEmotionalState: 'flat_tone_mode',
      unlockedMemories: [],
    },
    shioriko_mifune: {
      relationshipLevel: 50,
      currentEmotionalState: 'formal_guardian_mode',
      unlockedMemories: [],
    },
    lanzhu_zhong: {
      relationshipLevel: 50,
      currentEmotionalState: 'queen_mode',
      unlockedMemories: [],
    },
    karin_asaka: {
      relationshipLevel: 50,
      currentEmotionalState: 'diva_mode',
      unlockedMemories: [],
    },
    emma_verde: {
      relationshipLevel: 50,
      currentEmotionalState: 'warm_shepherd_mode',
      unlockedMemories: [],
    },
    kanata_konoe: {
      relationshipLevel: 50,
      currentEmotionalState: 'sleepy_mode',
      unlockedMemories: [],
      energy: 60,
    },
    mia_taylor: {
      relationshipLevel: 50,
      currentEmotionalState: 'cool_genius_mode',
      unlockedMemories: [],
    },
  },

  setCurrentCharacter: (id: string) => set({ currentCharacterId: id }),

  addMessage: (message: Message) =>
    set(state => ({
      messages: [...state.messages, message],
    })),

  updateCharacterState: (id: string, newState: Partial<CharacterState>) =>
    set(state => ({
      characterStates: {
        ...state.characterStates,
        [id]: {
          ...state.characterStates[id],
          ...newState,
        },
      },
    })),

  updateThreatScore: (characterId: string, delta: number) => {
    const state = get();
    const currentState = state.characterStates[characterId];
    if (!currentState) return;

    const newThreatScore = Math.max(
      0,
      Math.min(100, (currentState.threatScore || 0) + delta)
    );

    // 脅威スコアに基づいて感情状態を更新（3段階）
    let newEmotionalState = currentState.currentEmotionalState;
    if (newThreatScore >= 70) {
      newEmotionalState = 'threatened';
    } else if (newThreatScore >= 31) {
      newEmotionalState = 'anxious';
    } else {
      newEmotionalState = 'stable';
    }

    set(state => ({
      characterStates: {
        ...state.characterStates,
        [characterId]: {
          ...state.characterStates[characterId],
          threatScore: newThreatScore,
          currentEmotionalState: newEmotionalState,
        },
      },
    }));
  },

  updateRelationshipLevel: (characterId: string, delta: number) => {
    set(state => {
      const currentState = state.characterStates[characterId];
      if (!currentState) return state;

      const newRelationshipLevel = Math.max(
        0,
        Math.min(100, currentState.relationshipLevel + delta)
      );

      return {
        characterStates: {
          ...state.characterStates,
          [characterId]: {
            ...currentState,
            relationshipLevel: newRelationshipLevel,
          },
        },
      };
    });
  },

  resetConversation: () =>
    set({
      messages: [],
      characterStates: {
        ayumu_uehara: {
          relationshipLevel: 50,
          currentEmotionalState: 'stable',
          unlockedMemories: [],
          threatScore: 0,
        },
        setsuna_yuki: {
          relationshipLevel: 50,
          currentEmotionalState: 'setsuna_mode',
          unlockedMemories: [],
        },
        ai_miyashita: {
          relationshipLevel: 50,
          currentEmotionalState: 'social_mode',
          unlockedMemories: [],
        },
        kasumi_nakasu: {
          relationshipLevel: 50,
          currentEmotionalState: 'kasumin_mode',
          unlockedMemories: [],
        },
        shizuku_osaka: {
          relationshipLevel: 50,
          currentEmotionalState: 'formal_mode',
          unlockedMemories: [],
        },
        rina_tennoji: {
          relationshipLevel: 50,
          currentEmotionalState: 'flat_tone_mode',
          unlockedMemories: [],
        },
        shioriko_mifune: {
          relationshipLevel: 50,
          currentEmotionalState: 'formal_guardian_mode',
          unlockedMemories: [],
        },
        lanzhu_zhong: {
          relationshipLevel: 50,
          currentEmotionalState: 'queen_mode',
          unlockedMemories: [],
        },
        karin_asaka: {
          relationshipLevel: 50,
          currentEmotionalState: 'diva_mode',
          unlockedMemories: [],
        },
        emma_verde: {
          relationshipLevel: 50,
          currentEmotionalState: 'warm_shepherd_mode',
          unlockedMemories: [],
        },
        kanata_konoe: {
          relationshipLevel: 50,
          currentEmotionalState: 'sleepy_mode',
          unlockedMemories: [],
          energy: 60,
        },
        mia_taylor: {
          relationshipLevel: 50,
          currentEmotionalState: 'cool_genius_mode',
          unlockedMemories: [],
        },
      },
    }),
}));
