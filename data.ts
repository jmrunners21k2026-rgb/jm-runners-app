
import { Phase, Week } from './types';

export const TRAINING_PLAN: Week[] = [
  // FASE 1
  {
    number: 1, phase: Phase.Base, workouts: [
      { id: 'w1-1', type: 'weekday', date: '11/02', description: '5K leve', distance: '5K' },
      { id: 'w1-2', type: 'weekend', date: '15/02', description: 'Longão 10K', distance: '10K' }
    ]
  },
  {
    number: 2, phase: Phase.Base, workouts: [
      { id: 'w2-1', type: 'weekday', date: '18/02', description: '5-6K leve', distance: '5-6K' },
      { id: 'w2-2', type: 'weekend', date: '22/02', description: 'Longão 11K', distance: '11K' }
    ]
  },
  {
    number: 3, phase: Phase.Base, workouts: [
      { id: 'w3-1', type: 'weekday', date: '25/02', description: '6K leve', distance: '6K' },
      { id: 'w3-2', type: 'weekend', date: '01/03', description: 'Longão 12K', distance: '12K' }
    ]
  },
  {
    number: 4, phase: Phase.Base, workouts: [
      { id: 'w4-1', type: 'weekday', date: '04/03', description: '6K Fartlek leve', distance: '6K', isFartlek: true },
      { id: 'w4-2', type: 'weekend', date: '08/03', description: 'Longão 13K', distance: '13K' }
    ]
  },
  // FASE 2
  {
    number: 5, phase: Phase.Volume, workouts: [
      { id: 'w5-1', type: 'weekday', date: '11/03', description: '6K leve', distance: '6K' },
      { id: 'w5-2', type: 'weekend', date: '15/03', description: 'Longão 14K', distance: '14K' }
    ]
  },
  {
    number: 6, phase: Phase.Volume, workouts: [
      { id: 'w6-1', type: 'weekday', date: '18/03', description: '6-7K Fartlek', distance: '6-7K', isFartlek: true },
      { id: 'w6-2', type: 'weekend', date: '22/03', description: 'Longão 15K', distance: '15K' }
    ]
  },
  {
    number: 7, phase: Phase.Volume, workouts: [
      { id: 'w7-1', type: 'weekday', date: '25/03', description: '6K leve', distance: '6K' },
      { id: 'w7-2', type: 'weekend', date: '29/03', description: 'Longão 13K (Regenerativo)', distance: '13K' }
    ]
  },
  {
    number: 8, phase: Phase.Volume, workouts: [
      { id: 'w8-1', type: 'weekday', date: '01/04', description: '7K leve', distance: '7K' },
      { id: 'w8-2', type: 'weekend', date: '05/04', description: 'Longão 16K', distance: '16K' }
    ]
  },
  // FASE 3
  {
    number: 9, phase: Phase.Consolidacao, workouts: [
      { id: 'w9-1', type: 'weekday', date: '08/04', description: '7K Fartlek', distance: '7K', isFartlek: true },
      { id: 'w9-2', type: 'weekend', date: '12/04', description: 'Longão 17K', distance: '17K' }
    ]
  },
  {
    number: 10, phase: Phase.Consolidacao, workouts: [
      { id: 'w10-1', type: 'weekday', date: '15/04', description: '6K leve', distance: '6K' },
      { id: 'w10-2', type: 'weekend', date: '19/04', description: 'Longão 14K (Regenerativo)', distance: '14K' }
    ]
  },
  {
    number: 11, phase: Phase.Consolidacao, workouts: [
      { id: 'w11-1', type: 'weekday', date: '22/04', description: '7-8K leve', distance: '7-8K' },
      { id: 'w11-2', type: 'weekend', date: '26/04', description: 'Longão 18K', distance: '18K' }
    ]
  },
  {
    number: 12, phase: Phase.Consolidacao, workouts: [
      { id: 'w12-1', type: 'weekday', date: '29/04', description: '6K leve', distance: '6K' },
      { id: 'w12-2', type: 'weekend', date: '03/05', description: 'Longão 16K', distance: '16K' }
    ]
  },
  // FASE 4
  {
    number: 13, phase: Phase.Pico, workouts: [
      { id: 'w13-1', type: 'weekday', date: '06/05', description: '7K Fartlek leve', distance: '7K', isFartlek: true },
      { id: 'w13-2', type: 'weekend', date: '10/05', description: 'Longão 18K', distance: '18K' }
    ]
  },
  {
    number: 14, phase: Phase.Pico, workouts: [
      { id: 'w14-1', type: 'weekday', date: '13/05', description: '6K leve', distance: '6K' },
      { id: 'w14-2', type: 'weekend', date: '17/05', description: 'Longão 14K', distance: '14K' }
    ]
  },
  {
    number: 15, phase: Phase.Pico, workouts: [
      { id: 'w15-1', type: 'weekday', date: '20/05', description: '5-6K leve', distance: '5-6K' },
      { id: 'w15-2', type: 'weekend', date: '24/05', description: 'Longão 10-12K', distance: '10-12K' }
    ]
  },
  {
    number: 16, phase: Phase.Pico, workouts: [
      { id: 'w16-1', type: 'weekday', date: '27/05', description: '5K leve', distance: '5K' },
      { id: 'w16-2', type: 'weekend', date: '31/05', description: 'Longão 10K', distance: '10K' }
    ]
  },
  {
    number: 17, phase: Phase.Pico, workouts: [
      { id: 'w17-1', type: 'weekday', date: '03/06', description: '4-5K bem leve', distance: '4-5K' },
      { id: 'w17-2', type: 'weekend', date: '06/06', description: 'PROVA 21K 🎉', distance: '21K' }
    ]
  }
];

export const MOTIVATIONAL_PHRASES = [
  "Terminar forte é consequência de começar com inteligência.",
  "O pace não importa, o volume é a chave.",
  "Regra de ouro: se sentir desconforto, não suba o volume.",
  "Cada quilômetro conta na construção do seu sonho.",
  "Respeite seu corpo, ele é o seu motor.",
  "A primeira meia maratona é uma conquista para a vida toda."
];

export const FUNCTIONAL_A = {
  title: "Treino A – Estabilidade e Core",
  duration: "30–40 min",
  exercises: [
    "Agachamento livre – 3x12",
    "Avanço (lunge) alternado – 3x10 por perna",
    "Ponte de glúteo – 3x15",
    "Prancha frontal – 3x30–45s",
    "Prancha lateral – 3x30s por lado",
    "Elevação de panturrilha – 3x15"
  ]
};

export const FUNCTIONAL_B = {
  title: "Treino B – Força específica para corrida",
  duration: "35–45 min",
  exercises: [
    "Leg press ou agachamento guiado – 3x10",
    "Stiff ou levantamento terra romeno – 3x10",
    "Step-up em caixa – 3x10 por perna",
    "Abdução de quadril (elástico ou máquina) – 3x15",
    "Core com rotação (russian twist) – 3x20",
    "Panturrilha em pé ou sentado – 3x15"
  ]
};
