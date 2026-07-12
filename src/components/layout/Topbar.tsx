import { useState } from 'react';
import { Menu, ShieldAlert, Cpu } from 'lucide-react';
import { DisclaimerBanner } from '../ui/DisclaimerBanner';

interface TopbarProps {
  onMobileOpen: () => void;
}

export function Topbar({ onMobileOpen }: TopbarProps) {
  const [selectedShift, setSelectedShift] = useState<'A' | 'B' | 'C'>('A');

  return (
    <header className="bg-[#080B12] border-b border-[#1E2536] h-16 flex items-center justify-between px-4 sm:px-6 relative shrink-0 z-30">
      {/* Left section: mobile toggle + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileOpen}
          className="lg:hidden p-2 rounded-lg bg-[#1A2035] border border-[#1E2536] text-slate-400 hover:text-white transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-medium text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-industrial-blue" />
          <span></span>
        </div>
      </div>

      {/* Right section: Shift selector + Demo mode indicator */}
      <div className="flex items-center gap-4">
        {/* <div className="flex items-center gap-1.5 bg-[#0F1320] border border-[#1E2536] p-1 rounded-lg">
          <span className="text-[10px] font-mono text-slate-500 uppercase px-2 font-bold">Shift</span>
          {(['A', 'B', 'C'] as const).map((shift) => (
            <button
              key={shift}
              onClick={() => setSelectedShift(shift)}
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded transition-all ${selectedShift === shift
                ? 'bg-industrial-blue/15 text-industrial-blue border border-industrial-blue/30'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
            >
              {shift}
            </button>
          ))}
        </div> */}

        {/* Demo notification banner */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/25">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] font-mono font-bold text-amber-400">DEMO</span>
        </div>
      </div>

      {/* Disclaimer Strip bottom overlay */}
      <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E2536] to-transparent" />
    </header>
  );
}
