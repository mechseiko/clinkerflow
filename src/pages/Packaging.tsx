import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Activity,
  Cpu,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Barcode,
  AlertCircle,
  RefreshCw,
  TrendingDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { MathFormula } from '../components/ui/MathFormula';
import { lossFormulas } from '../data/frameworkData';

// Mock types/interfaces for this page
interface PackerLine {
  id: number;
  name: string;
  runHours: number;
  nozzlesActive: number;
  nozzlesTotal: number;
  rejectCount: number;
  rejectRate: number; // %
  throughput: number; // bags/hr
  status: 'operational' | 'warning' | 'critical' | 'offline';
  issue?: string;
  nozzleTelemetry: { nozzleId: number; temp: number; state: 'ok' | 'jammed' | 'idle' }[];
}

interface BagStock {
  id: string;
  name: string;
  stock: number;
  threshold: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  poActive: boolean;
  poDetails?: {
    poNumber: string;
    qty: number;
    eta: string;
    status: string;
  };
}

interface GateLog {
  id: string;
  timestamp: string;
  truckPlate: string;
  rfidTag: string;
  action: 'Gate In' | 'Loading Bay' | 'Gate Out';
  payload: string;
  status: 'normal' | 'warning' | 'critical';
}

export function Packaging() {
  // ─── 1. Packer Lines State ───
  const [packerLines, setPackerLines] = useState<PackerLine[]>([
    {
      id: 1,
      name: 'Packer Line 1',
      runHours: 320.5,
      nozzlesActive: 12,
      nozzlesTotal: 12,
      rejectCount: 24,
      rejectRate: 0.18,
      throughput: 1560,
      status: 'operational',
      nozzleTelemetry: [
        { nozzleId: 1, temp: 42, state: 'ok' },
        { nozzleId: 2, temp: 41, state: 'ok' },
        { nozzleId: 3, temp: 43, state: 'ok' },
        { nozzleId: 4, temp: 40, state: 'ok' },
        { nozzleId: 5, temp: 44, state: 'ok' },
        { nozzleId: 6, temp: 42, state: 'ok' },
        { nozzleId: 7, temp: 41, state: 'ok' },
        { nozzleId: 8, temp: 43, state: 'ok' },
        { nozzleId: 9, temp: 42, state: 'ok' },
        { nozzleId: 10, temp: 41, state: 'ok' },
        { nozzleId: 11, temp: 40, state: 'ok' },
        { nozzleId: 12, temp: 41, state: 'ok' },
      ],
    },
    {
      id: 2,
      name: 'Packer Line 2',
      runHours: 280.2,
      nozzlesActive: 10,
      nozzlesTotal: 12,
      rejectCount: 148,
      rejectRate: 1.12,
      throughput: 1280,
      status: 'warning',
      issue: 'Compressor pressure fluctuations (5.8 bar vs 6.5 target)',
      nozzleTelemetry: [
        { nozzleId: 1, temp: 48, state: 'ok' },
        { nozzleId: 2, temp: 49, state: 'ok' },
        { nozzleId: 3, temp: 50, state: 'ok' },
        { nozzleId: 4, temp: 47, state: 'ok' },
        { nozzleId: 5, temp: 52, state: 'ok' },
        { nozzleId: 6, temp: 51, state: 'ok' },
        { nozzleId: 7, temp: 48, state: 'ok' },
        { nozzleId: 8, temp: 49, state: 'ok' },
        { nozzleId: 9, temp: 50, state: 'ok' },
        { nozzleId: 10, temp: 51, state: 'ok' },
        { nozzleId: 11, temp: 31, state: 'idle' },
        { nozzleId: 12, temp: 32, state: 'idle' },
      ],
    },
    {
      id: 3,
      name: 'Packer Line 3',
      runHours: 195.4,
      nozzlesActive: 0,
      nozzlesTotal: 12,
      rejectCount: 0,
      rejectRate: 0,
      throughput: 0,
      status: 'offline',
      issue: 'Bag feeder magazine jam at throat entry',
      nozzleTelemetry: Array.from({ length: 12 }, (_, idx) => ({
        nozzleId: idx + 1,
        temp: 24,
        state: 'idle',
      })),
    },
    {
      id: 4,
      name: 'Packer Line 4',
      runHours: 410.8,
      nozzlesActive: 12,
      nozzlesTotal: 12,
      rejectCount: 382,
      rejectRate: 3.20,
      throughput: 1420,
      status: 'critical',
      issue: 'Spout liner wear causing rejections (0.35 Mta loss equivalent)',
      nozzleTelemetry: [
        { nozzleId: 1, temp: 58, state: 'ok' },
        { nozzleId: 2, temp: 59, state: 'ok' },
        { nozzleId: 3, temp: 62, state: 'ok' },
        { nozzleId: 4, temp: 57, state: 'ok' },
        { nozzleId: 5, temp: 65, state: 'ok' },
        { nozzleId: 6, temp: 64, state: 'ok' },
        { nozzleId: 7, temp: 58, state: 'ok' },
        { nozzleId: 8, temp: 59, state: 'ok' },
        { nozzleId: 9, temp: 62, state: 'ok' },
        { nozzleId: 10, temp: 64, state: 'ok' },
        { nozzleId: 11, temp: 68, state: 'jammed' },
        { nozzleId: 12, temp: 69, state: 'jammed' },
      ],
    },
  ]);

  const [clearingJam, setClearingJam] = useState(false);
  const [jamClearedMsg, setJamClearedMsg] = useState(false);

  const handleClearJam = () => {
    setClearingJam(true);
    setTimeout(() => {
      setPackerLines((prev) =>
        prev.map((line) =>
          line.id === 3
            ? {
              ...line,
              status: 'operational',
              nozzlesActive: 12,
              throughput: 1510,
              issue: undefined,
              nozzleTelemetry: Array.from({ length: 12 }, (_, idx) => ({
                nozzleId: idx + 1,
                temp: 41,
                state: 'ok',
              })),
            }
            : line
        )
      );
      setClearingJam(false);
      setJamClearedMsg(true);
      setTimeout(() => setJamClearedMsg(false), 4000);
    }, 1800);
  };

  // ─── 2. Bag Stock State ───
  const [bagStocks, setBagStocks] = useState<BagStock[]>([
    {
      id: 'opc',
      name: 'OPC 42.5R Empty Bags',
      stock: 12000,
      threshold: 25000,
      unit: 'bags',
      status: 'critical',
      poActive: true,
      poDetails: {
        poNumber: 'PO-2026-0713-09',
        qty: 50000,
        eta: '2.5 Hours',
        status: 'In Transit',
      },
    },
    {
      id: 'pp_woven',
      name: 'Woven PP Laminated Bags',
      stock: 45200,
      threshold: 20000,
      unit: 'bags',
      status: 'normal',
      poActive: false,
    },
    {
      id: 'sulfacrete',
      name: 'Sulfacrete Empty Bags',
      stock: 9500,
      threshold: 10000,
      unit: 'bags',
      status: 'warning',
      poActive: true,
      poDetails: {
        poNumber: 'PO-2026-0713-02',
        qty: 20000,
        eta: 'Tomorrow',
        status: 'Approved',
      },
    },
  ]);

  const [deliveringStock, setDeliveringStock] = useState(false);
  const [deliveryMsg, setDeliveryMsg] = useState(false);

  const handleDeliverStock = () => {
    setDeliveringStock(true);
    setTimeout(() => {
      setBagStocks((prev) =>
        prev.map((item) =>
          item.id === 'opc'
            ? {
              ...item,
              stock: item.stock + 50000,
              status: 'normal',
              poActive: false,
              poDetails: undefined,
            }
            : item
        )
      );
      setDeliveringStock(false);
      setDeliveryMsg(true);
      setTimeout(() => setDeliveryMsg(false), 4000);
    }, 1500);
  };

  // ─── 3. RFID / Gate Logs State ───
  const [gateLogs, setGateLogs] = useState<GateLog[]>([
    {
      id: 'log-1',
      timestamp: '21:58:12',
      truckPlate: 'DAN-9081-LG',
      rfidTag: 'RF-908123',
      action: 'Gate Out',
      payload: '30.1 tonnes (OPC 50kg bags)',
      status: 'normal',
    },
    {
      id: 'log-2',
      timestamp: '21:55:04',
      truckPlate: 'DAN-4102-KD',
      rfidTag: 'RF-410287',
      action: 'Loading Bay',
      payload: 'Under Loading - Bay 1 (94% complete)',
      status: 'normal',
    },
    {
      id: 'log-3',
      timestamp: '21:49:15',
      truckPlate: 'DAN-1283-DT',
      rfidTag: 'RF-128309',
      action: 'Gate In',
      payload: 'Tare weight recorded (12.4 tonnes)',
      status: 'normal',
    },
    {
      id: 'log-4',
      timestamp: '21:41:40',
      truckPlate: 'DAN-7712-LA',
      rfidTag: 'RF-771204',
      action: 'Loading Bay',
      payload: 'Under Loading - Bay 2 (calibration alert)',
      status: 'warning',
    },
  ]);

  // Feed in a new log every 8 seconds automatically to simulate real-time
  useEffect(() => {
    const plates = ['DAN-2311-AB', 'DAN-8812-DT', 'DAN-9908-LG', 'DAN-1044-KD', 'DAN-7301-LA'];
    const rfidTags = ['RF-231190', 'RF-881242', 'RF-990883', 'RF-104421', 'RF-730109'];
    const actions = ['Gate In', 'Loading Bay', 'Gate Out'] as const;
    const payloads = [
      'Tare weight recorded (11.8 tonnes)',
      'Under Loading - Bay 1 (25% complete)',
      '30.2 tonnes (Woven PP 50kg bags)',
    ];

    const interval = setInterval(() => {
      const plate = plates[Math.floor(Math.random() * plates.length)];
      const rfid = rfidTags[Math.floor(Math.random() * rfidTags.length)];
      const actionIdx = Math.floor(Math.random() * actions.length);
      const action = actions[actionIdx];
      const payload = payloads[actionIdx];

      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];

      const newLog: GateLog = {
        id: `log-${Date.now()}`,
        timestamp: timeString,
        truckPlate: plate,
        rfidTag: rfid,
        action,
        payload,
        status: action === 'Loading Bay' && Math.random() > 0.7 ? 'warning' : 'normal',
      };

      setGateLogs((prev) => [newLog, ...prev.slice(0, 5)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // ─── 4. Stage Deficit Loss Roll-Up ───
  const lossItems = [
    {
      index: '5a',
      name: 'Packer Line Downtime & Jams',
      loss: 0.80,
      formula: 'Loss = Q_line_capacity × T_downtime',
      desc: 'Line 3 offline due to feeder throat jam.',
      severity: 'critical' as const,
    },
    {
      index: '5b',
      name: 'Rejection & Pressure Loss',
      loss: 0.65,
      formula: 'Loss = Q_in × R_reject + Q_pressure_drop',
      desc: 'Line 4 spout liner wear and Line 2 compressor fluctuations.',
      severity: 'warning' as const,
    },
    {
      index: '6a',
      name: 'Dispatch Turnaround Delays',
      loss: 0.75,
      formula: 'Loss = C_dispatch × (1 − η_dispatch)',
      desc: '42 min turnaround time vs 30 min target (slowing dispatcher rate).',
      severity: 'warning' as const,
    },
    {
      index: '6b',
      name: 'Weighbridge & Logistics Congestion',
      loss: 0.45,
      formula: 'Loss = ΔW_truck × N_trucks + Queue_delays',
      desc: 'Bay 2 scale discrepancy and external queue backlog.',
      severity: 'warning' as const,
    },
  ];

  const totalDownstreamLoss = lossItems.reduce((sum, item) => sum + item.loss, 0);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-industrial-blue" />
            Packaging & Dispatch Chain Monitoring
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-normal">
            <span className="text-industrial-blue font-semibold">Supply Sufficiency Ratio (SSR) Monitoring</span> ·
            A lightweight monitoring layer over the Packing and Dispatch chain to track downstream bottlenecks and resolve exceptions before they cascade upstream.
          </p>
        </div>
      </div>

      {/* Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="panel p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Chain Deficit Roll-Up
            </span>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1.5">
              −{totalDownstreamLoss.toFixed(2)} <span className="text-xs text-slate-500 font-normal">Mta</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 pt-2 border-t border-[#1E2536] mt-2 block">
            Buckets 5 & 6 (Packing & Logistics)
          </span>
        </div>

        <div className="panel p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Packer Line Status
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-1.5 flex items-baseline gap-1">
              {packerLines.filter(l => l.status === 'operational').length}
              <span className="text-xs text-slate-500 font-normal">/ {packerLines.length} Active</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 pt-2 border-t border-[#1E2536] mt-2 block">
            1 Line Offline, 2 In warning/critical
          </span>
        </div>

        <div className="panel p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Bag Stock Alerts
            </span>
            <div className={`text-2xl font-bold font-mono mt-1.5 flex items-baseline gap-1 ${bagStocks.some(s => s.status === 'critical') ? 'text-red-400' : 'text-amber-400'
              }`}>
              {bagStocks.filter(s => s.status !== 'normal').length}
              <span className="text-xs text-slate-500 font-normal"> Alerts Triggered</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 pt-2 border-t border-[#1E2536] mt-2 block">
            Procurement linked system active
          </span>
        </div>

        <div className="panel p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Weighbridge Traffic
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-1.5">
              13.5 <span className="text-xs text-slate-500 font-normal">trucks/hr</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 pt-2 border-t border-[#1E2536] mt-2 block">
            Avg Turnaround: 42 min vs 30m target
          </span>
        </div>
      </div>

      {/* Section 1: Packer Monitoring */}
      <div className="panel p-5 space-y-4">
        <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-industrial-blue" />
            <span className="text-xs font-bold font-mono text-slate-400 uppercase">
              Packer Nozzle Monitoring & Run-Hour meters
            </span>
          </div>
          <div className="flex gap-2">
            {packerLines.find(l => l.id === 3)?.status === 'offline' && (
              <button
                onClick={handleClearJam}
                disabled={clearingJam}
                className="px-2.5 py-1 text-[11px] font-mono font-bold rounded bg-industrial-blue/10 hover:bg-industrial-blue/20 text-industrial-blue border border-industrial-blue/30 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${clearingJam ? 'animate-spin' : ''}`} />
                {clearingJam ? 'Clearing Line 3 Jam...' : 'Simulate Line 3 Jam Clearance'}
              </button>
            )}
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {jamClearedMsg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-3 bg-green-500/10 border border-green-500/25 rounded text-green-400 text-xs flex items-center gap-2 overflow-hidden"
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>
                <strong>Feeder Throat Jam Cleared successfully!</strong> Packer Line 3 is returning to <strong>Operational</strong> status. Nozzle temperature nominal.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {packerLines.map((line) => {
            const isOffline = line.status === 'offline';
            const isCritical = line.status === 'critical';
            const isWarning = line.status === 'warning';

            const cardBorder = isOffline ? 'border-red-900/40 bg-red-950/5' : isCritical ? 'border-red-500/30' : isWarning ? 'border-amber-500/30' : 'border-[#1E2536]';
            const statusLabelColor = isOffline || isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-green-400';

            return (
              <div key={line.id} className={`p-4 rounded-lg border ${cardBorder} space-y-4`}>
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {line.name}
                      <span className={`w-1.5 h-1.5 rounded-full ${isOffline || isCritical ? 'bg-red-500 animate-pulse' : isWarning ? 'bg-amber-500 animate-pulse' : 'bg-green-500'
                        }`} />
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Run-Hour Meter: <strong className="text-slate-300">{line.runHours.toFixed(1)} hrs</strong>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">THROUGHPUT</span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {line.throughput} <span className="text-[9px] font-normal text-slate-500">bags/hr</span>
                    </span>
                  </div>
                </div>

                {/* Alarm Message */}
                {line.issue && (
                  <div className={`p-2.5 rounded text-[11px] leading-normal flex items-start gap-1.5 ${isOffline || isCritical ? 'bg-red-950/20 text-red-300 border border-red-900/30' : 'bg-amber-950/20 text-amber-300 border border-amber-900/30'
                    }`}>
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{line.issue}</span>
                  </div>
                )}

                {/* Nozzles status visual representation */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                      Rotary packer Nozzles state & reject-frequency sensors
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Rejection Rate: <span className={line.rejectRate > 2 ? 'text-red-400 font-bold' : 'text-slate-300'}>{line.rejectRate.toFixed(2)}%</span>
                    </span>
                  </div>

                  {/* 12 dots representing packer nozzles */}
                  <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 pt-1">
                    {line.nozzleTelemetry.map((n) => {
                      const dotBg = n.state === 'jammed' ? 'bg-red-500 shadow-[0_0_6px_#EF4444]' : n.state === 'idle' ? 'bg-slate-700' : 'bg-green-500 shadow-[0_0_6px_#10B981]';
                      return (
                        <div
                          key={n.nozzleId}
                          title={`Nozzle ${n.nozzleId}: ${n.temp}°C [${n.state.toUpperCase()}]`}
                          className="flex flex-col items-center justify-center p-1.5 bg-[#080B12] rounded border border-[#1E2536] hover:border-slate-600 transition-colors cursor-help"
                        >
                          <div className={`w-2.5 h-2.5 rounded-full ${dotBg}`} />
                          <span className="text-[8px] font-mono text-slate-500 mt-1 font-bold">N{n.nozzleId}</span>
                          <span className="text-[8px] font-mono text-slate-400">{n.temp}°</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Bag Stock & Weighbridge RFID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bag-Stock Alerts Widget */}
        <div className="panel p-5 space-y-4">
          <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-industrial-blue" />
              <span className="text-xs font-bold font-mono text-slate-400 uppercase">
                Empty Bag Inventory & Automated Procurement Alerts
              </span>
            </div>
            {bagStocks.some(b => b.id === 'opc' && b.status === 'critical') && (
              <button
                onClick={handleDeliverStock}
                disabled={deliveringStock}
                className="px-2.5 py-1 text-[11px] font-mono font-bold rounded bg-industrial-blue/10 hover:bg-industrial-blue/20 text-industrial-blue border border-industrial-blue/30 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Truck className="w-3.5 h-3.5" />
                {deliveringStock ? 'Receiving Bags...' : 'Simulate Bag Delivery'}
              </button>
            )}
          </div>

          <AnimatePresence>
            {deliveryMsg && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-3 bg-green-500/10 border border-green-500/25 rounded text-green-400 text-xs flex items-center gap-2 overflow-hidden"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Stock Replenishment Received:</strong> 50,000 bags added to OPC inventory. Procurement alert reset.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {bagStocks.map((item) => {
              const fillPercent = Math.min(100, Math.round((item.stock / 60000) * 100));
              const progressColor = item.status === 'critical' ? 'bg-red-500' : item.status === 'warning' ? 'bg-amber-500' : 'bg-green-500';
              const borderCol = item.status === 'critical' ? 'border-red-900/50 bg-red-950/5' : item.status === 'warning' ? 'border-amber-900/50' : 'border-[#1E2536]';

              return (
                <div key={item.id} className={`p-4 rounded-lg border ${borderCol} space-y-3`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">{item.name}</h5>
                      <span className="text-[9px] font-mono text-slate-500">
                        Safety Stock Reorder Threshold: <strong>{item.threshold.toLocaleString()} bags</strong>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm font-mono font-bold block ${item.status === 'critical' ? 'text-red-400' : item.status === 'warning' ? 'text-amber-400' : 'text-slate-300'
                        }`}>
                        {item.stock.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">bags</span>
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        {item.status === 'critical' ? 'ALERT: CRITICAL LOW' : item.status === 'warning' ? 'ALERT: REORDER REACHED' : 'STOCK SUFFICIENT'}
                      </span>
                    </div>
                  </div>

                  {/* Stock Bar */}
                  <div className="h-2 bg-[#161B2B] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>

                  {/* Connected procurement log */}
                  {item.poActive && item.poDetails && (
                    <div className="p-2 bg-[#080B12] rounded border border-[#1E2536] text-[10px] font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Linked Order:</span>
                        <span className="text-industrial-blue font-bold">{item.poDetails.poNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Quantity Scheduled:</span>
                        <span className="text-slate-300">{item.poDetails.qty.toLocaleString()} {item.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Supplier ETA:</span>
                        <span className="text-amber-400 font-bold">{item.poDetails.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Delivery Status:</span>
                        <span className="text-green-400 font-bold">{item.poDetails.status}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weighbridge & RFID gate logs */}
        <div className="panel p-5 space-y-4 flex flex-col justify-between">
          <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536]">
            <div className="flex items-center gap-2">
              <Barcode className="w-4 h-4 text-industrial-blue" />
              <span className="text-xs font-bold font-mono text-slate-400 uppercase">
                Weighbridge Telemetry & Live RFID Gate Logs
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 animate-pulse">LIVE TRACKING</span>
          </div>

          <div className="space-y-4 flex-1">
            {/* Weighbridge Status cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#080B12] border border-[#1E2536]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">WEIGHBRIDGE BAY 1</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#10B981]" />
                </div>
                <div className="mt-1.5">
                  <span className="text-base font-mono font-bold text-white">9.0 <span className="text-[10px] text-slate-500 font-normal">trucks/hr</span></span>
                  <p className="text-[9px] text-slate-500 mt-1">Transaction Turnaround: <strong>5.8 min</strong></p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#080B12] border border-amber-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">WEIGHBRIDGE BAY 2</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#F59E0B] animate-pulse" />
                </div>
                <div className="mt-1.5">
                  <span className="text-base font-mono font-bold text-amber-400">4.5 <span className="text-[10px] text-slate-500 font-normal">trucks/hr</span></span>
                  <p className="text-[9px] text-amber-500/80 mt-1">
                    <strong>Calibration Overdue</strong> (Turnaround 11.2m)
                  </p>
                </div>
              </div>
            </div>

            {/* Live Feed list */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                Recent RFID Dispatch activity logs
              </span>

              <div className="space-y-2 max-h-[220px] md:max-h-[400px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {gateLogs.map((log) => {
                    const isWarning = log.status === 'warning';
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2.5 rounded bg-[#080B12] border text-[11px] flex items-center justify-between gap-3 ${isWarning ? 'border-amber-500/20 bg-amber-950/5' : 'border-[#1E2536]'
                          }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1 rounded bg-[#0F1320] border border-[#1E2536] shrink-0 text-slate-400">
                            <Truck className="w-3.5 h-3.5 text-industrial-blue" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-bold text-slate-200">{log.truckPlate}</span>
                              <span className="text-[9px] text-slate-500 font-mono">[{log.rfidTag}]</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate">{log.payload}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold block ${log.action === 'Gate Out' ? 'text-green-400 bg-green-500/10' :
                            log.action === 'Loading Bay' ? 'text-industrial-blue bg-industrial-blue/10' :
                              'text-slate-400 bg-slate-500/10'
                            }`}>
                            {log.action}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 mt-1 block">{log.timestamp}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ClinkerFlow Dashboard Section (Loss Rollup) */}
      <div className="panel p-5 space-y-4">
        <div className="panel-header -mx-5 -mt-5 pb-3 px-5 border-b border-[#1E2536]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-industrial-blue" />
            <span className="text-xs font-bold font-mono text-slate-400 uppercase">
              ClinkerFlow Dashboard: Downstream OEE Loss Rollup bridge
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 font-bold bg-[#1A2035] border border-[#1E2536] px-2 py-0.5 rounded">
            Daily Review Board
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-normal max-w-3xl">
          This bridge rolls up individual downstream stage OEE losses to output the net deviation against the clinker production target. These figures feed directly into the main <strong>Master Loss Tree</strong> for daily plant reviews.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pt-2">
          {/* Chart block */}
          <div className="xl:col-span-8 space-y-3.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
              Stage Deficit Contribution Breakdown
            </span>

            <div className="space-y-4">
              {lossItems.map((item) => {
                const percentage = Math.round((item.loss / 2.65) * 100);
                const barColor = item.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500';
                return (
                  <div key={item.index} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold flex items-center gap-1.5">
                        <span className="text-industrial-blue">{item.index.toUpperCase()}</span> · {item.name}
                      </span>
                      <span className="text-red-400 font-bold">
                        −{item.loss.toFixed(2)} Mta ({percentage}%)
                      </span>
                    </div>

                    <div className="h-3 bg-[#0F1320] border border-[#1E2536] rounded-full overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 flex-wrap">
                      Formula: <MathFormula math={lossFormulas.find((lf) => lf.index === item.index)?.formula || item.formula} className="text-[#10B981]" /> · {item.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summarizer block */}
          <div className="xl:col-span-4 p-4 rounded-lg bg-[#080B12] border border-[#1E2536] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Total Downstream Deficit
              </span>
              <div className="text-3xl font-bold font-mono text-red-500">
                −2.65 <span className="text-sm font-normal text-slate-500 font-sans">Mta</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                This represents the combined annual capacity loss from packaging and dispatch inefficiency. Resolving Packer Line 3's jam restores <strong>0.80 Mta</strong> immediately, closing nearly a third of the downstream loss gap.
              </p>
            </div>

            <div className="border-t border-[#1E2536] pt-3 flex flex-col gap-2">
              <a
                href="/loss-tree"
                className="text-[11px] font-mono font-bold text-industrial-blue hover:text-white flex items-center gap-1.5 transition-colors"
              >
                Go to Waterfall Loss Tree
                <ArrowRight className="w-3 h-3" />
              </a>
              <a
                href="/recommendations"
                className="text-[11px] font-mono font-bold text-industrial-blue hover:text-white flex items-center gap-1.5 transition-colors"
              >
                View Action Plan & Decision Support
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
