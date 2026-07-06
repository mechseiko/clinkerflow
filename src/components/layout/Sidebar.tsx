import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GitBranch,
  TrendingDown,
  BarChart3,
  Search,
  Lightbulb,
  ClipboardList,
  FileDown,
  ChevronLeft,
  ChevronRight,
  Activity,
  Zap,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Executive Summary', id: 'nav-home' },
  { to: '/plant-flow', icon: GitBranch, label: 'Plant Flow', id: 'nav-plant' },
  { to: '/loss-tree', icon: TrendingDown, label: 'Loss Tree', id: 'nav-loss' },
  { to: '/dashboard', icon: BarChart3, label: 'KPI Dashboard', id: 'nav-dashboard' },
  { to: '/root-cause', icon: Search, label: 'Root Cause Explorer', id: 'nav-rootcause' },
  { to: '/recommendations', icon: Lightbulb, label: 'Recommendations', id: 'nav-recs' },
  { to: '/actions', icon: ClipboardList, label: 'Action Matrix', id: 'nav-actions' },
  { to: '/documentation', icon: FileDown, label: 'Documentation', id: 'nav-docs' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-[#080B12] border-r border-[#1E2536] overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1E2536]">
        <div className="w-8 h-8 shrink-0 rounded-lg bg-industrial-blue/10 border border-industrial-blue/30 flex items-center justify-center">
          <Zap className="w-4 h-4 text-industrial-blue" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-bold text-white text-sm leading-tight tracking-wide">ClinkerFlow</div>
              <div className="text-[10px] text-slate-500 font-mono tracking-wider">DCP INTELLIGENCE</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              id={item.id}
              title={collapsed ? item.label : undefined}
              className={() =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'text-industrial-blue bg-industrial-blue/10 border border-industrial-blue/20'
                    : 'text-slate-400 hover:text-white hover:bg-[#1A2035] border border-transparent'
                }`
              }
            >
              <item.icon
                className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-industrial-blue' : 'text-slate-500 group-hover:text-slate-300'}`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Live indicator */}
      <div className="px-4 py-3 border-t border-[#1E2536]">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="w-3.5 h-3.5 text-industrial-green" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-industrial-green animate-pulse" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-slate-500 font-mono"
              >
                LIVE — ILLUSTRATIVE DATA
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        id="sidebar-toggle"
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1A2035] border border-[#1E2536] flex items-center justify-center text-slate-400 hover:text-white hover:border-industrial-blue/50 transition-all duration-200 z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
