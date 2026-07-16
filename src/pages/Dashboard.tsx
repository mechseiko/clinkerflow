import { motion } from 'framer-motion';
import { Target, Activity, Flame, ShieldAlert, Cpu } from 'lucide-react';
import { todayKPIs, weeklyTrend, equipmentAvailability, stageThroughputs } from '../data/kpiData';
import { lossData, waterfallData } from '../data/lossData';
import { OVERALL_EFFICIENCY } from '../data/frameworkData';
import { GaugeChart } from '../components/charts/GaugeChart';
import { TrendChart } from '../components/charts/TrendChart';
import { WaterfallChart } from '../components/charts/WaterfallChart';
import { RadarChart } from '../components/charts/RadarChart';
import { StackedBarChart } from '../components/charts/StackedBarChart';
import { formatNumber } from '../utils/formatters';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

export function Dashboard() {
  const outputKpi = todayKPIs.find((k) => k.id === 'output')!;
  const targetKpi = todayKPIs.find((k) => k.id === 'target')!;
  const ssrKpi = todayKPIs.find((k) => k.id === 'ssr')!;
  const lossKpi = todayKPIs.find((k) => k.id === 'total_loss')!;

  const largestLoss = [...lossData].sort((a, b) => b.totalLoss - a.totalLoss)[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Live Monitoring Dashboard</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          ClinkerFlow SSR Diagnostics & Operational Metric Tracking
        </p>
      </div>

      {/* Metrics overview row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* SSR Gauge Chart */}
        <div className="panel p-5 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">Supply Sufficiency Ratio (SSR)</span>
          <div className="h-32 flex items-center justify-center">
            <GaugeChart
              value={Number(ssrKpi.value)}
              label="SSR"
              sublabel={`${ssrKpi.value}% clearance`}
            />
          </div>
          <span className="text-[9px] font-mono text-slate-500 mt-2">Target: &gt;95% SSR</span>
        </div>

        {/* Output */}
        <div className="panel p-5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Annualized Output</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {formatNumber(outputKpi.value as number)} <span className="text-xs text-slate-500 font-normal">Mta</span>
            </div>
          </div>
          <div className="border-t border-[#1E2536] pt-3 text-[10px] text-slate-500 font-mono">
            Target: {formatNumber(targetKpi.value as number)} Mta ({((outputKpi.value as number) / (targetKpi.value as number) * 100).toFixed(1)}% met)
          </div>
        </div>

        {/* Losses */}
        <div className="panel p-5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Identified Gap</span>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1">
              −{formatNumber(lossKpi.value as number)} <span className="text-xs text-slate-500 font-normal">Mta</span>
            </div>
          </div>
          <div className="border-t border-[#1E2536] pt-3 text-[10px] text-slate-500 font-mono">
            Accumulated over 7 buckets
          </div>
        </div>

        {/* Largest contributor */}
        <div className="panel p-5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Critical Constraint</span>
            <div className="text-lg font-bold text-slate-200 mt-1 truncate">
              {largestLoss.stage}
            </div>
            <div className="text-xs font-mono font-bold text-red-400">
              −{largestLoss.totalLoss} Mta ({((largestLoss.totalLoss / (lossKpi.value as number)) * 100).toFixed(1)}%)
            </div>
          </div>
          <div className="border-t border-[#1E2536] pt-3 text-[10px] text-slate-500 font-mono">
            Index: {largestLoss.lossIndex}
          </div>
        </div>
      </div>

      {/* Main charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waterfall Loss Chart */}
        <div className="panel p-5 space-y-4">
          <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536]">
            <span className="text-xs font-bold font-mono text-slate-500 uppercase">Master Loss Tree Waterfall</span>
          </div>
          <div className="h-64">
            <WaterfallChart data={waterfallData} />
          </div>
        </div>

        {/* Equipment availability radar */}
        <div className="panel p-5 space-y-4">
          <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536]">
            <span className="text-xs font-bold font-mono text-slate-500 uppercase">Equipment Availability vs Benchmark</span>
          </div>
          <div className="h-64">
            <RadarChart data={equipmentAvailability} />
          </div>
        </div>
      </div>

      {/* Throughput and trends section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stacked bar throughput */}
        <div className="panel p-5 lg:col-span-2 space-y-4">
          <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536]">
            <span className="text-xs font-bold font-mono text-slate-500 uppercase">Stage Flow Throughput Capacity (Mta)</span>
          </div>
          <div className="h-64">
            <StackedBarChart data={stageThroughputs} />
          </div>
        </div>

        {/* Trend history chart */}
        <div className="panel p-5 space-y-4">
          <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536]">
            <span className="text-xs font-bold font-mono text-slate-500 uppercase">Quarterly Conversion Trend</span>
          </div>
          <div className="h-64">
            <TrendChart data={weeklyTrend} showEfficiency />
          </div>
        </div>
      </div>
    </div>
  );
}
