/**
 * ILLUSTRATIVE DATA ONLY — For demonstration purposes
 */

import type { RootCauseNode } from '../types';

export const rootCauseData: RootCauseNode[] = [
  {
    stageId: 'packing',
    stageName: 'Packing Plant',
    failureCategories: [
      {
        id: 'pf1',
        name: 'Bag Feeding System',
        frequency: 'High',
        failures: [
          {
            id: 'pf1a',
            reason: 'Bag feeder magazine jam',
            instrumentation: 'Jam detection sensor (PIS-4401)',
            recommendedInspection: 'Visual check of feeder throat; clear debris; inspect gripper arms for wear',
            estimatedDowntime: '2–4 hrs',
          },
          {
            id: 'pf1b',
            reason: 'Bag misalignment at spout',
            instrumentation: 'Bag presence sensor (BPS-4402)',
            recommendedInspection: 'Calibrate bag guide rails; check conveyor belt tension',
            estimatedDowntime: '30 min',
          },
        ],
      },
      {
        id: 'pf2',
        name: 'Compressed Air System',
        frequency: 'Medium',
        failures: [
          {
            id: 'pf2a',
            reason: 'Compressor pressure fluctuation',
            instrumentation: 'Pressure transmitter (PT-4410)',
            recommendedInspection: 'Inspect air receiver; check relief valve; replace filter element',
            estimatedDowntime: '1–2 hrs',
          },
          {
            id: 'pf2b',
            reason: 'Solenoid valve failure on packer nozzle',
            instrumentation: 'Valve position indicator (ZT-4412)',
            recommendedInspection: 'Test solenoid coil; replace valve body if sticky',
            estimatedDowntime: '1 hr',
          },
        ],
      },
      {
        id: 'pf3',
        name: 'Weighing & Discharge',
        frequency: 'Medium',
        failures: [
          {
            id: 'pf3a',
            reason: 'Spout liner wear causing product overflow',
            instrumentation: 'Load cell (WIT-4420)',
            recommendedInspection: 'Measure spout liner thickness; replace if below 8mm',
            estimatedDowntime: '3 hrs (during stop)',
          },
        ],
      },
    ],
  },
  {
    stageId: 'mill',
    stageName: 'Cement Mill',
    failureCategories: [
      {
        id: 'mf1',
        name: 'Separator Performance',
        frequency: 'High',
        failures: [
          {
            id: 'mf1a',
            reason: 'Rotor speed below setpoint',
            instrumentation: 'Speed transmitter (ST-2201)',
            recommendedInspection: 'Check VFD output frequency; inspect coupling for slip',
            estimatedDowntime: '2 hrs',
          },
          {
            id: 'mf1b',
            reason: 'Classifier vane erosion',
            instrumentation: 'Product fineness analyser (QI-2205)',
            recommendedInspection: 'Internal inspection of vane angle; replace worn vanes',
            estimatedDowntime: '8 hrs (planned stop)',
          },
        ],
      },
      {
        id: 'mf2',
        name: 'Grinding Media & Liners',
        frequency: 'Medium',
        failures: [
          {
            id: 'mf2a',
            reason: 'Liner plate wear beyond threshold',
            instrumentation: 'Mill load power meter (PI-2210)',
            recommendedInspection: 'Measure liner thickness during stop; order replacement plates',
            estimatedDowntime: '12 hrs (major stop)',
          },
          {
            id: 'mf2b',
            reason: 'Ball charge below optimum level',
            instrumentation: 'Mill sound level (AI-2212)',
            recommendedInspection: 'Calculate ball charge by weighing; top up with 50mm balls',
            estimatedDowntime: '4 hrs',
          },
        ],
      },
    ],
  },
  {
    stageId: 'silo',
    stageName: 'Cement Silo',
    failureCategories: [
      {
        id: 'sf1',
        name: 'Aeration System',
        frequency: 'Medium',
        failures: [
          {
            id: 'sf1a',
            reason: 'Aeration pad blockage / rupture',
            instrumentation: 'Differential pressure (DPT-3301)',
            recommendedInspection: 'Replace aeration pad cell; check compressed air header pressure',
            estimatedDowntime: '4 hrs',
          },
        ],
      },
    ],
  },
  {
    stageId: 'clinker',
    stageName: 'Clinker Store',
    failureCategories: [
      {
        id: 'cf1',
        name: 'Reclaimer System',
        frequency: 'Low',
        failures: [
          {
            id: 'cf1a',
            reason: 'Chain tension elevation causing vibration',
            instrumentation: 'Vibration monitor (VT-1101)',
            recommendedInspection: 'Measure chain elongation; adjust tensioner; lubricate with EP grease',
            estimatedDowntime: '2 hrs',
          },
        ],
      },
    ],
  },
  {
    stageId: 'dispatch',
    stageName: 'Dispatch & Logistics',
    failureCategories: [
      {
        id: 'df1',
        name: 'Weighbridge & Loading',
        frequency: 'Low',
        failures: [
          {
            id: 'df1a',
            reason: 'Weighbridge scale out of calibration',
            instrumentation: 'Weighbridge display (WI-5501)',
            recommendedInspection: 'Certified calibration using test weights; zero adjustment',
            estimatedDowntime: '1 hr',
          },
        ],
      },
    ],
  },
];
