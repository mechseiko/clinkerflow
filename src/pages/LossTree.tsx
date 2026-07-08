import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, User, AlertTriangle, CheckSquare } from 'lucide-react';
import { lossData, totalLoss, waterfallData } from '../data/lossData';
import { WaterfallChart } from '../components/charts/WaterfallChart';
import { formatNumber } from '../utils/formatters';
import type { LossEntry, LossCause } from '../types';

function PriorityBadge({ priority }: { priority: LossCause['priority'] }) {
  const cls = priority === 'Critical' ? 'badge-critical' : priority === 'High' ? 'badge-high' : 'badge-medium';
  return <span className={cls}>{priority}</span>;
}

function CauseCard({ cause, stageId }: { cause: LossCause; stageId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="bg-[#0A0D14] border border-[#1E2536] rounded-lg overflow-hidden"
    >
      <button
        id={`cause-${stageId}-${cause.id}`}
        className="w-full text-left p-4 hover:bg-[#1A2035]/50 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex flex-wrap items-start gap-x-3 gap-y-2 justify-between">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm text-slate-200 leading-snug">{cause.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <PriorityBadge priority={cause.priority} />
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <User className="w-3 h-3" />
                  {cause.owner}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-mono text-red-400 font-semibold">−{formatNumber(cause.loss)} TPD</span>
            {open ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
          </div>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-[#1E2536]">
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckSquare className="w-3 h-3" />
                Recommended Actions
              </div>
              <ul className="space-y-1.5">
                {cause.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-industrial-blue mt-0.5 shrink-0">→</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LossStageAccordion({ entry, index }: { entry: LossEntry; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const pct = (entry.totalLoss / totalLoss) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="panel overflow-hidden"
    >
      <button
        id={`loss-stage-${entry.stageId}`}
        className="w-full flex items-center justify-between p-5 hover:bg-[#1A2035]/30 transition-colors text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3 min-w-0">
          {open ? <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />}
          <div>
            <span className="font-semibold text-white text-sm">{entry.stage}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-24 h-1.5 bg-[#1A2035] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-red-500" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{pct.toFixed(1)}% of total</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="text-right">
            <div className="text-base sm:text-lg font-bold text-red-400 font-mono">−{formatNumber(entry.totalLoss)}</div>
            <div className="text-[10px] text-slate-500">TPD lost</div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-2 border-t border-[#1E2536] pt-4">
              {entry.causes.map((cause) => (
                <CauseCard key={cause.id} cause={cause} stageId={entry.stageId} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function LossTree() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-white">Interactive Loss Tree</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Click each stage to expand causes, actions, and owners</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl sm:text-3xl font-bold text-red-400 font-mono">−{formatNumber(totalLoss)}</div>
          <div className="text-xs text-slate-500">Total TPD Lost Today</div>
        </div>
      </div>

      {/* Waterfall Chart */}
      <div className="panel">
        <div className="panel-header">
          <span className="text-sm font-semibold text-white">Cumulative Loss Waterfall</span>
          <span className="text-xs text-slate-500">Design Capacity → Actual Output</span>
        </div>
        <div className="p-4 h-48 sm:h-64 md:h-72">
          <WaterfallChart data={waterfallData} />
        </div>
      </div>

      {/* Loss accordion */}
      <div className="space-y-3">
        {lossData.map((entry, i) => (
          <LossStageAccordion key={entry.stageId} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
