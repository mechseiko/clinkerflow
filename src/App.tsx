import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { PlantFlow } from './pages/PlantFlow';
import { LossTree } from './pages/LossTree';
import { Dashboard } from './pages/Dashboard';
import { RootCause } from './pages/RootCause';
import { Recommendations } from './pages/Recommendations';
import { ActionMatrix } from './pages/ActionMatrix';
import { Documentation } from './pages/Documentation';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="plant-flow" element={<PlantFlow />} />
          <Route path="loss-tree" element={<LossTree />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="root-cause" element={<RootCause />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="actions" element={<ActionMatrix />} />
          <Route path="documentation" element={<Documentation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
