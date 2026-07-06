/**
 * ILLUSTRATIVE DATA ONLY — For demonstration purposes
 */

import type { Recommendation } from '../types';

export const recommendations: Recommendation[] = [
  {
    id: 'r1',
    stageId: 'packing',
    stageName: 'Packing Plant',
    priority: 'Critical',
    title: 'Restore Packer Line 3 — Highest Impact',
    bottleneck: 'Line 3 bag feeder jam causing 185 TPD loss — largest single bottleneck today',
    causes: [
      'Bag feeder magazine jam at throat entry',
      'Worn gripper arm allowing misalignment',
      'Accumulated fines blocking discharge chute',
    ],
    actions: [
      'Dispatch mechanical team immediately to Line 3',
      'Clear bag magazine throat and inspect gripper arms',
      'Replace nozzle seal and re-calibrate weight sensor',
      'Run trial packs to confirm restoration before full load',
    ],
    estimatedGain: 185,
    estimatedCostSaving: '₦2.4M/day',
    confidence: 94,
  },
  {
    id: 'r2',
    stageId: 'mill',
    stageName: 'Cement Mill',
    priority: 'Critical',
    title: 'Optimize Separator to Recover 130 TPD',
    bottleneck: 'Separator efficiency at 81% — 130 TPD recirculating product adding unnecessary mill load',
    causes: [
      'Rotor speed running at 1,240 rpm vs target 1,380 rpm',
      'Classifier vane erosion reducing separation sharpness',
      'Higher feed moisture reducing separator airflow',
    ],
    actions: [
      'Increase separator rotor speed to 1,380 rpm via VFD',
      'Check coupling for speed slip',
      'Inspect vane geometry — replace if wear >30%',
      'Monitor product residue hourly until stabilised',
    ],
    estimatedGain: 130,
    estimatedCostSaving: '₦1.69M/day',
    confidence: 88,
  },
  {
    id: 'r3',
    stageId: 'packing',
    stageName: 'Packing Plant',
    priority: 'High',
    title: 'Fix Compressor Pressure Fluctuation — Line 2',
    bottleneck: 'Unstable compressed air causing bag seal failures and 72 TPD output loss on Line 2',
    causes: [
      'Air receiver pressure dropping during peak demand',
      'Relief valve possibly leaking',
      'Filter element overdue for replacement',
    ],
    actions: [
      'Replace compressed air filter element immediately',
      'Test and reseat relief valve',
      'Check compressor inlet valve for partial closure',
    ],
    estimatedGain: 72,
    estimatedCostSaving: '₦936K/day',
    confidence: 82,
  },
  {
    id: 'r4',
    stageId: 'silo',
    stageName: 'Cement Silo',
    priority: 'High',
    title: 'Restore Silo #3 Aeration — Prevent Cement Rat-Holing',
    bottleneck: 'Silo #3 aeration fault restricting mass flow; risk of cement arching if not resolved',
    causes: [
      'Aeration pad cell rupture in Silo #3 sector 4',
      'Solenoid valve not actuating on 2-hour cycle',
      'Compressed air header pressure at lower limit',
    ],
    actions: [
      'Replace aeration pad on Silo #3 Cell 4',
      'Test solenoid valve actuation',
      'Boost compressed air supply to header',
    ],
    estimatedGain: 75,
    estimatedCostSaving: '₦975K/day',
    confidence: 91,
  },
  {
    id: 'r5',
    stageId: 'dispatch',
    stageName: 'Dispatch & Logistics',
    priority: 'Medium',
    title: 'Reduce Truck Turnaround Time to Target 30 min',
    bottleneck: 'Average 42 min turnaround vs 30 min target — limiting dispatch to 74 trucks vs 100 capacity',
    causes: [
      'Weighbridge calibration error slowing clearance',
      'Truck queue management sub-optimal',
      'Loading bay 2 scale offline reducing throughput',
    ],
    actions: [
      'Calibrate Bay 2 weighbridge scale today',
      'Implement pre-positioning protocol for next 20 trucks',
      'Deploy queue management officer at gate',
    ],
    estimatedGain: 52,
    estimatedCostSaving: '₦676K/day',
    confidence: 75,
  },
  {
    id: 'r6',
    stageId: 'packing',
    stageName: 'Packing Plant',
    priority: 'Medium',
    title: 'Reduce Bag Rejection Rate on Line 4',
    bottleneck: '3.2% rejection rate on Line 4 due to spout wear — reducing net output by 63 TPD',
    causes: [
      'Spout liner thickness below minimum (8mm specification)',
      'Bag clamp pressure inconsistent',
    ],
    actions: [
      'Replace spout liner on Line 4 at next opportunity',
      'Adjust bag clamp pressure to 6.5 bar',
      'Reduce line speed 5% until liner replaced',
    ],
    estimatedGain: 63,
    estimatedCostSaving: '₦819K/day',
    confidence: 79,
  },
];

export const totalPotentialGain = recommendations.reduce((s, r) => s + r.estimatedGain, 0);
