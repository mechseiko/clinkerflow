/**
 * CLINKERFLOW — Engineering Decision Support Recommendations
 * ═══════════════════════════════════════════════════════════════════════════
 * All values are ILLUSTRATIVE engineering examples developed for the
 * Dangote Cement University Engineering Challenge 2026.
 * They do NOT represent actual Dangote Cement operational data.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { Recommendation } from '../types';

export const recommendations: Recommendation[] = [
  {
    id: 'r1',
    stageId: 'packaging',
    stageName: 'Packaging',
    lossIndex: 'q10',
    priority: 'Critical',
    horizon: 'Immediate',
    title: 'Resolve Packer Line 3 Bag Feeder Jam',
    lossMechanism: 'Packer Line 3 offline due to mechanical jam in the bag feeder magazine throat, resulting in direct loss of 185 TPD packing capacity.',
    causes: [
      'Accumulated paper dust and debris in the magazine throat guide rails',
      'Misalignment of mechanical gripper arms during pneumatic cycle',
      'Worn rubber suction cup seals reducing bag pick success rate',
    ],
    actions: [
      'Isolate pneumatic supply to Packer Line 3 and discharge chute mechanical assembly',
      'Visually inspect and clear paper debris from the bag magazine feeding throat',
      'Replace worn suction cups on the pick-and-place assembly',
      'Verify pneumatic regulator pressure is stable at 6.0 bar before re-energising',
      'Perform manual single-cycle test of the gripper mechanics before full run',
    ],
    department: 'Mechanical Maintenance',
    expectedBenefit: '+185 TPD packing capacity recovery',
    operationalImpact: 'Restores Line 3 to design feed rate of 30 tonnes per hour (t/h), clearing back-pressure in cement silos and reducing queue delays.',
    estimatedGain: 185,
    priorityRationale: 'Line 3 shutdown represents the largest individual capacity bottleneck on this shift, accounting for 57.8% of the total packaging stage loss.',
  },
  {
    id: 'r2',
    stageId: 'classifier',
    stageName: 'Classifier',
    lossIndex: 'q6',
    priority: 'Critical',
    horizon: 'Immediate',
    title: 'Increase Separator Rotor Speed Setpoint',
    lossMechanism: 'Classifier efficiency at 88.1% due to rotor operating at 1,240 rpm vs design 1,380 rpm setpoint. This causes fine product to return to the ball mill, over-loading the grinding circuit and reducing throughput.',
    causes: [
      'Intermittent VFD frequency ceiling limitation under thermal load',
      'Drive belt slip or speed sensor calibration drift',
    ],
    actions: [
      'Access separator control panel and check for active VFD thermal alarms',
      'Step-increase the rotor speed setpoint progressively by 20 rpm increments to 1,380 rpm',
      'Observe separator vibration sensors (VT-2201) to verify stability at higher rpm',
      'Perform grab sample of separator coarse rejects to verify reduction of fine product recirculation',
    ],
    department: 'Process Operations',
    expectedBenefit: 'Increase classifier Tromp curve efficiency to >92%',
    operationalImpact: 'Reduces specific mill circulating load, shifting energy towards new feed comminution, yielding an estimated +100 TPD grinding capacity.',
    estimatedGain: 100,
    priorityRationale: 'Low classification efficiency restricts the entire closed-circuit mill throughput, causing energy losses in the grinding media.',
  },
  {
    id: 'r3',
    stageId: 'packaging',
    stageName: 'Packaging',
    lossIndex: 'q10',
    priority: 'High',
    horizon: 'Immediate',
    title: 'Inspect Packer Line 2 Compressor & Receiver Pressure',
    lossMechanism: 'Fluctuations in compressed air header pressure (down to 5.8 bar vs 6.5 bar target) causing bag clamp slips and sealing failures on Packer Line 2, leading to 72 TPD throughput loss.',
    causes: [
      'Moisture / particulate loading in the instrument air filter element',
      'Leakage or micro-fissure at the air receiver tank drain valve',
      'Inlet valve actuator sticking on the compressor skid',
    ],
    actions: [
      'Inspect air receiver condensate drain valve for leakage or blockage',
      'Monitor pressure drop across instrument air filter; replace element if differential pressure exceeds 0.5 bar',
      'Clean and lubricate the compressor inlet slide valve actuator guide',
      'Measure pressure drop at Line 2 distributor block during packing cycle',
    ],
    department: 'Electrical & Instrumentation',
    expectedBenefit: '+72 TPD packing capacity recovery',
    operationalImpact: 'Stabilises pneumatic clamping pressure, reducing bag slippage during filling and restoring Line 2 to stable continuous operation.',
    estimatedGain: 72,
    priorityRationale: 'Pneumatic instability threatens active packer lines and will cause further line failures if header pressure drops below 5.5 bar.',
  },
  {
    id: 'r4',
    stageId: 'cement-silo',
    stageName: 'Cement Silo',
    lossIndex: 'q9',
    priority: 'High',
    horizon: 'Short-term',
    title: 'Replace Ruptured Aeration Pad on Silo #3 Cell 4',
    lossMechanism: 'Silo #3 extraction restricted to 50% capacity due to a ruptured fluidising aeration pad, creating dead zones and a funnel flow pattern inside the silo.',
    causes: [
      'Abrasive wear on the fabric membrane of the aeration pad',
      'Solenoid valve cycling failure leaving cell un-pressurised',
    ],
    actions: [
      'Isolate discharge gate beneath Silo #3 Cell 4',
      'De-pressurise aeration air header and lock out air supply',
      'Remove bottom access hatch and replace fabric membrane assembly for Cell 4',
      'Test solenoid valve cycle response from PLC control room',
      'Re-pressurise and verify extraction rate recovery',
    ],
    department: 'Maintenance & Instrumentation',
    expectedBenefit: 'Restore full mass flow extraction (up to 200 t/h) on Silo #3',
    operationalImpact: 'Resolves funnel-flow compaction risks and restores direct gravity feed to downstream packer lines, recovering 75 TPD.',
    estimatedGain: 75,
    priorityRationale: 'Funnel flow risks structural silo stress if material arching collapses under high level. Extraction capacity must be restored.',
  },
  {
    id: 'r5',
    stageId: 'dispatch',
    stageName: 'Dispatch',
    lossIndex: 'q12',
    priority: 'Medium',
    horizon: 'Immediate',
    title: 'Calibrate Loading Bay 2 Scale',
    lossMechanism: 'Bay 2 weighbridge calibration deviation causing slow turnaround times (42 min average vs 30 min target). Trucks are frequently re-weighed or hold queue.',
    causes: [
      'Load cell zero point drift due to material build-up in scale pit',
      'Sensor cable damage or junction box moisture ingress',
    ],
    actions: [
      'Isolate Bay 2 and clear structural pit of compacted cement dust and debris',
      'Inspect load cells and check junction box seals for moisture ingress',
      'Perform zero and span calibration check using 10 tonnes of certified test weights',
      'Cross-check load readings with Bay 1 scale to verify deviation is resolved',
    ],
    department: 'Quality & Instrumentation',
    expectedBenefit: 'Reduce truck turnaround time by 12 minutes',
    operationalImpact: 'Restores Bay 2 processing speed, clearing the plant entrance queue and recovering 52 TPD of dispatch throughput.',
    estimatedGain: 52,
    priorityRationale: 'Weighbridge delays cause back-pressure at the gates and prevent the packaging plant from releasing packed cement.',
  },
  {
    id: 'r6',
    stageId: 'packaging',
    stageName: 'Packaging',
    lossIndex: 'q10',
    priority: 'Medium',
    horizon: 'Short-term',
    title: 'Replace Spout Liner on Packer Line 4',
    lossMechanism: 'Packer Line 4 bag rejection rate at 3.2% due to physical wear on filling spout liner, causing product spill and sensor-based bag rejection (63 TPD loss).',
    causes: [
      'Spout liner thickness worn below 8 mm minimum specification',
      'Bag clamp mechanical pressure out of adjustment',
    ],
    actions: [
      'Reduce Line 4 packer cycle speed by 5% temporarily to prevent burst bags',
      'Check bag clamp pressure at spout 4 and adjust pneumatic regulator to 6.5 bar',
      'Prepare replacement spout liner kit in workshop',
      'Replace spout liner during the next scheduled shift maintenance window',
    ],
    department: 'Mechanical Maintenance',
    expectedBenefit: 'Reduce bag rejection rate to <0.5%',
    operationalImpact: 'Reduces material recirculation and manual cleanup labour, recovering 63 TPD of net shippable cement bags.',
    estimatedGain: 63,
    priorityRationale: 'High rejection rates represent wasted paper bags and increase dust loading on the packer bag filter system.',
  },
];

export const totalPotentialGain = recommendations.reduce((s, r) => s + r.estimatedGain, 0);
