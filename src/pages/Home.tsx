import { motion } from 'framer-motion';
import { ArrowRight, Activity, TrendingUp, TrendingDown, BookOpen, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { todayKPIs } from '../data/kpiData';
import { capacityChain, OVERALL_EFFICIENCY, ACTUAL_DISPATCHED } from '../data/frameworkData';
import { actionItems } from '../data/actionData';
import { formatNumber, statusColor } from '../utils/formatters';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

export function Home() {
  const activeLosses = actionItems.filter((a) => a.status !== 'Resolved');
  const criticalAlerts = activeLosses.slice(0, 3);

  const effKpi = todayKPIs.find(k => k.id === 'efficiency')!;
  const outputKpi = todayKPIs.find(k => k.id === 'output')!;
  const targetKpi = todayKPIs.find(k => k.id === 'target')!;

  return (
    <div className="space-y-6">
      {/* <DisclaimerBanner /> */}

      {/* Efficiency Gauges & today's production */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Conversion Efficiency */}
        <div className="panel p-5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Conversion Efficiency KPI</span>
            <h4 className="text-sm font-semibold text-white">Overall System Recovery</h4>
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-4 border-[#1E2536] before:absolute before:inset-1 before:rounded-full before:border before:border-dashed before:border-slate-800">
              {/* Glow circle overlay */}
              <div className="absolute inset-0 rounded-full border-4 border-industrial-blue/40 border-t-industrial-blue animate-pulse" />
              <div className="text-center">
                <span className="text-3xl font-extrabold font-mono text-white leading-none">{OVERALL_EFFICIENCY}%</span>
                <span className="block text-[9px] text-slate-500 font-mono mt-1">η_conv Rate</span>
              </div>
            </div>
            <div className="mt-4 text-center text-xs font-mono text-slate-500">
              Equation: <code className="text-industrial-blue">Q_actual / Q_th</code>
            </div>
          </div>

          <div className="border-t border-[#1E2536] pt-3 text-[11px] text-slate-400 leading-normal flex items-start gap-2">
            <Activity className="w-3.5 h-3.5 text-industrial-green shrink-0 mt-0.5" />
            <span>Target conversion efficiency: <strong>95.0%</strong>. Current shift deviation is <strong>-12.0%</strong> due to packing plant restrictions.</span>
          </div>
        </div>

        {/* Shift Production Summary */}
        <div className="panel p-5 lg:col-span-2 flex flex-col justify-between">
          <div className="space-y-1 border-b border-[#1E2536] pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Today's Shift Output</span>
              <h4 className="text-sm font-semibold text-white">Illustrative Conversion Performance</h4>
            </div>
            <span className="text-[10px] font-mono text-slate-500">24-Hour Average</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
            <div className="space-y-1.5 p-3 rounded-lg bg-[#080B12] border border-[#1E2536]">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Theoretical Input</span>
              <div className="text-xl font-bold font-mono text-slate-300">5,500 <span className="text-xs text-slate-500 font-normal">TPD</span></div>
              <span className="text-[9px] text-slate-500 block leading-tight font-mono">Q_theoretical Capacity</span>
            </div>
            <div className="space-y-1.5 p-3 rounded-lg bg-[#080B12] border border-[#1E2536]">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Actual Dispatch</span>
              <div className="text-xl font-bold font-mono text-industrial-green">4,565 <span className="text-xs text-slate-500 font-normal">TPD</span></div>
              <span className="text-[9px] text-slate-500 block leading-tight font-mono">Q_actual Dispatched</span>
            </div>
            <div className="space-y-1.5 p-3 rounded-lg bg-[#080B12] border border-[#1E2536]">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Combined Loss</span>
              <div className="text-xl font-bold font-mono text-red-400">−935 <span className="text-xs text-slate-500 font-normal">TPD</span></div>
              <span className="text-[9px] text-slate-500 block leading-tight font-mono">Σq1..q13 Total</span>
            </div>
          </div>

          {/* Mini Conversion Pathway Nodes */}
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 block font-mono">
              14-Stage Conversion Pathway Status
            </span>
            <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
              {capacityChain.map((node, i) => {
                const isDesign = i === 0;
                const isEnd = i === capacityChain.length - 1;
                const loss = node.loss;
                const statusBg = isDesign || isEnd
                  ? 'bg-industrial-blue'
                  : loss > 150
                    ? 'bg-industrial-red animate-pulse'
                    : loss > 10
                      ? 'bg-industrial-amber'
                      : 'bg-industrial-green';

                return (
                  <div
                    key={node.stage}
                    title={`${node.stage}: ${node.value} TPD (Loss: ${node.loss} TPD)`}
                    className={`h-2 rounded ${statusBg}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-[8px] text-slate-500 font-mono mt-1.5">
              <span>Kiln Input</span>
              <span>Grinding Circuit</span>
              <span>Packing Plant</span>
              <span>Gate Dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts + Information Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Operational Alerts */}
        <div className="panel lg:col-span-2 flex flex-col justify-between">
          <div className="panel-header border-b border-[#1E2536]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-white">Active Operational Deficits</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Prioritized by Capacity Impact</span>
          </div>

          <div className="p-5 flex-1 space-y-3">
            {criticalAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#080B12] border border-[#1E2536]"
              >
                <div className="space-y-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">{alert.stage}</span>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-800/50 px-1 rounded">{alert.lossIndex}</span>
                  </div>
                  <p className="text-xs text-slate-300 truncate font-medium">{alert.lossDescription}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-red-400 block">−{alert.loss} TPD</span>
                  <span className="text-[8px] text-slate-500 block font-mono">{alert.timeframe}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#1E2536] flex justify-end">
            <Link
              to="/actions"
              className="text-xs text-industrial-blue hover:text-industrial-blue/80 font-semibold flex items-center gap-1"
            >
              Access Action Tracker
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Competition objectives card */}
        <div className="panel p-5 flex flex-col justify-between bg-[#0B1220]/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400">
              <ShieldAlert className="w-4 h-4" />
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider">Evaluation Objectives</h4>
            </div>
            <h3 className="text-sm font-semibold text-white mt-1">Platform Verification Focus</h3>
            <ul className="space-y-2 text-xs text-slate-400 pt-2 list-disc list-inside">
              <li>Confirm 13 sequential loss parameters representing total conversion flow.</li>
              <li>Examine formulas and variables for every grinding and logistics stage.</li>
              <li>Verify the transition from abstract metrics to mechanical root causes.</li>
            </ul>
          </div>
          <div className="border-t border-[#1E2536] pt-3 mt-4 text-[10px] text-slate-500 font-mono italic">
            Developed by team Dynamo for the 2026 Dangote Cement University Engineering Challenge.
          </div>
        </div>
      </div>
    </div>
  );
}
