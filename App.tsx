
import React, { useEffect, useState, Suspense } from 'react';
import Layout from './components/Layout.tsx';
import MagiSystem from './components/MagiSystem.tsx';
import HangarPage from './components/HangarPage.tsx';
import AiLab from './components/AiLab.tsx';
import MagiFloatingBot from './components/MagiFloatingBot.tsx';
import { PROJECTS, HERO_IMAGE } from './constants.tsx';
import { ShieldAlert, Activity, ChevronDown, LayoutGrid, Brain, Target, Lock } from 'lucide-react';

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
    setIsSyncing(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsSyncing(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  if (isSyncing) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-eva-purple p-12 fade-in">
        <div className="absolute inset-0 nerv-grid opacity-30"></div>
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-dashed border-eva-purple rounded-full animate-[spin_4s_linear_infinite]"></div>
          <div className="absolute inset-4 border-2 border-eva-green rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <ShieldAlert className="w-12 h-12 animate-pulse" />
        </div>
        <div className="mt-12 text-center font-mono">
          <h2 className="text-4xl font-bold animate-pulse tracking-widest uppercase text-eva-purple">NEURAL SYNC</h2>
          <div className="mt-4 flex gap-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-10 h-1 bg-eva-purple/50 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
          <p className="mt-6 text-[10px] opacity-60 uppercase tracking-[0.5em]">Establishing link with Magi Core...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="bg-black h-screen w-screen" />}>
      {currentPage === 'HOME' && (
        <Layout>
          <MagiFloatingBot />
          
          <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 opacity-60"
              style={{ 
                backgroundImage: `url('${HERO_IMAGE}')`,
                transform: `scale(${1 + scrolled * 0.0003})`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-6 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-eva-orange/20 border border-eva-orange text-eva-orange font-mono text-xs uppercase tracking-widest font-bold animate-pulse">
                    <Lock className="w-4 h-4" /> Pilot Lyes Authorized
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none font-sans">
                    LYES <br />
                    <span className="text-eva-purple opacity-80 uppercase">Protocol 01</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light font-sans">
                    Engineering digital systems through the lens of Human Instrumentality. High-level architectural synchronization.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                    <button 
                      onClick={() => navigateTo('HANGAR')}
                      className="px-8 py-4 bg-eva-purple text-black font-bold uppercase tracking-widest hover:bg-eva-green transition-all flex items-center gap-3 glitch-hover shadow-[0_0_20px_rgba(127,0,255,0.4)] font-mono"
                    >
                      <LayoutGrid className="w-5 h-5" /> Hangar Access
                    </button>
                    <button 
                      onClick={() => navigateTo('NEURAL_LAB')}
                      className="px-8 py-4 border-2 border-eva-orange text-eva-orange font-bold uppercase tracking-widest hover:bg-eva-orange/10 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.2)] font-mono"
                    >
                      <Brain className="w-5 h-5" /> Neural Lab
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block flex-shrink-0 relative w-80 h-80">
                  <div className="absolute inset-0 border-4 border-dashed border-eva-purple/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute inset-4 border-2 border-dashed border-eva-green/20 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="text-center font-mono">
                        <div className="text-5xl font-bold text-eva-green">01</div>
                        <div className="text-[10px] text-eva-green uppercase tracking-[0.4em] mt-2">Core Status</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-eva-purple/50 animate-bounce">
              <span className="font-mono text-[10px] tracking-widest uppercase">Explore Terminal</span>
              <ChevronDown />
            </div>
          </section>

          <section id="projects" className="py-24 px-6 bg-black border-t border-eva-purple/10">
            <div className="container mx-auto">
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 text-eva-green mb-2">
                    <Target className="w-5 h-5" />
                    <span className="font-mono text-sm uppercase tracking-[0.3em]">Combat Logs</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter font-sans">Mission Files</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                  <div key={project.id} className="group relative bg-black/40 border border-eva-purple/20 overflow-hidden hover:border-eva-green/50 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-3 bg-eva-purple/10 border-l border-b border-eva-purple/30 font-mono text-xs text-eva-purple z-10">
                      #{project.id}
                    </div>
                    
                    <div className="h-64 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-eva-green transition-colors font-sans">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-light font-sans">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 border border-eva-purple/30 text-[10px] font-mono text-eva-purple uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
