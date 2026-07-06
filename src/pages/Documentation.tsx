import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Table, Presentation, Download, CheckCircle, FileDown, Clock } from 'lucide-react';

interface ExportOption {
  id: string;
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  format: string;
  color: string;
  pages?: string[];
  action: string;
}

const exports: ExportOption[] = [
  {
    id: 'pdf',
    icon: ({ className, style }) => <FileText className={className} style={style} />,
    title: 'Executive PDF Report',
    description: 'Comprehensive single-day operations report including all KPIs, loss analysis, and recommendations. Board-ready format.',
    format: 'PDF',
    color: '#EF4444',
    pages: ['Executive Summary', 'KPI Dashboard', 'Loss Tree', 'Recommendations'],
    action: 'Download PDF',
  },
  {
    id: 'excel',
    icon: ({ className, style }) => <Table className={className} style={style} />,
    title: 'Data Export (Excel)',
    description: 'Full data workbook with separate tabs: KPIs, Loss Data, Plant Parameters, Action Matrix, and 7-day trend.',
    format: 'XLSX',
    color: '#10B981',
    pages: ['KPI Data', 'Loss Data', 'Plant Parameters', 'Action Matrix', 'Trend Data'],
    action: 'Download Excel',
  },
  {
    id: 'ppt',
    icon: ({ className, style }) => <Presentation className={className} style={style} />,
    title: 'Presentation Deck',
    description: 'Ready-made slide deck for management review. 12 slides covering production performance, losses, and action plan.',
    format: 'PPTX',
    color: '#F59E0B',
    pages: ['Title', 'KPI Summary', 'Plant Flow', 'Loss Waterfall', 'Root Causes', 'Recommendations', 'Action Plan'],
    action: 'Download Presentation',
  },
];

function ExportCard({ option, index }: { option: ExportOption; index: number }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleExport = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
      // Trigger browser print dialog for PDF, or just show success
      if (option.id === 'pdf') window.print();
      setTimeout(() => setStatus('idle'), 3000);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      className="panel p-6 hover:border-opacity-50 transition-all duration-300"
      style={{ borderColor: `${option.color}20` }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${option.color}15`, border: `1px solid ${option.color}30` }}
        >
          <option.icon className="w-6 h-6" style={{ color: option.color } as React.CSSProperties} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white">{option.title}</h3>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold"
              style={{ color: option.color, backgroundColor: `${option.color}20` }}
            >
              .{option.format}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{option.description}</p>

          {option.pages && (
            <div className="mb-4">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Includes</div>
              <div className="flex flex-wrap gap-1.5">
                {option.pages.map((p) => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded bg-[#1A2035] border border-[#1E2536] text-slate-400">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            id={`export-${option.id}`}
            onClick={handleExport}
            disabled={status !== 'idle'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-70"
            style={{
              backgroundColor: status === 'done' ? '#10B98120' : `${option.color}15`,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: status === 'done' ? '#10B98140' : `${option.color}40`,
              color: status === 'done' ? '#10B981' : option.color,
            }}
          >
            {status === 'idle' && <Download className="w-4 h-4" />}
            {status === 'loading' && <Clock className="w-4 h-4 animate-spin" />}
            {status === 'done' && <CheckCircle className="w-4 h-4" />}
            {status === 'idle' && option.action}
            {status === 'loading' && 'Preparing export...'}
            {status === 'done' && 'Export complete!'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Documentation() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Documentation Export</h2>
        <p className="text-sm text-slate-500 mt-0.5">Download reports, data exports, and presentation decks</p>
      </div>

      {/* Notice */}
      <div className="panel p-4 bg-gradient-to-r from-amber-500/5 to-transparent border-amber-500/20">
        <div className="flex items-center gap-3">
          <FileDown className="w-5 h-5 text-amber-400" />
          <p className="text-sm text-slate-400">
            <span className="text-white font-medium">Competition Prototype:</span> Export buttons demonstrate the UX. PDF triggers the browser print dialog; Excel/PPT show export confirmation.
          </p>
        </div>
      </div>

      {/* Export options */}
      <div className="space-y-4">
        {exports.map((opt, i) => (
          <ExportCard key={opt.id} option={opt} index={i} />
        ))}
      </div>

      {/* Metadata */}
      <div className="panel p-5">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Report Metadata</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: 'Plant', value: 'Dangote Cement — Line 1–4' },
            { label: 'Date', value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
            { label: 'Shift', value: 'Day Shift (06:00 – 18:00)' },
            { label: 'Data Type', value: 'Illustrative — Competition' },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-slate-300 font-medium">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
