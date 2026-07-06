import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MinusCircle,
  Zap,
  Wrench,
  Cpu,
  Clock,
  ArrowRight,
  TrendingDown as LossIcon,
} from 'lucide-react';
import { todayKPIs, weeklyTrend } from '../data/kpiData';
import { lossData, totalLoss, waterfallData } from '../data/lossData';
import { plantStages } from '../data/plantData';
import { TrendChart } from '../components/charts/TrendChart';
import { WaterfallChart } from '../components/charts/WaterfallChart';
import { formatNumber, statusColor, statusLabel } from '../utils/formatters';
import type { Status, KPICard } from '../types';

const STATUS_ICONS: Record<Status, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  operational: ({ className, style }) => <CheckCircle className={className} style={style} />,
  warning: ({ className, style }) => <AlertTriangle className={className} style={style} />,
  critical: ({ className, style }) => <XCircle className={className} style={style} />,
  offline: ({ className, style }) => <MinusCircle className={className} style={style} />,
};

function KPICardComponent({ kpi, index }: { kpi: KPICard; index: number }) {
  const color = kpi.status ? statusColor(kpi.status) : '#94a3b8';
  const isUp = kpi.trendDir === 'up';
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  // For output/efficiency, up trend is good; for loss, up trend is bad
  const trendGood = (kpi.id === 'loss' || kpi.id === 'energy') ? !isUp : isUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="kpi-card group"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{kpi.label}</span>
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}88` }}
        />
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold text-white font-mono leading-none">
          {typeof kpi.value === 'number' ? formatNumber(kpi.value, kpi.unit === '%' || kpi.unit === 'ratio' ? 2 : 0) : kpi.value}
        </span>
        {kpi.unit && (
          <span className="text-sm text-slate-500 mb-0.5">{kpi.unit}</span>
        )}
      </div>
      {kpi.trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs ${trendGood ? 'text-industrial-green' : 'text-industrial-red'}`}>
          <TrendIcon className="w-3 h-3" />
          <span className="font-mono">{Math.abs(kpi.trend)}%</span>
          <span className="text-slate-500 ml-1">vs yesterday</span>
        </div>
      )}
    </motion.div>
  );
}

export function Home() {
  const top3Issues = useMemo(() => {
    const list: { stage: string; stageId: string; id: string; description: string; loss: number; owner: string; priority: 'Critical' | 'High' | 'Medium' | 'Low'; actions: string[] }[] = [];
    lossData.forEach((s) => {
      s.causes.forEach((c) => {
        list.push({
          stage: s.stage,
          stageId: s.stageId,
          id: c.id,
          description: c.description,
          loss: c.loss,
          owner: c.owner,
          priority: c.priority,
          actions: c.actions,
        });
      });
    });
    return list.sort((a, b) => b.loss - a.loss).slice(0, 3);
  }, []);

  const outputKpi = todayKPIs.find((k) => k.id === 'output')!;
  const targetKpi = todayKPIs.find((k) => k.id === 'target')!;
  const outputValue = outputKpi.value as number;
  const targetValue = targetKpi.value as number;
  const targetAchievement = Math.round((outputValue / targetValue) * 100);
  const deficit = targetValue - outputValue;

  const keySystems = useMemo(() => {
    return [
      {
        id: 'mill',
        name: 'Cement Mill',
        status: 'warning' as Status,
        throughput: 4920,
        target: 5500,
        efficiency: 89.5,
        primaryIssue: 'Separator efficiency reduced (-8%)',
        color: '#F59E0B',
      },
      {
        id: 'packing',
        name: 'Packing Plant',
        status: 'critical' as Status,
        throughput: 3890,
        target: 5000,
        efficiency: 77.8,
        primaryIssue: 'Packer Line 3 offline – bag feeder jam',
        color: '#EF4444',
      },
      {
        id: 'dispatch',
        name: 'Dispatch & Logistics',
        status: 'warning' as Status,
        throughput: 3820,
        target: 5000,
        efficiency: 76.4,
        primaryIssue: 'Truck turnaround time elevated (42 min)',
        color: '#F59E0B',
      },
    ];
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Production Overview</h2>
          <p className="text-sm text-slate-500 mt-0.5">Dangote Cement — Clinker-to-Cement Conversion · <span className="font-mono text-industrial-blue">Line 1–4</span></p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A2035] border border-[#1E2536]">
          <div className="w-1.5 h-1.5 rounded-full bg-industrial-green animate-pulse" />
          <span className="text-xs text-slate-400 font-mono">LIVE FEED</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {todayKPIs.map((kpi, i) => (
          <KPICardComponent key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Actual vs Target Tonnage progress panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="panel p-5 bg-gradient-to-r from-industrial-blue/5 to-transparent border-[#1E2536]"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-industrial-blue" />
                Target Achievement Rate
              </span>
              <span className="font-mono text-white text-sm">{targetAchievement}%</span>
            </div>
            <div className="h-3 bg-[#1A2035] rounded-full overflow-hidden border border-[#1E2536] p-[1px]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${targetAchievement}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-industrial-blue to-industrial-green shadow-[0_0_8px_rgba(14,165,233,0.5)]"
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-mono">
              <span>0 TPD</span>
              <span>4,820 TPD (Actual)</span>
              <span>5,500 TPD (Target)</span>
            </div>
          </div>
          <div className="flex items-center gap-6 lg:border-l lg:border-[#1E2536] lg:pl-6 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Tonnage Deficit</div>
              <div className="text-xl font-bold font-mono text-red-400 mt-0.5">−{formatNumber(deficit)} TPD</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Loss Value Est.</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">₦{((deficit * 13000) / 1000000).toFixed(1)}M</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main operational row: Top 3 Issues & Mini Waterfall */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Top 3 Issues Today Panel */}
        <div className="panel xl:col-span-2 flex flex-col">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">Top 3 Production Issues Today</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Prioritized by TPD Loss</span>
          </div>
          <div className="p-5 flex-1 space-y-4">
            {top3Issues.map((issue, index) => {
              return (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#080B12] border border-[#1E2536] hover:border-slate-750 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#1A2035] flex items-center justify-center font-bold text-sm text-slate-400 border border-[#1E2536] shrink-0 font-mono">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">{issue.stage}</span>
                      <span className={`badge-${issue.priority.toLowerCase()}`}>{issue.priority}</span>
                    </div>
                    <div className="text-sm font-semibold text-white leading-snug">{issue.description}</div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-slate-500" /> Owner: <span className="text-slate-300 font-medium">{issue.owner}</span></span>
                      <span className="flex items-center gap-1"><Wrench className="w-3.5 h-3.5 text-slate-500" /> Action: <span className="text-slate-300 truncate max-w-xs">{issue.actions[0]}</span></span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold font-mono text-red-400">−{formatNumber(issue.loss)}</div>
                    <div className="text-[10px] text-slate-500">TPD Impact</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mini Waterfall of Losses */}
        <div className="panel flex flex-col">
          <div className="panel-header">
            <div className="flex items-center gap-2">
              <LossIcon className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">Loss Waterfall</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Capacity → Actual</span>
          </div>
          <div className="p-4 flex-1 h-64 xl:h-auto min-h-[220px]">
            <WaterfallChart data={waterfallData} />
          </div>
        </div>
      </div>

      {/* Critical Systems Flags per System (Mill, Packing, Dispatch) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Critical Systems Health Indicators</h3>
          <span className="text-[10px] text-slate-500 font-mono font-semibold">PLANT TELEMETRY</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {keySystems.map((sys, idx) => {
            const statusLabelText = sys.status === 'critical' ? 'CRITICAL' : sys.status === 'warning' ? 'WARNING' : 'NORMAL';
            return (
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.3 }}
                className="panel p-5 relative overflow-hidden flex flex-col justify-between group"
                style={{ borderColor: `${sys.color}30` }}
              >
                {/* Glowing status line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: sys.color }} />
                
                {/* System Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono font-semibold tracking-wider uppercase">SYSTEM TELEMETRY</span>
                    <h4 className="text-base font-bold text-white mt-0.5">{sys.name}</h4>
                  </div>
                  {/* glowing traffic light circle */}
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#080B12] border border-[#1E2536]">
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{
                        backgroundColor: sys.color,
                        boxShadow: `0 0 10px ${sys.color}, 0 0 3px ${sys.color}`,
                      }}
                    />
                    <span className="text-[9px] font-bold font-mono" style={{ color: sys.color }}>
                      {statusLabelText}
                    </span>
                  </div>
                </div>

                {/* Telemetry metrics */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#1E2536] bg-[#080B12]/40 -mx-5 px-5 my-3">
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Throughput</div>
                    <div className="text-sm font-bold font-mono text-slate-200 mt-0.5">
                      {formatNumber(sys.throughput)} <span className="text-[10px] text-slate-500 font-normal">TPD</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Target: {formatNumber(sys.target)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Efficiency</div>
                    <div className="text-sm font-bold font-mono mt-0.5" style={{ color: sys.color }}>
                      {sys.efficiency}%
                    </div>
                    <div className="h-1 bg-[#1A2035] rounded-full overflow-hidden mt-1.5 w-16">
                      <div className="h-full rounded-full" style={{ backgroundColor: sys.color, width: `${sys.efficiency}%` }} />
                    </div>
                  </div>
                </div>

                {/* System details & Alarm */}
                <div className="pt-2 flex flex-col gap-2">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Active Alarm</div>
                  <div className="text-xs text-slate-300 leading-snug flex items-start gap-1.5">
                    <span className="text-amber-400 shrink-0 font-bold">⚠</span>
                    <span className="truncate">{sys.primaryIssue}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Row 4: 7-Day Trend & Plant Stage Status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Plant stage status */}
        <div className="panel">
          <div className="panel-header">
            <span className="text-sm font-semibold text-white">Full Plant Status</span>
            <span className="text-xs text-slate-500 font-mono">FLOW TELEMETRY</span>
          </div>
          <div className="p-4 space-y-3.5">
            {plantStages.map((stage, i) => {
              const color = statusColor(stage.status);
              const Icon = STATUS_ICONS[stage.status];
              return (
                <div
                  key={stage.id}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}88` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">{stage.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500">{stage.efficiency}%</span>
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                    </div>
                    <div className="h-1 bg-[#1A2035] rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.efficiency}%` }}
                        transition={{ delay: 0.1 * i, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7-day trend */}
        <div className="panel xl:col-span-2">
          <div className="panel-header">
            <span className="text-sm font-semibold text-white">7-Day Output Trend</span>
            <span className="text-xs text-slate-500 font-mono">TPD vs Target</span>
          </div>
          <div className="p-4 h-52">
            <TrendChart data={weeklyTrend} />
          </div>
        </div>
      </div>

      {/* Loss breakdown table */}
      <div className="panel">
        <div className="panel-header">
          <span className="text-sm font-semibold text-white">Loss Breakdown by Stage</span>
          <span className="text-xs text-slate-500 font-mono">Shift Data (24h)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E2536]">
                {['Stage', 'Loss (TPD)', '% of Total', 'Top Cause', 'Owner', 'Priority'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lossData.map((row, i) => (
                <motion.tr
                  key={row.stageId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="border-b border-[#1E2536]/50 hover:bg-[#1A2035]/50 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-white">{row.stage}</td>
                  <td className="px-5 py-3 font-mono text-red-400">−{formatNumber(row.totalLoss)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#1A2035] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="text-slate-400 font-mono text-xs">{row.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-400 max-w-xs truncate">{row.causes[0].description}</td>
                  <td className="px-5 py-3 text-slate-300">{row.causes[0].owner}</td>
                  <td className="px-5 py-3">
                    <span className={`badge-${row.causes[0].priority.toLowerCase()}`}>{row.causes[0].priority}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
