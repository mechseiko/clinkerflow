/**
 * ILLUSTRATIVE DATA ONLY — For demonstration purposes
 * Loss tree based on typical cement conversion efficiency analysis
 */

import type { LossEntry, WaterfallDataPoint } from '../types';

export const lossData: LossEntry[] = [
  {
    stage: 'Packing Plant',
    stageId: 'packing',
    totalLoss: 320,
    percentage: 47.1,
    causes: [
      {
        id: 'p1',
        description: 'Packer Line 3 offline – bag feeder jam',
        loss: 185,
        owner: 'Mechanical Team',
        priority: 'Critical',
        actions: [
          'Dispatch mechanical technician immediately',
          'Inspect bag magazine and feeder throat',
          'Replace worn nozzle seal on Line 3',
          'Re-calibrate bag weight sensor after repair',
        ],
      },
      {
        id: 'p2',
        description: 'Compressor pressure fluctuation on Line 2',
        loss: 72,
        owner: 'Electrical Team',
        priority: 'High',
        actions: [
          'Check compressor air receiver pressure',
          'Inspect relief valve for leakage',
          'Replace air filter element',
        ],
      },
      {
        id: 'p3',
        description: 'Spout wear – high bag rejection rate (3.2%)',
        loss: 63,
        owner: 'Quality Control',
        priority: 'High',
        actions: [
          'Replace spout liner on Line 4',
          'Adjust bag clamp pressure',
          'Reduce line speed by 5% temporarily',
        ],
      },
    ],
  },
  {
    stage: 'Cement Mill',
    stageId: 'mill',
    totalLoss: 215,
    percentage: 31.6,
    causes: [
      {
        id: 'm1',
        description: 'Separator efficiency reduced – product recirculation',
        loss: 130,
        owner: 'Process Engineer',
        priority: 'Critical',
        actions: [
          'Adjust separator rotor speed to 1,380 rpm',
          'Check separator blade clearance',
          'Inspect classifier vanes for wear',
        ],
      },
      {
        id: 'm2',
        description: 'Mill liner wear – reduced grinding efficiency',
        loss: 55,
        owner: 'Maintenance Manager',
        priority: 'High',
        actions: [
          'Schedule liner inspection at next planned stop',
          'Order replacement liner segments',
          'Monitor wear rate daily',
        ],
      },
      {
        id: 'm3',
        description: 'Bearing vibration on separator drive',
        loss: 30,
        owner: 'Mechanical Team',
        priority: 'Medium',
        actions: [
          'Grease bearing at next opportunity',
          'Monitor vibration trend hourly',
          'Prepare bearing change-out kit',
        ],
      },
    ],
  },
  {
    stage: 'Silo System',
    stageId: 'silo',
    totalLoss: 75,
    percentage: 11.0,
    causes: [
      {
        id: 's1',
        description: 'Silo #3 aeration fault – restricted flow',
        loss: 75,
        owner: 'Instrument Engineer',
        priority: 'High',
        actions: [
          'Replace aeration pad on Silo #3 cell 4',
          'Check solenoid valve operation',
          'Verify compressed air supply pressure',
        ],
      },
    ],
  },
  {
    stage: 'Dispatch',
    stageId: 'dispatch',
    totalLoss: 52,
    percentage: 7.6,
    causes: [
      {
        id: 'd1',
        description: 'Truck turnaround time elevated (42 min vs 30 min target)',
        loss: 52,
        owner: 'Logistics Coordinator',
        priority: 'Medium',
        actions: [
          'Review truck queue management process',
          'Calibrate Bay 2 weighbridge',
          'Coordinate with fleet scheduler for pre-positioning',
        ],
      },
    ],
  },
  {
    stage: 'Clinker Store',
    stageId: 'clinker',
    totalLoss: 18,
    percentage: 2.6,
    causes: [
      {
        id: 'c1',
        description: 'Reclaimer chain tension elevated – minor throughput impact',
        loss: 18,
        owner: 'Mechanical Team',
        priority: 'Low',
        actions: [
          'Adjust chain tension at next maintenance window',
          'Lubricate chain links',
        ],
      },
    ],
  },
];

export const totalLoss = lossData.reduce((sum, l) => sum + l.totalLoss, 0);

export const waterfallData: WaterfallDataPoint[] = (() => {
  const capacity = 5_500;
  let cumulative = capacity;
  const points: WaterfallDataPoint[] = [];

  points.push({
    name: 'Design Capacity',
    start: 0,
    value: capacity,
    end: capacity,
    isTotal: true,
    fill: '#0EA5E9',
  });

  for (const loss of lossData) {
    const start = cumulative - loss.totalLoss;
    points.push({
      name: loss.stage,
      start,
      value: -loss.totalLoss,
      end: start,
      fill: loss.totalLoss > 200 ? '#EF4444' : loss.totalLoss > 100 ? '#F59E0B' : '#64748b',
    });
    cumulative = start;
  }

  points.push({
    name: 'Actual Output',
    start: 0,
    value: cumulative,
    end: cumulative,
    isTotal: true,
    fill: '#10B981',
  });

  return points;
})();
