import { motion } from 'framer-motion';
import { Zap, AlertTriangle, TrendingUp, ChevronRight, Brain } from 'lucide-react';
import { recommendations, totalPotentialGain } from '../data/recommendations';
import { formatNumber } from '../utils/formatters';
import type { Recommendation } from '../types';

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#1A2035] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-industrial-blue"
        />
      </div>
      <span className="text-[10px] font-mono text-industrial-blue">{value}%</span>
    </div>
  );
}

function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const borderColor = rec.priority === 'Critical' ? '#EF4444' : rec.priority === 'High' ? '#F59E0B' : '#0EA5E9';
  const Icon = rec.priority === 'Critical' ? Zap : AlertTriangle;
  const badgeClass = rec.priority === 'Critical' ? 'badge-critical' : rec.priority === 'High' ? 'badge-high' : 'badge-medium';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="panel overflow-hidden hover:border-opacity-50 transition-all duration-300"
      style={{ borderColor: `${borderColor}30` }}
    >
      {/* Priority stripe */}
      <div className="h-1 w-full" style={{ backgroundColor: borderColor }} />

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${borderColor}15`, border: `1px solid ${borderColor}30` }}
            >
              <Icon className="w-4 h-4" style={{ color: borderColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={badgeClass}>{rec.priority}</span>
                <span className="text-[10px] text-slate-500 font-mono">{rec.stageName}</span>
              </div>
              <h3 className="font-semibold text-white text-sm leading-snug">{rec.title}</h3>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xl font-bold font-mono text-industrial-green">+{formatNumber(rec.estimatedGain)}</div>
            <div className="text-[10px] text-slate-500">TPD gain</div>
          </div>
        </div>

        {/* Bottleneck description */}
        <div className="bg-[#080B12] rounded-lg p-3 border border-[#1E2536]">
          <div className="flex items-start gap-2">
            <Brain className="w-3.5 h-3.5 text-industrial-blue shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">{rec.bottleneck}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Causes */}
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Potential Causes</div>
            <ul className="space-y-1">
              {rec.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                  <span className="text-red-400 shrink-0 mt-0.5">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          {/* Actions */}
          <div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Recommended Actions</div>
            <ul className="space-y-1">
              {rec.actions.map((a, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                  <ChevronRight className="w-3 h-3 text-industrial-blue shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1E2536]">
          <div>
            <div className="text-[10px] text-slate-500 mb-1">Confidence</div>
            <div className="w-36">
              <ConfidenceBar value={rec.confidence} />
            </div>
          </div>
          {rec.estimatedCostSaving && (
            <div className="text-right">
              <div className="text-[10px] text-slate-500">Est. Value</div>
              <div className="text-sm font-mono font-semibold text-amber-400">{rec.estimatedCostSaving}</div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Recommendations() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">AI-Style Recommendations</h2>
          <p className="text-sm text-slate-500 mt-0.5">Prioritized improvement actions based on today's loss analysis</p>
        </div>
        <div className="panel px-5 py-3 text-right">
          <div className="text-2xl font-bold text-industrial-green font-mono">+{formatNumber(totalPotentialGain)}</div>
          <div className="text-xs text-slate-500">Total potential TPD gain</div>
        </div>
      </div>

      {/* Summary banner */}
      <div className="panel p-4 bg-gradient-to-r from-industrial-blue/5 to-transparent border-industrial-blue/20">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-industrial-blue" />
          <p className="text-sm text-slate-300">
            <span className="text-white font-semibold">{recommendations.length} recommendations</span> identified.{' '}
            Resolving all Critical and High priority items could recover{' '}
            <span className="text-industrial-green font-semibold font-mono">
              +{formatNumber(recommendations.filter((r) => r.priority === 'Critical' || r.priority === 'High').reduce((s, r) => s + r.estimatedGain, 0))} TPD
            </span>{' '}
            and bring efficiency to <span className="text-white font-semibold">~99%</span> of target.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <RecommendationCard key={rec.id} rec={rec} index={i} />
        ))}
      </div>
    </div>
  );
}
