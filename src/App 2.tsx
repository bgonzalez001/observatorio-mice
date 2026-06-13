import { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import EventsManager from '@/components/events/EventsManager';
import Observatory from '@/components/observatory/Observatory';
import Benchmark from '@/components/benchmark/Benchmark';
import Capture from '@/components/capture/Capture';
import Library from '@/components/library/Library';
import Alerts from '@/components/alerts/Alerts';
import Reports from '@/components/reports/Reports';

type Page = 'dashboard' | 'events' | 'observatory' | 'benchmark' | 'capture' | 'library' | 'alerts' | 'reports';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'events': return <EventsManager />;
      case 'observatory': return <Observatory />;
      case 'benchmark': return <Benchmark />;
      case 'capture': return <Capture />;
      case 'library': return <Library />;
      case 'alerts': return <Alerts />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
