﻿import { useState } from 'react';
import { ArrowUpRight, Sparkles, Send, Clock, Scale, Briefcase, Heart, Building2, Plus, Mail, Shield, Globe, Check, type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { STAT_CARDS } from '@/data/index';

function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="lg-landing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C84F2" />
          <stop offset="100%" stopColor="#3FCF8E" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#0D1118" stroke="#1F2532" />
      <path
        d="M21 10c-1.6-1.4-3.7-2.2-5.7-2-3.4.3-5.3 3.2-4.6 5.6.7 2.5 4 2.7 6.4 3.4 2.3.6 4.5 1.8 4.4 4.2-.1 2.2-2.4 3.7-5.1 3.7-2.2 0-4.1-.9-5.4-2.2"
        stroke="url(#lg-landing)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function LandingNav({ onEnter }: { onEnter: () => void }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-ink-950/70 border-b border-ink-800/60">
      <div className="max-w-[1240px] mx-auto px-8 h-16 flex items-center">
        <div className="flex items-center gap-2">
          <Logo size={26} />
          <span className="text-[15px] font-semibold tracking-tighter2 text-white">strategent</span>
        </div>
        <nav className="ml-10 flex items-center gap-7 text-[13.5px] text-ink-100">
          <a className="hover:text-white transition cursor-pointer">Product</a>
          <a className="hover:text-white transition cursor-pointer">Industries</a>
          <a className="hover:text-white transition cursor-pointer">Process</a>
          <a className="hover:text-white transition cursor-pointer">FAQ</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-md text-[13px] text-ink-100 hover:text-white hover:bg-ink-850 transition">Sign in</button>
          <button
            onClick={onEnter}
            className="px-3.5 py-1.5 rounded-md text-[13px] font-medium bg-white text-ink-900 hover:bg-ink-100 inline-flex items-center gap-1.5 transition"
          >
            Open console <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </header>
  );
}

function DashboardMock() {
  return (
    <div className="bg-ink-950 h-[520px] flex">
      <div className="w-[200px] shrink-0 bg-gradient-to-b from-ink-950 to-ink-900 border-r border-ink-800/80 py-4 px-3">
        <div className="flex items-center gap-2 px-2 mb-4">
          <Logo size={20} />
          <span className="text-[13px] font-semibold tracking-tighter2 text-white">strategent</span>
        </div>
        <div className="px-2 text-[12px] font-semibold text-white mb-3">Heartwell Capital</div>
        {[
          { label: 'Home', active: true },
          { label: 'Inbox', badge: '128' },
          { label: 'Calls', badge: '9' },
          { label: 'Calendar', badge: '12' },
          { label: 'Documents', badge: '23' },
          { label: 'CRM', badge: '47' },
          { label: 'Billing', badge: '6' },
        ].map((n, i) => (
          <div key={i} className={'flex items-center gap-2 px-2 py-1.5 rounded text-[12px] ' + (n.active ? 'bg-ink-800 text-white' : 'text-ink-100')}>
            <span className="h-3 w-3 rounded bg-ink-700" />
            <span className="flex-1">{n.label}</span>
            {n.badge && <span className="text-[10px] tabular-nums text-ink-200 bg-ink-800 px-1.5 rounded">{n.badge}</span>}
          </div>
        ))}
      </div>
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[14px] font-semibold text-white">Home</div>
          <div className="flex items-center gap-2 text-[11px] text-ink-100">
            <span className="h-1.5 w-1.5 rounded-full bg-mint-500" /> Live · synced just now
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {STAT_CARDS.map((s) => (
            <div key={s.key} className="card-surface rounded-lg p-3.5">
              <div className="flex items-center justify-between text-ink-200">
                <span className="h-3.5 w-3.5 rounded bg-ink-700" />
                <ArrowUpRight size={12} />
              </div>
              <div className="mt-4 text-[24px] font-medium text-white tabular-nums leading-none">{s.count}</div>
              <div className="mt-1.5 text-[11.5px] font-medium text-ink-100">{s.label}</div>
              <div className="text-[10.5px] text-ink-200">{s.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-40 right-0 h-[600px] w-[700px] rounded-full bg-accent-600/10 blur-[120px]" />
        <div className="absolute -bottom-20 left-0 h-[400px] w-[600px] rounded-full bg-mint-500/[0.05] blur-[120px]" />
      </div>
      <div className="max-w-[1240px] mx-auto px-8 pt-20 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ring-1 ring-ink-800 bg-ink-900/60 text-[12px] text-ink-100">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-500 pulse-dot" />
          Now serving 14 firms · onboarding by appointment
        </div>
        <h1 className="mt-6 max-w-[920px] text-[64px] leading-[1.02] font-medium tracking-tighter2 text-white">
          The AI back-office for professional service firms.
        </h1>
        <p className="mt-5 max-w-[680px] text-[17px] leading-relaxed text-ink-100">
          Strategent unifies email, calls, calendar, documents, CRM, and billing into one operating console.
          Syra â€” your in-firm agent â€” drafts, routes, and approves so partners do partner work.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={onEnter}
            className="px-5 py-3 rounded-lg text-[14px] font-medium bg-white text-ink-900 hover:bg-ink-100 inline-flex items-center gap-2 transition"
          >
            Open the console <ArrowUpRight size={15} />
          </button>
          <button className="px-5 py-3 rounded-lg text-[14px] font-medium text-white bg-ink-900 ring-1 ring-ink-800 hover:bg-ink-850 inline-flex items-center gap-2 transition">
            Book a working session
          </button>
          <span className="text-[12.5px] text-ink-200 ml-2">SOC 2 · region-locked · white-labeled per firm</span>
        </div>
        <div className="mt-14 rounded-2xl overflow-hidden ring-1 ring-ink-800 shadow-2xl shadow-black/40">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function IntegrationStrip() {
  const logos = ['Slack', 'GitHub', 'OpenAI', 'Claude', 'Vercel', 'Supabase', 'Clerk', 'Turso', 'HubSpot', 'Stripe', 'Notion', 'Linear'];
  return (
    <section className="py-16 border-y border-ink-800/60 bg-ink-950">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="text-center text-[12px] uppercase tracking-[0.18em] text-ink-200">Wired into the tools you already run on</div>
        <div className="mt-7 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 80px, black calc(100% - 80px), transparent)' }}>
          <div className="flex gap-12">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="text-[18px] font-medium tracking-tightish text-ink-100 hover:text-white transition shrink-0">{l}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ eyebrow, title, body, children, reverse }: {
  eyebrow: string; title: string; body: string; children: React.ReactNode; reverse?: boolean;
}) {
  return (
    <section className="py-20">
      <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-2 gap-14 items-center">
        <div className={reverse ? 'order-2' : ''}>
          <div className="text-[11.5px] uppercase tracking-[0.18em] text-accent-500">{eyebrow}</div>
          <h2 className="mt-3 text-[40px] leading-[1.1] tracking-tighter2 font-medium text-white">{title}</h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-ink-100">{body}</p>
        </div>
        <div className={reverse ? 'order-1' : ''}>{children}</div>
      </div>
    </section>
  );
}

function InboxIntelligenceMock() {
  return (
    <div className="card-surface rounded-2xl p-5 ring-1 ring-ink-800 shadow-xl shadow-black/30">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-accent-500"><Sparkles size={14} /></span>
        <span className="text-[12.5px] font-medium tracking-tightish text-accent-500">@Syra · reply draft</span>
        <span className="ml-auto text-[11px] text-ink-200">in your voice · ready</span>
      </div>
      <p className="text-[13.5px] text-ink-100 leading-relaxed">
        Daniel â€” sending the counter to Lisa this morning at{' '}
        <span className="px-1 py-0.5 rounded bg-mint-500/12 text-mint-400">$1.215M</span>{' '}
        with 25% down and a 21-day close, with a seller credit for the inspection items. I'll have a written response back to you before{' '}
        <span className="px-1 py-0.5 rounded bg-rose-500/12 text-rose-500">Friday</span> end-of-day.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-accent-600 text-white inline-flex items-center gap-1.5">
          <Send size={12} /> Send
        </button>
        <button className="px-3 py-1.5 rounded-md text-[12px] font-medium bg-ink-800 text-white ring-1 ring-ink-700 inline-flex items-center gap-1.5">
          <Clock size={12} /> Schedule
        </button>
      </div>
      <div className="mt-5 pt-5 border-t border-ink-800">
        <div className="text-[10.5px] uppercase tracking-[0.16em] text-ink-200 mb-2.5">Extracted</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Property', value: '412 Magnolia', tone: 'accent' },
            { label: 'Offer',    value: '$1.215M',      tone: 'mint' },
            { label: 'Possession', value: 'Aug 1',      tone: 'amber' },
            { label: 'Reply by',  value: 'Friday',      tone: 'rose' },
          ].map((e, i) => {
            const tones: Record<string, string> = {
              accent: 'text-accent-500 bg-accent-600/10 ring-accent-600/20',
              mint:   'text-mint-400 bg-mint-500/10 ring-mint-500/20',
              amber:  'text-amber-500 bg-amber-500/10 ring-amber-500/20',
              rose:   'text-rose-500 bg-rose-500/10 ring-rose-500/20',
            };
            return (
              <div key={i} className={'rounded-md px-2.5 py-2 ring-1 ring-inset ' + tones[e.tone]}>
                <div className="text-[10px] uppercase tracking-[0.14em] opacity-80">{e.label}</div>
                <div className="text-[12.5px] font-medium text-white tracking-tightish">{e.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SyraConsoleMock() {
  return (
    <div className="card-surface rounded-2xl p-5 ring-1 ring-ink-800 shadow-xl shadow-black/30 font-mono text-[12.5px] leading-[1.65]">
      <div className="flex items-center justify-between mb-3 font-sans">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="h-2 w-2 rounded-full bg-mint-500" />
          <span className="ml-2 text-[11.5px] text-ink-200">syra · console</span>
        </div>
        <span className="text-[11px] text-ink-200">/ops/heartwell</span>
      </div>
      <div className="text-mint-400">&gt; <span className="text-ink-100">@Syra reconcile invoice 1042</span></div>
      <div className="text-ink-200 mt-1">  â†³ matched $24,200 inbound · Greer &amp; Associates</div>
      <div className="text-ink-200">  â†³ posted to engagement <span className="text-accent-500">heartwell/q2-advisory</span></div>
      <div className="text-ink-200">  â†³ closed invoice <span className="text-mint-400">1042 · paid</span></div>
      <div className="mt-4 text-mint-400">&gt; <span className="text-ink-100">@Syra triage inbox since 7am</span></div>
      <div className="text-ink-200 mt-1">  â†³ 14 parsed · 8 routed · 4 drafted · 2 escalated</div>
      <div className="text-ink-200">  â†³ awaiting approval: <span className="text-amber-500">Q2 allocation memo</span>, <span className="text-amber-500">Northbridge trustee intro</span></div>
      <div className="mt-4 text-mint-400">&gt; <span className="text-ink-100">@Syra prep me for Thu 2pm</span></div>
      <div className="text-ink-200 mt-1">  â†³ packet ready · 4 talking points · 1 redline to walk through</div>
      <div className="mt-3 text-ink-100 font-sans">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-accent-600/15 text-accent-500 text-[11.5px] font-medium">
          <Sparkles size={11} /> @Syra
        </span>
        <span className="ml-2">Ready. What's next?</span>
      </div>
    </div>
  );
}

interface Industry {
  key: string;
  label: string;
  Icon: LucideIcon;
  headline: string;
  body: string;
  stats: { v: string; l: string }[];
}

const INDUSTRIES: Industry[] = [
  {
    key: 'law', label: 'Law', Icon: Scale,
    headline: "Drafts the demand letter while you're at depositions.",
    body: 'Syra parses incoming counsel mail, drafts standard responses in the partner\'s voice, and files everything against the matter â€” without any junior associate touching it.',
    stats: [{ v: '38h', l: 'partner hours saved / wk' }, { v: '99.4%', l: 'matter classification' }, { v: '2.1x', l: 'response throughput' }],
  },
  {
    key: 'realestate', label: 'Real Estate', Icon: Building2,
    headline: 'Counter, contract, close. Same agent, smaller queue.',
    body: 'Brokerages run their listing intake, counter drafting, and showing follow-ups through Strategent. Lead-to-tour rises, the inbox never sleeps, and your top agent works on top deals.',
    stats: [{ v: '4.3x', l: 'tour conversion' }, { v: '< 9m', l: 'avg response' }, { v: '210', l: 'listings synced' }],
  },
  {
    key: 'finance', label: 'Finance', Icon: Briefcase,
    headline: 'Drafts in your voice. Reconciles in your books.',
    body: 'Independent RIAs and family offices use Strategent to keep the household, the CRM, and the custodian in lockstep. Quarterly letters get composed, invoices reconcile themselves.',
    stats: [{ v: '$14M', l: 'pipeline tracked' }, { v: '6 hrs', l: 'reclaimed / wk' }, { v: '0', l: 'reconciliation misses' }],
  },
  {
    key: 'medical', label: 'Medical', Icon: Heart,
    headline: 'Intake, callbacks, billing â€” without the front-desk grind.',
    body: 'Specialty practices route patient calls, draft callback scripts, and reconcile insurance claims. HIPAA-aligned, region-locked, with audit trails for every action Syra takes.',
    stats: [{ v: '92%', l: 'first-call resolution' }, { v: '< 4m', l: 'avg callback' }, { v: 'HIPAA', l: 'aligned + audited' }],
  },
];

function IndustryTabs() {
  const [tab, setTab] = useState('finance');
  const ind = INDUSTRIES.find((i) => i.key === tab)!;

  return (
    <section className="py-20">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="text-[11.5px] uppercase tracking-[0.18em] text-accent-500">Built for your firm</div>
        <h2 className="mt-3 text-[40px] tracking-tighter2 font-medium text-white max-w-[800px]">
          One console. Four professions. Each one white-labeled to the firm that runs it.
        </h2>
        <div className="mt-9 flex gap-2 flex-wrap">
          {INDUSTRIES.map((i) => (
            <button
              key={i.key}
              onClick={() => setTab(i.key)}
              className={
                'px-4 py-2 rounded-lg text-[13px] font-medium inline-flex items-center gap-2 transition ring-1 ' +
                (tab === i.key
                  ? 'bg-ink-800 text-white ring-ink-700'
                  : 'bg-transparent text-ink-100 ring-ink-800 hover:bg-ink-850 hover:text-white')
              }
            >
              <i.Icon size={14} /> {i.label}
            </button>
          ))}
        </div>
        <div className="mt-7 card-surface rounded-2xl p-8 grid grid-cols-[1fr_360px] gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-accent-500 text-[12px] tracking-tightish">
              <ind.Icon size={14} /> {ind.label}
            </div>
            <h3 className="mt-3 text-[28px] tracking-tighter2 font-medium text-white leading-tight">{ind.headline}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-100">{ind.body}</p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {ind.stats.map((s, i) => (
              <div key={i} className="rounded-xl ring-1 ring-ink-800 p-4 bg-ink-900/40">
                <div className="text-[22px] tracking-tighter2 font-medium text-white tabular-nums">{s.v}</div>
                <div className="text-[12px] text-ink-200 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PROCESS = [
  { n: '01', label: 'Audit',   body: 'Two-week embed: we map your inbox, custodians, calendar, CRM, and billing into a single context graph.' },
  { n: '02', label: 'Build',   body: 'We compose Syra against your firm â€” your voice, your templates, your approval rules, your routing logic.' },
  { n: '03', label: 'Testing', body: 'Shadow mode: every draft is reviewed by partners. We tune until classification and tone hit 99%.' },
  { n: '04', label: 'Live',    body: 'Switchover, with the audit trail wired to your compliance team. We stay on-call for the first quarter.' },
];

function Process() {
  return (
    <section className="py-20 border-t border-ink-800/60">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="text-[11.5px] uppercase tracking-[0.18em] text-accent-500">Process</div>
        <h2 className="mt-3 text-[40px] tracking-tighter2 font-medium text-white max-w-[700px]">From handshake to handover in six weeks.</h2>
        <div className="mt-12 grid grid-cols-4 gap-6 relative">
          <div className="absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-transparent via-ink-700 to-transparent" />
          {PROCESS.map((p, i) => (
            <div key={i} className="relative">
              <div className="h-[36px] w-[36px] rounded-full bg-ink-900 ring-1 ring-ink-700 grid place-items-center text-[12px] font-mono text-accent-500 tabular-nums relative z-10">
                {p.n}
              </div>
              <div className="mt-5 text-[16px] font-medium tracking-tightish text-white">{p.label}</div>
              <div className="mt-2 text-[13px] text-ink-100 leading-relaxed">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: 'Is Syra the same agent for every firm?', a: 'No. Every firm gets its own composed agent â€” your voice, your templates, your routing, your approval rules. Same console, separate brain.' },
  { q: 'Where does our data live?', a: 'Region-locked storage of your choice (US, EU, or single-tenant on-prem). Inbox, calls, and documents are encrypted at rest and never used to train shared models.' },
  { q: 'How do approvals work?', a: 'Every outbound action â€” emails, calendar moves, invoice issuance, CRM stage changes â€” can be set to require partner approval. Default rules ship per industry; you tune them.' },
  { q: 'What about compliance audits?', a: 'Every Syra action writes to an immutable audit log with the inputs it saw, the rules it applied, and who approved the output. Exports SOC 2, FINRA, HIPAA-aligned.' },
  { q: 'How long does onboarding take?', a: 'Six weeks from contract to live: two-week audit, three-week build, one-week shadow. Practices with cleaner integrations go live in four.' },
  { q: 'Pricing?', a: 'Annual engagement priced per seat, per integration, and per agent. Most firms land between $48kâ€“$180k/year. We won\'t quote without an audit.' },
];

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20">
      <div className="max-w-[1000px] mx-auto px-8">
        <div className="text-[11.5px] uppercase tracking-[0.18em] text-accent-500">FAQ</div>
        <h2 className="mt-3 text-[40px] tracking-tighter2 font-medium text-white">Questions partners actually ask.</h2>
        <div className="mt-10 flex flex-col divide-y divide-ink-800/80 border-y border-ink-800/80">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <button key={i} onClick={() => setOpen(isOpen ? -1 : i)} className="w-full text-left py-5 group">
                <div className="flex items-start gap-4">
                  <span className="text-[14px] font-medium tracking-tightish text-white flex-1">{f.q}</span>
                  <span className={'text-ink-200 transition ' + (isOpen ? 'rotate-45' : '')}>
                    <Plus size={16} />
                  </span>
                </div>
                <div className={'overflow-hidden transition-all duration-300 ' + (isOpen ? 'max-h-40 mt-3' : 'max-h-0')}>
                  <p className="text-[13.5px] text-ink-100 leading-relaxed max-w-[760px]">{f.a}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <div className="text-[11.5px] uppercase tracking-[0.14em] text-ink-200 mb-1.5">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="w-full bg-ink-850 ring-1 ring-ink-800 rounded-md px-3 py-2.5 text-[13.5px] text-white outline-none focus:ring-accent-600 transition placeholder:text-ink-300"
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <div className="text-[11.5px] uppercase tracking-[0.14em] text-ink-200 mb-1.5">{label}</div>
      <select className="w-full bg-ink-850 ring-1 ring-ink-800 rounded-md px-3 py-2.5 text-[13.5px] text-white outline-none focus:ring-accent-600 transition appearance-none">
        {options.map((o) => <option key={o} className="bg-ink-850">{o}</option>)}
      </select>
    </label>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <section className="py-20 border-t border-ink-800/60">
      <div className="max-w-[1000px] mx-auto px-8 grid grid-cols-2 gap-14">
        <div>
          <div className="text-[11.5px] uppercase tracking-[0.18em] text-accent-500">Contact</div>
          <h2 className="mt-3 text-[40px] tracking-tighter2 font-medium text-white leading-[1.08]">Tell us about your firm.</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-100 max-w-[440px]">
            We accept 4 new firms per quarter. If you run a practice that lives in your inbox, we'd like to hear how.
          </p>
          <div className="mt-8 space-y-3 text-[13px] text-ink-100">
            <div className="flex items-center gap-3"><Mail size={14} className="text-ink-200" /> partners@strategent.app</div>
            <div className="flex items-center gap-3"><Shield size={14} className="text-ink-200" /> SOC 2 Type II · audited Q1 2026</div>
            <div className="flex items-center gap-3"><Globe size={14} className="text-ink-200" /> New York · London · Singapore</div>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="card-surface rounded-2xl p-6 ring-1 ring-ink-800">
          {!sent ? (
            <div className="flex flex-col gap-4">
              <Field label="Your name" placeholder="Anna Whitfield" />
              <Field label="Firm" placeholder="Heartwell Capital" />
              <Field label="Work email" placeholder="anna@heartwell.com" type="email" />
              <SelectField label="Industry" options={['Finance', 'Law', 'Real Estate', 'Medical', 'Other']} />
              <Field label="Headcount" placeholder="12" />
              <button type="submit" className="mt-2 px-4 py-2.5 rounded-lg text-[13.5px] font-medium bg-white text-ink-900 hover:bg-ink-100 inline-flex items-center justify-center gap-2 transition">
                Request audit <ArrowUpRight size={13} />
              </button>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex h-12 w-12 rounded-full bg-mint-500/15 text-mint-400 items-center justify-center">
                <Check size={20} />
              </div>
              <div className="mt-4 text-[18px] tracking-tightish font-medium text-white">Got it. A partner will reply within two business days.</div>
              <div className="mt-2 text-[13px] text-ink-100">In the meantime, we'll send the standard audit packet.</div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-800/60">
      <div className="max-w-[1240px] mx-auto px-8 py-10 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Logo size={22} />
          <span className="text-[14px] font-semibold tracking-tighter2 text-white">strategent</span>
        </div>
        <div className="text-[12.5px] text-ink-200">Â© 2026 Strategent Inc · operated for firms, never against them.</div>
        <div className="ml-auto flex items-center gap-5 text-[12.5px] text-ink-100">
          <a className="hover:text-white cursor-pointer">Security</a>
          <a className="hover:text-white cursor-pointer">Privacy</a>
          <a className="hover:text-white cursor-pointer">Terms</a>
          <a className="hover:text-white cursor-pointer">Careers</a>
        </div>
      </div>
    </footer>
  );
}

export function Landing() {
  const navigate = useNavigate();
  const onEnter = () => navigate('/');
  return (
    <div className="bg-ink-950 min-h-screen text-white">
      <LandingNav onEnter={onEnter} />
      <Hero onEnter={onEnter} />
      <IntegrationStrip />
      <FeatureBlock
        eyebrow="Inbox intelligence"
        title="Every inbound, classified, drafted, and routed before you read it."
        body="Strategent reads the entire email, pulls the matching context out of your CRM and prior threads, and proposes a reply in the partner's voice. Approve, edit, or send."
      >
        <InboxIntelligenceMock />
      </FeatureBlock>
      <FeatureBlock
        eyebrow="@Syra · your in-firm agent"
        title="Mention Syra in any channel. It works on real systems."
        body="Syra is a named, scoped agent attached to your firm â€” not a chatbot. Mention it and it executes against real APIs: reconciles invoices, drafts memos, moves calendar holds, updates CRM stages â€” with a full audit trail."
        reverse
      >
        <SyraConsoleMock />
      </FeatureBlock>
      <IndustryTabs />
      <Process />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

