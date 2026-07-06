import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import type { WaterfallDataPoint } from '../../types';

interface Props {
  data: WaterfallDataPoint[];
  onBarClick?: (entry: WaterfallDataPoint) => void;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0]?.payload as WaterfallDataPoint;
  if (!d) return null;

  return (
    <div className="bg-[#0F1320] border border-[#1E2536] rounded-lg px-4 py-3 text-sm shadow-xl">
      <div className="font-semibold text-white mb-1">{d.name}</div>
      {d.isTotal ? (
        <div className="text-slate-300">
          <span className="text-slate-500">Output: </span>
          <span className="font-mono text-industrial-blue">{d.value.toLocaleString()} TPD</span>
        </div>
      ) : (
        <div className="text-slate-300">
          <span className="text-slate-500">Loss: </span>
          <span className="font-mono text-red-400">−{Math.abs(d.value).toLocaleString()} TPD</span>
        </div>
      )}
    </div>
  );
};

export function WaterfallChart({ data, onBarClick }: Props) {
  // For waterfall, we use stacked bars with transparent base
  const chartData = data.map((d) => ({
    ...d,
    base: d.isTotal ? 0 : d.start,
    display: Math.abs(d.value),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2536" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={{ stroke: '#1E2536' }}
          tickLine={false}
          interval={0}
          angle={-25}
          textAnchor="end"
          height={60}
        />
        <YAxis
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={{ stroke: '#1E2536' }}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
          domain={[0, 6000]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        {/* Invisible base */}
        <Bar dataKey="base" stackId="a" fill="transparent" />
        {/* Visible value */}
        <Bar
          dataKey="display"
          stackId="a"
          radius={[3, 3, 0, 0]}
          onClick={(d) => onBarClick && onBarClick(d as unknown as WaterfallDataPoint)}
          style={{ cursor: onBarClick ? 'pointer' : 'default' }}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill}
              fillOpacity={0.85}
              stroke={entry.fill}
              strokeOpacity={0.4}
              strokeWidth={1}
            />
          ))}
        </Bar>
        <ReferenceLine y={5500} stroke="#0EA5E9" strokeDasharray="4 4" strokeOpacity={0.5} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
