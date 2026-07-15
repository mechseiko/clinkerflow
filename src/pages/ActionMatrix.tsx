import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { actionItems } from '../data/actionData';
import { formatNumber } from '../utils/formatters';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import type { ActionItem, Priority, ActionStatus } from '../types';

type SortField = keyof Pick<ActionItem, 'loss' | 'priority' | 'status' | 'dueDate' | 'stage' | 'owner' | 'lossIndex'>;

const PRIORITY_ORDER: Record<Priority, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
const STATUS_ORDER: Record<ActionStatus, number> = { Open: 0, 'In Progress': 1, Resolved: 2 };

function PriorityBadge({ p }: { p: Priority }) {
  const cls = p === 'Critical' ? 'badge-critical' : p === 'High' ? 'badge-high' : p === 'Medium' ? 'badge-medium' : 'badge-open';
  return <span className={cls}>{p}</span>;
}

function StatusBadge({ s }: { s: ActionStatus }) {
  const cls = s === 'Open' ? 'badge-open' : s === 'In Progress' ? 'badge-in-progress' : 'badge-resolved';
  return <span className={cls}>{s}</span>;
}

export function ActionMatrix() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('loss');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<ActionStatus | 'All'>('All');
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('desc'); }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 text-slate-600" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-industrial-blue" /> : <ChevronDown className="w-3 h-3 text-industrial-blue" />;
  };

  const filtered = useMemo(() => {
    let items = [...actionItems];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (a) =>
          a.lossDescription.toLowerCase().includes(q) ||
          a.stage.toLowerCase().includes(q) ||
          a.owner.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q) ||
          a.lossIndex.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== 'All') items = items.filter((a) => a.status === filterStatus);
    if (filterPriority !== 'All') items = items.filter((a) => a.priority === filterPriority);

    items.sort((a, b) => {
      let av: number | string, bv: number | string;
      if (sortField === 'loss') { av = a.loss; bv = b.loss; }
      else if (sortField === 'priority') { av = PRIORITY_ORDER[a.priority]; bv = PRIORITY_ORDER[b.priority]; }
      else if (sortField === 'status') { av = STATUS_ORDER[a.status]; bv = STATUS_ORDER[b.status]; }
      else { av = String(a[sortField]); bv = String(b[sortField]); }

      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return items;
  }, [search, sortField, sortDir, filterStatus, filterPriority]);

  const activeLossTotal = filtered.filter((a) => a.status !== 'Resolved').reduce((s, a) => s + a.loss, 0);
  const openCount = actionItems.filter((a) => a.status === 'Open').length;
  const inProgressCount = actionItems.filter((a) => a.status === 'In Progress').length;
  const resolvedCount = actionItems.filter((a) => a.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      {/* <DisclaimerBanner /> */}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white">Operational Action Tracker</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status tracking for conversion chain capacity recovery items
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <div className="text-center px-3 py-2 rounded-lg bg-[#1A2035] border border-[#1E2536]">
            <div className="text-sm font-bold font-mono text-slate-300">{openCount}</div>
            <div className="text-[9px] text-slate-500 font-mono uppercase">Open</div>
          </div>
          <div className="text-center px-3 py-2 rounded-lg bg-[#1A2035] border border-[#1E2536]">
            <div className="text-sm font-bold font-mono text-industrial-blue">{inProgressCount}</div>
            <div className="text-[9px] text-slate-500 font-mono uppercase">Active</div>
          </div>
          <div className="text-center px-3 py-2 rounded-lg bg-[#1A2035] border border-[#1E2536]">
            <div className="text-sm font-bold font-mono text-industrial-green">{resolvedCount}</div>
            <div className="text-[9px] text-slate-500 font-mono uppercase">Resolved</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            id="action-search"
            type="text"
            placeholder="Search descriptions, stages, owners, loss index..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F1320] border border-[#1E2536] rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-650 focus:outline-none focus:border-industrial-blue/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ActionStatus | 'All')}
            className="bg-[#0F1320] border border-[#1E2536] rounded-lg px-3 py-2 text-xs text-slate-350 focus:outline-none focus:border-industrial-blue/50"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            id="filter-priority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Priority | 'All')}
            className="bg-[#0F1320] border border-[#1E2536] rounded-lg px-3 py-2 text-xs text-slate-350 focus:outline-none focus:border-industrial-blue/50"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="text-xs text-slate-500 font-mono">
        Showing <span className="text-white font-medium">{filtered.length}</span> of {actionItems.length} actions · Active capacity shortfall: <span className="text-red-400 font-medium">−{formatNumber(activeLossTotal)} TPD</span>
      </div>

      {/* Desktop Table view */}
      <div className="panel overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[950px]">
            <thead>
              <tr className="border-b border-[#1E2536]">
                {[
                  { label: 'Loss Index', field: 'lossIndex' as SortField },
                  { label: 'Description', field: null },
                  { label: 'Stage', field: 'stage' as SortField },
                  { label: 'TPD Shortfall', field: 'loss' as SortField },
                  { label: 'Ownership', field: 'owner' as SortField },
                  { label: 'Priority', field: 'priority' as SortField },
                  { label: 'Status', field: 'status' as SortField },
                  { label: 'Verification Method', field: null },
                ].map((h) => (
                  <th
                    key={h.label}
                    onClick={() => h.field && handleSort(h.field)}
                    className={`text-left px-4 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap ${h.field ? 'cursor-pointer hover:text-slate-300' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      {h.label}
                      {h.field && <SortIcon field={h.field} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2536]/30">
              {filtered.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`hover:bg-[#1A2035]/20 transition-colors ${item.status === 'Resolved' ? 'opacity-50' : ''}`}
                >
                  <td className="px-4 py-3 font-mono font-bold text-indigo-400 whitespace-nowrap">{item.lossIndex}</td>
                  <td className="px-4 py-3 max-w-xs text-slate-200">{item.lossDescription}</td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{item.stage}</td>
                  <td className="px-4 py-3 font-mono whitespace-nowrap font-bold text-red-400">
                    {item.status === 'Resolved' ? <span className="text-emerald-400">Resolved</span> : `−${formatNumber(item.loss)}`}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-slate-300">{item.owner}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{item.department}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><PriorityBadge p={item.priority} /></td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge s={item.status} /></td>
                  <td className="px-4 py-3 max-w-xs text-slate-400 text-[11px] leading-relaxed">{item.verificationMethod}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card view */}
      <div className="md:hidden space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className={`panel p-4 space-y-3 ${item.status === 'Resolved' ? 'opacity-50' : ''}`}>
            <div className="flex justify-between items-start gap-2">
              <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                {item.lossIndex} · {item.stage}
              </span>
              <PriorityBadge p={item.priority} />
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">{item.lossDescription}</p>
            <div className="bg-[#080B12] rounded p-2.5 border border-[#1E2536] text-[11px]">
              <span className="text-[9px] text-slate-500 font-mono block uppercase">Verification Method</span>
              <p className="text-slate-400 leading-normal mt-0.5">{item.verificationMethod}</p>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono">Owner: <strong className="text-slate-300">{item.owner}</strong></span>
              <StatusBadge s={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
