// ─── Status Types ────────────────────────────────────────────────────────────
export type Status = 'operational' | 'warning' | 'critical' | 'offline';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type ActionStatus = 'Open' | 'In Progress' | 'Resolved';
export type ActionHorizon = 'Immediate' | 'Short-term' | 'Long-term';

// ─── KPI ─────────────────────────────────────────────────────────────────────
export interface KPICard {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: number; // percent change
  trendDir?: 'up' | 'down';
  status?: Status;
  formulaRef?: string; // e.g. "η_conv = Q_actual / Q_theoretical"
}

export interface DailyKPI {
  date: string;
  output: number;
  target: number;
  efficiency: number;
  loss: number;
}

// ─── Plant Stage ─────────────────────────────────────────────────────────────
export interface PlantStage {
  id: string;
  name: string;
  label: string;
  status: Status;
  throughput: number; // TPD (illustrative)
  targetThroughput: number;
  efficiency: number; // percent
  description: string;
  operationalRole: string;
  primaryLoss: string;
  lossMechanisms: string[];
  inputMaterial: string;
  outputMaterial: string;
  unitOfMeasure: string;
  formulaRef: string;
  currentIssues: string[];
  parameters: StageParameter[];
  instrumentation: string[];
  typicalKPIs: string[];
  relatedLossIndex: string; // e.g. "q3"
  relatedDashboard: string;
  relatedRootCauses: string[];
  x: number;
  y: number;
}

export interface StageParameter {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface FlowConnection {
  from: string;
  to: string;
  throughput: number;
  status: Status;
}

// ─── Loss Tree ───────────────────────────────────────────────────────────────
export interface LossEntry {
  stage: string;
  stageId: string;
  lossIndex: string; // e.g. "q1", "q2"
  totalLoss: number; // TPD (illustrative)
  percentage: number;
  formula: string; // e.g. "q1 = Q_th × (1 − η_kiln)"
  variables: FormulaVariable[];
  engineeringInterpretation: string;
  operationalExplanation: string;
  assumptions: string[];
  exampleCalculation: string;
  causes: LossCause[];
}

export interface LossCause {
  id: string;
  description: string;
  loss: number; // TPD
  owner: string;
  priority: Priority;
  actions: string[];
}

export interface FormulaVariable {
  symbol: string;
  description: string;
  unit: string;
  illustrativeValue?: string;
}

// ─── Framework Data ───────────────────────────────────────────────────────────
export interface LossFormula {
  index: string; // "q1" ... "q13"
  name: string;
  stageId: string;
  formula: string;
  variables: FormulaVariable[];
  engineeringInterpretation: string;
  benchmarkRange: string;
  references: string[];
  assumptions: string[];
  exampleCalc: string;
}

export interface EngineeringAssumption {
  id: string;
  category: string;
  assumption: string;
  basis: string;
}

export interface FrameworkStage {
  index: number;
  stageId: string;
  name: string;
  lossIndex: string;
  conversionStep: string;
  inputUnit: string;
  outputUnit: string;
}

// ─── Root Cause ───────────────────────────────────────────────────────────────
export interface RootCauseNode {
  stageId: string;
  stageName: string;
  lossIndex: string;
  lossMechanism: string;
  failureCategories: FailureCategory[];
}

export interface FailureCategory {
  id: string;
  name: string;
  frequency: 'High' | 'Medium' | 'Low';
  failures: MechanicalFailure[];
}

export interface MechanicalFailure {
  id: string;
  reason: string;
  mechanicalExplanation: string;
  processExplanation: string;
  instrumentation: string;
  howToVerify: string;
  typicalCorrectiveAction: string;
  estimatedDowntime: string;
  literatureRef: string;
}

// ─── Recommendations ─────────────────────────────────────────────────────────
export interface Recommendation {
  id: string;
  stageId: string;
  stageName: string;
  lossIndex: string;
  priority: Priority;
  horizon: ActionHorizon;
  title: string;
  lossMechanism: string;
  causes: string[];
  actions: string[];
  department: string;
  expectedBenefit: string; // engineering metric, e.g. "+80 TPD throughput"
  operationalImpact: string;
  estimatedGain: number; // TPD (illustrative)
  priorityRationale: string;
}

// ─── Action Matrix ───────────────────────────────────────────────────────────
export interface ActionItem {
  id: string;
  lossIndex: string; // e.g. "q5"
  loss: number; // TPD (illustrative)
  lossDescription: string;
  stage: string;
  owner: string;
  department: string;
  priority: Priority;
  status: ActionStatus;
  timeframe: string; // e.g. "Immediate", "1–3 days"
  dueDate: string;
  verificationMethod: string;
  kpiAffected: string;
  notes: string;
}

// ─── Chart Data ──────────────────────────────────────────────────────────────
export interface WaterfallDataPoint {
  name: string;
  lossIndex?: string;
  start: number;
  value: number;
  end: number;
  isTotal?: boolean;
  fill: string;
  formula?: string;
}

export interface TrendDataPoint {
  date: string;
  actual: number;
  target: number;
  efficiency: number;
}

export interface RadarDataPoint {
  stage: string;
  availability: number;
  benchmark: number;
}
