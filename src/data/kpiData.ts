/**
 * CLINKERFLOW — KPI Data
 * ═══════════════════════════════════════════════════════════════════════════
 * All values are ILLUSTRATIVE engineering examples developed for the
 * Dangote Cement University Engineering Challenge 2026.
 * They do NOT represent actual Dangote Cement operational data.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { KPICard, DailyKPI, TrendDataPoint, RadarDataPoint } from '../types';

// ─── Today's Illustrative Shift KPIs ────────────────────────────────────────
// Formula: η_conv = Q_actual / Q_theoretical × 100

export const todayKPIs: KPICard[] = [
  {
    id: 'output',
    label: "Today's Output",
    value: 4_565,
    unit: 'TPD',
    trend: -3.2,
    trendDir: 'down',
    status: 'warning',
    formulaRef: 'Q_actual = Q_th − Σq1..q13',
  },
  {
    id: 'target',
    label: 'Daily Target',
    value: 5_500,
    unit: 'TPD',
    status: 'operational',
    formulaRef: 'Q_theoretical = Design capacity',
  },
  {
    id: 'efficiency',
    label: 'Conversion Efficiency',
    value: 83.0,
    unit: '%',
    trend: -1.4,
    trendDir: 'down',
    status: 'warning',
    formulaRef: 'η_conv = Q_actual / Q_theoretical × 100',
  },
  {
    id: 'total_loss',
    label: 'Total Stage Loss',
    value: 935,
    unit: 'TPD',
    trend: 12.5,
    trendDir: 'up',
    status: 'critical',
    formulaRef: 'Σq = q1 + q2 + … + q13',
  },
  {
    id: 'clinker_factor',
    label: 'Clinker Factor',
    value: 0.73,
    unit: 'ratio',
    trend: 0.8,
    trendDir: 'up',
    status: 'operational',
    formulaRef: 'CF = m_clinker / m_cement',
  },
  {
    id: 'energy',
    label: 'Energy Intensity',
    value: 38.6,
    unit: 'kWh/t',
    trend: 2.1,
    trendDir: 'up',
    status: 'warning',
    formulaRef: 'E_sp = P_total / Q_mill',
  },
];

// ─── 7-Day Illustrative Trend ─────────────────────────────────────────────────

export const weeklyTrend: TrendDataPoint[] = [
  { date: 'Jul 03', actual: 5_210, target: 5_500, efficiency: 94.7 },
  { date: 'Jul 04', actual: 5_340, target: 5_500, efficiency: 97.1 },
  { date: 'Jul 05', actual: 4_980, target: 5_500, efficiency: 90.5 },
  { date: 'Jul 06', actual: 5_100, target: 5_500, efficiency: 92.7 },
  { date: 'Jul 07', actual: 4_620, target: 5_500, efficiency: 84.0 },
  { date: 'Jul 08', actual: 4_750, target: 5_500, efficiency: 86.4 },
  { date: 'Jul 09', actual: 4_565, target: 5_500, efficiency: 83.0 },
];

// ─── Equipment Availability Radar Data ───────────────────────────────────────

export const equipmentAvailability: RadarDataPoint[] = [
  { stage: 'Cooler',      availability: 98.9, benchmark: 99 },
  { stage: 'Cl.Silo',    availability: 99.6, benchmark: 99 },
  { stage: 'Conveyor',   availability: 99.7, benchmark: 99.5 },
  { stage: 'Feeders',    availability: 99.8, benchmark: 99.5 },
  { stage: 'Ball Mill',  availability: 94.2, benchmark: 97 },
  { stage: 'Classifier', availability: 88.1, benchmark: 92 },
  { stage: 'Bag Filter', availability: 99.8, benchmark: 99 },
  { stage: 'Bkt.Elev',  availability: 99.8, benchmark: 99.5 },
  { stage: 'Cm.Silo',   availability: 98.4, benchmark: 99 },
  { stage: 'Packaging',  availability: 82.8, benchmark: 95 },
  { stage: 'Weighbr.',  availability: 99.9, benchmark: 99.5 },
  { stage: 'Dispatch',   availability: 98.7, benchmark: 99 },
];

// ─── Monthly KPI Illustrative Trend ──────────────────────────────────────────

export const monthlyKPI: DailyKPI[] = [
  { date: 'Week 1 (Jun)', output: 36_470, target: 38_500, efficiency: 94.7, loss: 2_030 },
  { date: 'Week 2 (Jun)', output: 35_800, target: 38_500, efficiency: 93.0, loss: 2_700 },
  { date: 'Week 3 (Jul)', output: 34_100, target: 38_500, efficiency: 88.6, loss: 4_400 },
  { date: 'Week 4 (Jul)', output: 31_955, target: 38_500, efficiency: 83.0, loss: 6_545 },
];

// ─── Stage Throughput Comparison (for stacked bar) ───────────────────────────

export const stageThroughputs = [
  { stage: 'Kiln',         actual: 5_500, target: 5_500 },
  { stage: 'Cooler',       actual: 5_445, target: 5_500 },
  { stage: 'Cl.Silo',     actual: 5_425, target: 5_445 },
  { stage: 'Conveyor',    actual: 5_410, target: 5_425 },
  { stage: 'Feeders',     actual: 5_398, target: 5_410 },
  { stage: 'Ball Mill',   actual: 4_920, target: 5_398 },
  { stage: 'Classifier',  actual: 4_790, target: 4_920 },
  { stage: 'Bag Filter',  actual: 4_782, target: 4_790 },
  { stage: 'Bkt.Elev',   actual: 4_772, target: 4_782 },
  { stage: 'Cm.Silo',    actual: 4_697, target: 4_772 },
  { stage: 'Packaging',   actual: 3_890, target: 4_697 },
  { stage: 'Weighbr.',   actual: 3_885, target: 3_890 },
  { stage: 'Dispatch',    actual: 3_833, target: 3_885 },
  { stage: 'Logistics',   actual: 4_565, target: 3_833 },
];
