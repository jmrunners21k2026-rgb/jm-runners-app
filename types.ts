
export enum Phase {
  Base = "Fase 1 - Base e Confiança",
  Volume = "Fase 2 - Construção de Volume",
  Consolidacao = "Fase 3 - Consolidação",
  Pico = "Fase 4 - Pico e Redução"
}

export interface Workout {
  id: string;
  type: 'weekday' | 'weekend';
  date: string;
  description: string;
  distance?: string;
  isFartlek?: boolean;
}

export interface Week {
  number: number;
  phase: Phase;
  workouts: Workout[];
}

export type TabType = 'home' | 'plan' | 'functional' | 'nutrition' | 'tips';
