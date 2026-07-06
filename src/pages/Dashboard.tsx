import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Target, Activity } from 'lucide-react';
import { todayKPIs, weeklyTrend } from '../data/kpiData';
import { lossData, waterfallData } from '../data/lossData';
import { plantStages } from '../data/plantData';
import { GaugeChart } from '../components/charts/GaugeChart';
import { TrendChart } from '../components/charts/TrendChart';
import { WaterfallChart } from '../components/charts/WaterfallChart';
import { formatNumber, statusColor } from '../utils/formatters';

export function Dashboard() {
  const outputKpi = todayKPIs.find((k) => k.id === 'output')!;
  const effKpi = todayKPIs.find((k) => k.id === 'efficiency')!;
  const lossKpi = todayKPIs.find((k) => k.id === 'loss')!;

  const outputPct = Math.round(((outputKpi.value as number) / 5500) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">KPI Dashboard</h2>
        <p className="text-sm text-slate-500 mt-0.5">Today's performance deep dive · All data illustrative</p>
      </div>

      {/* Gauge row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="panel flex items-center justify-center py-8">
          <GaugeChart
            value={outputPct}
            label="Output vs Target"
            sublabel={`${formatNumber(outputKpi.value as number)} / 5,500 TPD`}
          />
        </div>
        <div className="panel flex items-center justify-center py-8">
          <GaugeChart
            value={effKpi.value as number}
            label="Conversion Efficiency"
            sublabel="Today vs 95% target"
          />
        </div>
        <div className="panel p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">Total Loss Today</div>
            <div className="text-4xl font-bold font-mono text-red-400 mb-2">
              {formatNumber(lossKpi.value as number)} <span className="text-lg text-slate-500">TPD</span>
            </div>
            <div className="text-xs text-slate-500">
              Potential value: <span className="text-amber-400">₦{(((lossKpi.value as number) * 13000) / 1000000).toFixed(1)}M / day</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Loss by Stage</div>
            {lossData.map((l) => (
              <div key={l.stageId} className="flex items-center gap-2 mb-1.5">
                <div className="w-16 h-1 bg-[#1A2035] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${l.percentage}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 truncate">{l.stage}</span>
                <span className="text-[10px] text-red-400 font-mono ml-auto shrink-0">−{l.totalLoss}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="panel">
          <div className="panel-header">
            <span className="text-sm font-semibold text-white">7-Day Output vs Target</span>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-industrial-green" />
              <span className="text-xs text-slate-500 font-mono">TPD</span>
            </div>
          </div>
          <div className="p-4 h-52">
            <TrendChart data={weeklyTrend} />
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <span className="text-sm font-semibold text-white">7-Day Efficiency Trend</span>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-slate-500 font-mono">%</span>
            </div>
          </div>
          <div className="p-4 h-52">
            <TrendChart data={weeklyTrend} showEfficiency />
          </div>
        </div>
      </div>

      {/* Waterfall + Traffic lights */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="panel xl:col-span-2">
          <div className="panel-header">
            <span className="text-sm font-semibold text-white">Waterfall Loss Chart</span>
            <span className="text-xs text-slate-500">Capacity → Actual by Stage</span>
          </div>
          <div className="p-4 h-64">
            <WaterfallChart data={waterfallData} />
          </div>
        </div>

        {/* Traffic light panel */}
        <div className="panel">
          <div className="panel-header">
            <span className="text-sm font-semibold text-white">Traffic Lights</span>
            <span className="text-xs text-slate-500 font-mono">PLANT STATUS</span>
          </div>
          <div className="p-4 space-y-3">
            {plantStages.map((stage, i) => {
              const color = statusColor(stage.status);
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0A0D14]"
                >
                  <div className="flex flex-col gap-1 items-center">
                    {(['operational', 'warning', 'critical'] as const).map((s) => (
                      <div
                        key={s}
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: s === stage.status ? statusColor(s) : '#1E2536',
                          boxShadow: s === stage.status ? `0 0 8px ${statusColor(s)}` : 'none',
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-300 truncate">{stage.name}</div>
                    <div className="text-[10px] font-mono" style={{ color }}>
                      {stage.efficiency}% efficiency
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
