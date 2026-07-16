/**
 * CLINKERFLOW — Loss Tree Data (q1 – q13)
 * ═══════════════════════════════════════════════════════════════════════════
 * Master Loss Tree mapping to 13 stages.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { LossEntry, WaterfallDataPoint } from '../types';
import { THEORETICAL_CAPACITY } from './plantData';

export const lossData: LossEntry[] = [
  {
    stage: 'Kiln',
    stageId: 'kiln',
    lossIndex: 'q1',
    totalLoss: 5.80,
    percentage: 21.07,
    formula: 'q1 = (SHC_actual − SHC_benchmark) × Clinker rate',
    variables: [
      { symbol: 'q1', description: 'Runtime Losses (Power trips)', unit: 'Mta', illustrativeValue: '5.80' },
    ],
    engineeringInterpretation: 'Grid fluctuations forcing unplanned motor restarts and thermal kiln shock cycles.',
    operationalExplanation: 'Power trips cause significant runtime losses in the kiln. This is distinct from steady-state thermal efficiency.',
    assumptions: ['10.55% of design capacity'],
    exampleCalculation: '5.8 Mta lost due to kiln unplanned downtime',
    causes: [
      { id: 'q1-c1', description: 'Grid instability and power trips', loss: 5.80, owner: 'Electrical Team', priority: 'High', actions: ['Improve grid stability', 'Monitor trip sequence logs'] },
    ],
  },
  {
    stage: 'Conveyor',
    stageId: 'conveyor',
    lossIndex: 'q4',
    totalLoss: 0.43,
    percentage: 1.56,
    formula: 'q4 = Design capacity (t/hr) × Downtime (hr)',
    variables: [
      { symbol: 'q4', description: 'Feed Constraints', unit: 'Mta', illustrativeValue: '0.43' },
    ],
    engineeringInterpretation: 'Mechanical downtime in clinker transport loops and port unloading conveyor arms.',
    operationalExplanation: 'Feed constraints reduce the available clinker delivered to the mill.',
    assumptions: ['0.78% of design capacity'],
    exampleCalculation: '0.43 Mta lost due to feed constraints',
    causes: [
      { id: 'q4-c1', description: 'Conveyor mechanical downtime', loss: 0.43, owner: 'Mechanical Team', priority: 'Low', actions: ['Reduce conveyor mechanical faults'] },
    ],
  },
  {
    stage: 'Weight Feeders',
    stageId: 'feeders',
    lossIndex: 'q5',
    totalLoss: 0.65,
    percentage: 2.36,
    formula: 'q5 = Off-spec tonnage × Rework/rejection fraction',
    variables: [
      { symbol: 'q5', description: 'Additive Shortages', unit: 'Mta', illustrativeValue: '0.65' },
    ],
    engineeringInterpretation: 'Conveyor and material-handling delays in feeding high-grade gypsum/pozzolana.',
    operationalExplanation: 'Additive shortages distort mix design and slow production.',
    assumptions: ['1.18% of design capacity'],
    exampleCalculation: '0.65 Mta lost due to additive shortages',
    causes: [
      { id: 'q5-c1', description: 'Material handling delays', loss: 0.65, owner: 'Supply Chain', priority: 'Medium', actions: ['Improve material handling logistics'] },
    ],
  },
  {
    stage: 'Ball Mill',
    stageId: 'mill',
    lossIndex: 'q6',
    totalLoss: 3.40,
    percentage: 12.35,
    formula: 'q6 = (Design rate − Actual rate) × Operating hours',
    variables: [
      { symbol: 'q6', description: 'Rate Losses (Equipment wear)', unit: 'Mta', illustrativeValue: '3.40' },
    ],
    engineeringInterpretation: 'Worn grinding media and mill liners cause vibration spikes, forcing lower hourly feed rate.',
    operationalExplanation: 'Equipment wear significantly reduces the actual throughput rate of the ball mill compared to its design capacity.',
    assumptions: ['6.18% of design capacity'],
    exampleCalculation: '3.40 Mta lost due to rate losses',
    causes: [
      { id: 'q6-c1', description: 'Worn media and liners', loss: 3.40, owner: 'Maintenance Team', priority: 'High', actions: ['Schedule liner replacement', 'Top up grinding media'] },
    ],
  },
  {
    stage: 'Cement Silo',
    stageId: 'cement-silo',
    lossIndex: 'q10',
    totalLoss: 14.60,
    percentage: 53.03,
    formula: 'q10 = Mill design rate × Hours mill slowed/stopped',
    variables: [
      { symbol: 'q10', description: 'Production Planning (shut-ins)', unit: 'Mta', illustrativeValue: '14.60' },
    ],
    engineeringInterpretation: 'Line idled or run at low-load cycles because storage silos are at peak capacity.',
    operationalExplanation: 'This is a downstream backpressure constraint, not a demand/commercial decision.',
    assumptions: ['26.55% of design capacity'],
    exampleCalculation: '14.6 Mta lost due to silo space constraints',
    causes: [
      { id: 'q10-c1', description: 'Silo backpressure', loss: 14.60, owner: 'Planning Team', priority: 'Critical', actions: ['Increase dispatch rate', 'Prevent silo max capacity idles'] },
    ],
  },
  {
    stage: 'Packaging',
    stageId: 'packaging',
    lossIndex: 'q11a',
    totalLoss: 1.45,
    percentage: 5.27,
    formula: 'q11 = Rated packing rate × (Downtime + Stock-out hrs)',
    variables: [
      { symbol: 'q11', description: 'Packing Bottlenecks', unit: 'Mta', illustrativeValue: '1.45' },
    ],
    engineeringInterpretation: 'Dust-heavy microenvironments causing high-speed rotary packer pneumatic nozzle jams.',
    operationalExplanation: 'Packing bottlenecks cause upstream backpressure. ClinkerFlow specifically instruments this stage to capture this loss.',
    assumptions: ['2.64% of design capacity'],
    exampleCalculation: '1.45 Mta lost due to packing bottlenecks',
    causes: [
      { id: 'q11-c1', description: 'Pneumatic nozzle jams', loss: 1.45, owner: 'Mechanical Team', priority: 'Critical', actions: ['Monitor with ClinkerFlow SSR', 'Respond to automated CMMS tickets'] },
    ],
  },
  {
    stage: 'Weighbridge',
    stageId: 'weighbridge',
    lossIndex: 'q12',
    totalLoss: 1.20,
    percentage: 4.36,
    formula: 'q12 = Avg delay per vehicle × No. of vehicles/day × Avg load',
    variables: [
      { symbol: 'q12', description: 'Dispatch Delays', unit: 'Mta', illustrativeValue: '1.20' },
    ],
    engineeringInterpretation: 'Slow physical yard truck turnaround and weighbridge calibration limits.',
    operationalExplanation: 'Dispatch delays are part of the 9.6% loss gap targeted by ClinkerFlow.',
    assumptions: ['2.18% of design capacity'],
    exampleCalculation: '1.20 Mta lost due to dispatch delays',
    causes: [
      { id: 'q12-c1', description: 'Slow truck turnaround', loss: 1.20, owner: 'Logistics', priority: 'High', actions: ['Monitor via RFID gate-in/out timestamps', 'Implement SSR-based alerts'] },
    ],
  },
];

export const totalLoss = lossData.reduce((sum, l) => sum + l.totalLoss, 0);

// ─── Waterfall Chart Data (Master Loss Tree) ─────────────────────

export const waterfallData: WaterfallDataPoint[] = (() => {
  const points: WaterfallDataPoint[] = [];

  points.push({
    name: 'Theoretical Capacity',
    lossIndex: '—',
    start: 0,
    value: THEORETICAL_CAPACITY,
    end: THEORETICAL_CAPACITY,
    isTotal: true,
    fill: '#1e3a8a',
    formula: 'Group installed manufacturing design maximum',
  });

  const orderedLosses = [
    { name: 'Production Planning', index: 'q10', loss: 14.6 },
    { name: 'Runtime Losses', index: 'q1', loss: 5.8 },
    { name: 'Rate Losses', index: 'q6', loss: 3.4 },
    { name: 'Packing Bottlenecks', index: 'q11a', loss: 1.45 },
    { name: 'Dispatch Delays', index: 'q12', loss: 1.2 },
    { name: 'Additive Shortages', index: 'q5', loss: 0.65 },
    { name: 'Feed Constraints', index: 'q4', loss: 0.43 },
  ];

  let cumulative = THEORETICAL_CAPACITY;
  for (const item of orderedLosses) {
    cumulative -= item.loss;
    points.push({
      name: item.name,
      lossIndex: item.index,
      start: cumulative,
      value: -item.loss,
      end: cumulative,
      fill: '#b91c1c',
      formula: '',
    });
  }

  points.push({
    name: 'Actual Dispatched',
    lossIndex: '—',
    start: 0,
    value: cumulative,
    end: cumulative,
    isTotal: true,
    fill: '#737373',
    formula: 'Final volume successfully cleared and shipped',
  });

  return points;
})();

