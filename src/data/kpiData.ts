/**
 * ILLUSTRATIVE DATA ONLY — For demonstration purposes
 * Based on typical Dangote Cement production parameters
 */

import type { KPICard, DailyKPI, TrendDataPoint } from '../types';

export const todayKPIs: KPICard[] = [
  {
    id: 'output',
    label: "Today's Output",
    value: 4_820,
    unit: 'TPD',
    trend: -3.2,
    trendDir: 'down',
    status: 'warning',
  },
  {
    id: 'target',
    label: 'Daily Target',
    value: 5_500,
    unit: 'TPD',
    status: 'operational',
  },
  {
    id: 'efficiency',
    label: 'Conversion Efficiency',
    value: 87.6,
    unit: '%',
    trend: -1.4,
    trendDir: 'down',
    status: 'warning',
  },
  {
    id: 'loss',
    label: 'Total Loss',
    value: 680,
    unit: 'TPD',
    trend: 12.5,
    trendDir: 'up',
    status: 'critical',
  },
  {
    id: 'clinker_ratio',
    label: 'Clinker Factor',
    value: 0.73,
    unit: 'ratio',
    trend: 0.8,
    trendDir: 'up',
    status: 'operational',
  },
  {
    id: 'energy',
    label: 'Energy Intensity',
    value: 112,
    unit: 'kWh/t',
    trend: 2.1,
    trendDir: 'up',
    status: 'warning',
  },
];

export const weeklyTrend: TrendDataPoint[] = [
  { date: 'Jun 30', actual: 5_210, target: 5_500, efficiency: 94.7 },
  { date: 'Jul 01', actual: 5_340, target: 5_500, efficiency: 97.1 },
  { date: 'Jul 02', actual: 4_980, target: 5_500, efficiency: 90.5 },
  { date: 'Jul 03', actual: 5_100, target: 5_500, efficiency: 92.7 },
  { date: 'Jul 04', actual: 4_620, target: 5_500, efficiency: 84.0 },
  { date: 'Jul 05', actual: 4_750, target: 5_500, efficiency: 86.4 },
  { date: 'Jul 06', actual: 4_820, target: 5_500, efficiency: 87.6 },
];

export const monthlyKPI: DailyKPI[] = [
  { date: 'Week 1', output: 36_470, target: 38_500, efficiency: 94.7, loss: 2_030 },
  { date: 'Week 2', output: 35_800, target: 38_500, efficiency: 93.0, loss: 2_700 },
  { date: 'Week 3', output: 34_100, target: 38_500, efficiency: 88.6, loss: 4_400 },
  { date: 'Week 4 (To Date)', output: 33_740, target: 38_500, efficiency: 87.6, loss: 4_760 },
];
