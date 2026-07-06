import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import type { TrendDataPoint } from '../../types';

interface Props {
  data: TrendDataPoint[];
  showEfficiency?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0F1320] border border-[#1E2536] rounded-lg px-4 py-3 text-sm shadow-xl min-w-[160px]">
      <div className="font-semibold text-white mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
          <span className="text-slate-400 text-xs">{p.name}</span>
          <span className="font-mono text-xs" style={{ color: p.color }}>
            {p.value.toLocaleString()}
            {p.dataKey === 'efficiency' ? '%' : ' TPD'}
          </span>
        </div>
      ))}
    </div>
  );
};

export function TrendChart({ data, showEfficiency = false }: Props) {
  if (showEfficiency) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 10 }}>
          <defs>
            <linearGradient id="effGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2536" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1E2536' }} tickLine={false} />
          <YAxis domain={[70, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1E2536' }} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={95} stroke="#10B981" strokeDasharray="4 4" strokeOpacity={0.4} />
          <Area type="monotone" dataKey="efficiency" name="Efficiency" stroke="#0EA5E9" fill="url(#effGrad)" strokeWidth={2} dot={{ fill: '#0EA5E9', r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 10 }}>
        <defs>
          <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2536" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1E2536' }} tickLine={false} />
        <YAxis
          domain={[4000, 6000]}
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={{ stroke: '#1E2536' }}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: 12, fontSize: 11 }}
          formatter={(val) => <span style={{ color: '#94a3b8' }}>{val}</span>}
        />
        <Line type="monotone" dataKey="target" name="Target" stroke="#1E2536" strokeDasharray="5 5" strokeWidth={2} dot={false} />
        <Area type="monotone" dataKey="actual" name="Actual Output" stroke="#10B981" fill="url(#actualGrad)" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
