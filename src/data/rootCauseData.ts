/**
 * CLINKERFLOW — Root Cause Explorer Data
 * ═══════════════════════════════════════════════════════════════════════════
 * All values are ILLUSTRATIVE engineering examples developed for the
 * Dangote Cement University Engineering Challenge 2026.
 * They do NOT represent actual Dangote Cement operational data.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { RootCauseNode } from '../types';

export const rootCauseData: RootCauseNode[] = [
  {
    stageId: 'kiln',
    stageName: 'Kiln',
    lossIndex: '—',
    lossMechanism: 'Upstream kiln production fluctuations affecting downstream feed consistency.',
    failureCategories: [
      {
        id: 'k1',
        name: 'Flame Stability & Heat Input',
        frequency: 'Low',
        failures: [
          {
            id: 'k1a',
            reason: 'Pulverised coal dosing fluctuation',
            mechanicalExplanation: 'Worn coal dosing rotor seal or transport line blockage leading to irregular coal flow to the main burner.',
            processExplanation: 'Unstable heat input inside the burning zone, altering clinker mineralogy and causing free lime fluctuations.',
            instrumentation: 'Coal weighfeeder (WIT-1002), Kiln hood pyrometer (TE-1010)',
            howToVerify: 'Cross-check pyrometer temperature fluctuations against VFD speed of coal feeder rotor.',
            typicalCorrectiveAction: 'Inspect and clean coal feeder rotor; replace worn seals; verify transport air pressure.',
            estimatedDowntime: '4 hrs',
            literatureRef: 'VDZ Rotary Kiln Operation Guidelines (2018), p. 112',
          },
        ],
      },
    ],
  },
  {
    stageId: 'cooler',
    stageName: 'Clinker Cooler',
    lossIndex: 'q1',
    lossMechanism: 'Thermal cooling inefficiency reducing grate transport speed or causing high clinker outlet temperature.',
    failureCategories: [
      {
        id: 'co1',
        name: 'Grate Cooling Air Distribution',
        frequency: 'Medium',
        failures: [
          {
            id: 'co1a',
            reason: 'Clinker breakthrough on grate ("red rivers")',
            mechanicalExplanation: 'Damaged or misaligned grate plates causing unequal clinker bed thickness.',
            processExplanation: 'Cooling air takes the path of least resistance through thin bed zones, leaving thick zones uncooled.',
            instrumentation: 'Under-grate pressure transmitters (PT-1101 to PT-1108), Cooler outlet pyrometer (TE-1120)',
            howToVerify: 'Observe sudden drop in pressure at specific grate compartment coupled with temperature spike at outlet.',
            typicalCorrectiveAction: 'Adjust cooling fan speed; align grate plate seals; schedule replacement of worn plates.',
            estimatedDowntime: '8 hrs (planned stop)',
            literatureRef: 'FLSmidth Grate Cooler Maintenance Handbook, Sec. 4.2',
          },
        ],
      },
    ],
  },
  {
    stageId: 'clinker-silo',
    stageName: 'Clinker Silo',
    lossIndex: 'q2',
    lossMechanism: 'Mechanical reclaimer inefficiency or inventory flow restriction.',
    failureCategories: [
      {
        id: 'cs1',
        name: 'Reclaimer Mechanical Drive',
        frequency: 'Medium',
        failures: [
          {
            id: 'cs1a',
            reason: 'Reclaimer chain tension elevation',
            mechanicalExplanation: 'Wear on chain rollers and pin bushings leading to pitch elongation and sprocket mismatch.',
            processExplanation: 'Higher drive motor torque required, reducing active reclaim rate and limiting silo discharge.',
            instrumentation: 'Chain tension transmitter (ZT-1202), Drive motor current meter (II-1202)',
            howToVerify: 'Verify tension reading exceeds 1.5 mm/m limit under normal load conditions.',
            typicalCorrectiveAction: 'Perform chain tensioner adjustments; inspect link pin wear; lubricate with high-pressure grease.',
            estimatedDowntime: '2 hrs',
            literatureRef: 'Aumund Reclaimer Operator Guide, Ch. 7',
          },
        ],
      },
    ],
  },
  {
    stageId: 'conveyor',
    stageName: 'Conveyor',
    lossIndex: 'q3',
    lossMechanism: 'Material spillage or belt capacity limitations.',
    failureCategories: [
      {
        id: 'cv1',
        name: 'Belt Tracking & Skirting',
        frequency: 'Medium',
        failures: [
          {
            id: 'cv1a',
            reason: 'Worn skirting boards at transfer points',
            mechanicalExplanation: 'Physical wear on polyurethane skirting rubber due to continuous abrasive clinker friction.',
            processExplanation: 'Material escapes from the transfer chute sides, causing product loss and dust accumulation.',
            instrumentation: 'Visual inspections, Transfer point dust monitor (AT-1305)',
            howToVerify: 'Inspect side spillage at Transfer Chute 1; check for ambient dust reading elevation.',
            typicalCorrectiveAction: 'Adjust or replace worn skirting rubbers; verify chute alignment.',
            estimatedDowntime: '1 hr',
            literatureRef: 'Martin Engineering Foundations for Clean Conveyors, Vol. 4',
          },
        ],
      },
    ],
  },
  {
    stageId: 'feeders',
    stageName: 'Weight Feeders',
    lossIndex: 'q4',
    lossMechanism: 'Proportioning calibration drift causing feed rate deviations.',
    failureCategories: [
      {
        id: 'wf1',
        name: 'Load Cell Calibration',
        frequency: 'Medium',
        failures: [
          {
            id: 'wf1a',
            reason: 'Clinker feeder load cell zero drift',
            mechanicalExplanation: 'Accumulation of clinker dust under the scale structure, restricting load cell deflection.',
            processExplanation: 'Feeder controller measures incorrect material weight, causing feed rate proportioning error.',
            instrumentation: 'Belt scale indicator (WIC-1401), Speed encoder (SE-1401)',
            howToVerify: 'Perform a tared zero-calibration run; check for weight deviation vs reference load.',
            typicalCorrectiveAction: 'Clean scale pit; clear compacted dust; re-zero weight feeder electronics.',
            estimatedDowntime: '1 hr',
            literatureRef: 'Schenck Process Weighfeeder Calibration Manual, Sec. 5',
          },
        ],
      },
    ],
  },
  {
    stageId: 'mill',
    stageName: 'Cement Mill',
    lossIndex: 'q5',
    lossMechanism: 'Grinding media inefficiency or thermodynamic limits reducing comminution.',
    failureCategories: [
      {
        id: 'm1',
        name: 'Grinding Media & Liners',
        frequency: 'High',
        failures: [
          {
            id: 'm1a',
            reason: 'Liner plate wear beyond threshold',
            mechanicalExplanation: 'Worn liner profiles reducing lift angle of grinding balls, leading to rolling action rather than cascading impact.',
            processExplanation: 'Grinding efficiency drops, reducing throughput capacity and increasing specific energy consumption.',
            instrumentation: 'Mill load power meter (PI-2210), Sound level transmitter (AI-2212)',
            howToVerify: 'Analyze mill sound profile — high frequency shift indicates direct ball-on-liner impact (low lifters).',
            typicalCorrectiveAction: 'Schedule liner replacement; inspect lifter profile geometry.',
            estimatedDowntime: '12 hrs (planned stop)',
            literatureRef: 'FLSmidth UMS Grinding Handbook, Sec. 3.1',
          },
          {
            id: 'm1b',
            reason: 'Ball charge below optimum level',
            mechanicalExplanation: 'Media wear over time reduces the mass of the grinding charge in Chamber 1 & 2.',
            processExplanation: 'Reduced surface area for grinding, producing coarser product and overloading the recirculating loop.',
            instrumentation: 'Mill power draw (JI-2210), Mill sound level (AI-2212)',
            howToVerify: 'Verify power draw is lower than nominal design limits (e.g. <3,900 kW under full load).',
            typicalCorrectiveAction: 'Top up mill charge with 50 mm steel grinding balls; check wear rate trends.',
            estimatedDowntime: '4 hrs',
            literatureRef: 'Duda: Cement Data Book Vol.1, p. 248',
          },
        ],
      },
    ],
  },
  {
    stageId: 'classifier',
    stageName: 'Classifier',
    lossIndex: 'q6',
    lossMechanism: 'Poor separation efficiency leading to fine recirculating loop product loading.',
    failureCategories: [
      {
        id: 'cl1',
        name: 'Rotor Speed & Mechanical Wear',
        frequency: 'High',
        failures: [
          {
            id: 'cl1a',
            reason: 'Rotor speed below setpoint',
            mechanicalExplanation: 'Drive belt slippage or VFD current limit restricts rotor cage rpm under high load.',
            processExplanation: 'Centrifugal sorting force decreases, allowing fine cement particles to bypass into coarse rejects.',
            instrumentation: 'Speed transmitter (ST-2201), Classifier current meter (JI-2201)',
            howToVerify: 'Cross-check PLC speed setpoint against physical tachometer measurement at the shaft coupling.',
            typicalCorrectiveAction: 'Tighten rotor drive belts; check VFD current limits; inspect coupling alignment.',
            estimatedDowntime: '2 hrs',
            literatureRef: 'VDZ Separator Operations Review (2020), p. 89',
          },
        ],
      },
    ],
  },
  {
    stageId: 'bag-filter',
    stageName: 'Bag Filter',
    lossIndex: 'q7',
    lossMechanism: 'Dust collection leakage or filtration bypass.',
    failureCategories: [
      {
        id: 'bf1',
        name: 'Fabric Filter Integrity',
        frequency: 'Low',
        failures: [
          {
            id: 'bf1a',
            reason: 'Filter bag wear or broken cage',
            mechanicalExplanation: 'Abrasive particle wear or thermal spike causing holes in fabric filter bags.',
            processExplanation: 'Cement dust passes directly through to the outlet stack, increasing emissions.',
            instrumentation: 'Differential pressure transmitter (DPT-2302), Opacity analyser (AE-2301)',
            howToVerify: 'Check for sudden drop in filter differential pressure and simultaneous spike in stack opacity.',
            typicalCorrectiveAction: 'Locate and replace broken filter bags; check cage alignment.',
            estimatedDowntime: '4 hrs',
            literatureRef: 'EPA Fabric Filter Clean Air Act Guidelines, p. 15',
          },
        ],
      },
    ],
  },
  {
    stageId: 'bucket-elev',
    stageName: 'Bucket Elevator',
    lossIndex: 'q8',
    lossMechanism: 'Vertical transport spillback or speed mismatch.',
    failureCategories: [
      {
        id: 'be1',
        name: 'Bucket & Belt Condition',
        frequency: 'Low',
        failures: [
          {
            id: 'be1a',
            reason: 'Bucket wear and boot accumulation',
            mechanicalExplanation: 'Buckets deformed by impact or wear, leading to material spillback during discharge.',
            processExplanation: 'Cement spills into elevator boot, overloading the drive motor and risking casing jam.',
            instrumentation: 'Motor current monitor (II-2402), Boot level detector (LSH-2403)',
            howToVerify: 'Observe elevated motor current coupled with high boot level alarm.',
            typicalCorrectiveAction: 'Clear elevator boot; inspect bucket profiles; replace worn bucket sets.',
            estimatedDowntime: '3 hrs',
            literatureRef: 'Beumer Vertical Transport System Manual, Sec. 6',
          },
        ],
      },
    ],
  },
  {
    stageId: 'cement-silo',
    stageName: 'Cement Silo',
    lossIndex: 'q9',
    lossMechanism: 'Aeration pad faults restricting mass flow extraction.',
    failureCategories: [
      {
        id: 'si1',
        name: 'Silo Fluidisation',
        frequency: 'Medium',
        failures: [
          {
            id: 'si1a',
            reason: 'Aeration pad Cell 4 rupture',
            mechanicalExplanation: 'Wear on fabric membrane of fluidising pads, allowing air to escape without fluidising cement.',
            processExplanation: 'Compacted cement blocks extraction gate, creating funnel flow and reducing extraction rate.',
            instrumentation: 'Silo extraction weigh scale (WIT-3130), Aeration pressure (PT-3110)',
            howToVerify: 'Check silo extraction flow rate drop coupled with drop in header pressure at Cell 4.',
            typicalCorrectiveAction: 'Isolate discharge zone; replace worn fluidising membrane pads.',
            estimatedDowntime: '4 hrs',
            literatureRef: 'Claudius Peters Aeration Technology Guide, Ch. 3',
          },
        ],
      },
    ],
  },
  {
    stageId: 'packaging',
    stageName: 'Packaging',
    lossIndex: 'q10',
    lossMechanism: 'Packer line downtime or bag rejection rate anomalies.',
    failureCategories: [
      {
        id: 'pa1',
        name: 'Bag Feed & Sealing Mechanicals',
        frequency: 'High',
        failures: [
          {
            id: 'pa1a',
            reason: 'Bag feeder magazine jam',
            mechanicalExplanation: 'Accumulation of paper dust in guide rails, causing gripper arms to drop bags.',
            processExplanation: 'Packer nozzle runs empty, halting packer line operation and losing TPD capacity.',
            instrumentation: 'Jam detection sensor (ZS-4420), Line speed encoder (SE-4430)',
            howToVerify: 'Inspect guide rails visually; check for magazine stuck alarm on packer panel.',
            typicalCorrectiveAction: 'Clean magazine guide rails; replace worn rubber gripper seals; check solenoid valve.',
            estimatedDowntime: '2 hrs',
            literatureRef: 'Haver & Boecker ROTO-PACKER Troubleshooting Manual, p. 45',
          },
        ],
      },
    ],
  },
  {
    stageId: 'weighbridge',
    stageName: 'Weighbridge',
    lossIndex: 'q11',
    lossMechanism: 'Measurement calibration shift causing systematic discrepancies.',
    failureCategories: [
      {
        id: 'wb1',
        name: 'Scale Calibration Integrity',
        frequency: 'Low',
        failures: [
          {
            id: 'wb1a',
            reason: 'Weighbridge scale out of calibration',
            mechanicalExplanation: 'Dust build-up under the weighbridge scale deck platform restricting normal movement.',
            processExplanation: 'Over or under-recording of truck payload, violating trade guidelines and accounting metrics.',
            instrumentation: 'Weighbridge indicator (WI-5101), Pit zero tracker',
            howToVerify: 'Verify scale response against a reference truck loaded at adjacent calibrated bay.',
            typicalCorrectiveAction: 'Clean weighbridge pit; execute zero and span checks with certified test weights.',
            estimatedDowntime: '1 hr',
            literatureRef: 'OIML R 76 Weighbridge Verification Guide, Sec. 2',
          },
        ],
      },
    ],
  },
  {
    stageId: 'dispatch',
    stageName: 'Dispatch',
    lossIndex: 'q12',
    lossMechanism: 'Logistical loading delay or documentation queue bottleneck.',
    failureCategories: [
      {
        id: 'dp1',
        name: 'Bay Loading Speed',
        frequency: 'Medium',
        failures: [
          {
            id: 'dp1a',
            reason: 'Loading turnaround delay',
            mechanicalExplanation: 'Slow response or VFD speed mismatch on loading bay conveyor belt.',
            processExplanation: 'Increases truck load time, leading to queue build-up at plant entrance.',
            instrumentation: 'Loading conveyor speed VFD (ST-5201), RFID gate reader',
            howToVerify: 'Cross-check RFID transit times against loading bay conveyor run hours.',
            typicalCorrectiveAction: 'Adjust conveyor speed setpoints; optimize ERP gate transit flow.',
            estimatedDowntime: '1 hr',
            literatureRef: 'Dangote Cement Logistics Optimization Guide, Sec. 5.1',
          },
        ],
      },
    ],
  },
  {
    stageId: 'logistics',
    stageName: 'Logistics',
    lossIndex: 'q13',
    lossMechanism: 'Fleet scheduling inefficiencies causing empty bay idle intervals.',
    failureCategories: [
      {
        id: 'lg1',
        name: 'Queue & Pre-positioning Control',
        frequency: 'Medium',
        failures: [
          {
            id: 'lg1a',
            reason: 'Truck pre-positioning failure',
            mechanicalExplanation: 'No physical communication link or queue board active at external parking zone.',
            processExplanation: 'Loading bays sit empty waiting for the next truck to transit the gate.',
            instrumentation: 'ANPR cameras, gate database status',
            howToVerify: 'Check bay occupancy sensors showing "empty" while plant gate queue is high.',
            typicalCorrectiveAction: 'Activate pre-positioning protocol; dispatch queue director officer.',
            estimatedDowntime: '30 min',
            literatureRef: 'McKinsey Cement Logistics Optimization Study (2019), p. 74',
          },
        ],
      },
    ],
  },
];
