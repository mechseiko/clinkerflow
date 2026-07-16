import { useState } from 'react';
import { Menu, ShieldAlert, Tractor, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopbarProps {
  onMobileOpen: () => void;
}

export function Topbar({ onMobileOpen }: TopbarProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

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
          <span>Team Dynamo's - Clinker to Cement Conversion Framework</span>
        </div>
      </div>

      {/* Right section: Shift selector + Demo mode indicator */}
      <div
        title="Values shown are illustrative engineering examples developed for demonstration purposes and do not represent actual Dangote Cement operational data."
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setShowDemoModal(true)}
      >
        {/* Demo notification banner */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/25 select-none">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] font-mono font-bold text-amber-400">DEMO</span>
        </div>
      </div>

      {/* Disclaimer Strip bottom overlay */}
      <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E2536] to-transparent" />

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={() => setShowDemoModal(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#0F1320] border border-[#1E2536] rounded-xl p-5 max-w-sm w-full shadow-2xl relative z-10"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#1A2035] border border-[#1E2536] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-3 mt-2 pr-4">
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/25 text-amber-400 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Demonstration Mode</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    Values shown are illustrative engineering examples developed for demonstration purposes and do not represent actual Dangote Cement operational data.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
