// Sidebar navigation
const { useState } = React;

function NavItem({ icon, label, badge, active, onClick }) {
  const Ic = Icons[icon];
  return (
    <button
      onClick={onClick}
      className={
        "w-full group flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition " +
        (active
          ? "bg-ink-800 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          : "text-ink-100 hover:text-white hover:bg-ink-850")
      }
    >
      <span className={active ? "text-white" : "text-ink-200 group-hover:text-ink-100"}>
        <Ic size={17} stroke={1.6} />
      </span>
      <span className="flex-1 text-left tracking-tightish">{label}</span>
      {badge != null && (
        <span className={
          "min-w-[24px] text-center px-1.5 py-[1px] rounded-md text-[11px] tabular-nums font-medium " +
          (active ? "bg-ink-700 text-ink-100" : "bg-ink-800 text-ink-200")
        }>{badge}</span>
      )}
    </button>
  );
}

function SectionHeader({ label, open, onToggle, collapsible = true }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-1.5 px-3 pt-5 pb-2 text-[11px] uppercase tracking-[0.14em] text-ink-200 hover:text-ink-100"
    >
      <span>{label}</span>
      {collapsible && (
        <Icons.ChevronDown size={13} className={"transition " + (open ? '' : '-rotate-90')} />
      )}
    </button>
  );
}

function Sidebar({ route, setRoute, openLanding }) {
  const [wsOpen, setWsOpen] = useState(true);
  const [favOpen, setFavOpen] = useState(true);

  const nav = [
    { key: 'home',     icon: 'Home',     label: 'Home' },
    { key: 'inbox',    icon: 'Inbox',    label: 'Inbox',    badge: 128 },
    { key: 'calls',    icon: 'Phone',    label: 'Calls',    badge: 9 },
    { key: 'calendar', icon: 'Calendar', label: 'Calendar', badge: 12 },
    { key: 'documents',icon: 'Doc',      label: 'Documents',badge: 23 },
    { key: 'crm',      icon: 'Users',    label: 'CRM',      badge: 47 },
    { key: 'billing',  icon: 'Dollar',   label: 'Billing',  badge: 6 },
  ];

  return (
    <aside className="w-[244px] shrink-0 border-r border-ink-800/80 flex flex-col bg-gradient-to-b from-ink-950 to-ink-900">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tighter2 text-white">strategent</span>
        </div>
      </div>

      {/* Workspace switcher */}
      <div className="px-3 pb-3">
        <div className="w-full group flex items-center gap-2 px-2 py-2 rounded-md hover:bg-ink-850 transition">
          <button className="flex items-center gap-1.5 -mx-1 px-1 rounded hover:bg-ink-800/60 transition">
            <span className="text-[14px] font-semibold text-white tracking-tightish">Heartwell Capital</span>
            <Icons.ChevronDown size={14} className="text-ink-200" />
          </button>
          <div className="ml-auto flex items-center gap-1.5">
            <button className="p-1 rounded text-ink-200 hover:text-white hover:bg-ink-800" title="Search ⌘K"><Icons.Search size={15} /></button>
            <button className="p-1 rounded text-ink-200 hover:text-white hover:bg-ink-800" title="Compose"><Icons.Edit size={15} /></button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="px-2 flex flex-col gap-0.5">
        {nav.map(n => (
          <NavItem key={n.key} {...n} active={route === n.key} onClick={() => setRoute(n.key)} />
        ))}
      </nav>

      {/* Workspace section */}
      <SectionHeader label="Workspace" open={wsOpen} onToggle={() => setWsOpen(v => !v)} />
      {wsOpen && (
        <div className="px-3 flex flex-col gap-0.5">
          <SubItem label="Syra · Assistant" dot="accent" />
          <SubItem label="Households" />
          <SubItem label="Pipeline" />
          <SubItem label="Reports" />
          <SubItem label="More" muted />
        </div>
      )}

      {/* Favorites section */}
      <SectionHeader label="Favorites" open={favOpen} onToggle={() => setFavOpen(v => !v)} />
      {favOpen && (
        <div className="px-3 flex flex-col gap-0.5">
          <SubItem label="Q2 reviews" dot="mint" />
        </div>
      )}

      <div className="mt-auto p-3 border-t border-ink-800/80">
        <button onClick={openLanding} className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-[12.5px] text-ink-200 hover:text-white hover:bg-ink-850 transition">
          <Icons.Globe size={15} />
          <span>View landing page</span>
          <Icons.ArrowUpRight size={13} className="ml-auto opacity-70" />
        </button>
      </div>
    </aside>
  );
}

function SubItem({ label, dot, muted }) {
  return (
    <button className={"w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition " +
      (muted ? "text-ink-200 hover:text-ink-100 hover:bg-ink-850" : "text-ink-100 hover:text-white hover:bg-ink-850")}>
      {dot && (
        <span className={"h-1.5 w-1.5 rounded-full " + (dot === 'mint' ? 'bg-mint-500' : 'bg-accent-500')} />
      )}
      {!dot && <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />}
      <span className="tracking-tightish">{label}</span>
    </button>
  );
}

function Logo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C84F2" />
          <stop offset="100%" stopColor="#3FCF8E" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#0D1118" stroke="#1F2532" />
      <path d="M21 10c-1.6-1.4-3.7-2.2-5.7-2-3.4.3-5.3 3.2-4.6 5.6.7 2.5 4 2.7 6.4 3.4 2.3.6 4.5 1.8 4.4 4.2-.1 2.2-2.4 3.7-5.1 3.7-2.2 0-4.1-.9-5.4-2.2"
            stroke="url(#lg1)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

window.Sidebar = Sidebar;
window.Logo = Logo;
