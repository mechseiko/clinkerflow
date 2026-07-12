import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, CheckCircle, X, ChevronUp } from 'lucide-react';
import type { PlantStage, Status } from '../../types';
import { plantStages, flowConnections } from '../../data/plantData';
import { statusColor } from '../../utils/formatters';

interface StageNodeProps {
  stage: PlantStage;
  onClick: (s: PlantStage) => void;
  selected: boolean;
  index: number;
}

function StageNode({ stage, onClick, selected, index }: StageNodeProps) {
  const color = statusColor(stage.status);
  const pct = Math.round((stage.throughput / stage.targetThroughput) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="w-full"
    >
      <button
        id={`plant-node-${stage.id}`}
        onClick={() => onClick(stage)}
        className={`w-full text-left transition-all relative rounded-xl bg-[#0F1320] border p-4 group ${selected ? 'scale-[1.01]' : 'hover:border-slate-700'
          }`}
        style={{
          borderColor: selected ? color : '#1E2536',
          boxShadow: selected ? `0 0 16px ${color}15` : 'none',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Status indicator */}
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                {stage.label} · {stage.relatedLossIndex}
              </span>
              <h4 className="text-sm font-bold text-white truncate">{stage.name}</h4>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-slate-200 block">
              {stage.throughput} <span className="text-[10px] text-slate-500 font-normal">TPD</span>
            </span>
            <span className="text-[10px] font-mono font-bold" style={{ color }}>
              {stage.efficiency}% η
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-[#161B2B] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              backgroundColor: color,
              width: `${Math.min(pct, 100)}%`,
            }}
          />
        </div>
      </button>
    </motion.div>
  );
}

export function PlantFlowVisualization() {
  const [selectedStage, setSelectedStage] = useState<PlantStage | null>(null);

  const handleNodeClick = (stage: PlantStage) => {
    setSelectedStage((prev) => (prev?.id === stage.id ? null : stage));
    // Also trigger custom event to update parent component's details card
    const event = new CustomEvent('stageSelect', { detail: stage });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-4">
      {/* Node List with Flow Indicators */}
      <div className="flex flex-col items-center gap-2 max-w-lg mx-auto">
        {plantStages.map((stage, i) => (
          <div key={stage.id} className="w-full flex flex-col items-center gap-2">
            <StageNode
              stage={stage}
              onClick={handleNodeClick}
              selected={selectedStage?.id === stage.id}
              index={i}
            />

            {i < plantStages.length - 1 && (
              <div className="flex flex-col items-center py-0.5">
                <ChevronDown className="w-4 h-4 text-slate-700 animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
