import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  value: number; // 0-100
  label: string;
  sublabel?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RADIAN = Math.PI / 180;

function needle(value: number, cx: number, cy: number, iR: number, oR: number, color: string) {
  const ang = 180 - (value / 100) * 180;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 6;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + (oR - 20) * cos;
  const yp = y0 + (oR - 20) * sin;

  return [
    <circle key="c" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path key="p" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} fill={color} />,
  ];
}

export function GaugeChart({ value, label, sublabel, color, size = 'md' }: Props) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const c = color ?? (clampedValue >= 90 ? '#10B981' : clampedValue >= 75 ? '#F59E0B' : '#EF4444');

  const data = [
    { value: clampedValue, color: c },
    { value: 100 - clampedValue, color: '#1E2536' },
  ];

  const cx = 100;
  const cy = 90;
  const iR = 60;
  const oR = 85;

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      {/* Fluid container: max-width keeps it from getting too large, aspect ratio keeps proportions */}
      <div className="relative w-full max-w-[200px] mx-auto" style={{ aspectRatio: '200/130' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={iR}
              outerRadius={oR}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`c-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {needle(clampedValue, cx, cy, iR, oR, '#e2e8f0')}
          </PieChart>
        </ResponsiveContainer>
        {/* Center value */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-3"
          style={{ pointerEvents: 'none' }}
        >
          <span className="text-xl sm:text-2xl font-bold font-mono" style={{ color: c }}>
            {clampedValue.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="text-sm font-medium text-white text-center">{label}</div>
      {sublabel && <div className="text-xs text-slate-500 text-center">{sublabel}</div>}
    </div>
  );
}
