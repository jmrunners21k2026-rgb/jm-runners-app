
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
  Heart,
  Droplets,
  Trophy
} from 'lucide-react';
import { TabType, Week, Workout, Phase } from './types';
import { TRAINING_PLAN, MOTIVATIONAL_PHRASES, FUNCTIONAL_A, FUNCTIONAL_B } from './data';

// Helper Components
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-md mx-auto min-h-screen pb-24 relative bg-gray-50">
    {children}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-white rounded-3xl p-5 shadow-sm border border-gray-100 ${className}`}>
    {title && <h3 className="text-lg font-bold mb-4 text-indigo-900 flex items-center gap-2">{title}</h3>}
    {children}
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set());
  const [quote, setQuote] = useState(MOTIVATIONAL_PHRASES[0]);

  // Load progress
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

  // Main Views
  const Dashboard = () => {
    const nextWorkout = useMemo(() => {
      for (const week of TRAINING_PLAN) {
        for (const w of week.workouts) {
          if (!completedWorkouts.has(w.id)) return { ...w, week: week.number };
        }
      }
      return null;
    }, []);

    return (
      <div className="space-y-6 px-6 pt-8 animate-in fade-in duration-500">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-indigo-900">JM RUNNERS</h1>
            <p className="text-indigo-400 font-medium">Missão 21K 🏃‍♂️</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-2xl">
            <Flame className="text-orange-500 fill-orange-500" />
          </div>
        </header>

        <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white !p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-indigo-100 text-sm font-semibold opacity-80 uppercase tracking-widest">Seu Progresso</p>
              <h2 className="text-4xl font-black mt-1">{currentProgress}%</h2>
            </div>
            <Trophy className="text-orange-400 w-10 h-10" />
          </div>
          <div className="h-2 bg-indigo-900/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-400 transition-all duration-1000" 
              style={{ width: `${currentProgress}%` }} 
            />
          </div>
        </Card>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl text-indigo-900">Próximo Desafio</h3>
          </div>
          {nextWorkout ? (
            <div 
              onClick={() => setActiveTab('plan')}
              className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${nextWorkout.type === 'weekend' ? 'bg-orange-50 text-orange-500' : 'bg-cyan-50 text-cyan-500'}`}>
                  {nextWorkout.type === 'weekend' ? <TrendingUp /> : <Clock />}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{nextWorkout.description}</p>
                  <p className="text-sm text-gray-500">Semana {nextWorkout.week} • {nextWorkout.date}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300" />
            </div>
          ) : (
            <div className="bg-green-50 p-5 rounded-3xl border border-green-100 text-center">
              <Trophy className="mx-auto text-green-500 mb-2" />
              <p className="font-bold text-green-700">Plano Concluído!</p>
            </div>
          )}
        </section>

        <section className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
          <p className="text-orange-600 font-bold italic text-lg leading-tight text-center">
            "{quote}"
          </p>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => setActiveTab('functional')} className="bg-indigo-50 p-5 rounded-3xl text-indigo-600 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <Dumbbell />
            <span className="font-bold text-sm">Funcional</span>
          </div>
          <div onClick={() => setActiveTab('nutrition')} className="bg-cyan-50 p-5 rounded-3xl text-cyan-600 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <Utensils />
            <span className="font-bold text-sm">Nutrição</span>
          </div>
        </div>
      </div>
    );
  };

  const TrainingPlan = () => {
    return (
      <div className="px-6 pt-8 animate-in slide-in-from-right duration-300">
        <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-2">
          <Calendar className="text-orange-500" /> Plano 21K
        </h2>
        
        <div className="space-y-8 no-scrollbar pb-10">
          {TRAINING_PLAN.map((week) => (
            <div key={week.number} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {week.number}
                </div>
                <div>
                  <h4 className="font-bold text-indigo-900 uppercase text-xs tracking-wider opacity-60">Semana {week.number}</h4>
                  <p className="text-sm font-semibold text-indigo-600 leading-tight">{week.phase}</p>
                </div>
              </div>
              
              <div className="space-y-3 pl-12 border-l-2 border-indigo-100">
                {week.workouts.map((workout) => (
                  <div 
                    key={workout.id}
                    onClick={() => toggleWorkout(workout.id)}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      completedWorkouts.has(workout.id) 
                        ? 'bg-green-50 border-green-200 opacity-70' 
                        : 'bg-white border-gray-100 shadow-sm'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          workout.type === 'weekend' ? 'bg-orange-100 text-orange-600' : 'bg-cyan-100 text-cyan-600'
                        }`}>
                          {workout.type === 'weekend' ? 'Longão' : 'Semana'}
                        </span>
                        {workout.isFartlek && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-pink-100 text-pink-600 flex items-center gap-1">
                            <Flame size={10} /> Fartlek
                          </span>
                        )}
                      </div>
                      <p className={`font-bold ${completedWorkouts.has(workout.id) ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {workout.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 font-medium">{workout.date} • {workout.distance}</p>
                    </div>
                    {completedWorkouts.has(workout.id) ? (
                      <CheckCircle2 className="text-green-500" />
                    ) : (
                      <Circle className="text-gray-300" />
                    )}
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
      <div className="px-6 pt-8 animate-in slide-in-from-right duration-300">
        <h2 className="text-2xl font-black text-indigo-900 mb-2 flex items-center gap-2">
          <Dumbbell className="text-indigo-600" /> Funcional
        </h2>
        <p className="text-gray-500 mb-6 text-sm">Prevenção de lesões e economia de corrida.</p>

        <div className="space-y-6">
          <Card className="bg-indigo-600 text-white !p-6" title="">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{FUNCTIONAL_A.title}</h3>
              <span className="text-xs bg-indigo-500/50 px-3 py-1 rounded-full">{FUNCTIONAL_A.duration}</span>
            </div>
            <ul className="space-y-3">
              {FUNCTIONAL_A.exercises.map((ex, i) => (
                <li key={i} className="flex items-start gap-3 text-indigo-50 text-sm font-medium">
                  <span className="bg-indigo-500 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]">{i+1}</span>
                  {ex}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-indigo-500/30">
              <p className="text-xs italic text-indigo-100">Fazer 1-2 dias antes do treino noturno.</p>
            </div>
          </Card>

          <Card className="bg-cyan-600 text-white !p-6" title="">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{FUNCTIONAL_B.title}</h3>
              <span className="text-xs bg-cyan-500/50 px-3 py-1 rounded-full">{FUNCTIONAL_B.duration}</span>
            </div>
            <ul className="space-y-3">
              {FUNCTIONAL_B.exercises.map((ex, i) => (
                <li key={i} className="flex items-start gap-3 text-cyan-50 text-sm font-medium">
                  <span className="bg-cyan-500 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]">{i+1}</span>
                  {ex}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-cyan-500/30">
              <p className="text-xs italic text-cyan-100">Fazer 2-3 dias antes do longão.</p>
            </div>
          </Card>
          
          <div className="bg-orange-100 p-4 rounded-3xl flex gap-3 items-center">
            <Info className="text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-700 font-bold">Carga moderada. Nunca treinar até a falha.</p>
          </div>
        </div>
      </div>
    );
  };

  const Nutrition = () => {
    return (
      <div className="px-6 pt-8 animate-in slide-in-from-right duration-300">
        <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-2">
          <Utensils className="text-cyan-500" /> Nutrição
        </h2>

        <div className="space-y-6">
          <section>
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Heart className="text-pink-500 w-4 h-4" /> Pré-Longão (Véspera)
            </h3>
            <div className="bg-white p-5 rounded-3xl border border-gray-100 space-y-3">
              {[
                "Dormir mínimo 7-8h",
                "Não consumir álcool",
                "Jantar leve e conhecido (sem testes)",
                "Evitar alimentos gordurosos",
                "Hidratar-se bem ao longo do dia"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <CheckCircle2 size={16} className="text-green-500" /> {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Clock className="text-orange-500 w-4 h-4" /> Alimentação & Hidratação
            </h3>
            <div className="space-y-4">
              <Card className="!p-4 border-l-4 border-l-indigo-500">
                <p className="font-bold text-gray-900 text-sm mb-2">Antes do longão (2-3h antes)</p>
                <p className="text-xs text-gray-500">Carboidratos simples (Pão com mel, tapioca, arroz branco) + pequena proteína. Água: 400-600ml.</p>
              </Card>
              <Card className="!p-4 border-l-4 border-l-orange-500">
                <p className="font-bold text-gray-900 text-sm mb-2">Durante o longão</p>
                <p className="text-xs text-gray-500">Acima de 12-14K: 1 gel a cada 45-50 min. Água em pequenos goles.</p>
              </Card>
              <Card className="!p-4 border-l-4 border-l-green-500">
                <p className="font-bold text-gray-900 text-sm mb-2">Pós-longão</p>
                <p className="text-xs text-gray-500">Refeição em até 60 min. Carboidrato + Proteína. Reidratar até urina clara.</p>
              </Card>
            </div>
          </section>

          <Card className="bg-gradient-to-br from-indigo-900 to-indigo-800 text-white">
            <h4 className="font-black text-center mb-4 text-orange-400">PROTOCOLO DIA DA PROVA</h4>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-tighter">
              <div className="p-3 bg-white/10 rounded-2xl">Acordar 3h antes</div>
              <div className="p-3 bg-white/10 rounded-2xl">Café igual ao treino</div>
              <div className="p-3 bg-white/10 rounded-2xl">400-500ml água</div>
              <div className="p-3 bg-white/10 rounded-2xl">Gel a cada 45min</div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const Tips = () => {
    return (
      <div className="px-6 pt-8 animate-in slide-in-from-right duration-300">
        <h2 className="text-2xl font-black text-indigo-900 mb-6 flex items-center gap-2">
          <Info className="text-indigo-600" /> Dicas JM Runners
        </h2>

        <div className="space-y-4">
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-black text-indigo-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-orange-500" /> ORIENTAÇÃO DE RITMO
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Leves & Longões</p>
                <p className="text-lg font-black text-indigo-600">6:45 – 7:30 min/km</p>
                <p className="text-xs text-gray-500">Ritmo de conversa confortável.</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Fartlek (Forte)</p>
                <p className="text-lg font-black text-pink-600">6:00 – 6:20 min/km</p>
                <p className="text-xs text-gray-500">Confortavelmente difícil, sem sprint.</p>
              </div>
            </div>
          </section>

          <section className="bg-indigo-900 p-6 rounded-3xl text-white">
            <h3 className="font-black mb-4 flex items-center gap-2 text-orange-400">
              <MapPin /> ESTRATÉGIA DE PROVA
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex gap-3"><ChevronRight className="flex-shrink-0 text-orange-400" size={16} /> Começar mais lento que o necessário.</li>
              <li className="flex gap-3"><ChevronRight className="flex-shrink-0 text-orange-400" size={16} /> Água em todos os postos.</li>
              <li className="flex gap-3"><ChevronRight className="flex-shrink-0 text-orange-400" size={16} /> Gel de carboidrato regular.</li>
              <li className="flex gap-3"><ChevronRight className="flex-shrink-0 text-orange-400" size={16} /> Ritmo confortável desde o km 1.</li>
            </ul>
          </section>

          <section className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
             <h3 className="font-bold text-orange-800 mb-3">PONTOS DE ATENÇÃO</h3>
             <ul className="space-y-2 text-xs text-orange-700 font-bold">
               <li>• Aquecimento mínimo de 5-10 min</li>
               <li>• Alongamento leve após os treinos</li>
               <li>• Usar o mesmo tênis da prova a partir dos 14K</li>
               <li>• Dormir bem antes dos treinos longos</li>
             </ul>
          </section>
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
      <main className="pb-8">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
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
    className={`flex flex-col items-center gap-1 transition-colors duration-200 ${active ? 'text-indigo-600' : 'text-gray-400'}`}
  >
    <div className={`p-2 rounded-2xl transition-all ${active ? 'bg-indigo-50' : ''}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 22, strokeWidth: active ? 2.5 : 2 })}
    </div>
    <span className="text-[10px] font-bold tracking-tight uppercase">{label}</span>
  </button>
);

export default App;
