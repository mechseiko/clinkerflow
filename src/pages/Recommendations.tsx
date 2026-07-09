import { motion } from 'framer-motion';
import { Shield, Clock, HardHat, FileText, ArrowRight } from 'lucide-react';
import { recommendations, totalPotentialGain } from '../data/recommendations';
import { formatNumber } from '../utils/formatters';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import type { Recommendation } from '../types';

function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const isCritical = rec.priority === 'Critical';
  const isHigh = rec.priority === 'High';
  const priorityColor = isCritical ? 'text-red-400' : isHigh ? 'text-amber-400' : 'text-blue-400';
  const priorityBorder = isCritical ? 'border-red-500/20' : isHigh ? 'border-amber-500/20' : 'border-blue-500/20';
  const priorityStripe = isCritical ? 'bg-red-500' : isHigh ? 'bg-amber-500' : 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`panel overflow-hidden border ${priorityBorder} hover:scale-[1.005] transition-all`}
    >
      <div className={`h-1 w-full ${priorityStripe}`} />

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                isCritical ? 'bg-red-500/10 text-red-400' : isHigh ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
              }`}>
                {rec.priority}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {rec.stageName} ({rec.lossIndex})
              </span>
            </div>
            <h3 className="font-bold text-white text-sm leading-snug">{rec.title}</h3>
          </div>
          <div className="text-right shrink-0">
            <span className="text-sm font-mono font-bold text-emerald-400 block">+{rec.estimatedGain} TPD</span>
            <span className="text-[9px] text-slate-500 font-mono block">Estimated Gain</span>
          </div>
        </div>

        {/* Bottleneck mechanism */}
        <div className="p-3 rounded-lg bg-[#080B12] border border-[#1E2536] text-xs">
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block mb-1">Loss Mechanism</span>
          <p className="text-slate-300 leading-normal">{rec.lossMechanism}</p>
        </div>

        {/* Causes & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Verified Root Causes</span>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              {rec.causes.map((c, i) => (
                <li key={i} className="leading-normal">{c}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Typical Corrective Actions</span>
            <ul className="space-y-1 text-slate-400 list-decimal list-inside">
              {rec.actions.map((a, i) => (
                <li key={i} className="leading-normal">{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Operational info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#1E2536] pt-3 text-xs">
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-mono uppercase block font-bold">Horizon</span>
            <span className="text-slate-300 font-medium">{rec.horizon}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-mono uppercase block font-bold">Expected Benefit</span>
            <span className="text-slate-300 font-medium">{rec.expectedBenefit}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-mono uppercase block font-bold">Responsibility</span>
            <span className="text-slate-300 font-medium">{rec.department}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-500 font-mono uppercase block font-bold">Operational Impact</span>
            <span className="text-slate-300 font-medium leading-normal block">{rec.operationalImpact}</span>
          </div>
        </div>

        {/* Priority Rationale */}
        <div className="border-t border-[#1E2536]/40 pt-2.5 text-[10px] text-slate-500 leading-normal italic">
          Rationale: {rec.priorityRationale}
        </div>
      </div>
    </motion.div>
  );
}

export function Recommendations() {
  const immediate = recommendations.filter((r) => r.horizon === 'Immediate');
  const shortTerm = recommendations.filter((r) => r.horizon === 'Short-term');
  const longTerm = recommendations.filter((r) => r.horizon === 'Long-term');

  return (
    <div className="space-y-6">
      <DisclaimerBanner />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">Engineering Decision Support</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational action recommendations categorized by timeline horizon and targeted performance deficits
          </p>
        </div>
        <div className="panel px-4 py-2.5 text-right shrink-0">
          <div className="text-xl font-bold text-emerald-400 font-mono">+{formatNumber(totalPotentialGain)} TPD</div>
          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">Total Recovery Capacity</span>
        </div>
      </div>

      {/* Immediate Section */}
      {immediate.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-mono text-red-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Immediate Action Horizon (Shift Critical)
          </h4>
          <div className="space-y-4">
            {immediate.map((rec, i) => (
              <RecommendationCard key={rec.id} rec={rec} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Short Term Section */}
      {shortTerm.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Short-term Horizon (1 – 7 Days)
          </h4>
          <div className="space-y-4">
            {shortTerm.map((rec, i) => (
              <RecommendationCard key={rec.id} rec={rec} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Long Term Section */}
      {longTerm.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Long-term Improvements (Planned Maintenance)
          </h4>
          <div className="space-y-4">
            {longTerm.map((rec, i) => (
              <RecommendationCard key={rec.id} rec={rec} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
