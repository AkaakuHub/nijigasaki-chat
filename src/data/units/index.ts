import { UnitInfo, UnitId, UnitName } from '@/types/unit';
import { azunaUnit } from './azuna';
import { diverdivaUnit } from './diverdiva';
import { qu4rtzUnit } from './qu4rtz';
import { r3birthUnit } from './r3birth';

// 全ユニット情報のマップ
export const UNITS: Record<UnitId, UnitInfo | null> = {
  azuna: azunaUnit,
  diverdiva: diverdivaUnit,
  qu4rtz: qu4rtzUnit,
  r3birth: r3birthUnit,
  none: null,
} as const;

// ユニットIDからユニット名への変換
export const UNIT_ID_TO_NAME: Record<UnitId, UnitName> = {
  azuna: 'A・ZU・NA',
  diverdiva: 'DiverDiva',
  qu4rtz: 'QU4RTZ',
  r3birth: 'R3BIRTH',
  none: 'none',
} as const;

// ユニット名からユニットIDへの変換
export const UNIT_NAME_TO_ID: Record<UnitName, UnitId> = {
  'A・ZU・NA': 'azuna',
  DiverDiva: 'diverdiva',
  QU4RTZ: 'qu4rtz',
  R3BIRTH: 'r3birth',
  none: 'none',
} as const;

// ユニット情報を取得する関数
export function getUnitInfo(unitId: UnitId): UnitInfo | null {
  return UNITS[unitId];
}

// ユニット名を取得する関数
export function getUnitName(unitId: UnitId): UnitName {
  return UNIT_ID_TO_NAME[unitId];
}

// ユニットIDを取得する関数
export function getUnitId(unitName: UnitName): UnitId {
  return UNIT_NAME_TO_ID[unitName];
}

// キャラクターのユニットを取得する関数
export function getCharacterUnit(characterId: string): UnitInfo | null {
  for (const unit of Object.values(UNITS)) {
    if (unit && unit.members.includes(characterId)) {
      return unit;
    }
  }
  return null;
}

// ユニットメンバーかどうかをチェックする関数
export function isUnitMember(characterId: string, unitId: UnitId): boolean {
  const unit = UNITS[unitId];
  return unit ? unit.members.includes(characterId) : false;
}

// 全ユニットのリスト（noneを除く）
export const ALL_UNITS = [
  azunaUnit,
  diverdivaUnit,
  qu4rtzUnit,
  r3birthUnit,
] as const;
