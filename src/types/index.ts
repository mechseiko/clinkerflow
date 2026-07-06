// ─── Status Types ────────────────────────────────────────────────────────────
export type Status = 'operational' | 'warning' | 'critical' | 'offline';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type ActionStatus = 'Open' | 'In Progress' | 'Resolved';

// ─── KPI ─────────────────────────────────────────────────────────────────────
export interface KPICard {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  trend?: number; // percent change
  trendDir?: 'up' | 'down';
  status?: Status;
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
  throughput: number; // TPD
  targetThroughput: number;
  efficiency: number; // percent
  description: string;
  currentIssues: string[];
  parameters: StageParameter[];
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
  totalLoss: number; // TPD
  percentage: number;
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

// ─── Root Cause ───────────────────────────────────────────────────────────────
export interface RootCauseNode {
  stageId: string;
  stageName: string;
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
  instrumentation: string;
  recommendedInspection: string;
  estimatedDowntime: string;
}

// ─── Recommendations ─────────────────────────────────────────────────────────
export interface Recommendation {
  id: string;
  stageId: string;
  stageName: string;
  priority: Priority;
  title: string;
  bottleneck: string;
  causes: string[];
  actions: string[];
  estimatedGain: number; // TPD
  estimatedCostSaving?: string;
  confidence: number; // percent
}

// ─── Action Matrix ───────────────────────────────────────────────────────────
export interface ActionItem {
  id: string;
  loss: number; // TPD
  lossDescription: string;
  stage: string;
  owner: string;
  department: string;
  priority: Priority;
  status: ActionStatus;
  dueDate: string;
  notes: string;
}

// ─── Chart Data ──────────────────────────────────────────────────────────────
export interface WaterfallDataPoint {
  name: string;
  start: number;
  value: number;
  end: number;
  isTotal?: boolean;
  fill: string;
}

export interface TrendDataPoint {
  date: string;
  actual: number;
  target: number;
  efficiency: number;
}
