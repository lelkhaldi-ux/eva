
import React, { useState } from 'react';
import { MISSION_VIDEO, EVA_UNITS } from '../constants';
import { ShieldAlert, Zap, Activity, ChevronLeft, Target, Database } from 'lucide-react';

interface HangarPageProps {
  onBack: () => void;
}

const HangarPage: React.FC<HangarPageProps> = ({ onBack }) => {
  const [selectedEva, setSelectedEva] = useState(EVA_UNITS[0]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative">
      {/* Background HUD Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(127,0,255,0.1)_0%,transparent_70%)]"></div>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-eva-purple/30 pb-6 gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 border border-eva-purple hover:bg-eva-purple/20 transition-all text-eva-purple"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mono">TERMINAL DOGMA // HANGAR 07</h1>
            <p className="text-eva-purple mono text-xs uppercase tracking-widest mt-1">Authorized Access: Pilot Lyes</p>
          </div>
        </div>
        <div className="flex gap-4 mono text-[10px]">
          <div className="p-2 border border-eva-orange text-eva-orange flex flex-col items-center">
            <span className="opacity-50">LCL DENSITY</span>
            <span className="text-lg font-bold">98.2%</span>
          </div>
          <div className="p-2 border border-eva-green text-eva-green flex flex-col items-center">
            <span className="opacity-50">SYNC HARMONY</span>
            <span className="text-lg font-bold">STABLE</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Left Col: Robot Selection & Video */}
        <div className="xl:col-span-2 space-y-8">
          <div className="relative aspect-video bg-gray-900 border-2 border-eva-purple/30 shadow-[0_0_50px_rgba(127,0,255,0.1)] overflow-hidden">
            <div className="absolute top-4 left-4 z-10 mono text-[10px] bg-red-600 px-2 py-1 animate-pulse">LIVE FEED: UNIT MONITORING</div>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-80"
            >
              <source src={MISSION_VIDEO} type="video/mp4" />
            </video>
            {/* HUD Overlay on Video */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent border-t-eva-purple/10 border-b-eva-purple/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EVA_UNITS.map((eva) => (
              <button
                key={eva.id}
                onClick={() => setSelectedEva(eva)}
                className={`p-6 border-2 transition-all flex flex-col items-start gap-3 relative overflow-hidden ${
                  selectedEva.id === eva.id 
                  ? 'border-eva-green bg-eva-green/5' 
                  : 'border-eva-purple/20 bg-black/40 hover:border-eva-purple/50'
                }`}
              >
                <div className="flex justify-between w-full">
                   <span className="mono text-[10px] opacity-60 uppercase">{eva.id}</span>
                   {selectedEva.id === eva.id && <Activity className="w-4 h-4 text-eva-green animate-pulse" />}
                </div>
                <h3 className={`text-xl font-bold tracking-tight ${selectedEva.id === eva.id ? 'text-eva-green' : 'text-gray-400'}`}>
                  {eva.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: eva.color }}></div>
                  <span className="mono text-[10px] opacity-50">{eva.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Col: Technical Specifications */}
        <div className="space-y-6">
          <div className="p-8 border-2 border-eva-orange/30 bg-eva-orange/5 relative">
            <div className="absolute top-0 right-0 p-3">
              <ShieldAlert className="w-8 h-8 text-eva-orange opacity-20" />
            </div>
            <h2 className="text-2xl font-bold mono text-eva-orange uppercase tracking-tighter mb-6 flex items-center gap-3">
              <Database className="w-6 h-6" /> Unit Specification
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-2 border-eva-orange pl-4">
                <p className="mono text-[10px] text-eva-orange opacity-60 uppercase">Designation</p>
                <p className="text-xl font-bold tracking-tight">{selectedEva.name}</p>
              </div>

              <div className="border-l-2 border-eva-orange pl-4">
                <p className="mono text-[10px] text-eva-orange opacity-60 uppercase">Assigned Pilot</p>
                <p className="text-xl font-bold tracking-tight">{selectedEva.pilot}</p>
              </div>

              <div className="border-l-2 border-eva-orange pl-4">
                <p className="mono text-[10px] text-eva-orange opacity-60 uppercase">Synchronization Level</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-bold text-eva-green mono">{selectedEva.syncRate}</span>
                  <div className="flex-1 h-2 bg-black border border-eva-orange/20 mb-2">
                    <div 
                      className="h-full bg-eva-green transition-all duration-1000" 
                      style={{ width: selectedEva.syncRate }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="mono text-xs leading-relaxed text-gray-400 italic">
                  "{selectedEva.description}"
                </p>
              </div>

              <button className="w-full py-4 bg-eva-orange text-black font-bold uppercase tracking-widest mt-8 flex items-center justify-center gap-3 hover:bg-eva-orange/80 transition-all">
                <Zap className="w-5 h-5" /> Execute Sortie
              </button>
            </div>
          </div>

          <div className="p-6 border border-eva-purple/20 bg-black/60">
             <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-eva-purple" />
                <span className="mono text-sm font-bold uppercase text-eva-purple">Radar Feed</span>
             </div>
             <div className="aspect-square bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] border border-eva-purple/10 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-eva-purple/20 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,1)]"></div>
                <span className="absolute bottom-4 mono text-[10px] text-red-500 animate-pulse font-bold">PATTERN BLUE DETECTED</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangarPage;
