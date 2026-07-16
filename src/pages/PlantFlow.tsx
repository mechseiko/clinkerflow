import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Cpu, Layers, HardHat, FileDown, BookOpen, AlertTriangle } from 'lucide-react';
import type { PlantStage } from '../types';
import { plantStages } from '../data/plantData';
import { statusColor, formatNumber } from '../utils/formatters';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { PlantFlowVisualization } from '../components/plant/PlantFlowVisualization';
import { MathFormula } from '../components/ui/MathFormula';
import { lossFormulas } from '../data/frameworkData';

export function PlantFlow() {
  const [selectedStage, setSelectedStage] = useState<PlantStage | null>(null);

  React.useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<PlantStage>;
      setSelectedStage(customEvent.detail);
    };
    window.addEventListener('stageSelect', handleSelect);
    return () => window.removeEventListener('stageSelect', handleSelect);
  }, []);

  const handleNodeClick = (stage: PlantStage) => {
    setSelectedStage((prev) => (prev?.id === stage.id ? null : stage));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">Plant Flow Visualization</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full Conversion Chain Model: Kiln downstream transport, grinding circuit, packing lines, and dispatch gate
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow diagram panel */}
        <div className="panel p-6 lg:col-span-2 flex flex-col justify-between">
          <div className="panel-header -mx-6 -mt-6 mb-6 px-6 border-b border-[#1E2536] flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-slate-500 uppercase">Conversion Flow Sequence</span>
            <span className="text-[10px] font-mono text-slate-500">CLICK STAGE NODE FOR ANALYSIS</span>
          </div>

          <div className="relative">
            <PlantFlowVisualization />
          </div>
        </div>

        {/* Dynamic Detail Panel (always showing or placeholder) */}
        <div className="panel flex flex-col justify-between h-full md:sticky md:top-0 md:right-0 md:h-screen min-h-[500px]">
          <AnimatePresence mode="wait">
            {selectedStage ? (
              <motion.div
                key={selectedStage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 space-y-5 flex-1 overflow-y-auto"
              >
                {/* Header */}
                <div className="border-b border-[#1E2536] pb-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">{selectedStage.label} Node</span>
                    <span className="text-[9px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                      Loss Ref: {selectedStage.relatedLossIndex}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{selectedStage.name}</h3>
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 flex-wrap">
                    Model: <MathFormula math={
                      selectedStage.relatedLossIndex && selectedStage.relatedLossIndex !== '—'
                        ? (lossFormulas.find((lf) => lf.index === selectedStage.relatedLossIndex)?.formula || selectedStage.formulaRef)
                        : (selectedStage.id === 'kiln' ? 'Q_{kln} = m_{feed} \\times (1 - \\text{LOI}) / 1{,}000' : selectedStage.formulaRef)
                    } className="text-industrial-blue" />
                  </div>
                </div>

                {/* Operations Description */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Operational Role</span>
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedStage.operationalRole}</p>
                </div>

                {/* Flow Parameters */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Process Materials</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded bg-[#080B12] border border-[#1E2536]">
                      <span className="text-[9px] text-slate-500 block">Input</span>
                      <span className="text-slate-300 font-medium">{selectedStage.inputMaterial}</span>
                    </div>
                    <div className="p-2 rounded bg-[#080B12] border border-[#1E2536]">
                      <span className="text-[9px] text-slate-500 block">Output</span>
                      <span className="text-slate-300 font-medium">{selectedStage.outputMaterial}</span>
                    </div>
                  </div>
                </div>

                {/* Technical parameters */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Stage Parameters</span>
                  <div className="space-y-1.5 divide-y divide-[#1E2536]/30">
                    {selectedStage.parameters.map((p) => {
                      const statusColor = p.status === 'critical' ? 'text-red-400' : p.status === 'warning' ? 'text-amber-400' : 'text-slate-300';
                      return (
                        <div key={p.label} className="flex justify-between text-xs pt-1.5">
                          <span className="text-slate-500">{p.label}</span>
                          <span className={`font-mono font-medium ${statusColor}`}>
                            {p.value} {p.unit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Loss Mechanisms */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Primary Loss Mechanism</span>
                  <div className="p-2.5 rounded bg-red-950/10 border border-red-500/10 text-xs text-red-300 leading-normal">
                    {selectedStage.primaryLoss}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-400 pl-3 list-disc">
                    {selectedStage.lossMechanisms.slice(0, 2).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                {/* Typical KPIs & Instrumentation */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#1E2536] pt-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Instrumentation</span>
                    <span className="text-slate-400 block text-[11px] leading-normal">{selectedStage.instrumentation[0] || 'N/A'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Typical KPIs</span>
                    <span className="text-slate-400 block text-[11px] leading-normal">{selectedStage.typicalKPIs[0] || 'N/A'}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-3">
                <Layers className="w-8 h-8 text-slate-700" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">Stage Analysis Panel</h4>
                  <p className="text-xs text-slate-600 max-w-[200px] mx-auto mt-1 leading-normal">
                    Click any node in the plant flow diagram to load operational roles, material balance inputs, and instrumentation lists.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
          <div className="p-4 border-t border-[#1E2536] bg-[#0A0D14] rounded-b-lg">
            <span className="text-[9px] font-mono text-slate-600 block text-center leading-normal">
              Nodes reflect the physical conversion equipment defined in the ClinkerFlow Group Capacity model.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
