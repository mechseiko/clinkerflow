import { ResponsiveContainer, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import type { RadarDataPoint } from '../../types';

interface RadarChartProps {
  data: RadarDataPoint[];
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <div className="w-full h-full min-h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#1E2536" />
          <PolarAngleAxis 
            dataKey="stage" 
            tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'Inter' }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[60, 100]} 
            tick={{ fill: '#475569', fontSize: 8 }}
            stroke="#1E2536"
          />
          <Radar
            name="Actual Availability"
            dataKey="availability"
            stroke="#0EA5E9"
            fill="#0EA5E9"
            fillOpacity={0.15}
          />
          <Radar
            name="Benchmark"
            dataKey="benchmark"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0}
            strokeDasharray="4 4"
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
