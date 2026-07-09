import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BookOpen, Layers, Settings, ShieldAlert, Award } from 'lucide-react';
import { lossFormulas, engineeringAssumptions } from '../data/frameworkData';
import { plantStages } from '../data/plantData';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

const docTabs = [
  { id: 'overview', label: 'Overview', icon: Award },
  { id: 'framework', label: 'Framework Pathways', icon: Layers },
  { id: 'calculations', label: 'Loss Quantification', icon: Settings },
  { id: 'assumptions', label: 'Engineering Assumptions', icon: ShieldAlert },
];

export function Documentation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <DisclaimerBanner />

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Framework & Documentation</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Cement Grind Circuit Analysis Methodology, Mathematical Loss Models, and Operating Guidelines
        </p>
      </div>

      {/* Tab select strip */}
      <div className="flex flex-wrap gap-2 border-b border-[#1E2536] pb-2">
        {docTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition-all ${
                isActive
                  ? 'text-industrial-blue border-b-2 border-industrial-blue'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content wrapper */}
      <div className="panel p-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4 text-xs text-slate-300 leading-relaxed"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Project Objective</h3>
              <p>
                ClinkerFlow is a high-fidelity decision support tool built for the <strong>Dangote Cement University Engineering Challenge 2026</strong>.
              </p>
              <p>
                The platform is designed to shift operations away from simplistic runtime statistics towards an integrated <strong>mass and energy balance model</strong>, bridging data layers directly to maintenance work items.
              </p>
              
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono pt-3">The DCP Grinding Challenge</h3>
              <p>
                Grinding and packaging represent the physical bottlenecks of clinker dispatch. Traditional OEE limits tracking to major machines (the kiln or ball mill). ClinkerFlow maps every transition node, exposing vertical elevator bottlenecks, silo aeration restrictions, and bag rejection rates.
              </p>
            </motion.div>
          )}

          {activeTab === 'framework' && (
            <motion.div
              key="framework"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4 text-xs text-slate-350"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">14-Stage Process Cascade</h3>
              <p className="leading-relaxed">
                The conversion framework traces clinker production from calcination output through dispatch loading gate-out. Each stage is characterized by a specific volumetric transfer limits equation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {plantStages.map((stage) => (
                  <div key={stage.id} className="p-3.5 rounded-lg bg-[#080B12] border border-[#1E2536] space-y-1">
                    <span className="text-[9px] font-mono text-indigo-400 uppercase font-bold">
                      {stage.relatedLossIndex !== '—' ? `Deficit parameter: ${stage.relatedLossIndex}` : 'Input Source'}
                    </span>
                    <h4 className="text-xs font-bold text-white">{stage.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">{stage.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'calculations' && (
            <motion.div
              key="calculations"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Mathematical Deficit Formulations</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Every throughput shortfall is calculated dynamically based on physical process variables.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lossFormulas.map((f) => (
                  <div key={f.index} className="p-4 rounded-xl bg-[#080B12] border border-[#1E2536] space-y-2 text-xs">
                    <div className="flex justify-between border-b border-[#1E2536] pb-2">
                      <span className="font-bold text-white">{f.name}</span>
                      <span className="font-mono text-indigo-400 font-bold">{f.index}</span>
                    </div>
                    <div className="bg-[#0A0D14] p-2 rounded text-center font-mono text-xs text-slate-200 border border-[#1E2536]">
                      {f.formula}
                    </div>
                    <p className="text-slate-400 leading-normal text-[11px]">{f.engineeringInterpretation}</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Ref: <span className="italic">{f.references[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'assumptions' && (
            <motion.div
              key="assumptions"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">DCP Operational Assumptions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#1E2536] text-[10px] text-slate-500 uppercase font-bold">
                      <th className="py-2 pr-4">Category</th>
                      <th className="py-2 pr-4">Assumption</th>
                      <th className="py-2">Reference Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2536]/30 text-slate-300">
                    {engineeringAssumptions.map((ass) => (
                      <tr key={ass.id} className="hover:bg-[#1A2035]/10">
                        <td className="py-3 pr-4 font-bold text-indigo-400 whitespace-nowrap">{ass.category}</td>
                        <td className="py-3 pr-4 text-slate-200">{ass.assumption}</td>
                        <td className="py-3 text-slate-400 italic">{ass.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
