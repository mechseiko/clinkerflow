/**
 * CLINKERFLOW — KPI Data
 * ═══════════════════════════════════════════════════════════════════════════
 * Updated to align with 55.00 Mta capacity and SSR focus from Pitch Deck.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { KPICard, DailyKPI, TrendDataPoint, RadarDataPoint } from '../types';
import { THEORETICAL_CAPACITY, ACTUAL_DISPATCHED, TOTAL_LOSS, OVERALL_EFFICIENCY } from './frameworkData';

// ─── Today's KPIs ────────────────────────────────────────

export const todayKPIs: KPICard[] = [
  {
    id: 'output',
    label: "Annualized Output",
    value: ACTUAL_DISPATCHED,
    unit: 'Mta',
    trend: 0.0,
    trendDir: 'up',
    status: 'warning',
    formulaRef: 'Actual = Design − ΣLosses',
  },
  {
    id: 'target',
    label: 'Design Capacity',
    value: THEORETICAL_CAPACITY,
    unit: 'Mta',
    status: 'operational',
    formulaRef: 'Group installed maximum',
  },
  {
    id: 'efficiency',
    label: 'Conversion Efficiency',
    value: parseFloat(OVERALL_EFFICIENCY),
    unit: '%',
    trend: 0.0,
    trendDir: 'down',
    status: 'warning',
    formulaRef: 'η_conv = Actual / Design × 100',
  },
  {
    id: 'total_loss',
    label: 'Identified Gap',
    value: TOTAL_LOSS,
    unit: 'Mta',
    trend: 0.0,
    trendDir: 'up',
    status: 'critical',
    formulaRef: 'Σq = q1 + q4 + q5 + q6 + q10 + q11a + q12',
  },
  {
    id: 'ssr',
    label: 'Supply Sufficiency Ratio (SSR)',
    value: 85.0,
    unit: '%',
    trend: -2.4,
    trendDir: 'down',
    status: 'critical',
    formulaRef: 'SSR = Capacity_pack / Flow_kiln',
  },
  {
    id: 'cmms',
    label: 'Open CMMS Tickets',
    value: 12,
    unit: 'Tickets',
    trend: -3,
    trendDir: 'down',
    status: 'operational',
    formulaRef: 'Automated defect routing active',
  },
];

// ─── Illustrative Trend ─────────────────────────────────────────────────

export const weeklyTrend: TrendDataPoint[] = [
  { date: 'Q1', actual: 26.50, target: 55.00, efficiency: 48.1 },
  { date: 'Q2', actual: 27.10, target: 55.00, efficiency: 49.2 },
  { date: 'Q3', actual: 26.80, target: 55.00, efficiency: 48.7 },
  { date: 'Q4', actual: 27.47, target: 55.00, efficiency: 49.9 },
];

// ─── Equipment Availability Radar Data ───────────────────────────────────────

export const equipmentAvailability: RadarDataPoint[] = [
  { stage: 'Kiln',      availability: 89.5, benchmark: 95 },
  { stage: 'Cooler',    availability: 98.0, benchmark: 99 },
  { stage: 'Cl.Silo',   availability: 99.0, benchmark: 99 },
  { stage: 'Conveyor',  availability: 99.2, benchmark: 99.5 },
  { stage: 'Feeders',   availability: 98.8, benchmark: 99.5 },
  { stage: 'Ball Mill', availability: 93.8, benchmark: 97 },
  { stage: 'Classifier', availability: 95.1, benchmark: 98 },
  { stage: 'Bag Filter', availability: 99.1, benchmark: 99 },
  { stage: 'Bkt.Elev',  availability: 99.8, benchmark: 99.5 },
  { stage: 'Cm.Silo',   availability: 73.5, benchmark: 99 },
  { stage: 'Packaging', availability: 94.7, benchmark: 98 },
  { stage: 'Weighbr.',  availability: 99.9, benchmark: 99.5 },
  { stage: 'Dispatch',  availability: 97.8, benchmark: 99 },
];

// ─── Monthly KPI Illustrative Trend ──────────────────────────────────────────

export const monthlyKPI: DailyKPI[] = [
  { date: 'Jan', output: 26.1, target: 55.00, efficiency: 47.4, loss: 28.9 },
  { date: 'Feb', output: 26.4, target: 55.00, efficiency: 48.0, loss: 28.6 },
  { date: 'Mar', output: 26.8, target: 55.00, efficiency: 48.7, loss: 28.2 },
  { date: 'Apr', output: 27.47, target: 55.00, efficiency: 49.9, loss: 27.53 },
];

// ─── Stage Throughput Comparison (for stacked bar) ───────────────────────────

export const stageThroughputs = [
  { stage: 'Design Capacity', actual: 55.00, target: 55.00 },
  { stage: 'Prod. Planning', actual: 40.40, target: 55.00 },
  { stage: 'Runtime Losses', actual: 34.60, target: 40.40 },
  { stage: 'Rate Losses', actual: 31.20, target: 34.60 },
  { stage: 'Packaging', actual: 29.75, target: 31.20 },
  { stage: 'Dispatch', actual: 28.55, target: 29.75 },
  { stage: 'Feeders', actual: 27.90, target: 28.55 },
  { stage: 'Conveyor', actual: 27.47, target: 27.90 },
];
