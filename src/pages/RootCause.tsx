import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Wrench, Cpu, ClipboardCheck, Clock } from 'lucide-react';
import { rootCauseData } from '../data/rootCauseData';
import { plantStages } from '../data/plantData';
import { statusColor, frequencyColor } from '../utils/formatters';
import type { RootCauseNode, FailureCategory, MechanicalFailure } from '../types';

function FailureCard({ failure }: { failure: MechanicalFailure }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#080B12] border border-[#1E2536] rounded-lg p-4 space-y-3"
    >
      <div className="flex items-start gap-2">
        <Wrench className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-medium text-white">{failure.reason}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-start gap-2">
          <Cpu className="w-3.5 h-3.5 text-industrial-blue shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Instrumentation</div>
            <div className="text-xs text-slate-300 font-mono">{failure.instrumentation}</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ClipboardCheck className="w-3.5 h-3.5 text-industrial-green shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Recommended Inspection</div>
            <div className="text-xs text-slate-300">{failure.recommendedInspection}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Est. Downtime</div>
            <div className="text-xs text-amber-400 font-mono">{failure.estimatedDowntime}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryAccordion({ cat, stageId }: { cat: FailureCategory; stageId: string }) {
  const [open, setOpen] = useState(false);
  const freqColor = frequencyColor(cat.frequency);

  return (
    <div className="bg-[#0A0D14] border border-[#1E2536] rounded-lg overflow-hidden">
      <button
        id={`cat-${stageId}-${cat.id}`}
        className="w-full flex items-center justify-between p-4 hover:bg-[#1A2035]/40 transition-colors text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
          <span className="text-sm font-medium text-slate-200">{cat.name}</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-semibold border"
            style={{ color: freqColor, borderColor: `${freqColor}40`, backgroundColor: `${freqColor}10` }}
          >
            {cat.frequency} Freq
          </span>
        </div>
        <span className="text-xs text-slate-500">{cat.failures.length} failure type{cat.failures.length > 1 ? 's' : ''}</span>
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
            <div className="px-4 pb-4 space-y-2 border-t border-[#1E2536] pt-4">
              {cat.failures.map((f) => <FailureCard key={f.id} failure={f} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RootCause() {
  const [selectedStage, setSelectedStage] = useState<string>('packing');
  const stageData = rootCauseData.find((r) => r.stageId === selectedStage);
  const stageInfo = plantStages.find((s) => s.id === selectedStage);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white">Root Cause Explorer</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Select a process stage to explore failure modes, instrumentation, and inspection guidance</p>
      </div>

      {/* Stage selector */}
      <div className="flex flex-wrap gap-2">
        {rootCauseData.map((r) => {
          const stage = plantStages.find((s) => s.id === r.stageId);
          const color = stage ? statusColor(stage.status) : '#64748b';
          const isActive = selectedStage === r.stageId;
          return (
            <button
              key={r.stageId}
              id={`rc-stage-${r.stageId}`}
              onClick={() => setSelectedStage(r.stageId)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                isActive
                  ? 'text-white border-current'
                  : 'text-slate-400 border-[#1E2536] hover:border-slate-500 hover:text-slate-200'
              }`}
              style={isActive ? { borderColor: color, backgroundColor: `${color}15`, color } : {}}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {r.stageName}
            </button>
          );
        })}
      </div>

      {/* Stage detail */}
      {stageData && stageInfo && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Stage header */}
            <div className="panel p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: statusColor(stageInfo.status), boxShadow: `0 0 10px ${statusColor(stageInfo.status)}` }}
                />
                <span className="font-semibold text-white text-base">{stageInfo.name}</span>
                <span className="text-xs text-slate-500">— {stageData.failureCategories.length} failure categories documented</span>
              </div>
              <p className="text-sm text-slate-400">{stageInfo.description}</p>
            </div>

            {/* Drill-down breadcrumb */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="text-white font-medium">{stageInfo.name}</span>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span>Failure Category</span>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span>Mechanical Reason</span>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span>Instrumentation → Inspection</span>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              {stageData.failureCategories.map((cat) => (
                <CategoryAccordion key={cat.id} cat={cat} stageId={selectedStage} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
