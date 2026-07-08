import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, XCircle, MinusCircle, ChevronRight, ChevronDown } from 'lucide-react';
import type { PlantStage, Status } from '../../types';
import { plantStages, flowConnections } from '../../data/plantData';
import { statusColor, statusLabel, formatNumber } from '../../utils/formatters';

const STATUS_ICON: Record<Status, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  operational: ({ className, style }) => <CheckCircle className={className} style={style} />,
  warning: ({ className, style }) => <AlertTriangle className={className} style={style} />,
  critical: ({ className, style }) => <XCircle className={className} style={style} />,
  offline: ({ className, style }) => <MinusCircle className={className} style={style} />,
};

function StageNode({
  stage,
  onClick,
  selected,
  index,
}: {
  stage: PlantStage;
  onClick: (s: PlantStage) => void;
  selected: boolean;
  index: number;
}) {
  const color = statusColor(stage.status);
  const Icon = STATUS_ICON[stage.status];
  const pct = Math.round((stage.throughput / stage.targetThroughput) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative"
    >
      <button
        id={`plant-node-${stage.id}`}
        onClick={() => onClick(stage)}
        className={`relative w-full group transition-all duration-300 ${selected ? 'scale-[1.02]' : ''}`}
      >
        <div
          className={`
            bg-[#0F1320] border rounded-xl p-4 text-left transition-all duration-300
            hover:scale-[1.01] cursor-pointer
          `}
          style={{
            borderColor: selected ? color : '#1E2536',
            boxShadow: selected ? `0 0 20px ${color}30, 0 0 0 1px ${color}40` : 'none',
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              <span className="text-[10px] font-mono tracking-widest text-slate-500">{stage.label}</span>
            </div>
            <Icon className="w-4 h-4" style={{ color }} />
          </div>

          {/* Stage name */}
          <div className="font-semibold text-white text-sm mb-3">{stage.name}</div>

          {/* Throughput bar */}
          <div className="mb-2">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-slate-500">Throughput</span>
              <span className="font-mono" style={{ color }}>
                {formatNumber(stage.throughput)} / {formatNumber(stage.targetThroughput)} TPD
              </span>
            </div>
            <div className="h-1.5 bg-[#1A2035] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          {/* Efficiency */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500">Efficiency</span>
            <span className="text-xs font-mono font-semibold" style={{ color }}>
              {stage.efficiency}%
            </span>
          </div>

          {/* Issues badge */}
          {stage.currentIssues.length > 0 && (
            <div className="mt-2 pt-2 border-t border-[#1E2536]">
              <span className="text-[10px] text-slate-500">{stage.currentIssues.length} active issue{stage.currentIssues.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </button>
    </motion.div>
  );
}

function FlowArrow({ from, to, index }: { from: PlantStage; to: PlantStage; index: number }) {
  const conn = flowConnections.find((c) => c.from === from.id && c.to === to.id);
  if (!conn) return null;
  const color = statusColor(conn.status);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 + 0.2 }}
      className="flex flex-col items-center py-1"
    >
      <div className="flex items-center gap-2">
        <div className="h-px w-8 opacity-30" style={{ backgroundColor: color }} />
        <span className="text-[10px] font-mono" style={{ color }}>
          {formatNumber(conn.throughput)} TPD
        </span>
        <div className="h-px w-8 opacity-30" style={{ backgroundColor: color }} />
      </div>
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-4 h-4" style={{ color }} />
      </motion.div>
    </motion.div>
  );
}

function DetailPanelContent({ stage, onClose }: { stage: PlantStage; onClose: () => void }) {
  const color = statusColor(stage.status);
  const Icon = STATUS_ICON[stage.status];

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-mono text-slate-500 tracking-widest">{stage.label}</span>
          </div>
          <h3 className="font-bold text-white text-base">{stage.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Icon className="w-3.5 h-3.5" style={{ color }} />
            <span className="text-xs font-medium" style={{ color }}>{statusLabel(stage.status)}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-[#1A2035] flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-400 leading-relaxed mb-4">{stage.description}</p>

      {/* Parameters */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Live Parameters</div>
        <div className="space-y-2">
          {stage.parameters.map((p) => {
            const pc = p.status === 'normal' ? '#10B981' : p.status === 'warning' ? '#F59E0B' : '#EF4444';
            return (
              <div key={p.label} className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{p.label}</span>
                <span className="text-xs font-mono font-medium" style={{ color: pc }}>
                  {p.value} {p.unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current issues */}
      {stage.currentIssues.length > 0 && (
        <div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Active Issues</div>
          <div className="space-y-1.5">
            {stage.currentIssues.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span>{issue}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PlantFlowVisualization() {
  const [selectedStage, setSelectedStage] = useState<PlantStage | null>(null);

  const handleNodeClick = (stage: PlantStage) => {
    setSelectedStage((prev) => (prev?.id === stage.id ? null : stage));
  };

  return (
    <div className="relative min-h-[400px] md:min-h-[600px] overflow-hidden">
      {/* Main flow list */}
      <div className={`transition-all duration-300 lg:${selectedStage ? 'mr-80' : ''}`}>
        <div className="flex flex-col items-center gap-0 w-full max-w-sm mx-auto">
          {plantStages.map((stage, i) => (
            <div key={stage.id} className="w-full">
              <StageNode
                stage={stage}
                onClick={handleNodeClick}
                selected={selectedStage?.id === stage.id}
                index={i}
              />
              {i < plantStages.length - 1 && (
                <FlowArrow from={stage} to={plantStages[i + 1]} index={i} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: slide-in right panel (lg+) */}
      <AnimatePresence>
        {selectedStage && (
          <>
            {/* Desktop panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.25 }}
              className="hidden lg:block absolute right-0 top-0 bottom-0 w-80 bg-[#080B12] border-l border-[#1E2536] overflow-y-auto z-20"
            >
              <DetailPanelContent stage={selectedStage} onClose={() => setSelectedStage(null)} />
            </motion.div>

            {/* Mobile/Tablet: bottom sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden fixed bottom-0 left-0 right-0 max-h-[65vh] bg-[#080B12] border-t border-[#1E2536] rounded-t-2xl overflow-y-auto z-50 shadow-2xl"
            >
              {/* Bottom sheet drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[#1E2536]" />
              </div>
              <DetailPanelContent stage={selectedStage} onClose={() => setSelectedStage(null)} />
            </motion.div>

            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedStage(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
