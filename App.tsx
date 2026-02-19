
import React, { useEffect, useState, Suspense } from 'react';
import Layout from './components/Layout';
import MagiSystem from './components/MagiSystem';
import HangarPage from './components/HangarPage';
import AiLab from './components/AiLab';
import MagiFloatingBot from './components/MagiFloatingBot';
import { PROJECTS, SKILLS, HERO_IMAGE } from './constants';
import { Target, ShieldAlert, Cpu, Zap, Activity, ChevronDown, CheckCircle2, LayoutGrid, Brain } from 'lucide-react';

type Page = 'HOME' | 'HANGAR' | 'NEURAL_LAB';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [scrolled, setScrolled] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: Page) => {
    console.log(`[NERV] Initiating transition to: ${page}`);
    setIsSyncing(true);
    // Transition fluide imitant une synchronisation neurale
    setTimeout(() => {
      setCurrentPage(page);
      setIsSyncing(false);
      window.scrollTo(0, 0);
    }, 1000);
  };

  // Écran de transition (Sync Screen)
  if (isSyncing) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-eva-purple p-12 overflow-hidden animate-in fade-in duration-300">
        <div className="absolute inset-0 nerv-grid opacity-20"></div>
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-dashed border-eva-purple rounded-full animate-[spin_4s_linear_infinite]"></div>
          <div className="absolute inset-4 border-2 border-eva-green rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <ShieldAlert className="w-16 h-16 animate-pulse" />
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-4xl font-bold mono animate-pulse tracking-widest uppercase text-eva-purple">NEURAL SYNC</h2>
          <div className="mt-4 flex gap-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-12 h-1 bg-eva-purple animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
          <p className="mt-6 mono text-[10px] opacity-40 uppercase tracking-[0.5em]">Establishing link with Magi Core...</p>
        </div>
      </div>
    );
  }

  // Rendu de la page active
  return (
    <Suspense fallback={<div className="bg-black h-screen w-screen" />}>
      {currentPage === 'HOME' && (
        <Layout>
          <MagiFloatingBot />
          
          {/* Hero Section */}
          <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000"
              style={{ 
                backgroundImage: `url('${HERO_IMAGE}')`,
                transform: `scale(${1 + scrolled * 0.0005})`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-eva-orange/20 border border-eva-orange text-eva-orange mono text-xs uppercase tracking-widest font-bold animate-pulse">
                    <ShieldAlert className="w-4 h-4" /> Pilot Lyes Authorized
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white">
                    LYES <br />
                    <span className="text-eva-purple opacity-80 uppercase">Protocol 01</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
                    Engineering digital systems through the lens of Human Instrumentality. High-level architectural synchronization.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                    <button 
                      onClick={() => navigateTo('HANGAR')}
                      className="px-8 py-4 bg-eva-purple text-black font-bold uppercase tracking-widest hover:bg-eva-green transition-all flex items-center gap-3 glitch-hover shadow-[0_0_20px_rgba(127,0,255,0.3)]"
                    >
                      <LayoutGrid className="w-5 h-5" /> Hangar Access
                    </button>
                    <button 
                      onClick={() => navigateTo('NEURAL_LAB')}
                      className="px-8 py-4 border-2 border-eva-orange text-eva-orange font-bold uppercase tracking-widest hover:bg-eva-orange/10 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.2)]"
                    >
                      <Brain className="w-5 h-5" /> Neural Lab
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block flex-shrink-0 relative w-96 h-96">
                  <div className="absolute inset-0 border-4 border-dashed border-eva-purple/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute inset-4 border-2 border-eva-green/20 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="text-center">
                        <div className="text-5xl font-bold text-eva-green mono">01</div>
                        <div className="text-[10px] text-eva-green mono uppercase tracking-[0.4em] mt-2">Core Status</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-eva-purple/50 animate-bounce">
              <span className="mono text-[10px] tracking-widest uppercase">Explore Terminal</span>
              <ChevronDown />
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-24 px-6 bg-black border-t border-eva-purple/10">
            <div className="container mx-auto">
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-eva-green mb-2">
                    <Target className="w-5 h-5" />
                    <span className="mono text-sm uppercase tracking-[0.3em]">Combat Logs</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Mission Files</h2>
                </div>
                <div className="mono text-[10px] text-gray-500 uppercase tracking-widest border-l border-eva-purple/30 pl-4 leading-relaxed">
                  Encryption Level: <span className="text-eva-green">SSS</span> <br /> 
                  Location: <span className="text-eva-orange">GeoFront-Tokyo3</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                  <div key={project.id} className="group relative bg-black/40 border border-eva-purple/20 overflow-hidden hover:border-eva-green/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-3 bg-eva-purple/10 border-l border-b border-eva-purple/30 mono text-xs text-eva-purple z-10">
                      #{project.id}
                    </div>
                    
                    <div className="h-64 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-eva-purple/10 opacity-40 group-hover:opacity-0 transition-opacity"></div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-eva-green transition-colors">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 border border-eva-purple/30 text-[10px] mono text-eva-purple uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="h-1 w-0 bg-eva-green group-hover:w-full transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-24 px-6 bg-[#080808] relative overflow-hidden">
            <div className="container mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/3 space-y-8">
                  <div className="flex items-center gap-2 text-eva-purple mb-2">
                    <Zap className="w-5 h-5" />
                    <span className="mono text-sm uppercase tracking-[0.3em]">Core Integrity</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">Sync <br/> Capabilities</h2>
                  <p className="text-gray-400 leading-relaxed font-light">
                    Subject Lyes exhibits a 99.8% stability rating under extreme architectural stress. Neural pathways optimized for modern distributed systems.
                  </p>
                  <div className="p-6 border border-eva-orange/30 bg-eva-orange/5">
                    <div className="flex justify-between items-center mono text-[10px] uppercase text-eva-orange font-bold mb-3">
                      <span>Neural Stability</span>
                      <span>MAX</span>
                    </div>
                    <div className="w-full h-1 bg-black border border-eva-orange/20 overflow-hidden">
                      <div className="h-full bg-eva-orange w-full shadow-[0_0_10px_#ff6b00]"></div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {SKILLS.map((skill) => (
                    <div key={skill.name} className="p-6 bg-black border border-eva-purple/10 group hover:border-eva-green/40 transition-all">
                      <div className="flex justify-between items-end mb-4">
                        <span className="mono text-[10px] text-eva-purple uppercase tracking-widest">{skill.category}</span>
                        <span className="mono text-xl font-bold text-white group-hover:text-eva-green transition-colors">{skill.level}%</span>
                      </div>
                      <h4 className="text-lg font-bold mb-4 tracking-tight uppercase">{skill.name}</h4>
                      <div className="w-full h-1 bg-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-eva-purple group-hover:bg-eva-green transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <MagiSystem />
        </Layout>
      )}

      {currentPage === 'HANGAR' && (
        <HangarPage onBack={() => navigateTo('HOME')} />
      )}

      {currentPage === 'NEURAL_LAB' && (
        <AiLab onBack={() => navigateTo('HOME')} />
      )}
    </Suspense>
  );
};

export default App;
