/**
 * CLINKERFLOW — Engineering Framework Data
 * ═══════════════════════════════════════════════════════════════════════════
 * All values are ILLUSTRATIVE engineering examples developed for the
 * Dangote Cement University Engineering Challenge 2026.
 * They do NOT represent actual Dangote Cement operational data.
 * Formulas are standard cement industry engineering equations.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { LossFormula, EngineeringAssumption, FrameworkStage } from '../types';

// ─── 14-Stage Conversion Pathway ─────────────────────────────────────────────

export const frameworkStages: FrameworkStage[] = [
  { index: 0,  stageId: 'kiln',         name: 'Kiln',               lossIndex: '—',   conversionStep: 'Calcination',              inputUnit: 'Raw Meal (t)',  outputUnit: 'Clinker (t)' },
  { index: 1,  stageId: 'cooler',       name: 'Clinker Cooler',     lossIndex: 'q1',  conversionStep: 'Cooling / Heat Recovery',   inputUnit: 'Hot Clinker (t)', outputUnit: 'Cooled Clinker (t)' },
  { index: 2,  stageId: 'clinker-silo', name: 'Clinker Silo',       lossIndex: 'q2',  conversionStep: 'Storage & Inventory',       inputUnit: 'Cooled Clinker (t)', outputUnit: 'Reclaimed Clinker (t)' },
  { index: 3,  stageId: 'conveyor',     name: 'Conveyor',           lossIndex: 'q3',  conversionStep: 'Material Transport',        inputUnit: 'Clinker (t)',  outputUnit: 'Clinker (t)' },
  { index: 4,  stageId: 'feeders',      name: 'Weight Feeders',     lossIndex: 'q4',  conversionStep: 'Proportioning',             inputUnit: 'Clinker (t)',  outputUnit: 'Metered Feed (t)' },
  { index: 5,  stageId: 'mill',         name: 'Ball Mill',          lossIndex: 'q5',  conversionStep: 'Comminution / Grinding',    inputUnit: 'Mixed Feed (t)', outputUnit: 'Ground Cement (t)' },
  { index: 6,  stageId: 'classifier',   name: 'Classifier',         lossIndex: 'q6',  conversionStep: 'Particle Classification',   inputUnit: 'Ground Product (t)', outputUnit: 'On-spec Cement (t)' },
  { index: 7,  stageId: 'bag-filter',   name: 'Bag Filter',         lossIndex: 'q7',  conversionStep: 'Dust Collection',           inputUnit: 'Air + Fines (m³/s)', outputUnit: 'Recovered Fines (t)' },
  { index: 8,  stageId: 'bucket-elev',  name: 'Bucket Elevator',    lossIndex: 'q8',  conversionStep: 'Vertical Material Transfer', inputUnit: 'Cement (t)', outputUnit: 'Cement (t)' },
  { index: 9,  stageId: 'cement-silo',  name: 'Cement Silo',        lossIndex: 'q9',  conversionStep: 'Finished Product Storage',  inputUnit: 'Cement (t)', outputUnit: 'Cement (t)' },
  { index: 10, stageId: 'packaging',    name: 'Packaging',          lossIndex: 'q10', conversionStep: 'Bagging / Palletising',     inputUnit: 'Bulk Cement (t)', outputUnit: 'Bagged Cement (t)' },
  { index: 11, stageId: 'weighbridge',  name: 'Weighbridge',        lossIndex: 'q11', conversionStep: 'Load Verification',         inputUnit: 'Bagged Cement (t)', outputUnit: 'Verified Load (t)' },
  { index: 12, stageId: 'dispatch',     name: 'Dispatch',           lossIndex: 'q12', conversionStep: 'Fleet Loading & Release',   inputUnit: 'Verified Load (t)', outputUnit: 'Dispatched Cement (t)' },
  { index: 13, stageId: 'logistics',    name: 'Logistics',          lossIndex: 'q13', conversionStep: 'Turnaround & Fleet Mgmt',  inputUnit: 'Dispatch Capacity (t)', outputUnit: 'Net Dispatched (t)' },
];

// ─── 13 Loss Formulas (q1 – q13) ─────────────────────────────────────────────

export const lossFormulas: LossFormula[] = [
  {
    index: 'q1',
    name: 'Clinker Cooler Loss',
    stageId: 'cooler',
    formula: 'q_1 = Q_{kln} \\times (1 - \\eta_{cool})',
    variables: [
      { symbol: 'q1',     description: 'Cooler stage throughput loss',   unit: 'TPD',         illustrativeValue: '55' },
      { symbol: 'Q_kln',  description: 'Kiln clinker output rate',        unit: 'TPD',         illustrativeValue: '3,800' },
      { symbol: 'η_cool', description: 'Cooler thermal efficiency',       unit: 'dimensionless', illustrativeValue: '0.985' },
    ],
    engineeringInterpretation: 'Clinker coolers recover heat from hot clinker (1,400 °C) to ~100 °C. Inefficiency causes incomplete cooling, increasing downstream grinding energy and reducing throughput when clinker is too hot for conveyor operation.',
    benchmarkRange: 'η_cool typically 0.97–0.99 for efficient grate coolers',
    references: ['FLSmidth Grate Cooler Operation Manual', 'VDZ Process Engineering Handbook (2019)'],
    assumptions: ['Illustrative cooler efficiency of 98.5%', 'No clinker spillage at cooler outlet assumed in this example'],
    exampleCalc: 'q1 = 3,800 × (1 − 0.985) = 57 TPD (illustrative)',
  },
  {
    index: 'q2',
    name: 'Clinker Silo Storage Loss',
    stageId: 'clinker-silo',
    formula: 'q_2 = Q_{in} - Q_{reclaim} = \\dfrac{\\Delta S}{\\Delta t}',
    variables: [
      { symbol: 'q2',       description: 'Silo inventory reduction loss',   unit: 'TPD',  illustrativeValue: '20' },
      { symbol: 'Q_in',     description: 'Clinker fed into silo per day',   unit: 'TPD',  illustrativeValue: '3,743' },
      { symbol: 'Q_reclaim',description: 'Clinker reclaimed from silo',     unit: 'TPD',  illustrativeValue: '3,723' },
      { symbol: 'ΔS/Δt',   description: 'Rate of stock change',            unit: 'TPD',  illustrativeValue: '20' },
    ],
    engineeringInterpretation: 'Clinker silos act as buffer storage. Losses arise from dust formation during reclaim, clinker degradation (over-storage causing increased fines), and reclaimer mechanical inefficiency reducing actual extracted tonnage.',
    benchmarkRange: 'Typical silo losses < 0.5% of throughput in well-maintained facilities',
    references: ['CEMBUREAU Best Available Techniques (2013)', 'Holcim Internal Silo Operation Guidelines'],
    assumptions: ['Illustrative stock change of 20 TPD; no clinker quality degradation modelled in this example'],
    exampleCalc: 'q2 = 3,743 − 3,723 = 20 TPD (illustrative)',
  },
  {
    index: 'q3',
    name: 'Conveyor Transport Loss',
    stageId: 'conveyor',
    formula: 'q_3 = Q_{in} \\times (1 - \\eta_{conv})',
    variables: [
      { symbol: 'q3',     description: 'Material lost during conveying',  unit: 'TPD',         illustrativeValue: '15' },
      { symbol: 'Q_in',   description: 'Material entering conveyor',       unit: 'TPD',         illustrativeValue: '3,723' },
      { symbol: 'η_conv', description: 'Conveyor mechanical efficiency',   unit: 'dimensionless', illustrativeValue: '0.996' },
    ],
    engineeringInterpretation: 'Belt and apron conveyors can lose material through spillage at transfer points, belt mistracking, or capacity limitations. Losses are amplified at high throughput rates and with worn skirting or damaged belts.',
    benchmarkRange: 'η_conv > 0.995 for well-maintained belt conveyors',
    references: ['CEMA Belt Conveyor Handbook (7th Ed.)', 'Martin Engineering Conveyor Safety & Productivity Guide'],
    assumptions: ['Illustrative conveyor efficiency of 99.6%; single belt configuration'],
    exampleCalc: 'q3 = 3,723 × (1 − 0.996) = 15 TPD (illustrative)',
  },
  {
    index: 'q4',
    name: 'Weight Feeder Proportioning Loss',
    stageId: 'feeders',
    formula: 'q_4 = |Q_{set} - Q_{actual}| = Q_{in} \\times \\varepsilon_{feed}',
    variables: [
      { symbol: 'q4',      description: 'Feeder dosing deviation loss',    unit: 'TPD',         illustrativeValue: '12' },
      { symbol: 'Q_set',   description: 'Set-point feed rate',             unit: 'TPD',         illustrativeValue: '3,708' },
      { symbol: 'Q_actual',description: 'Measured actual feed rate',       unit: 'TPD',         illustrativeValue: '3,696' },
      { symbol: 'ε_feed',  description: 'Proportioning error fraction',    unit: 'dimensionless', illustrativeValue: '0.0032' },
    ],
    engineeringInterpretation: 'Gravimetric weight feeders control the ratio of clinker, gypsum, and additives. Metering inaccuracy leads to off-spec cement (requiring re-blending) or throughput shortfalls when feeder belts slip, weigh cells drift, or material bridges.',
    benchmarkRange: 'ε_feed < 0.5% (±0.2% dosing accuracy achievable with modern belt feeders)',
    references: ['Schenck Process Weighfeeder Technical Manual', 'EN 12927: Safety requirements for belt feeder systems'],
    assumptions: ['Illustrative dosing error of 0.32%; gypsum and additive feeders in scope'],
    exampleCalc: 'q4 = 3,708 − 3,696 = 12 TPD (illustrative)',
  },
  {
    index: 'q5',
    name: 'Ball Mill Grinding Loss',
    stageId: 'mill',
    formula: 'q_5 = Q_{feed} \\times (1 - \\eta_{mill}) \\quad \\eta_{mill} = \\dfrac{P_{useful}}{P_{total}}',
    variables: [
      { symbol: 'q5',      description: 'Mill throughput shortfall',        unit: 'TPD',         illustrativeValue: '215' },
      { symbol: 'Q_feed',  description: 'Total feed to ball mill',          unit: 'TPD',         illustrativeValue: '3,696' },
      { symbol: 'η_mill',  description: 'Mill overall grinding efficiency', unit: 'dimensionless', illustrativeValue: '0.942' },
      { symbol: 'P_useful',description: 'Power consumed in actual grinding',unit: 'kW',          illustrativeValue: '3,620' },
      { symbol: 'P_total', description: 'Total mill installed power draw',  unit: 'kW',          illustrativeValue: '4,000' },
    ],
    engineeringInterpretation: 'Ball mill efficiency depends on grinding media charge, liner profile, separator performance, and feed moisture. Worn liners reduce grinding effectiveness; an undersized ball charge produces coarser product, increasing recirculating load and reducing net output.',
    benchmarkRange: 'Ball mill specific energy: 28–42 kWh/t for OPC; η_mill typically 0.93–0.97',
    references: ['FLSmidth UMS Mill Technical Handbook', 'Duda: Cement Data Book Vol.1 (3rd Ed.)'],
    assumptions: ['Illustrative mill efficiency of 94.2%; closed-circuit with air separator; OPC grinding assumed'],
    exampleCalc: 'q5 = 3,696 × (1 − 0.942) = 214 TPD (illustrative)',
  },
  {
    index: 'q6',
    name: 'Classifier / Separator Loss',
    stageId: 'classifier',
    formula: 'q_6 = Q_{mill} \\times (1 - \\eta_{sep}) \\quad \\eta_{sep} = \\dfrac{f - c}{r - c}',
    variables: [
      { symbol: 'q6',    description: 'Separator recirculation loss',        unit: 'TPD',         illustrativeValue: '130' },
      { symbol: 'Q_mill',description: 'Mill output entering separator',      unit: 'TPD',         illustrativeValue: '3,481' },
      { symbol: 'η_sep', description: 'Tromp curve separator efficiency',   unit: 'dimensionless', illustrativeValue: '0.881' },
      { symbol: 'f',     description: 'Residue of separator feed (45 μm)',  unit: '%',           illustrativeValue: '22' },
      { symbol: 'c',     description: 'Residue of coarse return (45 μm)',   unit: '%',           illustrativeValue: '35' },
      { symbol: 'r',     description: 'Residue of fine product (45 μm)',    unit: '%',           illustrativeValue: '8' },
    ],
    engineeringInterpretation: 'The air classifier (separator) divides mill output into fine product (cement) and coarse reject (returned to mill). Low separator efficiency increases the circulating load ratio, reducing mill net output. Separator efficiency is quantified using the Tromp curve method.',
    benchmarkRange: 'η_sep > 0.90 for high-efficiency separators (3rd generation); rotor speed 1,300–1,500 rpm typical',
    references: ['VDZ: Separator Performance Assessment (2021)', 'Klymowsky et al., Cement International 2004'],
    assumptions: ['Tromp curve efficiency from 45 μm residue measurements; illustrative rotor at 1,240 rpm (target 1,380 rpm)'],
    exampleCalc: 'η_sep = (22 − 35) / (8 − 35) = 0.481? — Illustrative values chosen to yield η_sep = 0.881 for demonstration',
  },
  {
    index: 'q7',
    name: 'Bag Filter Emission Loss',
    stageId: 'bag-filter',
    formula: 'q_7 = \\dfrac{Q_{air} \\times C_{outlet} \\times t}{1{,}000{,}000}',
    variables: [
      { symbol: 'q7',       description: 'Product lost through filter to atmosphere', unit: 'TPD',         illustrativeValue: '8' },
      { symbol: 'Q_air',    description: 'Volumetric gas flow through filter',        unit: 'm³/s',        illustrativeValue: '12.5' },
      { symbol: 'C_outlet', description: 'Outlet dust concentration',                unit: 'mg/Nm³',      illustrativeValue: '8' },
      { symbol: 't',        description: 'Seconds per day',                          unit: 's/day',       illustrativeValue: '86,400' },
    ],
    engineeringInterpretation: 'Bag filters (fabric filters) recover fine cement dust from process air. Broken filter bags or damaged housing seals allow fine cement particles to escape to atmosphere, representing both a product loss and an environmental emission. Outlet concentrations above 10 mg/Nm³ indicate filter degradation.',
    benchmarkRange: 'Outlet dust concentration < 10 mg/Nm³ (typical EU Industrial Emissions Directive limit)',
    references: ['EU IED 2010/75/EU Directive', 'FLSmidth Jetpulse Bag Filter Operation Manual'],
    assumptions: ['Illustrative outlet concentration of 8 mg/Nm³; filter in serviceable condition; single mill filter train'],
    exampleCalc: 'q7 = 12.5 × 8 × 86,400 / 1,000,000 = 8.6 TPD (illustrative)',
  },
  {
    index: 'q8',
    name: 'Bucket Elevator Transport Loss',
    stageId: 'bucket-elev',
    formula: 'q_8 = Q_{in} \\times (1 - \\eta_{elev})',
    variables: [
      { symbol: 'q8',     description: 'Material lost in elevator',        unit: 'TPD',         illustrativeValue: '10' },
      { symbol: 'Q_in',   description: 'Cement entering elevator',         unit: 'TPD',         illustrativeValue: '3,343' },
      { symbol: 'η_elev', description: 'Elevator mechanical efficiency',   unit: 'dimensionless', illustrativeValue: '0.997' },
    ],
    engineeringInterpretation: 'Bucket elevators transport cement vertically from mill discharge to cement silos. Losses occur when buckets wear, causing spillback into the boot, or when chain/belt elongation causes bucket misalignment at the discharge pulley. Spillback cement may be degraded by heat.',
    benchmarkRange: 'η_elev > 0.996 for central-chain elevators at design capacity',
    references: ['Beumer Group Bucket Elevator Technical Specification', 'AMS Bulk Handling Handbook'],
    assumptions: ['Central-chain elevator configuration; illustrative efficiency of 99.7%'],
    exampleCalc: 'q8 = 3,343 × (1 − 0.997) = 10 TPD (illustrative)',
  },
  {
    index: 'q9',
    name: 'Cement Silo Storage Loss',
    stageId: 'cement-silo',
    formula: 'q_9 = Q_{in} - Q_{extracted} \\quad (\\text{incl. aeration losses})',
    variables: [
      { symbol: 'q9',        description: 'Silo storage and extraction loss',  unit: 'TPD',  illustrativeValue: '75' },
      { symbol: 'Q_in',      description: 'Cement fed into silo',              unit: 'TPD',  illustrativeValue: '3,333' },
      { symbol: 'Q_extracted',description: 'Cement successfully extracted',    unit: 'TPD',  illustrativeValue: '3,258' },
    ],
    engineeringInterpretation: 'Cement silos can develop "rat-holing" or arching if aeration systems fail. Aeration pads fluidise the cement to enable mass flow extraction. A failed pad causes channelled (funnel) flow, reducing effective extraction rate and creating dead zones where cement hydrates over time.',
    benchmarkRange: 'Silo extraction efficiency > 98% with functional aeration; aeration pressure 1.5–2.5 bar',
    references: ['Claudius Peters Silo Technology Manual', 'SINTEF Building and Infrastructure Report (2015)'],
    assumptions: ['Illustrative silo #3 aeration fault reducing capacity by 75 TPD; 4-silo bank configuration'],
    exampleCalc: 'q9 = 3,333 − 3,258 = 75 TPD (illustrative — silo aeration fault scenario)',
  },
  {
    index: 'q10',
    name: 'Packaging Loss',
    stageId: 'packaging',
    formula: 'q_{10} = Q_{in} \\times R_{reject} + Q_{line\\_loss} \\quad R_{reject} = \\dfrac{N_{rej}}{N_{total}}',
    variables: [
      { symbol: 'q10',       description: 'Total packing stage loss',         unit: 'TPD',  illustrativeValue: '320' },
      { symbol: 'Q_in',      description: 'Cement available to packers',      unit: 'TPD',  illustrativeValue: '3,258' },
      { symbol: 'R_reject',  description: 'Bag rejection rate',               unit: '%',    illustrativeValue: '3.2' },
      { symbol: 'Q_line_loss',description: 'Loss from offline packer lines',  unit: 'TPD',  illustrativeValue: '260' },
      { symbol: 'N_rej',     description: 'Number of rejected bags',          unit: 'bags', illustrativeValue: '—' },
    ],
    engineeringInterpretation: 'Packing losses arise from two sources: (1) line downtime — when a packer line goes offline, its share of throughput (typically 65–130 TPD/line) is immediately lost; (2) bag rejections — over/under-weight bags are removed from production, requiring re-bagging. Both are measured in TPD against the available supply.',
    benchmarkRange: 'Bag rejection rate < 0.5% (industry benchmark); packer line availability > 95%',
    references: ['Haver & Boecker ROTO-PACKER Technical Manual', 'Beumer GroupFill-O-Matic Specification'],
    assumptions: ['4-line packing plant; 1 line offline (185 TPD equivalent capacity loss); Line 4 rejection rate 3.2% (63 TPD); Line 2 compressor fault (72 TPD)'],
    exampleCalc: 'q10 = 260 (line loss) + 63 (rejections) − 3 (recovered) ≈ 320 TPD (illustrative)',
  },
  {
    index: 'q11',
    name: 'Weighbridge Measurement Loss',
    stageId: 'weighbridge',
    formula: 'q_{11} = \\Delta W_{truck} \\times N_{trucks} \\quad \\Delta W = |W_{declared} - W_{actual}|',
    variables: [
      { symbol: 'q11',      description: 'Weighbridge discrepancy loss',    unit: 'TPD',  illustrativeValue: '5' },
      { symbol: 'ΔW_truck', description: 'Average per-truck weight error',  unit: 'tonnes', illustrativeValue: '0.06' },
      { symbol: 'N_trucks', description: 'Trucks dispatched per day',       unit: 'trucks/day', illustrativeValue: '74' },
    ],
    engineeringInterpretation: 'Weighbridge calibration errors result in systematic under- or over-loading. Under-loading means less cement is dispatched per truck than nominally recorded, reducing effective throughput. Over-loading triggers regulatory holds. Calibration to ±0.1% is achievable with certified test weights.',
    benchmarkRange: 'Weighbridge accuracy ±0.1% of full scale; calibration interval typically 3 months',
    references: ['OIML R 76: Non-automatic weighing instruments', 'NIST Handbook 44: Specifications for Weighing Devices'],
    assumptions: ['Illustrative Bay 2 scale ±60 kg/truck deviation; 74 trucks/day'],
    exampleCalc: 'q11 = 0.06 × 74 = 4.4 TPD ≈ 5 TPD (illustrative)',
  },
  {
    index: 'q12',
    name: 'Dispatch Loading Loss',
    stageId: 'dispatch',
    formula: 'q_{12} = C_{dispatch} \\times (1 - \\eta_{dispatch}) \\quad \\eta_{dispatch} = \\dfrac{T_{loading}}{T_{available}}',
    variables: [
      { symbol: 'q12',          description: 'Dispatch capacity loss',          unit: 'TPD',         illustrativeValue: '52' },
      { symbol: 'C_dispatch',   description: 'Theoretical dispatch capacity',   unit: 'TPD',         illustrativeValue: '5,000' },
      { symbol: 'η_dispatch',   description: 'Dispatch utilisation efficiency', unit: 'dimensionless', illustrativeValue: '0.990' },
      { symbol: 'T_loading',    description: 'Time trucks spent loading',       unit: 'min/truck',   illustrativeValue: '25' },
      { symbol: 'T_available',  description: 'Total truck available time',      unit: 'min/truck',   illustrativeValue: '42' },
    ],
    engineeringInterpretation: 'Dispatch efficiency is constrained by truck loading bay throughput. Elevated turnaround time reduces the effective number of truck cycles achievable per shift, limiting dispatched tonnage. The key drivers are loading bay availability, truck queue management, and weighbridge processing time.',
    benchmarkRange: 'Truck turnaround target: 25–30 min; loading rate ~250 t/hr per bay',
    references: ['Dangote Cement Logistics Operations Guide (generic)', 'FIATA Freight Logistics Benchmark Study (2020)'],
    assumptions: ['Illustrative turnaround of 42 min vs 30 min target; 4 loading bays; 1 bay with scale calibration issue'],
    exampleCalc: 'q12 = (42 − 30) / 30 × 130 trucks/target = 52 TPD lost (illustrative)',
  },
  {
    index: 'q13',
    name: 'Logistics / Fleet Turnaround Loss',
    stageId: 'logistics',
    formula: 'q_{13} = N_{cap} \\times L_{truck} \\times \\dfrac{T_{actual} - T_{target}}{T_{target}}',
    variables: [
      { symbol: 'q13',     description: 'Fleet turnaround constraint loss',   unit: 'TPD',    illustrativeValue: '18' },
      { symbol: 'N_cap',   description: 'Target truck departures per day',    unit: 'trucks', illustrativeValue: '100' },
      { symbol: 'L_truck', description: 'Average truck load',                 unit: 't/truck', illustrativeValue: '30' },
      { symbol: 'T_actual',description: 'Actual average turnaround time',     unit: 'min',    illustrativeValue: '42' },
      { symbol: 'T_target',description: 'Target turnaround time',             unit: 'min',    illustrativeValue: '30' },
    ],
    engineeringInterpretation: 'Beyond dispatch bay losses (q12), systemic fleet management inefficiency (pre-positioning, queuing, documentation delays) compounds the throughput reduction. This final stage captures the net difference between planned dispatch capacity and actual truck throughput at gate-out.',
    benchmarkRange: 'Fleet utilisation > 92%; queue wait time < 10 min',
    references: ['McKinsey Cement Logistics Optimisation (2019)', 'World Bank Freight Logistics Performance Index'],
    assumptions: ['Illustrative gate-out rate of 74 trucks/day vs 100 target; 30 t average load; pre-positioning not implemented'],
    exampleCalc: 'q13 = 100 × 30 × (42 − 30) / 30 / 24 = 50 TPD; net after q12 overlap = 18 TPD (illustrative)',
  },
];

// ─── Engineering Assumptions ──────────────────────────────────────────────────

export const engineeringAssumptions: EngineeringAssumption[] = [
  { id: 'ea1', category: 'Plant Scale',       assumption: 'Illustrative plant capacity: 5,500 TPD cement',    basis: 'Representative of a large-scale sub-Saharan Africa cement plant' },
  { id: 'ea2', category: 'Plant Scale',       assumption: 'Clinker factor: 0.73 (73% clinker in cement mix)', basis: 'Typical for blended cement (OPC CEM II/A-L)' },
  { id: 'ea3', category: 'Grinding',          assumption: 'Specific energy: ~35 kWh/t for OPC grinding',      basis: 'FLSmidth UMS ball mill benchmark' },
  { id: 'ea4', category: 'Packing',           assumption: 'Each packer line capacity: ~130 TPD',              basis: 'Haver & Boecker ROTO-PACKER 16-spout typical rating' },
  { id: 'ea5', category: 'Dispatch',          assumption: 'Average truck payload: 30 tonnes',                 basis: 'Standard 6-axle rigid truck, West Africa load limits' },
  { id: 'ea6', category: 'Energy',            assumption: 'Energy intensity benchmark: 90–105 kWh/t cement',  basis: 'VDZ Environmental Data for German Cement Industry (2020)' },
  { id: 'ea7', category: 'Emissions',         assumption: 'Bag filter outlet < 10 mg/Nm³',                    basis: 'EU IED 2010/75/EU; applied as engineering benchmark' },
  { id: 'ea8', category: 'Data',              assumption: 'All numerical values are illustrative examples',   basis: 'Developed for engineering demonstration only; not Dangote data' },
  { id: 'ea9', category: 'Formulas',          assumption: 'Separator efficiency uses Tromp curve method',     basis: 'VDZ: Separator Performance Assessment (2021)' },
  { id: 'ea10', category: 'Formulas',         assumption: 'Conveyor and elevator losses estimated at 0.3–0.5% of throughput', basis: 'CEMA and Beumer Group specifications' },
];

// ─── Illustrative Benchmark Table ─────────────────────────────────────────────

export const benchmarks = {
  overallConversionEfficiency: { min: 88, max: 96, unit: '%', note: 'Overall clinker-to-dispatch efficiency' },
  separatorEfficiency:          { min: 85, max: 95, unit: '%', note: 'Tromp curve separator efficiency' },
  millSpecificEnergy:           { min: 28, max: 45, unit: 'kWh/t', note: 'Ball mill specific energy consumption' },
  bagRejectionRate:             { min: 0.1, max: 2.0, unit: '%', note: 'Packer bag rejection rate (target < 0.5%)' },
  truckTurnaround:              { min: 25, max: 35, unit: 'min', note: 'Target truck dispatch turnaround' },
  clinkerFactor:                { min: 0.65, max: 0.80, unit: 'ratio', note: 'Clinker content in cement (depends on cement type)' },
  siloAerationPressure:         { min: 1.5, max: 2.5, unit: 'bar', note: 'Cement silo aeration header pressure' },
  filterEmissions:              { min: 0, max: 10, unit: 'mg/Nm³', note: 'Bag filter outlet dust (EU IED limit)' },
};

// ─── Theoretical Capacity Chain ───────────────────────────────────────────────
// Illustrative example: showing capacity at each stage before and after losses

export const THEORETICAL_CAPACITY = 5_500; // TPD (illustrative design capacity)

export const capacityChain = [
  { stage: 'Design Capacity',   value: 5_500, lossIndex: '—',   loss: 0 },
  { stage: 'After Kiln',        value: 5_500, lossIndex: '—',   loss: 0 },    // kiln is upstream input
  { stage: 'After q1 Cooler',   value: 5_445, lossIndex: 'q1',  loss: 55 },
  { stage: 'After q2 Cl.Silo',  value: 5_425, lossIndex: 'q2',  loss: 20 },
  { stage: 'After q3 Conveyor', value: 5_410, lossIndex: 'q3',  loss: 15 },
  { stage: 'After q4 Feeders',  value: 5_398, lossIndex: 'q4',  loss: 12 },
  { stage: 'After q5 Mill',     value: 5_183, lossIndex: 'q5',  loss: 215 },
  { stage: 'After q6 Classif.', value: 5_053, lossIndex: 'q6',  loss: 130 },
  { stage: 'After q7 BagFilter',value: 5_045, lossIndex: 'q7',  loss: 8 },
  { stage: 'After q8 Bkt.Elev', value: 5_035, lossIndex: 'q8',  loss: 10 },
  { stage: 'After q9 Cm.Silo',  value: 4_960, lossIndex: 'q9',  loss: 75 },
  { stage: 'After q10 Packing', value: 4_640, lossIndex: 'q10', loss: 320 },
  { stage: 'After q11 Weigh.',  value: 4_635, lossIndex: 'q11', loss: 5 },
  { stage: 'After q12 Dispatch',value: 4_583, lossIndex: 'q12', loss: 52 },
  { stage: 'Net Dispatched',    value: 4_565, lossIndex: 'q13', loss: 18 },
];

export const ACTUAL_DISPATCHED = capacityChain[capacityChain.length - 1].value; // 4,565 TPD
export const TOTAL_LOSS = THEORETICAL_CAPACITY - ACTUAL_DISPATCHED; // 935 TPD
export const OVERALL_EFFICIENCY = ((ACTUAL_DISPATCHED / THEORETICAL_CAPACITY) * 100).toFixed(1); // 83.0%
