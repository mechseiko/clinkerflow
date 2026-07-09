import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface StackedBarChartProps {
  data: {
    stage: string;
    actual: number;
    target: number;
  }[];
}

export function StackedBarChart({ data }: StackedBarChartProps) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="stage" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            domain={[0, 6000]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#0F1320', borderColor: '#1E2536', borderRadius: '8px' }}
            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            itemStyle={{ color: '#94a3b8' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', fontFamily: 'Inter' }}
          />
          <Bar 
            name="Actual Flow Rate (TPD)" 
            dataKey="actual" 
            stackId="a" 
            fill="#0EA5E9" 
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            name="Unutilised Capacity Deficit" 
            dataKey="target" 
            stackId="b" 
            fill="#EF4444" 
            opacity={0.15}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
