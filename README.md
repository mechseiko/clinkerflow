# ClinkerFlow

## About
**From Clinker to Cement, Optimized.**
An integrated operational intelligence framework that maps, measures, and optimizes every stage of clinker-to-cement conversion to maximize plant efficiency and reduce production losses.

This repository hosts the **ClinkerFlow Digital Operational Platform**, built as a high-fidelity interactive digital twin and executive decision-support prototype for the **2026 Dangote Cement Engineering Competition**.

---

## 🏗️ Platform Architecture

ClinkerFlow is designed to model the complete downstream conversion flow, departing from the typical industry bias of focusing solely on kiln runtime. It maps operational yield, rate bottlenecks, and reliability issues across six core stages:

$$\text{Clinker Silo} \longrightarrow \text{Cement Grinding Mill} \longrightarrow \text{Blending \& Additives} \longrightarrow \text{Cement Silo Storage} \longrightarrow \text{Packing Plant} \longrightarrow \text{Dispatch Logistics}$$

### Core Features Installed
1. **Executive Summary Dashboard:** Real-time production tonnage tracking vs. shift targets, automated deficit estimation, and financial impact metrics ($₦$ value loss).
2. **Interactive Plant Flow Map:** A node-based process visualization showing live parameter tracking, throughput status, and active telemetry alarms for every stage of the system.
3. **Loss-Tree Waterfall Engine:** Dynamic waterfall analysis mapping cumulative losses from design capacity (5,500 TPD) down to actual output. Includes deep-dive drill-down tables.
4. **Root Cause Explorer:** Engineering-grounded failure library linking specific mechanical faults (compressor trips, bag feeder jams) to instrumentation warnings and recommended physical inspections.
5. **AI Recommendations Panel:** Prioritized corrective actions ranked by potential Tonnage Per Day (TPD) recovery and confidence rates.
6. **Action Matrix:** Interactive shift checklist mapping tasks, statuses (Open, In Progress, Resolved), and departments.

---

## 🛠️ Technology Stack & Local Deployment
The platform is built on modern, lightweight frontend web technologies:
* **Core:** React 18, Vite, TypeScript, Tailwind CSS
* **Charts:** Recharts (SVG Responsive Engines)
* **Animations:** Framer Motion (Optimized for low-spec tablets)
* **Icons:** Lucide React

### Running Locally
To launch the developer dashboard server:
```bash
npm install
npm run dev
```
