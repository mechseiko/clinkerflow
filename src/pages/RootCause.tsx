import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Wrench, Cpu, ClipboardCheck, Clock, BookOpen } from 'lucide-react';
import { rootCauseData } from '../data/rootCauseData';
import { plantStages } from '../data/plantData';
import { statusColor } from '../utils/formatters';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import type { FailureCategory, MechanicalFailure } from '../types';

function FailureCard({ failure }: { failure: MechanicalFailure }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#080B12] border border-[#1E2536] rounded-xl p-4 space-y-4"
    >
      <div className="flex items-start gap-2 border-b border-[#1E2536] pb-2">
        <Wrench className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Observed Failure Mode</span>
          <h4 className="text-sm font-semibold text-white">{failure.reason}</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">Mechanical Explanation</span>
          <p className="text-slate-300 leading-normal">{failure.mechanicalExplanation}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">Process Explanation</span>
          <p className="text-slate-300 leading-normal">{failure.processExplanation}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs border-t border-[#1E2536] pt-3">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">Target Instrumentation</span>
          <span className="text-slate-300 font-mono block bg-slate-900 px-2 py-1 rounded border border-[#1E2536] mt-1 text-[11px]">
            {failure.instrumentation}
          </span>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">Verification Inspection</span>
          <p className="text-slate-300 leading-normal mt-1 text-[11px]">{failure.howToVerify}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">Corrective Action</span>
          <p className="text-slate-300 leading-normal mt-1 text-[11px]">{failure.typicalCorrectiveAction}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-[#1E2536]/50 pt-2.5">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-600" />
          Downtime estimate: <strong className="text-amber-500 font-mono font-bold">{failure.estimatedDowntime}</strong>
        </span>
        <span className="italic flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-slate-600" />
          Ref: {failure.literatureRef}
        </span>
      </div>
    </motion.div>
  );
}

function CategoryAccordion({ cat, stageId }: { cat: FailureCategory; stageId: string }) {
  const [open, setOpen] = useState(false);
  const freqColor = cat.frequency === 'High' ? '#EF4444' : cat.frequency === 'Medium' ? '#F59E0B' : '#94a3b8';

  return (
    <div className="bg-[#0A0D14] border border-[#1E2536] rounded-xl overflow-hidden">
      <button
        id={`cat-${stageId}-${cat.id}`}
        className="w-full flex items-center justify-between p-4 hover:bg-[#1A2035]/30 transition-colors text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3">
          {open ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
          <span className="text-sm font-semibold text-slate-200">{cat.name}</span>
          <span
            className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase"
            style={{ color: freqColor, borderColor: `${freqColor}40`, backgroundColor: `${freqColor}10` }}
          >
            {cat.frequency} Occurrence Freq
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono font-bold">
          {cat.failures.length} Failure Mode{cat.failures.length > 1 ? 's' : ''}
        </span>
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
            <div className="px-4 pb-4 space-y-4 border-t border-[#1E2536] pt-4">
              {cat.failures.map((f) => (
                <FailureCard key={f.id} failure={f} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RootCause() {
  const [selectedStage, setSelectedStage] = useState<string>('packaging');
  const stageData = rootCauseData.find((r) => r.stageId === selectedStage);
  const stageInfo = plantStages.find((s) => s.id === selectedStage);

  return (
    <div className="space-y-6">
      <DisclaimerBanner />

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Root Cause Explorer</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Select a process stage to investigate physical failure mechanisms, diagnostic instrumentation, and literature reference materials
        </p>
      </div>

      {/* Stage selector grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {rootCauseData.map((r) => {
          const stage = plantStages.find((s) => s.id === r.stageId);
          const color = stage ? statusColor(stage.status) : '#64748b';
          const isActive = selectedStage === r.stageId;
          return (
            <button
              key={r.stageId}
              id={`rc-stage-${r.stageId}`}
              onClick={() => setSelectedStage(r.stageId)}
              className={`flex flex-col items-start gap-1 p-2.5 rounded-lg border text-left transition-all duration-200 ${
                isActive
                  ? 'text-white border-current'
                  : 'text-slate-400 border-[#1E2536] hover:border-slate-500 hover:text-slate-200'
              }`}
              style={isActive ? { borderColor: color, backgroundColor: `${color}10`, color } : {}}
            >
              <span className="text-[9px] font-mono text-slate-500 uppercase block leading-none font-bold">
                {r.lossIndex}
              </span>
              <span className="text-xs font-bold truncate w-full">{r.stageName}</span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Panel */}
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
            {/* Stage header info */}
            <div className="panel p-5 space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: statusColor(stageInfo.status) }}
                />
                <h3 className="font-bold text-white text-base">{stageInfo.name}</h3>
                <span className="text-xs text-slate-500 font-mono">
                  — Loss Index: {stageData.lossIndex}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{stageInfo.description}</p>
              <div className="bg-[#080B12] rounded-lg p-3 border border-[#1E2536] text-xs">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block mb-1">
                  Primary Loss Mechanism
                </span>
                <p className="text-slate-300 leading-normal">{stageData.lossMechanism}</p>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              <span className="text-white font-medium">{stageInfo.name}</span>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span>Failure Categories</span>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span>Diagnostic Verification</span>
            </div>

            {/* Failure category accordions */}
            <div className="space-y-3">
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
