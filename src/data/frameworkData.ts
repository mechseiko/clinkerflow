/**
 * CLINKERFLOW — Engineering Framework Data
 * ═══════════════════════════════════════════════════════════════════════════
 * Updated to align with the Master Loss Tree and 55.00 Mta Group metrics.
 * Incorporates Supply Sufficiency Ratio (SSR) focus.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { LossFormula, EngineeringAssumption, FrameworkStage } from '../types';

// ─── 13-Stage Conversion Pathway ─────────────────────────────────────────────

export const frameworkStages: FrameworkStage[] = [
  { index: 0,  stageId: 'kiln',         name: 'Kiln',               lossIndex: 'q1',  conversionStep: 'Calcination',              inputUnit: 'Raw Meal',  outputUnit: 'Clinker' },
  { index: 1,  stageId: 'cooler',       name: 'Clinker Cooler',     lossIndex: 'q2',  conversionStep: 'Cooling / Heat Recovery',   inputUnit: 'Hot Clinker', outputUnit: 'Cooled Clinker' },
  { index: 2,  stageId: 'clinker-silo', name: 'Clinker Silo',       lossIndex: 'q3',  conversionStep: 'Storage & Inventory',       inputUnit: 'Cooled Clinker', outputUnit: 'Reclaimed Clinker' },
  { index: 3,  stageId: 'conveyor',     name: 'Conveyor',           lossIndex: 'q4',  conversionStep: 'Material Transport',        inputUnit: 'Clinker',  outputUnit: 'Clinker' },
  { index: 4,  stageId: 'feeders',      name: 'Weight Feeders',     lossIndex: 'q5',  conversionStep: 'Proportioning',             inputUnit: 'Clinker',  outputUnit: 'Metered Feed' },
  { index: 5,  stageId: 'mill',         name: 'Ball Mill',          lossIndex: 'q6',  conversionStep: 'Comminution / Grinding',    inputUnit: 'Mixed Feed', outputUnit: 'Ground Cement' },
  { index: 6,  stageId: 'classifier',   name: 'Classifier',         lossIndex: 'q7',  conversionStep: 'Particle Classification',   inputUnit: 'Ground Product', outputUnit: 'On-spec Cement' },
  { index: 7,  stageId: 'bag-filter',   name: 'Bag Filter',         lossIndex: 'q8',  conversionStep: 'Dust Collection',           inputUnit: 'Air + Fines', outputUnit: 'Recovered Fines' },
  { index: 8,  stageId: 'bucket-elev',  name: 'Bucket Elevator',    lossIndex: 'q9',  conversionStep: 'Vertical Material Transfer', inputUnit: 'Cement', outputUnit: 'Cement' },
  { index: 9,  stageId: 'cement-silo',  name: 'Cement Silo',        lossIndex: 'q10', conversionStep: 'Finished Product Storage',  inputUnit: 'Cement', outputUnit: 'Cement' },
  { index: 10, stageId: 'packaging',    name: 'Packaging',          lossIndex: 'q11a', conversionStep: 'Bagging / Palletising',     inputUnit: 'Bulk Cement', outputUnit: 'Bagged Cement' },
  { index: 11, stageId: 'weighbridge',  name: 'Weighbridge',        lossIndex: 'q11b', conversionStep: 'Load Verification',         inputUnit: 'Bagged Cement', outputUnit: 'Verified Load' },
  { index: 12, stageId: 'dispatch',     name: 'Dispatch',           lossIndex: 'q12', conversionStep: 'Fleet Loading & Release',   inputUnit: 'Verified Load', outputUnit: 'Dispatched Cement' },
];

// ─── Loss Formulas (Key Focus Areas) ─────────────────────────────────────────────

export const lossFormulas: LossFormula[] = [
  {
    index: 'q1',
    name: 'Runtime Losses',
    stageId: 'kiln',
    formula: 'q_1 = (SHC_{actual} - SHC_{benchmark}) \\times Rate',
    variables: [
      { symbol: 'q1', description: 'Kiln runtime loss', unit: 'Mta', illustrativeValue: '5.80' },
      { symbol: 'SHC', description: 'Specific Heat Consumption', unit: 'kcal/kg', illustrativeValue: '750' },
    ],
    engineeringInterpretation: 'Grid fluctuations forcing unplanned motor restarts and thermal kiln shock cycles.',
    benchmarkRange: 'Downtime < 5% of scheduled operating hours',
    references: ['Technical Appendix - Master Loss Tree'],
    assumptions: ['10.55% of design capacity'],
    exampleCalc: '5.8 Mta lost due to kiln unplanned downtime',
  },
  {
    index: 'q11a',
    name: 'Packing Bottlenecks (SSR Focus)',
    stageId: 'packaging',
    formula: 'SSR = \\dfrac{Capacity_{pack}}{Flow_{kiln}} \\times \\eta_{availability}',
    variables: [
      { symbol: 'SSR', description: 'Supply Sufficiency Ratio', unit: '%', illustrativeValue: '85' },
      { symbol: 'Flow', description: 'Upstream kiln flow', unit: 't/h', illustrativeValue: '250' },
    ],
    engineeringInterpretation: 'Dust-heavy microenvironments causing high-speed rotary packer pneumatic nozzle jams.',
    benchmarkRange: 'SSR > 95% indicates packing can clear upstream production without backpressure.',
    references: ['Executive Pitch Deck - Core Mechanism'],
    assumptions: ['2.64% of design capacity'],
    exampleCalc: 'SSR = 85%, indicating a 15% bottleneck in packing vs kiln rate.',
  },
  {
    index: 'q10',
    name: 'Production Planning (Shut-ins)',
    stageId: 'cement-silo',
    formula: 'q_{10} = Rate_{mill} \\times Downtime_{silo}',
    variables: [
      { symbol: 'q10', description: 'Silo backpressure shut-in loss', unit: 'Mta', illustrativeValue: '14.60' },
    ],
    engineeringInterpretation: 'Line idled or run at low-load cycles because storage silos are at peak capacity.',
    benchmarkRange: 'Silo capacity should buffer 72h of production',
    references: ['Technical Appendix - Master Loss Tree'],
    assumptions: ['26.55% of design capacity'],
    exampleCalc: '14.60 Mta lost due to silo space constraints (largest single loss bucket).',
  },
];

// ─── Engineering Assumptions ──────────────────────────────────────────────────

export const engineeringAssumptions: EngineeringAssumption[] = [
  { id: 'ea1', category: 'Plant Scale',       assumption: 'Group manufacturing design maximum: 55.00 Mta',    basis: 'Executive Pitch Deck' },
  { id: 'ea2', category: 'Losses',            assumption: '27.53 Mta gap identified in Master Loss Tree', basis: 'Technical Appendix' },
  { id: 'ea3', category: 'Packing',           assumption: 'Packing bottleneck is the primary target for SSR monitoring', basis: 'Executive Pitch Deck' },
  { id: 'ea4', category: 'Dispatch',          assumption: 'CMMS integrations drive autonomous ticketing', basis: 'Business Case' },
];

// ─── Illustrative Benchmark Table ─────────────────────────────────────────────

export const benchmarks = {
  overallConversionEfficiency: { min: 88, max: 96, unit: '%', note: 'Overall clinker-to-dispatch efficiency' },
  separatorEfficiency:          { min: 85, max: 95, unit: '%', note: 'Tromp curve separator efficiency' },
  millSpecificEnergy:           { min: 28, max: 45, unit: 'kWh/t', note: 'Ball mill specific energy consumption' },
  supplySufficiencyRatio:       { min: 95, max: 100, unit: '%', note: 'SSR target for packing stages' },
  truckTurnaround:              { min: 25, max: 35, unit: 'min', note: 'Target truck dispatch turnaround' },
};

// ─── Theoretical Capacity Chain ───────────────────────────────────────────────

export const THEORETICAL_CAPACITY = 55.00; // Mta

export const capacityChain = [
  { stage: 'Design Capacity',   value: 55.00, lossIndex: '—',   loss: 0 },
  { stage: 'Production Planning', value: 40.40, lossIndex: 'q10', loss: 14.60 },
  { stage: 'Runtime Losses',    value: 34.60, lossIndex: 'q1',  loss: 5.80 },
  { stage: 'Rate Losses',       value: 31.20, lossIndex: 'q6',  loss: 3.40 },
  { stage: 'Packing Bottlenecks', value: 29.75, lossIndex: 'q11a', loss: 1.45 },
  { stage: 'Dispatch Delays',   value: 28.55, lossIndex: 'q12', loss: 1.20 },
  { stage: 'Additive Shortages', value: 27.90, lossIndex: 'q5',  loss: 0.65 },
  { stage: 'Feed Constraints',  value: 27.47, lossIndex: 'q4',  loss: 0.43 },
  { stage: 'Actual Dispatched', value: 27.47, lossIndex: '—',   loss: 0 },
];

export const ACTUAL_DISPATCHED = 27.47;
export const TOTAL_LOSS = 27.53;
export const OVERALL_EFFICIENCY = ((ACTUAL_DISPATCHED / THEORETICAL_CAPACITY) * 100).toFixed(1); // 49.9%
