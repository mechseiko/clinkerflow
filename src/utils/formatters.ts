import type { Status, Priority, ActionStatus } from '../types';

export function formatNumber(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function statusColor(status: Status): string {
  switch (status) {
    case 'operational': return '#10B981';
    case 'warning': return '#F59E0B';
    case 'critical': return '#EF4444';
    case 'offline': return '#64748b';
    default: return '#64748b';
  }
}

export function statusLabel(status: Status): string {
  switch (status) {
    case 'operational': return 'Operational';
    case 'warning': return 'Warning';
    case 'critical': return 'Critical';
    case 'offline': return 'Offline';
    default: return 'Unknown';
  }
}

export function priorityColor(priority: Priority): string {
  switch (priority) {
    case 'Critical': return '#EF4444';
    case 'High': return '#F59E0B';
    case 'Medium': return '#0EA5E9';
    case 'Low': return '#10B981';
    default: return '#64748b';
  }
}

export function actionStatusColor(status: ActionStatus): string {
  switch (status) {
    case 'Open': return '#64748b';
    case 'In Progress': return '#0EA5E9';
    case 'Resolved': return '#10B981';
    default: return '#64748b';
  }
}

export function efficiencyColor(pct: number): string {
  if (pct >= 95) return '#10B981';
  if (pct >= 85) return '#F59E0B';
  return '#EF4444';
}

export function frequencyColor(freq: 'High' | 'Medium' | 'Low'): string {
  switch (freq) {
    case 'High': return '#EF4444';
    case 'Medium': return '#F59E0B';
    case 'Low': return '#10B981';
    default: return '#64748b';
  }
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
