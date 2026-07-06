import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { actionItems } from '../data/actionData';
import { formatNumber } from '../utils/formatters';
import type { ActionItem, Priority, ActionStatus } from '../types';

type SortField = keyof Pick<ActionItem, 'loss' | 'priority' | 'status' | 'dueDate' | 'stage' | 'owner'>;

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
          a.department.toLowerCase().includes(q)
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

  const totalLoss = filtered.filter((a) => a.status !== 'Resolved').reduce((s, a) => s + a.loss, 0);
  const openCount = actionItems.filter((a) => a.status === 'Open').length;
  const inProgressCount = actionItems.filter((a) => a.status === 'In Progress').length;
  const resolvedCount = actionItems.filter((a) => a.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Action Matrix</h2>
          <p className="text-sm text-slate-500 mt-0.5">Live action tracker with sortable / filterable columns</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center px-3 py-2 rounded-lg bg-[#1A2035] border border-[#1E2536]">
            <div className="text-lg font-bold font-mono text-slate-300">{openCount}</div>
            <div className="text-[10px] text-slate-500">Open</div>
          </div>
          <div className="text-center px-3 py-2 rounded-lg bg-[#1A2035] border border-[#1E2536]">
            <div className="text-lg font-bold font-mono text-industrial-blue">{inProgressCount}</div>
            <div className="text-[10px] text-slate-500">In Progress</div>
          </div>
          <div className="text-center px-3 py-2 rounded-lg bg-[#1A2035] border border-[#1E2536]">
            <div className="text-lg font-bold font-mono text-industrial-green">{resolvedCount}</div>
            <div className="text-[10px] text-slate-500">Resolved</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            id="action-search"
            type="text"
            placeholder="Search actions, stages, owners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F1320] border border-[#1E2536] rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-industrial-blue/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ActionStatus | 'All')}
            className="bg-[#0F1320] border border-[#1E2536] rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-industrial-blue/50"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select
            id="filter-priority"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Priority | 'All')}
            className="bg-[#0F1320] border border-[#1E2536] rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-industrial-blue/50"
          >
            <option value="All">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div className="text-xs text-slate-500">
        Showing <span className="text-white font-medium">{filtered.length}</span> of {actionItems.length} actions ·
        Active losses: <span className="text-red-400 font-mono font-medium">−{formatNumber(totalLoss)} TPD</span>
      </div>

      {/* Table */}
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-[#1E2536]">
                {[
                  { label: 'Loss Description', field: null },
                  { label: 'Stage', field: 'stage' as SortField },
                  { label: 'Loss (TPD)', field: 'loss' as SortField },
                  { label: 'Owner', field: 'owner' as SortField },
                  { label: 'Priority', field: 'priority' as SortField },
                  { label: 'Status', field: 'status' as SortField },
                  { label: 'Due Date', field: 'dueDate' as SortField },
                ].map((h) => (
                  <th
                    key={h.label}
                    onClick={() => h.field && handleSort(h.field)}
                    className={`text-left px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap ${h.field ? 'cursor-pointer hover:text-slate-300 transition-colors' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      {h.label}
                      {h.field && <SortIcon field={h.field} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className={`border-b border-[#1E2536]/50 hover:bg-[#1A2035]/50 transition-colors ${item.status === 'Resolved' ? 'opacity-60' : ''}`}
                >
                  <td className="px-5 py-3 max-w-xs">
                    <div className="text-slate-300 leading-snug">{item.lossDescription}</div>
                    {item.notes && (
                      <div className="text-[10px] text-slate-600 mt-0.5">{item.notes}</div>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-400 whitespace-nowrap">{item.stage}</td>
                  <td className="px-5 py-3 font-mono whitespace-nowrap">
                    {item.loss > 0 ? (
                      <span className={item.status === 'Resolved' ? 'text-industrial-green line-through' : 'text-red-400'}>
                        {item.status === 'Resolved' ? '' : '−'}{formatNumber(item.loss)}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-slate-300">{item.owner}</div>
                    <div className="text-[10px] text-slate-600">{item.department}</div>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap"><PriorityBadge p={item.priority} /></td>
                  <td className="px-5 py-3 whitespace-nowrap"><StatusBadge s={item.status} /></td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-400 whitespace-nowrap">{item.dueDate}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">No actions match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
