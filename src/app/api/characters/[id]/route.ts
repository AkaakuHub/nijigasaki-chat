import { NextRequest, NextResponse } from 'next/server';
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

const characterProfiles = {
  'ayumu_uehara': ayumuProfile,
  'setsuna_yuki': setsunaProfile,
  'ai_miyashita': aiProfile,
  'kasumi_nakasu': kasumiProfile,
  'shizuku_osaka': shizukuProfile,
  'rina_tennoji': rinaProfile,
  'shioriko_mifune': shiorikoProfile,
  'lanzhu_zhong': lanzhuProfile,
  'karin_asaka': karinProfile,
  'emma_verde': emmaProfile,
  'kanata_konoe': kanataProfile,
  'mia_taylor': miaProfile,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const profile = characterProfiles[id as keyof typeof characterProfiles];
  
  if (profile) {
    return NextResponse.json(profile);
  }

  return NextResponse.json(
    { error: 'Character not found' },
    { status: 404 }
  );
}