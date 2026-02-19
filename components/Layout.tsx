
import React from 'react';
import { Terminal, Shield, Cpu, Activity, LayoutGrid } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* HUD Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-eva-purple/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-eva-purple flex items-center justify-center rounded-sm transform rotate-45 shadow-[0_0_10px_rgba(127,0,255,0.5)]">
            <Shield className="w-6 h-6 text-black transform -rotate-45" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter font-mono leading-none">LYES</h1>
            <p className="text-[10px] text-eva-purple uppercase tracking-widest font-mono">Nerv Technical Division</p>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8 uppercase font-mono text-sm font-medium tracking-widest">
          <a href="#hero" className="hover:text-eva-green transition-colors flex items-center gap-2"><Activity className="w-4 h-4" /> Status</a>
          <a href="#projects" className="hover:text-eva-green transition-colors flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Mission</a>
          <a href="#skills" className="hover:text-eva-green transition-colors flex items-center gap-2"><Cpu className="w-4 h-4" /> Core</a>
          <a href="#magi" className="hover:text-eva-green transition-colors flex items-center gap-2"><Terminal className="w-4 h-4" /> Magi</a>
        </nav>

        <div className="flex flex-col items-end font-mono text-[10px]">
          <span className="text-eva-green">SYNC RATE: 99.8%</span>
          <span className="text-red-500 animate-pulse">INTERNAL POWER: 04:59:59</span>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-eva-purple/20 p-8 mt-20 relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Copyright © 2024 Lyes Technical Solutions</p>
            <p className="font-mono text-[10px] text-eva-purple mt-1 tracking-widest">AUTHORIZED PERSONNEL ONLY - TOP SECRET</p>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 border border-eva-purple flex items-center justify-center text-eva-purple hover:bg-eva-purple hover:text-black transition-all cursor-pointer">
              <span className="text-xs font-bold">GH</span>
            </div>
            <div className="w-8 h-8 border border-eva-purple flex items-center justify-center text-eva-purple hover:bg-eva-purple hover:text-black transition-all cursor-pointer">
              <span className="text-xs font-bold">IN</span>
            </div>
            <div className="w-8 h-8 border border-eva-purple flex items-center justify-center text-eva-purple hover:bg-eva-purple hover:text-black transition-all cursor-pointer">
              <span className="text-xs font-bold">TW</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
