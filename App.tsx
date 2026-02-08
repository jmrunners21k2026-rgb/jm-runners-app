
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
  Target,
  Moon,
  Coffee,
  Activity,
  Award,
  ChevronDown,
  User
} from 'lucide-react';
import { TabType } from './types';
import { TRAINING_PLAN, MOTIVATIONAL_PHRASES, FUNCTIONAL_A, FUNCTIONAL_B, FUNCTIONAL_METADATA, NUTRITION_GUIDE } from './data';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-md mx-auto min-h-screen pb-28 relative bg-black shadow-2xl overflow-hidden border-x border-zinc-900">
    {children}
  </div>
);

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; color: string }> = ({ icon, title, subtitle, color }) => (
  <header className="text-center mb-6 pt-8 px-6">
    <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/10 shadow-lg`}>
      {icon}
    </div>
    <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">{title}</h2>
    <p className="text-zinc-500 font-bold text-[8px] uppercase tracking-[0.3em] mt-2">{subtitle}</p>
  </header>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; borderVariant?: 'blue' | 'green' | 'orange' }> = ({ children, className = "", title, borderVariant = 'blue' }) => {
  const borderColors = {
    blue: 'border-blue-500/20',
    green: 'border-emerald-500/20',
    orange: 'border-orange-500/20'
  };
  
  const titleColors = {
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    orange: 'text-orange-400'
  };

  return (
    <div className={`bg-zinc-900/40 backdrop-blur-md rounded-[2rem] p-5 border ${borderColors[borderVariant]} shadow-xl ${className}`}>
      {title && (
        <h3 className={`text-sm font-black mb-4 flex items-center justify-center gap-2 uppercase tracking-tighter ${titleColors[borderVariant]}`}>
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
      <div className="space-y-6 px-6 pt-10 animate-in fade-in duration-500">
        <header className="flex flex-col items-center text-center">
          {/* Logotipo Ampliado - Sem Caixa de Fundo */}
          <div className="relative mb-6 w-full px-1">
            <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full scale-110"></div>
            <div className="w-full relative z-10 flex items-center justify-center">
               <img 
                 src="https://i.imgur.com/m4nBbPK_d.jpeg?maxwidth=520&shape=thumb&fidelity=high" 
                 className="w-full h-auto object-contain"
                 alt="JM Runners Logo"
               />
            </div>
          </div>

          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">JM RUNNERS - Missão 21K 🏃‍♂️</h1>
          <p className="text-zinc-400 text-[11px] font-bold leading-relaxed max-w-[280px] mt-2 mb-6 uppercase tracking-tight">
            App Manual Eletrônico para corredores em treinamento para a distância de 21 Km.
          </p>

          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-4 bg-blue-500"></span>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-[8px]">Status de Treinamento</p>
            <span className="h-px w-4 bg-emerald-500"></span>
          </div>
        </header>

        <Card borderVariant="blue" className="!p-8 bg-zinc-900/60 relative overflow-hidden group text-center">
          <div className="flex flex-col items-center relative z-10">
            <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-3 italic">Objetivo 21K</p>
            <div className="relative mb-5">
                <h2 className="text-6xl font-black text-white italic tracking-tighter">{currentProgress}<span className="text-2xl text-emerald-500 ml-1 font-bold">%</span></h2>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-40"></div>
            </div>
            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-400 transition-all duration-1000 ease-out rounded-full" 
                style={{ width: `${currentProgress}%` }} 
              />
            </div>
          </div>
        </Card>

        <section className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Target className="text-orange-500 w-4 h-4" />
            <h3 className="font-bold text-sm text-white uppercase italic">Sua Próxima Sessão</h3>
          </div>
          
          {nextWorkout ? (
            <div 
              onClick={() => setActiveTab('plan')}
              className="bg-zinc-900/60 p-6 rounded-[2rem] border border-zinc-800 shadow-xl flex flex-col items-center gap-4 cursor-pointer active:scale-95 transition-all group"
            >
              <div className={`p-3 rounded-xl ${nextWorkout.type === 'weekend' ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-blue-600 text-white shadow-blue-500/20 shadow-lg'}`}>
                {nextWorkout.type === 'weekend' ? <TrendingUp size={24} /> : <Timer size={24} />}
              </div>
              <div className="text-center">
                <p className="font-black text-xl text-white group-hover:text-emerald-400 transition-colors tracking-tight leading-none mb-2">{nextWorkout.description}</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-[8px] font-black text-zinc-500 uppercase border border-zinc-800 px-2 py-0.5 rounded-full">Semana {nextWorkout.week}</span>
                    <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">{nextWorkout.date}</span>
                </div>
              </div>
            </div>
          ) : (
            <Card borderVariant="green" className="!p-8 text-center">
              <Trophy className="mx-auto text-orange-500 w-10 h-10 mb-3" />
              <p className="font-black text-xl text-white uppercase italic">MISSÃO CUMPRIDA!</p>
            </Card>
          )}
        </section>

        <section className="bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-800/40 flex flex-col items-center justify-center">
          <div className="text-blue-500/30 mb-3"><Zap size={20} fill="currentColor"/></div>
          <p className="text-zinc-300 font-bold italic text-base leading-relaxed text-center max-w-[240px]">
            "{quote}"
          </p>
        </section>
      </div>
    );
  };

  const TrainingPlan = () => {
    return (
      <div className="pb-10 animate-in slide-in-from-right duration-300">
        <SectionHeader 
          icon={<Calendar className="text-blue-500 w-7 h-7" />} 
          title="Plano de Corridas" 
          subtitle="A evolução é gradual e constante" 
          color="bg-blue-600/10"
        />
        
        <div className="space-y-8 px-6">
          {TRAINING_PLAN.map((week) => (
            <div key={week.number}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-lg italic shadow-lg">
                  {week.number}
                </div>
                <div>
                  <h4 className="font-black text-white text-[10px] uppercase tracking-widest italic leading-none">Semana {week.number}</h4>
                  <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest mt-1">{week.phase}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {week.workouts.map((workout) => (
                  <div 
                    key={workout.id}
                    onClick={() => toggleWorkout(workout.id)}
                    className={`p-5 rounded-[1.5rem] border transition-all flex items-center gap-4 cursor-pointer shadow-md ${
                      completedWorkouts.has(workout.id) 
                        ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' 
                        : 'bg-zinc-900/60 border-zinc-800 hover:border-blue-500/30'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg flex-shrink-0 ${workout.type === 'weekend' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-600/10 text-blue-400'}`}>
                      {workout.type === 'weekend' ? <TrendingUp size={18} /> : <Timer size={18} />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-base font-black leading-tight mb-1 tracking-tight ${completedWorkouts.has(workout.id) ? 'line-through text-zinc-600' : 'text-white'}`}>
                        {workout.description}
                      </p>
                      <div className="flex items-center gap-2 text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
                        <span>{workout.date}</span>
                        <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                        <span className="text-emerald-500 font-black">{workout.distance}</span>
                      </div>
                    </div>
                    <div>
                      {completedWorkouts.has(workout.id) ? (
                        <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                      ) : (
                        <Circle className="text-zinc-800 w-6 h-6" />
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
      <div className="pb-10 animate-in slide-in-from-right duration-300">
        <SectionHeader 
          icon={<Dumbbell className="text-emerald-500 w-7 h-7" />} 
          title="Treino de Força" 
          subtitle="O alicerce do corredor de elite" 
          color="bg-emerald-600/10"
        />

        <div className="space-y-6 px-6">
          {/* Informações Gerais */}
          <Card borderVariant="blue" className="!p-6 bg-zinc-900/80">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Objetivo</h3>
                <p className="text-[11px] text-zinc-300 font-bold uppercase italic">{FUNCTIONAL_METADATA.objective}</p>
              </div>
              <div className="h-px bg-white/5"></div>
              <div className="space-y-2">
                <h3 className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] text-center mb-2 flex items-center justify-center gap-2">
                  <Calendar size={12}/> Sugestão de Agenda
                </h3>
                {FUNCTIONAL_METADATA.schedule.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-black/30 p-2 rounded-xl border border-white/5">
                    <span className="text-[9px] font-black text-white uppercase italic">{item.label}</span>
                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Treinos A e B */}
          {[FUNCTIONAL_A, FUNCTIONAL_B].map((train, idx) => (
            <Card key={idx} borderVariant={idx === 0 ? 'blue' : 'green'} className="!p-6 bg-zinc-900/60 flex flex-col items-center">
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-lg font-black text-white italic leading-tight uppercase mb-2">{train.title}</h3>
                <span className="bg-white/5 px-3 py-1 rounded-full text-[8px] font-black text-zinc-400 uppercase tracking-widest border border-white/5 flex items-center gap-1">
                  <Clock size={10}/> {train.duration}
                </span>
              </div>
              <ul className="space-y-3 w-full">
                {train.exercises.map((ex, i) => (
                  <li key={i} className="flex flex-col items-center group">
                    <span className="text-zinc-200 text-[11px] font-black uppercase tracking-tight leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-[300px]">
                      {ex}
                    </span>
                    {i < train.exercises.length - 1 && <div className="w-1 h-1 bg-zinc-800/50 rounded-full mt-2"></div>}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
          
          <div className="bg-orange-500/5 p-6 rounded-[2rem] border border-orange-500/10 flex flex-col items-center text-center gap-3">
            <ShieldCheck className="text-orange-500 w-8 h-8 opacity-40" />
            <p className="text-[11px] text-zinc-400 font-bold italic leading-snug px-4">
              "A postura correta garante a longevidade no esporte. Não compense técnica por peso."
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Nutrition = () => {
    return (
      <div className="pb-10 animate-in slide-in-from-right duration-300">
        <SectionHeader 
          icon={<Utensils className="text-emerald-500 w-7 h-7" />} 
          title="Manual Nutricional" 
          subtitle="Gerencie sua energia com precisão" 
          color="bg-emerald-600/10"
        />

        <div className="space-y-6 px-6 pb-6">
          <Card borderVariant="blue" className="!p-5 text-left bg-zinc-900/40">
            <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
              <div className="bg-blue-500/10 p-2 rounded-lg"><Moon className="text-blue-400 w-4 h-4" /></div>
              <h4 className="text-xs font-black text-white uppercase italic tracking-tight">{NUTRITION_GUIDE.vespera.title}</h4>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {NUTRITION_GUIDE.vespera.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-0.5 flex-shrink-0"></div>
                  <span className="text-[10px] text-zinc-300 font-bold leading-tight uppercase tracking-tight">{tip}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card borderVariant="orange" className="!p-5 text-left bg-zinc-900/40">
            <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
              <div className="bg-orange-500/10 p-2 rounded-lg"><Coffee className="text-orange-400 w-4 h-4" /></div>
              <h4 className="text-xs font-black text-white uppercase italic tracking-tight">{NUTRITION_GUIDE.antes.title}</h4>
            </div>
            <ul className="space-y-3">
              {NUTRITION_GUIDE.antes.items.map((item, i) => (
                <li key={i} className="text-[10px] text-zinc-400 font-bold flex gap-2 uppercase leading-tight">
                  <ChevronRight size={10} className="text-orange-500 flex-shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card borderVariant="green" className="!p-5 text-left bg-zinc-900/40">
            <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
              <div className="bg-emerald-500/10 p-2 rounded-lg"><Activity className="text-emerald-400 w-4 h-4" /></div>
              <h4 className="text-xs font-black text-white uppercase italic tracking-tight">{NUTRITION_GUIDE.durante.title}</h4>
            </div>
            <ul className="space-y-3">
              {NUTRITION_GUIDE.durante.items.map((item, i) => (
                <li key={i} className="text-[10px] text-zinc-400 font-bold flex gap-2 uppercase leading-tight">
                  <Droplets size={10} className="text-emerald-500 flex-shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </Card>

          <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-[2.5rem] border border-blue-500/20 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="flex flex-col items-center mb-6">
              <Award className="text-white w-8 h-8 mb-3" />
              <h4 className="text-xl font-black text-white text-center italic tracking-tighter uppercase">{NUTRITION_GUIDE.prova.title}</h4>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Timer size={12}/> Pré-Largada
                </p>
                <div className="space-y-2">
                  {NUTRITION_GUIDE.prova.antes.map((item, i) => (
                    <p key={i} className="text-[10px] text-zinc-300 font-bold italic leading-tight uppercase">• {item}</p>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap size={12}/> Durante a Corrida
                </p>
                <div className="space-y-2">
                  {NUTRITION_GUIDE.prova.durante.map((item, i) => (
                    <p key={i} className="text-[10px] text-zinc-300 font-bold italic leading-tight uppercase">• {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Tips = () => {
    return (
      <div className="pb-10 animate-in slide-in-from-right duration-300">
        <SectionHeader 
          icon={<Info className="text-orange-500 w-7 h-7" />} 
          title="Dicas JM Runners" 
          subtitle="Foco nos detalhes que vencem provas" 
          color="bg-orange-600/10"
        />

        <div className="space-y-6 px-6">
          <section className="bg-zinc-900/60 p-6 rounded-[2rem] border border-zinc-800 shadow-xl text-center">
            <TrendingUp className="text-emerald-500 w-8 h-8 mx-auto mb-4" />
            <h3 className="font-black text-xs text-white mb-6 uppercase italic tracking-tighter">Guia de Ritmo (Pace)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-600/5 border border-blue-600/10 p-4 rounded-2xl">
                <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mb-1">Pace Base</p>
                <p className="text-lg font-black text-blue-400 italic leading-none">6:45-7:30</p>
                <p className="text-[6px] text-zinc-600 font-bold uppercase mt-1 tracking-widest">MIN/KM</p>
              </div>
              <div className="bg-emerald-600/5 border border-emerald-600/10 p-4 rounded-2xl">
                <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mb-1">Pace Prova</p>
                <p className="text-lg font-black text-emerald-400 italic leading-none">6:00-6:20</p>
                <p className="text-[6px] text-zinc-600 font-bold uppercase mt-1 tracking-widest">MIN/KM</p>
              </div>
            </div>
          </section>

          <Card borderVariant="blue" className="!p-6 text-center bg-black border-blue-500/20">
            <MapPin className="text-blue-500 w-8 h-8 mx-auto mb-4" />
            <h3 className="font-black text-sm text-white mb-5 uppercase italic tracking-tighter">Checklist Final</h3>
            <div className="grid grid-cols-1 gap-2 text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center">
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-white/5">Tênis amaciado (+50km)</div>
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-white/5">Vaselina em áreas de atrito</div>
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-white/5">Unhas cortadas 3 dias antes</div>
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-white/5">Café da manhã testado</div>
            </div>
          </Card>

          <div className="bg-gradient-to-t from-zinc-900/80 to-black p-8 rounded-[2.5rem] border border-zinc-800/50 text-center space-y-4">
             <Trophy className="text-orange-500/30 mx-auto w-8 h-8" />
             <p className="text-[13px] text-white font-black italic uppercase tracking-tighter leading-snug px-3">
               "A primeira metade é com as pernas, a segunda metade é com a cabeça."
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
      <main className="pb-6 overflow-x-hidden min-h-screen">
        {renderContent()}
      </main>

      {/* Navegação Inferior Super Slim & Moderna */}
      <nav className="fixed bottom-4 left-4 right-4 max-w-[calc(448px-2rem)] mx-auto bg-blue-700/90 backdrop-blur-md shadow-2xl border border-white/10 px-6 py-2 flex justify-between items-center z-50 rounded-[2rem]">
        <NavButton active={activeTab === 'home'} icon={<Home />} onClick={() => setActiveTab('home')} />
        <NavButton active={activeTab === 'plan'} icon={<Calendar />} onClick={() => setActiveTab('plan')} />
        <NavButton active={activeTab === 'functional'} icon={<Dumbbell />} onClick={() => setActiveTab('functional')} />
        <NavButton active={activeTab === 'nutrition'} icon={<Utensils />} onClick={() => setActiveTab('nutrition')} />
        <NavButton active={activeTab === 'tips'} icon={<Info />} onClick={() => setActiveTab('tips')} />
      </nav>
    </Container>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; onClick: () => void }> = ({ active, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-all duration-300 ${active ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-white text-blue-700 shadow-xl' : 'text-white'}`}>
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 18, strokeWidth: active ? 3 : 2 }) : icon}
    </div>
  </button>
);

export default App;
