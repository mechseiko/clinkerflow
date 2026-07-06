import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Settings, RefreshCw, AlertTriangle } from 'lucide-react';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Executive Summary', subtitle: 'Real-time operational overview' },
  '/plant-flow': { title: 'Plant Flow', subtitle: 'Clinker → Cement conversion visualization' },
  '/loss-tree': { title: 'Loss Tree', subtitle: 'Cumulative production loss analysis' },
  '/dashboard': { title: 'KPI Dashboard', subtitle: 'Key performance indicator deep dive' },
  '/root-cause': { title: 'Root Cause Explorer', subtitle: 'Failure analysis and inspection guide' },
  '/recommendations': { title: 'AI Recommendations', subtitle: 'Prioritized improvement actions' },
  '/actions': { title: 'Action Matrix', subtitle: 'Live action tracker and ownership' },
  '/documentation': { title: 'Documentation Export', subtitle: 'Download reports and presentations' },
};

export function Topbar() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] ?? { title: 'ClinkerFlow', subtitle: '' };
  const [time, setTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <header className="h-14 bg-[#080B12] border-b border-[#1E2536] flex items-center justify-between px-6 shrink-0">
      {/* Page title */}
      <div>
        <h1 className="text-base font-semibold text-white leading-tight">{pageInfo.title}</h1>
        <p className="text-xs text-slate-500">{pageInfo.subtitle}</p>
      </div>

      {/* Center — illustrative banner */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
        <AlertTriangle className="w-3 h-3 text-amber-400" />
        <span className="text-[10px] font-medium text-amber-400 tracking-wide">ILLUSTRATIVE DATA — Competition Prototype</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Live clock */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-mono text-industrial-blue tracking-wider">{formatTime(time)}</span>
          <span className="text-[10px] text-slate-500">{formatDate(time)}</span>
        </div>

        <div className="h-5 w-px bg-[#1E2536]" />

        <button
          id="topbar-refresh"
          onClick={handleRefresh}
          className="w-8 h-8 rounded-lg bg-[#1A2035] border border-[#1E2536] flex items-center justify-center text-slate-400 hover:text-white hover:border-industrial-blue/40 transition-all duration-200"
          title="Refresh data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>

        <button
          id="topbar-alerts"
          className="relative w-8 h-8 rounded-lg bg-[#1A2035] border border-[#1E2536] flex items-center justify-center text-slate-400 hover:text-white hover:border-industrial-blue/40 transition-all duration-200"
          title="Alerts"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        </button>

        <button
          id="topbar-settings"
          className="w-8 h-8 rounded-lg bg-[#1A2035] border border-[#1E2536] flex items-center justify-center text-slate-400 hover:text-white hover:border-industrial-blue/40 transition-all duration-200"
          title="Settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
