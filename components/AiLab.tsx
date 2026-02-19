
import React, { useState } from 'react';
import { Target, Zap, Activity, Brain, ShieldAlert, Cpu, Layers, ChevronLeft, Database, Activity as ActivityIcon } from 'lucide-react';
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
    if (!projectInput.trim()) return;
    setIsAnalyzing(true);
    const res = await magiService.queryMagi(projectInput, 'PROJECT');
    setProjectResult(res);
    setIsAnalyzing(false);
  };

  const calculateSync = async () => {
    if (!syncInput.trim()) return;
    setIsSyncing(true);
    const res = await magiService.queryMagi(syncInput, 'SYNC');
    setSyncResult(res);
    setIsSyncing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative nerv-grid">
      {/* Background HUD Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)]"></div>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-eva-orange/30 pb-6 gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 border border-eva-orange hover:bg-eva-orange/20 transition-all text-eva-orange shadow-[0_0_15px_rgba(255,107,0,0.2)]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mono flex items-center gap-4">
              <Brain className="w-8 h-8 text-eva-orange" />
              NEURAL ASSESSMENT LAB // MAGI CORE
            </h1>
            <p className="text-eva-orange mono text-[10px] uppercase tracking-widest mt-1">Status: Operational // Unauthorized access strictly prohibited</p>
          </div>
        </div>
        <div className="flex gap-4 mono text-[10px]">
          <div className="p-3 border border-eva-purple text-eva-purple bg-eva-purple/5 flex flex-col items-center min-w-[100px]">
            <span className="opacity-50">MELCHIOR-1</span>
            <span className="text-lg font-bold">YES</span>
          </div>
          <div className="p-3 border border-eva-purple text-eva-purple bg-eva-purple/5 flex flex-col items-center min-w-[100px]">
            <span className="opacity-50">BALTHAZAR-2</span>
            <span className="text-lg font-bold">YES</span>
          </div>
          <div className="p-3 border border-eva-orange text-eva-orange bg-eva-orange/5 flex flex-col items-center min-w-[100px]">
            <span className="opacity-50">CASPER-3</span>
            <span className="text-lg font-bold animate-pulse">SYNCING</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column - Diagnostics */}
        <div className="lg:col-span-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tool 1: Project Feasibility */}
            <div className="p-8 border-2 border-eva-purple/30 bg-black/60 relative group hover:border-eva-purple/60 transition-all shadow-[0_0_30px_rgba(127,0,255,0.05)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-eva-purple/20 flex items-center justify-center border border-eva-purple">
                  <Target className="text-eva-purple" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Feasibility Predictor</h3>
                  <p className="text-[10px] mono text-eva-purple/60">STRATEGIC PLANNING UNIT</p>
                </div>
              </div>

              <textarea 
                value={projectInput}
                onChange={(e) => setProjectInput(e.target.value)}
                placeholder="INPUT PROJECT DATA..."
                className="w-full h-32 bg-black/80 border border-eva-purple/30 p-4 text-sm mono text-eva-purple outline-none focus:border-eva-purple transition-all mb-4 placeholder:opacity-20"
              />

              <button 
                onClick={analyzeProject}
                disabled={isAnalyzing}
                className="w-full py-4 bg-eva-purple text-black font-bold uppercase tracking-widest hover:bg-eva-green transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(127,0,255,0.2)]"
              >
                {isAnalyzing ? <Activity className="animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
                {isAnalyzing ? 'Processing...' : 'Execute Analysis'}
              </button>
            </div>

            {/* Tool 2: Sync Diagnostic */}
            <div className="p-8 border-2 border-eva-orange/30 bg-black/60 relative group hover:border-eva-orange/60 transition-all shadow-[0_0_30px_rgba(255,107,0,0.05)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-eva-orange/20 flex items-center justify-center border border-eva-orange">
                  <Zap className="text-eva-orange" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Neural Diagnostic</h3>
                  <p className="text-[10px] mono text-eva-orange/60">HARMONY RATIO UNIT</p>
                </div>
              </div>

              <input 
                value={syncInput}
                onChange={(e) => setSyncInput(e.target.value)}
                placeholder="ENTER PILOT MENTAL STATE..."
                className="w-full bg-black/80 border border-eva-orange/30 p-4 text-sm mono text-eva-orange outline-none focus:border-eva-orange transition-all mb-4 placeholder:opacity-20"
              />

              <button 
                onClick={calculateSync}
                disabled={isSyncing}
                className="w-full py-4 bg-eva-orange text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.2)]"
              >
                {isSyncing ? <Activity className="animate-spin" /> : <Cpu className="w-5 h-5" />}
                {isSyncing ? 'Calculating...' : 'Start Calibration'}
              </button>
            </div>
          </div>

          {/* Results Area */}
          {(projectResult || syncResult) && (
            <div className="p-8 border border-eva-green/30 bg-eva-green/5 space-y-8 animate-in fade-in duration-700">
              {projectResult && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-eva-green mono text-xs font-bold uppercase border-b border-eva-green/20 pb-2">
                    <Layers className="w-4 h-4" /> Strategic Assessment Log
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed mono whitespace-pre-wrap pl-4 border-l-2 border-eva-green">
                    {projectResult}
                  </div>
                </div>
              )}
              {syncResult && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-eva-orange mono text-xs font-bold uppercase border-b border-eva-orange/20 pb-2">
                    <ActivityIcon className="w-4 h-4" /> Neural Harmony Log
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed mono whitespace-pre-wrap pl-4 border-l-2 border-eva-orange">
                    {syncResult}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Status Monitors */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-6 border border-eva-purple/20 bg-black/40">
            <h4 className="mono text-xs font-bold text-eva-purple uppercase mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" /> System Load
            </h4>
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', val: '78%', color: 'bg-eva-purple' },
                { label: 'Memory Bank', val: '92%', color: 'bg-eva-orange' },
                { label: 'Sync Depth', val: '450m', color: 'bg-eva-green' }
              ].map(stat => (
                <div key={stat.label}>
                  <div className="flex justify-between mono text-[10px] mb-1">
                    <span>{stat.label}</span>
                    <span>{stat.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 w-full">
                    <div className={`h-full ${stat.color} transition-all duration-1000`} style={{ width: stat.val.includes('m') ? '80%' : stat.val }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-square bg-black border border-eva-orange/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)] group-hover:opacity-100 opacity-50 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border border-eva-orange/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="w-32 h-32 border-2 border-dashed border-eva-orange/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute text-center mono">
                <p className="text-[10px] text-eva-orange/60">ACTIVE</p>
                <p className="text-xl font-bold">MAGI-3</p>
              </div>
            </div>
            {/* Random text noise */}
            <div className="absolute top-2 left-2 mono text-[8px] text-eva-orange/40 leading-none">
              QUERY_TYPE: NEURAL_ASSESS<br/>
              BUFFER: 0x8F4A2<br/>
              STABILITY: NOMINAL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiLab;
