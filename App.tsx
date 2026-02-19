
import React, { useEffect, useState } from 'react';
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
    const handleScroll = () => {
      setScrolled(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: Page) => {
    setIsSyncing(true);
    // On simule une synchronisation neurale avant le changement de page
    setTimeout(() => {
      setCurrentPage(page);
      setIsSyncing(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  if (isSyncing) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-eva-purple p-12 overflow-hidden">
        <div className="absolute inset-0 nerv-grid opacity-20"></div>
        <div className="w-64 h-64 border-4 border-dashed border-eva-purple rounded-full animate-[spin_4s_linear_infinite] flex items-center justify-center relative">
          <div className="w-48 h-48 border-2 border-eva-green rounded-full animate-[spin_2s_linear_infinite_reverse] absolute"></div>
          <ShieldAlert className="w-20 h-20 animate-pulse" />
        </div>
        <h2 className="text-4xl font-bold mono mt-12 animate-pulse tracking-widest uppercase">Syncing Neural Link...</h2>
        <div className="mt-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-2 bg-eva-purple animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
        <p className="mt-8 mono text-sm opacity-50">BYPASSING CENTRAL DOGMA ENCRYPTION</p>
      </div>
    );
  }

  if (currentPage === 'HANGAR') {
    return <HangarPage onBack={() => navigateTo('HOME')} />;
  }

  if (currentPage === 'NEURAL_LAB') {
    return <AiLab onBack={() => navigateTo('HOME')} />;
  }

  return (
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
                <ShieldAlert className="w-4 h-4" /> Priority Alpha Clearance Detected
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-white">
                LYES <br />
                <span className="text-eva-purple opacity-80">TECH PROTOCOL</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                Architecting the future of Human-Machine Instrumentality. Specialized in neural interfaces and high-end digital urbanism.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => navigateTo('HANGAR')}
                  className="px-8 py-4 bg-eva-purple text-black font-bold uppercase tracking-widest hover:bg-eva-green transition-all flex items-center gap-3 glitch-hover"
                >
                  <LayoutGrid className="w-5 h-5" /> Enter Hangar
                </button>
                <button 
                  onClick={() => navigateTo('NEURAL_LAB')}
                  className="px-8 py-4 border-2 border-eva-orange text-eva-orange font-bold uppercase tracking-widest hover:bg-eva-orange/10 transition-all flex items-center gap-3"
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
                    <div className="text-xs text-eva-green mono uppercase tracking-widest">Pilot Designation</div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-eva-purple/50 animate-bounce">
          <span className="mono text-[10px] tracking-widest uppercase">Continue Mission</span>
          <ChevronDown />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-black">
        <div className="container mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-eva-green mb-2">
                <Target className="w-5 h-5" />
                <span className="mono text-sm uppercase tracking-[0.3em]">Operational History</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Mission Logs</h2>
            </div>
            <div className="mono text-xs text-gray-500 uppercase tracking-widest border-l border-eva-purple/30 pl-4">
              All data classified as <br /> <span className="text-eva-orange">NERV SECRET</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group relative bg-black border border-eva-purple/30 overflow-hidden hover:border-eva-green/50 transition-all duration-500">
                <div className="absolute top-0 right-0 p-3 bg-eva-purple/10 border-l border-b border-eva-purple/30 mono text-xs text-eva-purple z-10">
                  CODE: {project.id}
                </div>
                
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-eva-purple/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[10px] mono text-eva-green uppercase">
                    {project.status === 'COMPLETED' ? <CheckCircle2 className="w-3 h-3" /> : <Activity className="w-3 h-3 animate-pulse" />}
                    {project.status}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-eva-green transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 border border-eva-purple/20 text-[10px] mono text-eva-purple uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => navigateTo('HANGAR')}
                    className="w-full py-2 border border-eva-purple/30 text-eva-purple mono text-[10px] uppercase hover:bg-eva-purple hover:text-black transition-all"
                  >
                    Examine Unit {project.id}
                  </button>
                </div>
                <div className="h-1 w-0 bg-eva-green group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
          <Cpu className="w-96 h-96 text-eva-purple" />
        </div>

        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 space-y-6 sticky top-32">
              <div className="flex items-center gap-2 text-eva-purple mb-2">
                <Zap className="w-5 h-5" />
                <span className="mono text-sm uppercase tracking-[0.3em]">Core Competencies</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Sync Ratio</h2>
              <p className="text-gray-400 leading-relaxed">
                Subject Lyes exhibits a remarkable 99% neural compatibility with modern development stacks. Core maintenance protocols and real-time response capabilities are within optimal NERV standards.
              </p>
              
              <div className="p-6 border border-eva-orange/30 bg-eva-orange/5 space-y-4">
                <div className="flex justify-between items-center mono text-xs uppercase text-eva-orange font-bold">
                  <span>Battle Ready</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-2 bg-black overflow-hidden border border-eva-orange/20">
                  <div className="h-full bg-eva-orange w-full"></div>
                </div>
              </div>
              
              <button 
                onClick={() => navigateTo('HANGAR')}
                className="w-full py-4 border-2 border-eva-green text-eva-green font-bold uppercase tracking-[0.2em] mono flex items-center justify-center gap-3 hover:bg-eva-green/10 transition-all"
              >
                <Activity className="w-5 h-5" /> Review Combat Data
              </button>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {SKILLS.map((skill) => (
                <div key={skill.name} className="p-6 bg-black/40 border border-eva-purple/20 rounded-sm group hover:border-eva-green/40 transition-all">
                  <div className="flex justify-between items-end mb-3">
                    <span className="mono text-[10px] text-eva-purple uppercase tracking-widest">{skill.category}</span>
                    <span className="mono text-xl font-bold text-white group-hover:text-eva-green transition-colors">{skill.level}%</span>
                  </div>
                  <h4 className="text-lg font-bold mb-4 tracking-tight">{skill.name}</h4>
                  <div className="w-full h-1 bg-white/5 relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-eva-purple group-hover:bg-eva-green transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                    <div className="absolute top-0 h-full w-20 bg-white/20 -skew-x-12 animate-[shimmer_2s_infinite] left-[-100px]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive MAGI System */}
      <MagiSystem />

      <style>{`
        @keyframes shimmer {
          0% { left: -100px; }
          100% { left: 100%; }
        }
      `}</style>
    </Layout>
  );
};

export default App;
