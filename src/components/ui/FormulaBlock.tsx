import React from 'react';

interface FormulaBlockProps {
  index: string;
  name: string;
  formula: string;
  variables: {
    symbol: string;
    description: string;
    unit: string;
    illustrativeValue?: string;
  }[];
  engineeringInterpretation: string;
  exampleCalculation?: string;
  benchmarkRange?: string;
  references?: string[];
}

export function FormulaBlock({
  index,
  name,
  formula,
  variables,
  engineeringInterpretation,
  exampleCalculation,
  benchmarkRange,
  references,
}: FormulaBlockProps) {
  return (
    <div className="bg-[#0A0D14] border border-[#1E2536] rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1E2536] pb-3">
        <div>
          <span className="text-[10px] font-mono text-industrial-blue uppercase font-bold tracking-wider">{index} Loss Model</span>
          <h4 className="text-sm font-semibold text-white mt-0.5">{name}</h4>
        </div>
        {benchmarkRange && (
          <div className="text-right">
            <span className="text-[9px] text-slate-500 uppercase block font-semibold">Typical Range</span>
            <span className="text-xs font-mono font-medium text-emerald-400">{benchmarkRange}</span>
          </div>
        )}
      </div>

      {/* Formula Display */}
      <div className="bg-[#080B12] border border-[#1E2536] rounded-lg py-4 px-6 flex items-center justify-center font-mono text-base md:text-lg text-white shadow-inner">
        {formula}
      </div>

      {/* Variables Table */}
      <div>
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Variables & Parameters</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1E2536] text-[10px] text-slate-500 uppercase font-semibold">
                <th className="text-left py-1.5 w-16">Symbol</th>
                <th className="text-left py-1.5">Description</th>
                <th className="text-left py-1.5 w-20">Unit</th>
                <th className="text-right py-1.5 w-24">Demo Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2536]/30 text-slate-300">
              {variables.map((v) => (
                <tr key={v.symbol} className="hover:bg-[#1A2035]/20">
                  <td className="py-2 font-mono font-bold text-industrial-blue">{v.symbol}</td>
                  <td className="py-2 text-slate-400">{v.description}</td>
                  <td className="py-2 font-mono text-slate-500 text-xs">{v.unit}</td>
                  <td className="py-2 text-right font-mono text-white text-xs">{v.illustrativeValue || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineering Explanation */}
      <div className="space-y-1.5 text-xs text-slate-400 border-t border-[#1E2536] pt-3 leading-relaxed">
        <strong className="text-slate-300 uppercase text-[10px] tracking-wider block font-semibold">Engineering Interpretation</strong>
        <p>{engineeringInterpretation}</p>
      </div>

      {/* Example Calculation */}
      {exampleCalculation && (
        <div className="bg-[#0D121F]/50 rounded-lg p-3 border border-[#1E2536]/50 space-y-1">
          <span className="text-[9px] text-slate-500 uppercase font-semibold block">Example Shift Calculation</span>
          <code className="text-xs text-slate-300 font-mono block">{exampleCalculation}</code>
        </div>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <div className="text-[10px] text-slate-500 flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#1E2536]/30">
          <span className="font-semibold uppercase tracking-wider">Literature:</span>
          {references.map((r, idx) => (
            <span key={r} className="italic text-slate-400">
              {r}{idx < references.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
