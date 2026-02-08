
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  Calendar, 
  Dumbbell, 
  Utensils, 
  Info, 
  CheckCircle2, 
  Circle, 
  Flame, 
  TrendingUp, 
  Clock, 
  MapPin,
  ChevronRight,
  Trophy,
  Droplets,
  Zap,
  ShieldCheck,
  Timer,
  Target
} from 'lucide-react';
import { TabType } from './types';
import { TRAINING_PLAN, MOTIVATIONAL_PHRASES, FUNCTIONAL_A, FUNCTIONAL_B } from './data';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-md mx-auto min-h-screen pb-32 relative bg-black shadow-2xl overflow-hidden border-x border-zinc-900">
    {children}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; borderVariant?: 'blue' | 'green' | 'orange' }> = ({ children, className = "", title, borderVariant = 'blue' }) => {
  const borderColors = {
    blue: 'border-blue-500/40',
    green: 'border-emerald-500/40',
    orange: 'border-orange-500/40'
  };
  
  const titleColors = {
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    orange: 'text-orange-400'
  };

  return (
    <div className={`bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] p-8 border ${borderColors[borderVariant]} text-center shadow-2xl ${className}`}>
      {title && (
        <h3 className={`text-xl font-black mb-6 flex items-center justify-center gap-2 uppercase tracking-tighter ${titleColors[borderVariant]}`}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set());
  const [quote, setQuote] = useState(MOTIVATIONAL_PHRASES[0]);

  useEffect(() => {
    const saved = localStorage.getItem('jm_runners_progress');
    if (saved) {
      setCompletedWorkouts(new Set(JSON.parse(saved)));
    }
    setQuote(MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)]);
  }, []);

  const toggleWorkout = (id: string) => {
    const next = new Set(completedWorkouts);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompletedWorkouts(next);
    localStorage.setItem('jm_runners_progress', JSON.stringify(Array.from(next)));
  };

  const currentProgress = useMemo(() => {
    const total = TRAINING_PLAN.reduce((acc, week) => acc + week.workouts.length, 0);
    return Math.round((completedWorkouts.size / total) * 100);
  }, [completedWorkouts]);

  const Dashboard = () => {
    const nextWorkout = useMemo(() => {
      for (const week of TRAINING_PLAN) {
        for (const w of week.workouts) {
          if (!completedWorkouts.has(w.id)) return { ...w, week: week.number };
        }
      }
      return null;
    }, [completedWorkouts]);

    return (
      <div className="space-y-10 px-6 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="bg-gradient-to-tr from-blue-600 to-emerald-500 p-6 rounded-[2.2rem] shadow-2xl shadow-blue-500/30 mb-2 ring-1 ring-white/10">
            <Flame className="text-white fill-white w-12 h-12" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white">JM RUNNERS</h1>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-blue-500"></span>
            <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px]">Manual Digital 21K</p>
            <span className="h-px w-6 bg-emerald-500"></span>
          </div>
        </header>

        <Card borderVariant="blue" className="!p-12 relative overflow-hidden group border-blue-500/20 bg-zinc-900/60">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-blue-600/20 transition-all duration-700"></div>
          <div className="flex flex-col items-center relative z-10">
            <p className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] mb-6">Objetivo Meia Maratona</p>
            <div className="relative mb-10">
                <h2 className="text-8xl font-black text-white italic tracking-tighter drop-shadow-2xl">{currentProgress}<span className="text-4xl text-emerald-500 ml-1 font-bold">%</span></h2>
                <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
            </div>
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden mb-6 p-[1px] ring-1 ring-zinc-800">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-emerald-400 to-orange-400 transition-all duration-1000 ease-out rounded-full" 
                style={{ width: `${currentProgress}%` }} 
              />
            </div>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">A constância é a sua maior aliada</p>
          </div>
        </Card>

        <section className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Target className="text-orange-500 w-6 h-6" />
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter italic">Próximo Treino</h3>
          </div>
          
          {nextWorkout ? (
            <div 
              onClick={() => setActiveTab('plan')}
              className="bg-zinc-900/80 p-10 rounded-[3.5rem] border border-zinc-800 shadow-2xl flex flex-col items-center gap-6 cursor-pointer active:scale-95 transition-all hover:border-orange-500/40 group"
            >
              <div className={`p-6 rounded-[2rem] transition-all duration-500 ${nextWorkout.type === 'weekend' ? 'bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]'}`}>
                {nextWorkout.type === 'weekend' ? <TrendingUp size={36} /> : <Timer size={36} />}
              </div>
              <div className="text-center space-y-2">
                <p className="font-black text-3xl text-white group-hover:text-emerald-400 transition-colors tracking-tight">{nextWorkout.description}</p>
                <div className="flex items-center justify-center gap-4 pt-2">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border border-zinc-800 px-4 py-1.5 rounded-full">S{nextWorkout.week}</span>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-500/10 px-4 py-1.5 rounded-full">{nextWorkout.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 font-black text-[10px] uppercase tracking-widest mt-2 animate-pulse">
                Clique para ver detalhes <ChevronRight size={14} />
              </div>
            </div>
          ) : (
            <Card borderVariant="green" className="!p-12 border-emerald-500 bg-emerald-500/10">
              <Trophy className="mx-auto text-orange-500 w-20 h-20 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)] mb-6" />
              <p className="font-black text-4xl text-white uppercase tracking-tighter leading-none mb-4">MISSÃO<br/>CUMPRIDA!</p>
              <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">Você é um Meia Maratonista.</p>
            </Card>
          )}
        </section>

        <section className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-[3.5rem] border border-zinc-800/80 relative">
          <p className="text-emerald-100 font-bold italic text-2xl leading-relaxed text-center relative z-10">
            "{quote}"
          </p>
        </section>
      </div>
    );
  };

  const TrainingPlan = () => {
    return (
      <div className="px-6 pt-12 animate-in slide-in-from-right duration-300">
        <header className="text-center mb-16">
          <div className="bg-blue-600/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-blue-600/30">
            <Calendar className="text-blue-500 w-10 h-10" />
          </div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-4">CRONOGRAMA<br/>INTERATIVO</h2>
          <p className="text-zinc-500 font-black text-[11px] uppercase tracking-[0.4em]">Cada marcação é um passo à frente</p>
        </header>
        
        <div className="space-y-16 pb-24">
          {TRAINING_PLAN.map((week) => (
            <div key={week.number} className="relative">
              <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 rounded-[1.8rem] bg-white text-black flex items-center justify-center font-black text-2xl shadow-2xl mb-4 italic ring-8 ring-zinc-900">
                  {week.number}
                </div>
                <h4 className="font-black text-zinc-500 uppercase text-[11px] tracking-[0.4em]">SEMANA</h4>
                <div className="mt-3 px-8 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full shadow-lg">
                    <p className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">{week.phase}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {week.workouts.map((workout) => (
                  <div 
                    key={workout.id}
                    onClick={() => toggleWorkout(workout.id)}
                    className={`p-10 rounded-[3rem] border-2 transition-all flex flex-col items-center text-center cursor-pointer shadow-2xl ${
                      completedWorkouts.has(workout.id) 
                        ? 'bg-emerald-500/10 border-emerald-500 opacity-60' 
                        : 'bg-zinc-900 border-zinc-800 hover:border-blue-500 active:scale-95'
                    }`}
                  >
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      <span className={`text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest border ${
                        workout.type === 'weekend' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                      }`}>
                        {workout.type === 'weekend' ? 'Longão FDS' : 'Treino Base'}
                      </span>
                      {workout.isFartlek && (
                        <span className="text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2">
                          <Zap size={12} /> Alta Intensidade
                        </span>
                      )}
                    </div>
                    <p className={`text-3xl font-black leading-none tracking-tight mb-4 ${completedWorkouts.has(workout.id) ? 'line-through text-zinc-500' : 'text-white'}`}>
                      {workout.description}
                    </p>
                    <div className="flex items-center gap-3 text-zinc-500 text-[12px] font-black uppercase tracking-[0.2em]">
                        <span>{workout.date}</span>
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        <span className="text-white">{workout.distance}</span>
                    </div>
                    <div className="mt-8">
                      {completedWorkouts.has(workout.id) ? (
                        <div className="bg-emerald-500 p-3 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                            <CheckCircle2 className="text-white w-8 h-8" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full border-2 border-zinc-700 hover:border-blue-500 transition-colors">
                            <Circle className="text-zinc-800 w-10 h-10" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Functional = () => {
    return (
      <div className="px-6 pt-12 animate-in slide-in-from-right duration-300">
        <header className="text-center mb-16">
          <div className="bg-emerald-500/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
            <Dumbbell className="text-emerald-500 w-10 h-10" />
          </div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-4">FORÇA E<br/>REFORÇO</h2>
          <p className="text-zinc-500 font-black text-[11px] uppercase tracking-[0.4em]">Músculos fortes evitam lesões</p>
        </header>

        <div className="space-y-12 pb-12">
          <Card borderVariant="blue" className="bg-black !p-12 border-blue-500/40 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)]">
            <div className="flex flex-col items-center mb-10">
              <h3 className="text-3xl font-black text-white italic leading-none mb-4 uppercase">{FUNCTIONAL_A.title}</h3>
              <div className="flex items-center gap-3 bg-blue-600/20 border border-blue-600/40 px-6 py-2 rounded-full text-[12px] font-black text-blue-400 uppercase tracking-widest shadow-inner">
                <Clock size={16}/> {FUNCTIONAL_A.duration}
              </div>
            </div>
            <ul className="space-y-6 text-center">
              {FUNCTIONAL_A.exercises.map((ex, i) => (
                <li key={i} className="flex flex-col items-center gap-3 p-6 bg-zinc-900 rounded-[2rem] border border-zinc-800/50">
                  <span className="bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black italic shadow-lg">{i+1}</span>
                  <span className="text-zinc-200 text-xl font-black uppercase tracking-tight leading-none">{ex}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card borderVariant="green" className="bg-black !p-12 border-emerald-500/40 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)]">
            <div className="flex flex-col items-center mb-10">
              <h3 className="text-3xl font-black text-white italic leading-none mb-4 uppercase">{FUNCTIONAL_B.title}</h3>
              <div className="flex items-center gap-3 bg-emerald-600/20 border border-emerald-600/40 px-6 py-2 rounded-full text-[12px] font-black text-emerald-400 uppercase tracking-widest shadow-inner">
                <Clock size={16}/> {FUNCTIONAL_B.duration}
              </div>
            </div>
            <ul className="space-y-6 text-center">
              {FUNCTIONAL_B.exercises.map((ex, i) => (
                <li key={i} className="flex flex-col items-center gap-3 p-6 bg-zinc-900 rounded-[2rem] border border-zinc-800/50">
                  <span className="bg-emerald-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black italic shadow-lg">{i+1}</span>
                  <span className="text-zinc-200 text-xl font-black uppercase tracking-tight leading-none">{ex}</span>
                </li>
              ))}
            </ul>
          </Card>
          
          <div className="bg-orange-500/10 p-12 rounded-[3.5rem] border border-orange-500/30 flex flex-col items-center text-center gap-6 shadow-2xl">
            <ShieldCheck className="text-orange-500 w-16 h-16" />
            <div className="space-y-2">
                <p className="text-[11px] text-orange-400 font-black uppercase tracking-[0.4em]">ALERTA DE SEGURANÇA</p>
                <p className="text-2xl text-white font-black italic leading-tight px-2 uppercase tracking-tighter">"A técnica perfeita é mais importante que o peso. Não tenha pressa!"</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Nutrition = () => {
    return (
      <div className="px-6 pt-12 animate-in slide-in-from-right duration-300">
        <header className="text-center mb-16">
          <div className="bg-emerald-500/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
            <Utensils className="text-emerald-500 w-10 h-10" />
          </div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-4">NUTRIÇÃO DE<br/>ELITE</h2>
          <p className="text-zinc-500 font-black text-[11px] uppercase tracking-[0.4em]">Coma para vencer, não para treinar</p>
        </header>

        <div className="space-y-16 pb-12">
          <section className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <Droplets className="text-blue-500 w-10 h-10" />
              <h3 className="font-black text-white text-center uppercase tracking-[0.4em] text-xs">HIDRATAÇÃO ESTRATÉGICA</h3>
            </div>
            <Card borderVariant="blue" className="!p-12 space-y-10 bg-black border-blue-500/20">
              <div className="flex flex-col items-center">
                <p className="font-black text-blue-400 text-2xl mb-4 uppercase italic tracking-tighter">DIARIAMENTE</p>
                <p className="text-lg text-zinc-300 font-bold leading-tight uppercase tracking-tight">35ml por kg/peso.</p>
                <div className="mt-6 px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[11px] text-blue-300 font-black uppercase tracking-widest">Controle pela cor da urina</div>
              </div>
              <div className="h-px w-24 bg-zinc-800 mx-auto"></div>
              <div className="flex flex-col items-center">
                <p className="font-black text-orange-500 text-2xl mb-4 uppercase italic tracking-tighter">LONGÕES</p>
                <p className="text-lg text-zinc-300 font-bold leading-tight uppercase tracking-tight">Beber a cada 20-30 min.</p>
                <div className="mt-6 px-6 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-[11px] text-orange-300 font-black uppercase tracking-widest">Reposição de Sais</div>
              </div>
            </Card>
          </section>

          <section className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <Timer className="text-emerald-500 w-10 h-10" />
              <h3 className="font-black text-white text-center uppercase tracking-[0.4em] text-xs">JANELAS ALIMENTARES</h3>
            </div>
            <div className="grid gap-8">
              <Card borderVariant="blue" className="!p-10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                <p className="font-black text-blue-400 text-xl mb-4 uppercase italic tracking-tighter">PRÉ-CORRIDA</p>
                <p className="text-[13px] text-zinc-400 font-black leading-relaxed uppercase tracking-widest">Carboidratos limpos 2h antes. Pães, frutas, aveia.</p>
              </Card>
              <Card borderVariant="orange" className="!p-10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                <p className="font-black text-orange-500 text-xl mb-4 uppercase italic tracking-tighter">INTRA-CORRIDA</p>
                <p className="text-[13px] text-zinc-400 font-black leading-relaxed uppercase tracking-widest">Géis de carbo acima de 1h de treino. Foco na energia.</p>
              </Card>
              <Card borderVariant="green" className="!p-10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                <p className="font-black text-emerald-400 text-xl mb-4 uppercase italic tracking-tighter">PÓS-CORRIDA</p>
                <p className="text-[13px] text-zinc-400 font-black leading-relaxed uppercase tracking-widest">Proteína + Carbo rápido. Ovos, frango e batata.</p>
              </Card>
            </div>
          </section>

          <Card borderVariant="orange" className="bg-gradient-to-br from-orange-600/20 to-black !p-14 rounded-[4rem] border-orange-500/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-white to-orange-500"></div>
            <Zap className="text-orange-500 mx-auto mb-10 w-20 h-20 animate-bounce" />
            <h4 className="font-black text-5xl text-white text-center mb-10 uppercase italic tracking-tighter leading-none">CARBO<br/>LOADING</h4>
            <div className="space-y-8 text-center">
              <p className="text-[11px] font-black text-orange-400 uppercase tracking-[0.5em] group-hover:scale-110 transition-transform">ALERTA SEMANA DA PROVA</p>
              <p className="text-xl font-bold leading-relaxed italic text-zinc-200 px-2">Aumente o estoque de glicogênio 48h antes da largada. Arroz, massas e batata doce são seus melhores amigos agora.</p>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const Tips = () => {
    return (
      <div className="px-6 pt-12 animate-in slide-in-from-right duration-300">
        <header className="text-center mb-16">
          <div className="bg-orange-500/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-orange-500/30">
            <Info className="text-orange-500 w-10 h-10" />
          </div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none mb-4">SEGREDOS DOS<br/>21 QUILÔMETROS</h2>
          <p className="text-zinc-500 font-black text-[11px] uppercase tracking-[0.4em]">A estratégia vence a força bruta</p>
        </header>

        <div className="space-y-12 pb-12">
          <section className="bg-zinc-900 p-12 rounded-[4rem] border border-zinc-800 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/5 rounded-full blur-[100px]"></div>
            <TrendingUp className="text-emerald-500 w-14 h-14 mx-auto mb-10" />
            <h3 className="font-black text-3xl text-white mb-12 uppercase italic tracking-tighter">O Guia de Ritmo (Pace)</h3>
            <div className="space-y-12">
              <div className="flex flex-col items-center">
                <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">RITMO DE BASE (Z2/Z3)</p>
                <div className="bg-blue-600/10 border border-blue-600/40 px-10 py-8 rounded-[2.5rem] w-full shadow-inner">
                    <p className="text-5xl font-black text-blue-400 italic tracking-tighter">6:45 – 7:30</p>
                    <p className="text-[10px] text-zinc-600 font-black uppercase mt-4 tracking-[0.3em]">Minutos por KM</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">RITMO DE PROVA (Z4)</p>
                <div className="bg-emerald-600/10 border border-emerald-600/40 px-10 py-8 rounded-[2.5rem] w-full shadow-inner">
                    <p className="text-5xl font-black text-emerald-400 italic tracking-tighter">6:00 – 6:20</p>
                    <p className="text-[10px] text-zinc-600 font-black uppercase mt-4 tracking-[0.3em]">Minutos por KM</p>
                </div>
              </div>
            </div>
          </section>

          <Card borderVariant="blue" className="!p-12 bg-black border-blue-500/60 shadow-blue-900/20">
            <h3 className="font-black text-3xl text-white mb-12 flex flex-col items-center justify-center gap-6 uppercase italic tracking-tighter">
              <MapPin className="text-blue-500 w-12 h-12" /> CHECKLIST FINAL
            </h3>
            <ul className="space-y-8 text-center">
              <li className="bg-zinc-900/60 p-6 rounded-[2rem] text-[13px] font-black text-zinc-200 uppercase tracking-tight border border-zinc-800">Tênis já amaciado (mín. 50km).</li>
              <li className="bg-zinc-900/60 p-6 rounded-[2rem] text-[13px] font-black text-zinc-200 uppercase tracking-tight border border-zinc-800">Largada controlada (Segure a emoção).</li>
              <li className="bg-zinc-900/60 p-6 rounded-[2rem] text-[13px] font-black text-zinc-200 uppercase tracking-tight border border-zinc-800">Vaselina em pontos de atrito.</li>
              <li className="bg-zinc-900/60 p-6 rounded-[2rem] text-[13px] font-black text-zinc-200 uppercase tracking-tight border border-zinc-800">Corte as unhas 3 dias antes.</li>
            </ul>
          </Card>

          <div className="bg-gradient-to-tr from-zinc-900 via-black to-zinc-900 p-16 rounded-[4.5rem] border border-zinc-800/80 text-center space-y-10 relative overflow-hidden group">
             <Trophy className="text-orange-500 mx-auto w-20 h-20 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse" />
             <h3 className="font-black text-4xl text-white uppercase italic tracking-tighter leading-none relative z-10">FOCO TOTAL NA<br/>CHEGADA</h3>
             <p className="text-xl text-zinc-400 font-bold leading-relaxed italic relative z-10 px-2">
               "Os primeiros 15km são com as pernas. Os últimos 6km são com o coração. Mantenha a cabeça erguida e termine forte."
             </p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <Dashboard />;
      case 'plan': return <TrainingPlan />;
      case 'functional': return <Functional />;
      case 'nutrition': return <Nutrition />;
      case 'tips': return <Tips />;
      default: return <Dashboard />;
    }
  };

  return (
    <Container>
      <main className="pb-16 overflow-x-hidden min-h-screen">
        {renderContent()}
      </main>

      {/* Barra de Navegação Inferior - AZUL ELÉTRICO */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-blue-700 shadow-[0_-15px_60px_rgba(29,78,216,0.5)] border-t border-white/20 px-8 py-7 flex justify-between items-center z-50 rounded-t-[4rem]">
        <NavButton active={activeTab === 'home'} icon={<Home />} label="Home" onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'plan'} icon={<Calendar />} label="Plano" onClick={() => setActiveTab('plan')} />
        <NavButton active={activeTab === 'functional'} icon={<Dumbbell />} label="Treino" onClick={() => setActiveTab('functional')} />
        <NavButton active={activeTab === 'nutrition'} icon={<Utensils />} label="Nutri" onClick={() => setActiveTab('nutrition')} />
        <NavButton active={activeTab === 'tips'} icon={<Info />} label="Dicas" onClick={() => setActiveTab('tips')} />
      </nav>
    </Container>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 transition-all duration-500 relative ${active ? 'scale-125' : 'opacity-50 grayscale-50 hover:opacity-100 hover:grayscale-0'}`}
  >
    <div className={`p-3.5 rounded-2xl transition-all duration-500 ${active ? 'bg-white text-blue-700 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'text-white'}`}>
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 24, strokeWidth: active ? 3 : 2 }) : icon}
    </div>
    {active && (
        <span className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full shadow-white shadow-[0_0_10px_white]"></span>
    )}
  </button>
);

export default App;
