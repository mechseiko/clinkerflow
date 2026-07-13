import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GitBranch,
  TrendingDown,
  BarChart3,
  Search,
  Activity,
  Shield,
  ClipboardList,
  FileText,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
  Package,
  Cpu,
} from 'lucide-react';

const navGroups = [
  {
    title: 'Monitoring',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Executive Overview', id: 'nav-home' },
      { to: '/plant-flow', icon: GitBranch, label: 'Plant Flow', id: 'nav-plant' },
      { to: '/dashboard', icon: BarChart3, label: 'Shift Dashboard', id: 'nav-dashboard' },
      { to: '/packaging', icon: Package, label: 'Packaging & Dispatch', id: 'nav-packaging' },
    ],
  },
  {
    title: 'Analysis',
    items: [
      { to: '/loss-tree', icon: TrendingDown, label: 'Loss Tree Waterfall', id: 'nav-loss' },
      { to: '/root-cause', icon: Search, label: 'Root Cause Explorer', id: 'nav-rootcause' },
    ],
  },
  {
    title: 'Actions & Docs',
    items: [
      { to: '/recommendations', icon: Shield, label: 'Decision Support', id: 'nav-recs' },
      { to: '/actions', icon: ClipboardList, label: 'Operational Tracker', id: 'nav-actions' },
      { to: '/documentation', icon: FileText, label: 'Framework & Docs', id: 'nav-docs' },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    onMobileClose();
  }, [location.pathname]);

  const SidebarContent = ({ isDesktop }: { isDesktop: boolean }) => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1E2536]">
        <div className="w-8 h-8 shrink-0 rounded-lg bg-industrial-blue/10 border border-industrial-blue/30 flex items-center justify-center">
          <Cpu className="w-4 h-4 text-industrial-blue" />
        </div>
        <AnimatePresence>
          {(!isDesktop || !collapsed) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-w-0"
            >
              <div className="font-bold text-white text-sm leading-tight tracking-wide">ClinkerFlow</div>
              <div className="text-[10px] text-slate-500 font-mono tracking-wider"></div>
            </motion.div>
          )}
        </AnimatePresence>
        {!isDesktop && (
          <button
            onClick={onMobileClose}
            className="ml-auto w-7 h-7 rounded-lg bg-[#1A2035] border border-[#1E2536] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto overflow-x-hidden">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {(!isDesktop || !collapsed) && (
              <h5 className="px-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">
                {group.title}
              </h5>
            )}
            {group.items.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  id={item.id}
                  title={isDesktop && collapsed ? item.label : undefined}
                  className={() =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                      ? 'text-industrial-blue bg-industrial-blue/10 border border-industrial-blue/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#1A2035] border border-transparent'
                    }`
                  }
                >
                  <item.icon
                    className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-industrial-blue' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                  />
                  <AnimatePresence>
                    {(!isDesktop || !collapsed) && (
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
          </div>
        ))}
      </nav>

      {/* Live status */}
      <div className="px-4 py-3 border-t border-[#1E2536]">
        <div className="flex items-center gap-2">
          <div className="relative shrink-0">
            <Activity className="w-3.5 h-3.5 text-industrial-green" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-industrial-green animate-pulse" />
          </div>
          <AnimatePresence>
            {(!isDesktop || !collapsed) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[9px] text-slate-500 font-mono leading-tight"
              >
                DEMO
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isDesktop && (
        <button
          id="sidebar-toggle"
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1A2035] border border-[#1E2536] flex items-center justify-center text-slate-400 hover:text-white hover:border-industrial-blue/50 transition-all duration-200 z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      )}
    </>
  );

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative hidden lg:flex flex-col h-full bg-[#080B12] border-r border-[#1E2536] overflow-hidden shrink-0"
      >
        <SidebarContent isDesktop={true} />
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-0 left-0 bottom-0 w-64 flex flex-col bg-[#080B12] border-r border-[#1E2536] z-50 lg:hidden overflow-hidden"
          >
            <SidebarContent isDesktop={false} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
