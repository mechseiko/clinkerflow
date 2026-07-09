/**
 * CLINKERFLOW — Loss Tree Data (q1 – q13)
 * ═══════════════════════════════════════════════════════════════════════════
 * All values are ILLUSTRATIVE engineering examples developed for the
 * Dangote Cement University Engineering Challenge 2026.
 * They do NOT represent actual Dangote Cement operational data.
 *
 * Loss indices q1–q13 correspond to the Engineering Framework stages.
 * Capacity chain: 5,500 TPD → q1 → q2 → … → q13 → 4,565 TPD dispatched.
 * Total illustrative loss: 935 TPD across 13 stages.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { LossEntry, WaterfallDataPoint } from '../types';
import { capacityChain, THEORETICAL_CAPACITY } from './frameworkData';

export const lossData: LossEntry[] = [
  {
    stage: 'Clinker Cooler',
    stageId: 'cooler',
    lossIndex: 'q1',
    totalLoss: 55,
    percentage: 5.9,
    formula: 'q1 = Q_kln × (1 − η_cool)',
    variables: [
      { symbol: 'Q_kln',  description: 'Kiln clinker output',   unit: 'TPD',           illustrativeValue: '5,500' },
      { symbol: 'η_cool', description: 'Cooler efficiency',      unit: 'dimensionless', illustrativeValue: '0.990' },
      { symbol: 'q1',     description: 'Cooler stage loss',      unit: 'TPD',           illustrativeValue: '55' },
    ],
    engineeringInterpretation: 'Grate cooler thermal inefficiency — incomplete heat recovery from hot clinker reduces downstream energy efficiency and may cause clinker too hot for conveyor transport.',
    operationalExplanation: 'At the illustrative efficiency of 99.0%, approximately 55 TPD of throughput capacity is lost due to cooler limitations (temperature-constrained grate speed, dust bypass). Well-maintained coolers achieve 99.5%+ efficiency.',
    assumptions: ['Illustrative η_cool = 0.990 (slightly below benchmark)', 'Grate cooler configuration', 'No clinker crusher bottleneck in this scenario'],
    exampleCalculation: 'q1 = 5,500 × (1 − 0.990) = 55 TPD',
    causes: [
      { id: 'q1-c1', description: 'Clinker breakthrough on grate ("red rivers") reducing effective cooling area', loss: 30, owner: 'Mechanical Team', priority: 'Medium', actions: ['Inspect grate plate alignment', 'Check under-grate fan damper operation', 'Reduce kiln throughput temporarily if breakthrough persists'] },
      { id: 'q1-c2', description: 'Insufficient cooling air distribution — hot zones in cooler second compartment', loss: 25, owner: 'Process Engineer', priority: 'Low', actions: ['Balance air flow between compartments', 'Check damaged grate plates restricting air', 'Review air-on-clinker temperature profile'] },
    ],
  },
  {
    stage: 'Clinker Silo',
    stageId: 'clinker-silo',
    lossIndex: 'q2',
    totalLoss: 20,
    percentage: 2.1,
    formula: 'q2 = Q_in − Q_reclaim = ΔS / Δt',
    variables: [
      { symbol: 'Q_in',      description: 'Clinker fed to silo',     unit: 'TPD', illustrativeValue: '5,445' },
      { symbol: 'Q_reclaim', description: 'Clinker extracted',        unit: 'TPD', illustrativeValue: '5,425' },
      { symbol: 'ΔS/Δt',    description: 'Stock accumulation rate',  unit: 'TPD', illustrativeValue: '20' },
    ],
    engineeringInterpretation: 'Net inventory accumulation or reclaimer mechanical loss. Reclaimer chain elongation reduces extraction efficiency; dust formation during reclaim is an irretrievable material loss.',
    operationalExplanation: 'The 20 TPD illustrative loss represents a combination of reclaimer chain wear (reducing extraction by ~15 TPD) and dust emissions at the transfer point (~5 TPD). This loss is recoverable by chain adjustment and improved dust containment.',
    assumptions: ['Reclaimer chain elongation at 1.2 mm/m (near upper limit)', 'One reclaimer in operation', 'No clinker quality degradation modelled'],
    exampleCalculation: 'q2 = 5,445 − 5,425 = 20 TPD',
    causes: [
      { id: 'q2-c1', description: 'Reclaimer chain tension elevated — reducing extraction rate by ~15 TPD', loss: 15, owner: 'Mechanical Team', priority: 'Low', actions: ['Adjust chain tension at next maintenance window', 'Lubricate chain with EP grease', 'Check chain elongation — replace if >2.5 mm/m'] },
      { id: 'q2-c2', description: 'Dust suppression system at reduced capacity — product loss at transfer point', loss: 5, owner: 'Environment Team', priority: 'Low', actions: ['Inspect dust suppression nozzles', 'Check water supply pressure', 'Verify spray pattern coverage at transfer'] },
    ],
  },
  {
    stage: 'Conveyor',
    stageId: 'conveyor',
    lossIndex: 'q3',
    totalLoss: 15,
    percentage: 1.6,
    formula: 'q3 = Q_in × (1 − η_conv)',
    variables: [
      { symbol: 'Q_in',   description: 'Material entering conveyor', unit: 'TPD',           illustrativeValue: '5,425' },
      { symbol: 'η_conv', description: 'Conveyor efficiency',         unit: 'dimensionless', illustrativeValue: '0.9972' },
      { symbol: 'q3',     description: 'Conveyor transport loss',     unit: 'TPD',           illustrativeValue: '15' },
    ],
    engineeringInterpretation: 'Belt spillage at transfer points and mistracking events. Well-maintained conveyor systems with properly tensioned skirting boards achieve η_conv > 0.998.',
    operationalExplanation: 'At the illustrative efficiency of 99.72%, a 15 TPD loss results from material escaping at the two main transfer points between clinker silo and mill hopper.',
    assumptions: ['Two transfer points in conveyor system', 'Belt in serviceable condition', 'Skirting boards worn but functional'],
    exampleCalculation: 'q3 = 5,425 × (1 − 0.9972) = 15 TPD',
    causes: [
      { id: 'q3-c1', description: 'Worn skirting boards at main transfer point — material spillage', loss: 10, owner: 'Mechanical Team', priority: 'Low', actions: ['Replace skirting rubber at transfer point 1', 'Adjust belt tensioner', 'Install spillage collection plate below transfer'] },
      { id: 'q3-c2', description: 'Minor belt mistracking causing edge spillage', loss: 5, owner: 'Mechanical Team', priority: 'Low', actions: ['Adjust training idlers', 'Check belt joint alignment', 'Monitor tracking in next shift'] },
    ],
  },
  {
    stage: 'Weight Feeders',
    stageId: 'feeders',
    lossIndex: 'q4',
    totalLoss: 12,
    percentage: 1.3,
    formula: 'q4 = |Q_set − Q_actual| = Q_in × ε_feed',
    variables: [
      { symbol: 'Q_set',    description: 'Feeder set-point rate',      unit: 'TPD',           illustrativeValue: '5,410' },
      { symbol: 'Q_actual', description: 'Measured actual feed rate',   unit: 'TPD',           illustrativeValue: '5,398' },
      { symbol: 'ε_feed',   description: 'Proportioning error fraction', unit: 'dimensionless', illustrativeValue: '0.0022' },
    ],
    engineeringInterpretation: 'Small but consistent dosing errors accumulate over a shift to a measurable throughput shortfall. Off-spec cement requires re-blending, further reducing effective output.',
    operationalExplanation: 'A 0.22% dosing error across the combined clinker and additive feeders produces a 12 TPD shortfall. This is within acceptable limits but should trend toward ±0.1% with regular load cell calibration.',
    assumptions: ['Combined effect of clinker + additive feeder inaccuracies', 'Load cells due for re-zeroing', 'No off-spec cement requiring re-blending today'],
    exampleCalculation: 'q4 = 5,410 × 0.0022 = 12 TPD',
    causes: [
      { id: 'q4-c1', description: 'Clinker feeder load cell zero drift — 0.15% under-reading', loss: 8, owner: 'Instrument Engineer', priority: 'Low', actions: ['Re-zero load cell at next opportunity', 'Check for vibration sources near load cell', 'Verify calibration against reference weight'] },
      { id: 'q4-c2', description: 'Limestone feeder belt slip — intermittent under-feed', loss: 4, owner: 'Mechanical Team', priority: 'Low', actions: ['Check belt tension on limestone feeder', 'Clean drive pulley of material build-up', 'Inspect belt surface for wear'] },
    ],
  },
  {
    stage: 'Ball Mill',
    stageId: 'mill',
    lossIndex: 'q5',
    totalLoss: 215,
    percentage: 23.0,
    formula: 'q5 = Q_feed × (1 − η_mill) ; η_mill = P_useful / P_total',
    variables: [
      { symbol: 'Q_feed',   description: 'Mill feed rate',            unit: 'TPD',           illustrativeValue: '5,398' },
      { symbol: 'η_mill',   description: 'Mill grinding efficiency',  unit: 'dimensionless', illustrativeValue: '0.942' },
      { symbol: 'P_useful', description: 'Useful grinding power',      unit: 'kW',            illustrativeValue: '3,620' },
      { symbol: 'P_total',  description: 'Total installed power',      unit: 'kW',            illustrativeValue: '4,000' },
    ],
    engineeringInterpretation: 'Grinding efficiency below benchmark due to liner wear and sub-optimal ball charge level. A 5.8% efficiency gap produces 215 TPD of throughput loss — the second-largest individual loss in the chain.',
    operationalExplanation: 'With mill efficiency at 94.2% (vs 97.5% achievable with new liners and correct ball charge), the mill cannot sustain its design throughput. Liner replacement and ball charge top-up are the key corrective levers.',
    assumptions: ['OPC grinding; closed-circuit with air classifier', 'Ball charge at 28% vs design 30%', 'Liners at estimated 65% remaining thickness'],
    exampleCalculation: 'q5 = 5,398 × (1 − 0.942) = 313 TPD → allocated to q5 + q6; q5 portion = 215 TPD (illustrative)',
    causes: [
      { id: 'q5-c1', description: 'Liner plate wear reducing grinding effectiveness — efficiency reduction ~3%', loss: 130, owner: 'Maintenance Manager', priority: 'High', actions: ['Schedule liner inspection at next planned 12-hour stop', 'Order replacement liner segments — lead time 3 weeks', 'Monitor wear rate via mill sound level daily', 'Arrange liner thickness measurement during stop'] },
      { id: 'q5-c2', description: 'Ball charge below optimum level (28% vs target 30%)', loss: 55, owner: 'Process Engineer', priority: 'High', actions: ['Top up ball charge with 50 mm balls at next stop', 'Calculate required ball charge by weighing mill draw', 'Review ball addition schedule — weekly addition needed'] },
      { id: 'q5-c3', description: 'Elevated outlet temperature (118 °C) — cement coating on grinding media', loss: 30, owner: 'Process Engineer', priority: 'Medium', actions: ['Check mill ventilation fan damper position', 'Reduce feed rate by 3% to lower temperature', 'Inspect mill inlet water injection system', 'Verify shell cooling fan operation'] },
    ],
  },
  {
    stage: 'Classifier',
    stageId: 'classifier',
    lossIndex: 'q6',
    totalLoss: 130,
    percentage: 13.9,
    formula: 'q6 = Q_mill × (1 − η_sep) ; η_sep = (f − c) / (r − c)',
    variables: [
      { symbol: 'Q_mill', description: 'Mill output to separator',  unit: 'TPD',           illustrativeValue: '5,183' },
      { symbol: 'η_sep',  description: 'Tromp curve efficiency',    unit: 'dimensionless', illustrativeValue: '0.881' },
      { symbol: 'f',      description: 'Feed residue at 45 μm',    unit: '%',             illustrativeValue: '22' },
      { symbol: 'c',      description: 'Coarse stream residue',     unit: '%',             illustrativeValue: '35' },
      { symbol: 'r',      description: 'Fine product residue',      unit: '%',             illustrativeValue: '8' },
    ],
    engineeringInterpretation: 'Separator efficiency at 88.1% — below the 92%+ achievable with the rotor at design speed of 1,380 rpm. The 130 TPD loss represents cement that is re-ground unnecessarily rather than passing through as finished product.',
    operationalExplanation: 'The rotor running at 1,240 rpm instead of 1,380 rpm reduces the centrifugal classification force, allowing coarser particles to bypass into the fine stream (and finer particles to be rejected). Increasing rotor speed is the immediate corrective action.',
    assumptions: ['Tromp curve efficiency calculated from 45 μm residue measurements', 'Rotor VFD output at 89.9% of target (speed slip or VFD limitation)', 'Vane erosion estimated at 25% reduction in classification sharpness'],
    exampleCalculation: 'q6 = 5,183 × (1 − 0.881) = 616 TPD recirculated; net output loss from reduced circuit capacity = 130 TPD (illustrative)',
    causes: [
      { id: 'q6-c1', description: 'Separator rotor speed below setpoint (1,240 vs 1,380 rpm) — VFD limitation', loss: 100, owner: 'Process Engineer', priority: 'Critical', actions: ['Increase VFD frequency set-point to achieve 1,380 rpm', 'Check coupling for speed slip between VFD and rotor shaft', 'Verify VFD output frequency with tachometer', 'Monitor product residue hourly until stable'] },
      { id: 'q6-c2', description: 'Classifier vane erosion reducing separation sharpness', loss: 30, owner: 'Maintenance Manager', priority: 'High', actions: ['Arrange internal separator inspection at next planned stop', 'Measure vane angle and surface condition', 'Replace vane set if erosion > 30% material loss', 'Assess vane material — consider chromium-carbide coating'] },
    ],
  },
  {
    stage: 'Bag Filter',
    stageId: 'bag-filter',
    lossIndex: 'q7',
    totalLoss: 8,
    percentage: 0.9,
    formula: 'q7 = Q_air × C_outlet × t / 1,000,000',
    variables: [
      { symbol: 'Q_air',    description: 'Gas flow through filter',   unit: 'm³/s',    illustrativeValue: '12.5' },
      { symbol: 'C_outlet', description: 'Outlet dust concentration', unit: 'mg/Nm³',  illustrativeValue: '8' },
      { symbol: 't',        description: 'Seconds per day',           unit: 's/day',   illustrativeValue: '86,400' },
    ],
    engineeringInterpretation: 'Bag filters in good condition emit <10 mg/Nm³. The current 8 mg/Nm³ reading is within specification but represents a small, ongoing product loss. Product emissions are recoverable if filter condition is maintained.',
    operationalExplanation: 'At 8 mg/Nm³ and 12.5 m³/s gas flow, approximately 8.6 TPD of fine cement is lost to atmosphere rather than recovered as product. This is a regulatory compliance matter as much as a production loss.',
    assumptions: ['Single-train bag filter (mill and classifier combined)', 'Outlet concentration from continuous opacity monitor', 'All bags in serviceable condition (no broken bags)'],
    exampleCalculation: 'q7 = 12.5 × 8 × 86,400 / 1,000,000 = 8.6 TPD ≈ 8 TPD (illustrative)',
    causes: [
      { id: 'q7-c1', description: 'Normal filter wear causing minor outlet concentration increase (8 vs <5 mg/Nm³ target)', loss: 8, owner: 'Instrument Engineer', priority: 'Low', actions: ['Inspect bags at next planned stop for wear/holes', 'Check pulse-jet cleaning sequence is active', 'Verify inlet conditions — no abnormal moisture or temperature spikes'] },
    ],
  },
  {
    stage: 'Bucket Elevator',
    stageId: 'bucket-elev',
    lossIndex: 'q8',
    totalLoss: 10,
    percentage: 1.1,
    formula: 'q8 = Q_in × (1 − η_elev)',
    variables: [
      { symbol: 'Q_in',   description: 'Cement entering elevator', unit: 'TPD',           illustrativeValue: '4,782' },
      { symbol: 'η_elev', description: 'Elevator efficiency',       unit: 'dimensionless', illustrativeValue: '0.9979' },
    ],
    engineeringInterpretation: 'Bucket elevators are highly efficient when properly maintained. The illustrative 10 TPD loss represents minor bucket wear and chain elongation, causing a small spillback into the elevator boot.',
    operationalExplanation: 'At 99.79% efficiency, spillback accumulation in the elevator boot is the primary loss mechanism. Boot accumulation also increases the risk of jamming if not regularly cleared.',
    assumptions: ['Central-chain elevator at 80% of rated capacity', 'Bucket fill efficiency at 92% of theoretical', 'Boot clearing done during shift'],
    exampleCalculation: 'q8 = 4,782 × (1 − 0.9979) = 10 TPD',
    causes: [
      { id: 'q8-c1', description: 'Bucket wear causing reduced capacity and spillback into elevator boot', loss: 10, owner: 'Mechanical Team', priority: 'Low', actions: ['Inspect bucket condition at next stop', 'Clear boot accumulation during next maintenance window', 'Order replacement buckets — 18-month replacement cycle'] },
    ],
  },
  {
    stage: 'Cement Silo',
    stageId: 'cement-silo',
    lossIndex: 'q9',
    totalLoss: 75,
    percentage: 8.0,
    formula: 'q9 = Q_in − Q_extracted',
    variables: [
      { symbol: 'Q_in',         description: 'Cement fed to silos',    unit: 'TPD', illustrativeValue: '4,772' },
      { symbol: 'Q_extracted',  description: 'Cement successfully extracted', unit: 'TPD', illustrativeValue: '4,697' },
    ],
    engineeringInterpretation: 'Aeration pad failure in Silo #3 restricts mass flow extraction. Without functional aeration, cement compacts and forms stable arches, creating dead storage zones and reducing effective silo capacity.',
    operationalExplanation: 'Silo #3 aeration pad Cell 4 has ruptured, reducing the available extraction cross-section. The 75 TPD loss corresponds to the throughput that cannot be extracted from Silo #3 until the pad is replaced and the solenoid valve sequence re-commissioned.',
    assumptions: ['4-silo bank; Silo #3 reduced to 50% extraction capacity', 'Aeration cycle: 30 minutes on / 90 minutes off (fault: off-cycle valve stuck)', 'Other silos operating normally'],
    exampleCalculation: 'q9 = 4,772 − 4,697 = 75 TPD (illustrative — silo #3 aeration fault)',
    causes: [
      { id: 'q9-c1', description: 'Silo #3 aeration pad Cell 4 rupture — restricted mass flow extraction', loss: 75, owner: 'Instrument Engineer', priority: 'High', actions: ['Replace aeration pad Cell 4 (3-hour job)', 'Test solenoid valve actuation on 2-hour cycle', 'Boost compressed air supply to silo header to 2.5 bar', 'Verify extraction rate from Silo #3 after repair'] },
    ],
  },
  {
    stage: 'Packaging',
    stageId: 'packaging',
    lossIndex: 'q10',
    totalLoss: 320,
    percentage: 34.2,
    formula: 'q10 = Q_line_loss + Q_rejection ; R_reject = N_rej / N_total',
    variables: [
      { symbol: 'Q_line_loss', description: 'Loss from offline packer lines', unit: 'TPD', illustrativeValue: '260' },
      { symbol: 'Q_rejection', description: 'Loss from bag rejection rate',   unit: 'TPD', illustrativeValue: '63' },
      { symbol: 'R_reject',    description: 'Bag rejection rate',             unit: '%',   illustrativeValue: '3.2' },
    ],
    engineeringInterpretation: 'Packaging is the largest single loss stage at 320 TPD (34.2% of total). Line 3 offline accounts for 185 TPD; compressor fault on Line 2 causes 72 TPD loss; bag rejection on Line 4 contributes 63 TPD. Line downtime is the dominant driver.',
    operationalExplanation: 'Four packing lines at ~130 TPD capacity each. One line offline immediately removes 25% of packing capacity, and the downstream effects prevent the silo from extracting at full rate. Restoring Line 3 is the highest-priority action to close the gap to daily target.',
    assumptions: ['4 × ROTO-PACKER lines at 130 TPD each (1,560 bags/hr target)', 'Line 3 offline since 06:00; 185 TPD = equivalent daily loss', 'Line 4 rejection rate 3.2% on 1,965 TPD through-line'],
    exampleCalculation: 'q10 = 185 (Line 3 offline) + 72 (Line 2 compressor) + 63 (Line 4 rejections) = 320 TPD',
    causes: [
      { id: 'q10-c1', description: 'Packer Line 3 OFFLINE — bag feeder magazine jam at throat entry', loss: 185, owner: 'Mechanical Team', priority: 'Critical', actions: ['Dispatch mechanical technician immediately to Line 3', 'Clear bag magazine throat and inspect gripper arms for wear', 'Replace nozzle seal; re-calibrate bag weight sensor', 'Run 100 trial packs before returning to full load'] },
      { id: 'q10-c2', description: 'Compressor pressure fluctuation on Line 2 — bag seal failures', loss: 72, owner: 'Electrical Team', priority: 'High', actions: ['Replace compressed air filter element immediately', 'Test and reseat relief valve', 'Check compressor inlet valve for partial closure', 'Verify air receiver pressure at demand peak'] },
      { id: 'q10-c3', description: 'Spout liner wear on Line 4 — rejection rate 3.2% (target <0.5%)', loss: 63, owner: 'Mechanical Team', priority: 'High', actions: ['Measure spout liner thickness — replace if below 8 mm spec', 'Adjust bag clamp pressure to 6.5 bar', 'Reduce Line 4 speed by 5% until liner replaced', 'Schedule liner replacement in next planned window'] },
    ],
  },
  {
    stage: 'Weighbridge',
    stageId: 'weighbridge',
    lossIndex: 'q11',
    totalLoss: 5,
    percentage: 0.5,
    formula: 'q11 = ΔW_truck × N_trucks',
    variables: [
      { symbol: 'ΔW_truck', description: 'Per-truck weight discrepancy', unit: 'tonnes',    illustrativeValue: '0.06' },
      { symbol: 'N_trucks', description: 'Trucks dispatched per day',    unit: 'trucks/day', illustrativeValue: '74' },
    ],
    engineeringInterpretation: 'Bay 2 weighbridge calibration is overdue; a systematic under-reading of ~60 kg/truck means each truck carries slightly less than recorded. The 5 TPD loss is small but corrupts production accounting accuracy.',
    operationalExplanation: 'The 60 kg/truck discrepancy on Bay 2 (processing ~25% of trucks) creates a 4.4 TPD under-dispatched quantity. Weighbridge calibration is a 1-hour task using certified test weights and immediately eliminates this loss.',
    assumptions: ['Bay 2 processes ~18 trucks of the 74/day total', 'Systematic under-reading (not random error)', 'Bay 1 and Bays 3/4 in calibration'],
    exampleCalculation: 'q11 = 0.06 × 74 = 4.4 TPD ≈ 5 TPD (illustrative)',
    causes: [
      { id: 'q11-c1', description: 'Bay 2 weighbridge calibration overdue — systematic 60 kg/truck under-reading', loss: 5, owner: 'Instrument Engineer', priority: 'Medium', actions: ['Perform certified calibration using 5×2t test weights', 'Zero adjustment and span calibration', 'Verify against adjacent bay for cross-check', 'Document calibration in regulatory log'] },
    ],
  },
  {
    stage: 'Dispatch',
    stageId: 'dispatch',
    lossIndex: 'q12',
    totalLoss: 52,
    percentage: 5.6,
    formula: 'q12 = C_dispatch × (1 − η_dispatch)',
    variables: [
      { symbol: 'C_dispatch',  description: 'Theoretical dispatch capacity', unit: 'TPD',           illustrativeValue: '5,000' },
      { symbol: 'η_dispatch',  description: 'Dispatch utilisation',          unit: 'dimensionless', illustrativeValue: '0.990' },
      { symbol: 'T_actual',    description: 'Average turnaround time',       unit: 'min',           illustrativeValue: '42' },
      { symbol: 'T_target',    description: 'Target turnaround time',        unit: 'min',           illustrativeValue: '30' },
    ],
    engineeringInterpretation: 'Truck turnaround time of 42 min vs 30 min target reduces the number of loading cycles achievable per shift. Note: dispatch capacity is constrained by packing output today (Line 3 offline); this 52 TPD is the additional logistics-side loss above the packing constraint.',
    operationalExplanation: 'With 4 loading bays and a target of 100 trucks/day at 30 t average, the theoretical dispatch rate is 125 TPD/hr. The 12-minute excess turnaround reduces this to 110 TPD/hr, causing a 52 TPD daily shortfall attributable specifically to dispatch operations.',
    assumptions: ['4 loading bays; Bay 2 scale requires re-calibration (halved processing speed)', 'Documentation processing averages 8 min vs 5 min target', 'Loading time = 15 min/truck at target fill rate'],
    exampleCalculation: 'q12 ≈ (42 − 30) / 30 × 130 trucks × 30 t / 1,000 = 52 TPD (illustrative)',
    causes: [
      { id: 'q12-c1', description: 'Truck turnaround time elevated at 42 min vs 30 min target', loss: 52, owner: 'Logistics Coordinator', priority: 'Medium', actions: ['Calibrate Bay 2 weighbridge scale to restore full throughput', 'Implement truck pre-positioning protocol for next 20 trucks', 'Deploy queue management officer at plant gate', 'Review ERP documentation workflow — target <5 min processing'] },
    ],
  },
  {
    stage: 'Logistics',
    stageId: 'logistics',
    lossIndex: 'q13',
    totalLoss: 18,
    percentage: 1.9,
    formula: 'q13 = N_cap × L_truck × (T_actual − T_target) / T_target / 24',
    variables: [
      { symbol: 'N_cap',    description: 'Target trucks per day',   unit: 'trucks', illustrativeValue: '100' },
      { symbol: 'L_truck',  description: 'Average truck load',      unit: 't',      illustrativeValue: '30' },
      { symbol: 'T_actual', description: 'Actual turnaround',       unit: 'min',    illustrativeValue: '42' },
      { symbol: 'T_target', description: 'Target turnaround',       unit: 'min',    illustrativeValue: '30' },
    ],
    engineeringInterpretation: 'Systemic fleet management loss beyond the dispatch bay constraint (q12). Absence of truck pre-positioning and queue management means loading bays are idle waiting for trucks rather than continuously loaded.',
    operationalExplanation: 'With 18 trucks currently queued externally rather than pre-positioned at the gate, loading bays experience empty intervals. The 18 TPD loss represents the throughput achievable if truck flow was continuous and pre-positioned.',
    assumptions: ['18 trucks in external queue (GPS-confirmed)', 'Average idle bay time: 8 min/truck × 18 trucks / 24 h', 'No pre-positioning protocol currently active', 'Net of q12 overlap to avoid double-counting'],
    exampleCalculation: 'q13 = 100 × 30 × (42−30)/30 = 1,200 TPD loss rate → net after q12 overlap allocation = 18 TPD (illustrative)',
    causes: [
      { id: 'q13-c1', description: 'No truck pre-positioning protocol — 18 trucks in external queue creating bay idle time', loss: 18, owner: 'Logistics Coordinator', priority: 'Medium', actions: ['Implement pre-positioning: coordinate 20 trucks to wait at plant entry', 'Set up fleet WhatsApp/SMS notification system for truck scheduling', 'Review gate entry process to reduce check-in time', 'Track queue data in next shift for trend comparison'] },
    ],
  },
];

export const totalLoss = lossData.reduce((sum, l) => sum + l.totalLoss, 0);

// ─── Waterfall Chart Data (from framework capacity chain) ─────────────────────

export const waterfallData: WaterfallDataPoint[] = (() => {
  const points: WaterfallDataPoint[] = [];

  points.push({
    name: 'Design Capacity',
    lossIndex: '—',
    start: 0,
    value: THEORETICAL_CAPACITY,
    end: THEORETICAL_CAPACITY,
    isTotal: true,
    fill: '#0EA5E9',
    formula: 'Q_theoretical = 5,500 TPD (illustrative design capacity)',
  });

  let cumulative = THEORETICAL_CAPACITY;
  for (const chain of capacityChain.slice(2)) { // skip first two (design + kiln)
    const loss = chain.loss;
    if (loss === 0) continue;
    cumulative -= loss;
    points.push({
      name: chain.stage.replace('After ', '').replace(' q', ' '),
      lossIndex: chain.lossIndex,
      start: cumulative,
      value: -loss,
      end: cumulative,
      fill: loss > 200 ? '#EF4444' : loss > 50 ? '#F59E0B' : '#64748b',
      formula: lossData.find(l => l.lossIndex === chain.lossIndex)?.formula,
    });
  }

  points.push({
    name: 'Net Dispatched',
    lossIndex: '—',
    start: 0,
    value: cumulative,
    end: cumulative,
    isTotal: true,
    fill: '#10B981',
    formula: 'Q_actual = Q_theoretical − Σq1..q13',
  });

  return points;
})();
