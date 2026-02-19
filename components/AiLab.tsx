
import React, { useState, useEffect } from 'react';
import { Target, Zap, Activity, Brain, ShieldAlert, Cpu, Layers, ChevronLeft, Database, Activity as ActivityIcon, Terminal } from 'lucide-react';
import { magiService } from '../services/geminiService';

interface AiLabProps {
  onBack: () => void;
}

const AiLab: React.FC<AiLabProps> = ({ onBack }) => {
  const [projectInput, setProjectInput] = useState('');
  const [projectResult, setProjectResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [syncInput, setSyncInput] = useState('');
  const [syncResult, setSyncResult] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const analyzeProject = async () => {
    if (!projectInput.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const res = await magiService.queryMagi(projectInput, 'PROJECT');
      setProjectResult(res);
    } catch (err) {
      setProjectResult("SYSTEM ERROR: UNABLE TO ACCESS PROJECT CORE.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateSync = async () => {
    if (!syncInput.trim() || isSyncing) return;
    setIsSyncing(true);
    try {
      const res = await magiService.queryMagi(syncInput, 'SYNC');
      setSyncResult(res);
    } catch (err) {
      setSyncResult("SYSTEM ERROR: NEURAL FEED INTERRUPTED.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative flex flex-col font-mono">
      {/* HUD Background Decorations */}
      <div className="fixed inset-0 pointer-events-none opacity-5 nerv-grid"></div>
      
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-eva-orange pb-6 gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 border border-eva-orange hover:bg-eva-orange text-eva-orange hover:text-black transition-all flex items-center gap-2 group"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Back to Command</span>
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-4 text-eva-orange uppercase">
              <Brain className="w-8 h-8" />
              Neural Lab // Magi Core
            </h1>
            <p className="text-[10px] text-eva-orange/60 uppercase tracking-[0.4em] mt-1 font-bold">Terminal Dogma - Authorized Access Only</p>
          </div>
        </div>
        
        {/* Status Indicators */}
        <div className="flex gap-4">
           {['Melchior', 'Balthazar', 'Casper'].map((core, i) => (
             <div key={core} className="flex flex-col items-center p-2 border border-eva-purple bg-eva-purple/5 min-w-[80px]">
                <span className="text-[8px] opacity-50 uppercase">{core}</span>
                <span className="text-sm font-bold text-eva-purple">{i === 2 && isSyncing ? 'BUSY' : 'READY'}</span>
             </div>
           ))}
        </div>
      </header>

      {/* Main Lab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-grow relative z-10">
        
        {/* Input Zones */}
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Project Analysis Box */}
            <div className="border-2 border-eva-purple/20 bg-black/60 p-6 flex flex-col space-y-4 hover:border-eva-purple/50 transition-all">
              <div className="flex items-center gap-3 border-b border-eva-purple/20 pb-4">
                <Target className="w-5 h-5 text-eva-purple" />
                <h3 className="text-lg font-bold uppercase tracking-widest">Project Feasibility</h3>
              </div>
              <textarea 
                value={projectInput}
                onChange={(e) => setProjectInput(e.target.value)}
                placeholder="DESCRIBE MISSION PARAMETERS..."
                className="flex-grow min-h-[120px] bg-black border border-eva-purple/20 p-4 text-xs text-eva-purple focus:border-eva-purple outline-none resize-none placeholder:opacity-20"
              />
              <button 
                onClick={analyzeProject}
                disabled={isAnalyzing}
                className="w-full py-4 bg-eva-purple text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-eva-green transition-all disabled:opacity-50"
              >
                {isAnalyzing ? 'Processing...' : 'Calculate Strategy'}
              </button>
            </div>

            {/* Sync Diagnostic Box */}
            <div className="border-2 border-eva-orange/20 bg-black/60 p-6 flex flex-col space-y-4 hover:border-eva-orange/50 transition-all">
              <div className="flex items-center gap-3 border-b border-eva-orange/20 pb-4">
                <Zap className="w-5 h-5 text-eva-orange" />
                <h3 className="text-lg font-bold uppercase tracking-widest">Sync Diagnostic</h3>
              </div>
              <textarea 
                value={syncInput}
                onChange={(e) => setSyncInput(e.target.value)}
                placeholder="INPUT PILOT MENTAL WAVEFORM..."
                className="flex-grow min-h-[120px] bg-black border border-eva-orange/20 p-4 text-xs text-eva-orange focus:border-eva-orange outline-none resize-none placeholder:opacity-20"
              />
              <button 
                onClick={calculateSync}
                disabled={isSyncing}
                className="w-full py-4 bg-eva-orange text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50"
              >
                {isSyncing ? 'Calibrating...' : 'Sync Pilot Link'}
              </button>
            </div>
          </div>

          {/* Results Screen */}
          <div className="border border-white/10 bg-[#050505] min-h-[250px] p-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-eva-orange animate-pulse"></div>
             <div className="flex items-center gap-2 mb-4 text-[10px] uppercase font-bold text-gray-500">
                <Terminal className="w-3 h-3" /> System Output Log // Level 08 Access
             </div>
             
             {!projectResult && !syncResult && (
               <div className="flex items-center justify-center h-full opacity-10">
                  <Cpu className="w-20 h-20" />
               </div>
             )}

             <div className="space-y-6">
                {projectResult && (
                  <div className="animate-in slide-in-from-left duration-500">
                    <span className="text-[10px] text-eva-purple block mb-1">STRATEGIC REPORT:</span>
                    <p className="text-xs leading-relaxed text-gray-300 whitespace-pre-wrap pl-4 border-l-2 border-eva-purple">{projectResult}</p>
                  </div>
                )}
                {syncResult && (
                  <div className="animate-in slide-in-from-right duration-500">
                    <span className="text-[10px] text-eva-orange block mb-1">HARMONY ANALYSIS:</span>
                    <p className="text-xs leading-relaxed text-gray-300 whitespace-pre-wrap pl-4 border-l-2 border-eva-orange">{syncResult}</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column Monitor */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-4 border border-eva-purple/20 bg-eva-purple/5">
              <h4 className="text-[10px] font-bold uppercase text-eva-purple mb-4">Neural Buffer Status</h4>
              <div className="space-y-3">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="flex gap-1">
                      {[...Array(12)].map((_, j) => (
                        <div key={j} className={`h-4 flex-1 ${Math.random() > 0.3 ? 'bg-eva-purple/30' : 'bg-eva-purple animate-pulse'}`}></div>
                      ))}
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-6 border border-eva-orange/20 bg-black flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                 <div className="absolute inset-0 border border-eva-orange/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                 <div className="absolute inset-2 border-2 border-dashed border-eva-orange/40 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
                 <ShieldAlert className="w-8 h-8 text-eva-orange animate-pulse" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-eva-orange">Pattern Blue Check</span>
              <span className="text-xs font-black mt-1 text-eva-green">NEGATIVE</span>
           </div>

           <div className="p-4 border border-white/5 bg-black">
              <p className="text-[9px] text-gray-500 leading-tight">
                NERV DATA INTERFACE VERSION 3.1.2<br/>
                USER_ID: PILOT_LYES<br/>
                ENCRYPTION: QUANTUM_HEX<br/>
                LOCATION: TOKYO-3 CENTRAL DOGMA
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AiLab;
