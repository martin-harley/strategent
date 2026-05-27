﻿import { Home as HomeIcon, ArrowUpRight, Inbox, Phone, Calendar, FileText, Users, DollarSign, type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { STAT_CARDS, ACTIVITY } from '@/data/index';
import type { StatCard, ActivityItem, Tone } from '@/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Inbox,
  Phone,
  Calendar,
  FileText,
  Users,
  DollarSign,
};

function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 text-[12px] text-ink-100">
      <span className="relative inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-mint-500 pulse-dot" />
      </span>
      <span className="tracking-tightish">Live · synced just now</span>
    </div>
  );
}

function ActivityChip({ tone, label }: { tone: Tone; label: string }) {
  const tones: Record<Tone, string> = {
    accent: 'bg-accent-600/15 text-accent-500 ring-accent-600/20',
    mint:   'bg-mint-500/12 text-mint-400 ring-mint-500/20',
    amber:  'bg-amber-500/12 text-amber-500 ring-amber-500/20',
  };
  return (
    <span className={'chip ring-1 ring-inset ' + tones[tone]}>
      <span className={
        'h-1.5 w-1.5 rounded-full ' +
        (tone === 'mint' ? 'bg-mint-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-accent-500')
      } />
      {label}
    </span>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  const labelByType: Record<string, string> = {
    docs: 'Docs', calendar: 'Calendar', billing: 'Billing', crm: 'CRM', inbox: 'Inbox', calls: 'Calls',
  };
  return (
    <div className="grid grid-cols-[88px_1fr_auto] items-center gap-4 px-1 py-3 border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.02] transition rounded">
      <ActivityChip tone={item.tone} label={labelByType[item.type] ?? item.type} />
      <div className="min-w-0">
        <div className="text-[13.5px] font-medium text-white tracking-tightish truncate">{item.title}</div>
        <div className="text-[12.5px] text-ink-200 truncate">{item.firm}</div>
      </div>
      <div className="text-[12px] text-ink-200 tabular-nums">{item.ago}</div>
    </div>
  );
}

function StatCard({ icon, count, label, sublabel, onOpen }: StatCard & { onOpen: () => void }) {
  const Ic = ICON_MAP[icon] ?? FileText;
  return (
    <button onClick={onOpen} className="text-left card-surface rounded-xl p-5 relative group transition hover:translate-y-[-1px]">
      <div className="flex items-start justify-between">
        <span className="text-ink-200 group-hover:text-ink-100 transition">
          <Ic size={18} strokeWidth={1.6} />
        </span>
        <span className="text-ink-200 group-hover:text-white transition opacity-70">
          <ArrowUpRight size={14} />
        </span>
      </div>
      <div className="mt-7 flex items-baseline gap-2">
        <span className="text-[34px] leading-none font-medium tracking-tighter2 text-white tabular-nums">{count}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[13.5px] font-medium text-ink-100 tracking-tightish">{label}</span>
      </div>
      <div className="mt-0.5 text-[12px] text-ink-200 tracking-tightish">{sublabel}</div>
    </button>
  );
}

function SmallPanel({ eyebrow, title, body, cta, onCta }: {
  eyebrow: string; title: string; body: string; cta: string; onCta: () => void;
}) {
  return (
    <div className="card-surface rounded-xl p-5">
      <div className="text-[11px] uppercase tracking-[0.16em] text-ink-200">{eyebrow}</div>
      <div className="mt-2 text-[15px] font-medium tracking-tightish text-white">{title}</div>
      <div className="mt-1.5 text-[12.5px] text-ink-200 leading-relaxed">{body}</div>
      <button onClick={onCta} className="mt-4 inline-flex items-center gap-1 text-[12.5px] text-accent-500 hover:text-accent-600 transition">
        {cta} <ArrowUpRight size={13} />
      </button>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="screen-enter relative ambient">
      <header className="flex items-center justify-between px-10 pt-7 pb-6">
        <div className="flex items-center gap-2.5">
          <span className="text-ink-200"><HomeIcon size={17} /></span>
          <h1 className="text-[17px] font-semibold tracking-tightish text-white">Home</h1>
        </div>
        <LiveBadge />
      </header>

      <section className="px-10">
        <div className="grid grid-cols-3 gap-4">
          {STAT_CARDS.map((s) => (
            <StatCard key={s.key} icon={s.icon} count={s.count} label={s.label} sublabel={s.sublabel} onOpen={() => navigate(s.key === 'inbox' ? '/inbox' : `/${s.key}`)} />
          ))}
        </div>
      </section>

      <section className="px-10 pt-10 pb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[12.5px] uppercase tracking-[0.16em] text-ink-200">Recent activity</h2>
          <div className="flex items-center gap-2 text-[12px] text-ink-200">
            <button className="px-2 py-1 rounded-md hover:bg-ink-850 hover:text-ink-100">All</button>
            <button className="px-2 py-1 rounded-md hover:bg-ink-850 hover:text-ink-100">Approvals</button>
            <button className="px-2 py-1 rounded-md hover:bg-ink-850 hover:text-ink-100">Today</button>
          </div>
        </div>
        <div className="card-surface rounded-xl px-4 py-1">
          {ACTIVITY.map((a, i) => <ActivityRow key={i} item={a} />)}
        </div>
      </section>

      <section className="px-10 pb-14">
        <div className="grid grid-cols-3 gap-4">
          <SmallPanel
            eyebrow="Syra"
            title="3 items awaiting your approval"
            body="Two drafts in your voice and one rescheduled meeting are queued for review."
            cta="Review queue"
            onCta={() => navigate('/inbox')}
          />
          <SmallPanel
            eyebrow="Pipeline"
            title="$14M in new prospective AUM"
            body="Three households advanced to proposal stage this week."
            cta="Open CRM"
            onCta={() => navigate('/crm')}
          />
          <SmallPanel
            eyebrow="Billing"
            title="2 invoices past due"
            body="Reminders drafted in your voice; queued for approval."
            cta="Open billing"
            onCta={() => navigate('/billing')}
          />
        </div>
      </section>
    </div>
  );
}

