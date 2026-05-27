// Root app — sidebar + screen switcher + landing
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [view, setView] = useStateApp('app'); // 'app' | 'landing'
  const [route, setRoute] = useStateApp('home'); // home | inbox | calls | calendar | documents | crm | billing

  // Keep transitions smooth — reset scroll on route change
  useEffectApp(() => { window.scrollTo({ top: 0 }); }, [route, view]);

  if (view === 'landing') {
    return <Landing onEnter={() => setView('app')} />;
  }

  return (
    <div className="flex h-screen w-screen bg-ink-950 overflow-hidden">
      <Sidebar route={route} setRoute={setRoute} openLanding={() => setView('landing')} />
      <main className="flex-1 overflow-auto">
        {route === 'home' && <Home setRoute={setRoute} />}
        {route === 'inbox' && <InboxScreen />}
        {(route === 'calls' || route === 'calendar' || route === 'documents' || route === 'crm' || route === 'billing') && (
          <ListDetail key={route} screenKey={route} />
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
