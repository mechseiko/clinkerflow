import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Calculator, FileText, AlertCircle } from 'lucide-react';
import { lossData, totalLoss, waterfallData } from '../data/lossData';
import { WaterfallChart } from '../components/charts/WaterfallChart';
import { formatNumber } from '../utils/formatters';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { FormulaBlock } from '../components/ui/FormulaBlock';
import type { LossEntry } from '../types';

export function LossTree() {
  const [selectedLoss, setSelectedLoss] = useState<LossEntry | null>(lossData[0]);

  return (
    <div className="space-y-6">
      <DisclaimerBanner />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">Loss Tree Waterfall</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sequential throughput capacity deficit breakdown (q1 – q13) from design capacity to net dispatched tonnage
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-bold text-red-400 font-mono">−{formatNumber(totalLoss)} TPD</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Total Shift Capacity Lost</div>
        </div>
      </div>

      {/* Waterfall Chart */}
      <div className="panel">
        <div className="panel-header border-b border-[#1E2536] flex items-center justify-between">
          <span className="text-xs font-bold font-mono text-slate-500 uppercase">Process Stage Loss Impact</span>
          <span className="text-[10px] text-slate-500">Design Capacity (5,500 TPD) → Actual Dispatch</span>
        </div>
        <div className="p-4 h-64 md:h-72">
          <WaterfallChart data={waterfallData} />
        </div>
      </div>

      {/* Two-column layout: Loss List & Formula detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accordion List */}
        <div className="panel lg:col-span-1 h-full max-h-[500px] overflow-y-auto">
          <div className="panel-header border-b border-[#1E2536] py-3 text-xs font-bold font-mono text-slate-500 uppercase">
            Framework Loss Stages
          </div>
          <div className="divide-y divide-[#1E2536]/40">
            {lossData.map((entry) => {
              const isActive = selectedLoss?.lossIndex === entry.lossIndex;
              const pct = (entry.totalLoss / totalLoss) * 100;
              return (
                <button
                  key={entry.lossIndex}
                  onClick={() => setSelectedLoss(entry)}
                  className={`w-full flex items-center justify-between p-3.5 text-left transition-all ${
                    isActive ? 'bg-industrial-blue/5 border-l-2 border-industrial-blue' : 'hover:bg-[#1A2035]/20'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[9px] font-mono text-indigo-400 block uppercase tracking-wider font-bold">
                      Stage {entry.lossIndex}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 block truncate">{entry.stage}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-red-400 block">−{entry.totalLoss}</span>
                    <span className="text-[9px] text-slate-500 font-mono block">{pct.toFixed(1)}% of loss</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Details and Formula Detail */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedLoss ? (
              <motion.div
                key={selectedLoss.lossIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {/* Stage Header Info */}
                <div className="panel p-4 space-y-2">
                  <div className="flex items-center justify-between border-b border-[#1E2536] pb-2">
                    <h3 className="text-sm font-bold text-white">Operational Description</h3>
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">Stage Details</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedLoss.operationalExplanation}</p>
                  
                  {/* Assumptions */}
                  {selectedLoss.assumptions && selectedLoss.assumptions.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[9px] text-slate-500 uppercase font-mono font-bold block mb-1">
                        DCP Engineering Assumptions
                      </span>
                      <ul className="space-y-1 text-xs text-slate-400 pl-3 list-disc">
                        {selectedLoss.assumptions.map((as, i) => (
                          <li key={i} className="leading-relaxed">{as}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Formula Block */}
                <FormulaBlock
                  index={selectedLoss.lossIndex}
                  name={selectedLoss.stage + ' Loss Calculation'}
                  formula={selectedLoss.formula}
                  variables={selectedLoss.variables}
                  engineeringInterpretation={selectedLoss.engineeringInterpretation}
                  exampleCalculation={selectedLoss.exampleCalculation}
                />
              </motion.div>
            ) : (
              <div className="panel p-8 text-center flex flex-col items-center justify-center space-y-3 h-full">
                <Calculator className="w-8 h-8 text-slate-700" />
                <span className="text-xs text-slate-500 font-mono">Select a loss stage from the list to view its formulas and calculations.</span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
