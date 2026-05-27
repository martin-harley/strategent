﻿import { ChevronDown, Search, Edit, Home, Inbox, Phone, Calendar, FileText, Users, DollarSign } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';

function Logo() {
  return (
    <img src="/strategent-logo.png" alt="strategent" className="h-7 w-auto object-contain mix-blend-lighten" />
  );
}

function SubItem({ label, dot, muted }: { label: string; dot?: 'accent' | 'mint'; muted?: boolean }) {
  return (
    <button className={
      'w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] transition ' +
      (muted ? 'text-ink-200 hover:text-ink-100 hover:bg-white/[0.02]' : 'text-ink-100 hover:text-white hover:bg-white/[0.05]')
    }>
      {dot ? (
        <span className={'h-1.5 w-1.5 rounded-full ' + (dot === 'mint' ? 'bg-mint-500' : 'bg-accent-500')} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-ink-600" />
      )}
      <span className="tracking-tightish">{label}</span>
    </button>
  );
}

function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-1.5 px-3 pt-5 pb-2 text-[11px] uppercase tracking-[0.14em] text-ink-200 hover:text-ink-100"
    >
      <span>{label}</span>
      <ChevronDown size={13} className={'transition ' + (open ? '' : '-rotate-90')} />
    </button>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, badge, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={
        'w-full group flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition ' +
        (active
          ? 'bg-white/[0.06] text-white ring-1 ring-white/[0.08] backdrop-blur-sm'
          : 'text-ink-100 hover:text-white hover:bg-white/[0.03] hover:ring-1 hover:ring-white/[0.05]')
      }
    >
      <span className={active ? 'text-white' : 'text-ink-200 group-hover:text-ink-100'}>
        {icon}
      </span>
      <span className="flex-1 text-left tracking-tightish">{label}</span>
      {badge != null && (
        <span className={
          'min-w-[24px] text-center px-1.5 py-[1px] rounded-md text-[11px] tabular-nums font-medium ' +
          (active ? 'bg-white/[0.08] text-white' : 'bg-white/[0.04] text-ink-200')
        }>{badge}</span>
      )}
    </button>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openSections, toggleSection } = useAppStore();

  const wsOpen = openSections['workspace'] !== false;
  const favOpen = openSections['favorites'] !== false;

  const activeRoute = pathname === '/' ? 'home' : pathname.slice(1);

  const nav = [
    { key: 'home',      icon: <Home size={17} strokeWidth={1.6} />,      label: 'Home' },
    { key: 'inbox',     icon: <Inbox size={17} strokeWidth={1.6} />,     label: 'Inbox',     badge: 128 },
    { key: 'calls',     icon: <Phone size={17} strokeWidth={1.6} />,     label: 'Calls',     badge: 9 },
    { key: 'calendar',  icon: <Calendar size={17} strokeWidth={1.6} />,  label: 'Calendar',  badge: 12 },
    { key: 'documents', icon: <FileText size={17} strokeWidth={1.6} />,  label: 'Documents', badge: 23 },
    { key: 'crm',       icon: <Users size={17} strokeWidth={1.6} />,     label: 'CRM',       badge: 47 },
    { key: 'billing',   icon: <DollarSign size={17} strokeWidth={1.6} />, label: 'Billing',  badge: 6 },
  ];

  return (
    <aside className="w-[244px] shrink-0 border-r border-white/[0.06] flex flex-col bg-[#08090f]/80 backdrop-blur-xl">
      <div className="px-4 pt-5 pb-4">
        <Logo />
      </div>

      <div className="px-3 pb-3">
        <div className="w-full group flex items-center gap-2 px-2 py-2 rounded-md hover:bg-white/[0.02] transition">
          <button className="flex items-center gap-1.5 -mx-1 px-1 rounded hover:bg-white/[0.05] transition">
            <span className="text-[14px] font-semibold text-white tracking-tightish">Heartwell Capital</span>
            <ChevronDown size={14} className="text-ink-200" />
          </button>
          <div className="ml-auto flex items-center gap-1.5">
            <button className="p-1 rounded text-ink-200 hover:text-white hover:bg-white/[0.08]" title="Search ⌘K">
              <Search size={15} />
            </button>
            <button className="p-1 rounded text-ink-200 hover:text-white hover:bg-ink-800" title="Compose">
              <Edit size={15} />
            </button>
          </div>
        </div>
      </div>

      <nav className="px-2 flex flex-col gap-0.5">
        {nav.map((n) => (
          <NavItem
            key={n.key}
            icon={n.icon}
            label={n.label}
            badge={n.badge}
            active={activeRoute === n.key}
            onClick={() => navigate(n.key === 'home' ? '/' : `/${n.key}`)}
          />
        ))}
      </nav>

      <SectionHeader label="Workspace" open={wsOpen} onToggle={() => toggleSection('workspace')} />
      {wsOpen && (
        <div className="px-3 flex flex-col gap-0.5">
          <SubItem label="Syra · Assistant" dot="accent" />
          <SubItem label="Households" />
          <SubItem label="Pipeline" />
          <SubItem label="Reports" />
          <SubItem label="More" muted />
        </div>
      )}

      <SectionHeader label="Favorites" open={favOpen} onToggle={() => toggleSection('favorites')} />
      {favOpen && (
        <div className="px-3 flex flex-col gap-0.5">
          <SubItem label="Q2 reviews" dot="mint" />
        </div>
      )}

    </aside>
  );
}

