import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Home } from './components/Home';
import { InboxScreen } from './components/InboxScreen';
import { ListDetail } from './components/ListDetail';
import { Landing } from './components/Landing';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="inbox" element={<InboxScreen />} />
        <Route path="calls" element={<ListDetail screenKey="calls" />} />
        <Route path="calendar" element={<ListDetail screenKey="calendar" />} />
        <Route path="documents" element={<ListDetail screenKey="documents" />} />
        <Route path="crm" element={<ListDetail screenKey="crm" />} />
        <Route path="billing" element={<ListDetail screenKey="billing" />} />
      </Route>
      <Route path="/landing" element={<Landing />} />
    </Routes>
  );
}
