import { PlantFlowVisualization } from '../components/plant/PlantFlowVisualization';
import { plantStages } from '../data/plantData';
import { statusColor, statusLabel, formatNumber } from '../utils/formatters';
import { motion } from 'framer-motion';

export function PlantFlow() {
  const operationalCount = plantStages.filter((s) => s.status === 'operational').length;
  const warningCount = plantStages.filter((s) => s.status === 'warning').length;
  const criticalCount = plantStages.filter((s) => s.status === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-white">Plant Flow Visualization</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Clinker → Mill → Additives → Silo → Packing → Dispatch · Click any stage for details</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 rounded-full bg-industrial-green" />
            <span>{operationalCount} OK</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 rounded-full bg-industrial-amber" />
            <span>{warningCount} Warning</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 rounded-full bg-industrial-red" />
            <span>{criticalCount} Critical</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flow diagram */}
        <div className="panel p-6">
          <div className="panel-header -mx-6 -mt-6 mb-6 px-6">
            <span className="text-sm font-semibold text-white">Process Flow</span>
            <span className="text-[10px] font-mono text-slate-500">CLICK NODE FOR DETAILS</span>
          </div>
          <PlantFlowVisualization />
        </div>

        {/* Stage summary table */}
        <div className="panel">
          <div className="panel-header">
            <span className="text-sm font-semibold text-white">Stage Performance Summary</span>
          </div>
          <div className="p-4 space-y-3">
            {plantStages.map((stage, i) => {
              const color = statusColor(stage.status);
              const pct = Math.round((stage.throughput / stage.targetThroughput) * 100);
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-lg bg-[#0A0D14] border border-[#1E2536]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}88` }} />
                      <span className="text-sm font-medium text-white">{stage.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color }}>{stage.efficiency}%</span>
                      <span className={`badge-${stage.status === 'operational' ? 'resolved' : stage.status === 'warning' ? 'high' : 'critical'}`}>
                        {statusLabel(stage.status)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>{formatNumber(stage.throughput)} TPD actual</span>
                    <span>Target: {formatNumber(stage.targetThroughput)} TPD</span>
                  </div>
                  <div className="h-1.5 bg-[#1A2035] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  {stage.currentIssues.length > 0 && (
                    <div className="mt-2 text-[10px] text-amber-400 truncate">
                      ⚠ {stage.currentIssues[0]}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
