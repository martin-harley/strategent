﻿import { useState } from 'react';
import { ChevronRight, Check, ArrowUpRight, MoreHorizontal, FileText, Inbox, Phone, Calendar, Users, DollarSign, Clock, type LucideIcon } from 'lucide-react';
import { SCREENS, avatarColor, initials } from '@/data/index';
import type { Tone, ListItemData, DetailPane as DetailPaneType } from '@/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Inbox, Phone, Calendar, FileText, Users, DollarSign,
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

export function ToneChip({ tone, text, dot = true }: { tone: Tone; text: string; dot?: boolean }) {
  const tones: Record<Tone, string> = {
    accent: 'bg-accent-600/15 text-accent-500 ring-accent-600/20',
    mint:   'bg-mint-500/12 text-mint-400 ring-mint-500/20',
    amber:  'bg-amber-500/12 text-amber-500 ring-amber-500/20',
  };
  return (
    <span className={'chip ring-1 ring-inset ' + tones[tone]}>
      {dot && <span className={
        'h-1.5 w-1.5 rounded-full ' +
        (tone === 'mint' ? 'bg-mint-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-accent-500')
      } />}
      {text}
    </span>
  );
}

function ListItem({ item, selected, onClick }: { item: ListItemData; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        'w-full text-left px-4 py-4 rounded-xl transition relative ' +
        (selected ? 'bg-white/[0.05] ring-1 ring-white/[0.12] backdrop-blur-sm' : 'hover:bg-white/[0.03]')
      }
    >
      {selected && (
        <span className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-full bg-accent-500" />
      )}
      {item.unread && !selected && (
        <span className="absolute left-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent-500" />
      )}
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 h-9 w-9 rounded-full grid place-items-center text-[11.5px] font-medium text-white ring-1 ring-white/[0.12]"
          style={{ backgroundColor: avatarColor(item.name) }}
        >
          {item.avatar || initials(item.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-[13.5px] font-semibold text-white tracking-tightish truncate">{item.name}</div>
            <div className="text-[11.5px] text-ink-200 tabular-nums shrink-0">{item.time}</div>
          </div>
          <div className="mt-0.5 text-[12.5px] text-ink-100 truncate">{item.preview}</div>
          {item.statusChip && (
            <div className="mt-2.5">
              <ToneChip tone={item.statusChip.tone} text={item.statusChip.text} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function ActivityList({ items }: { items: DetailPaneType['activity'] }) {
  return (
    <div>
      <div className="text-[12px] font-medium text-ink-200 mb-3">Activity</div>
      <ul className="flex flex-col gap-2.5">
        {items.map((a, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className={
              'shrink-0 h-2 w-2 rounded-full ' +
              (a.tone === 'mint' ? 'bg-mint-500' : a.tone === 'amber' ? 'bg-amber-500' : 'bg-accent-500')
            } />
            <span className="text-[13px] text-ink-100 tracking-tightish">{a.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailPane({ detail, onApprove, approved }: {
  detail: DetailPaneType | undefined;
  onApprove: () => void;
  approved: boolean;
}) {
  if (!detail) {
    return <div className="grid place-items-center h-full text-ink-200 text-[13px]">Nothing selected.</div>;
  }
  return (
    <div className="px-8 py-7 max-w-[640px]">
      <div className="flex items-center gap-2 text-[12.5px] text-ink-200">
        <span>{detail.breadcrumb[0]}</span>
        <ChevronRight size={13} className="text-ink-300" />
        <span className="text-ink-100">{detail.breadcrumb[1]}</span>
      </div>
      <h1 className="mt-3 text-[22px] font-semibold tracking-tighter2 text-white leading-tight">{detail.title}</h1>
      <div className="mt-1 flex items-center gap-1.5 text-[12.5px] text-ink-200">
        <span>{detail.meta.split(' · ')[0]}</span>
        <span>·</span>
        <Clock size={12} className="text-ink-300" />
        <span>{detail.meta.split(' · ')[1] ?? ''}</span>
      </div>

      <div className="mt-5 card-surface rounded-xl p-5">
        <p className="text-[14px] text-ink-100 leading-relaxed tracking-tightish">{detail.body}</p>
      </div>

      {detail.attachments?.map((a, i) => (
        <div key={i} className="mt-3 card-surface rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-ink-200"><FileText size={15} /></span>
              <div className="text-[13.5px] font-medium text-white tracking-tightish">{a.title}</div>
            </div>
            <div className="text-[11.5px] text-ink-200">{a.time}</div>
          </div>
          <div className="mt-3 space-y-2.5 text-[12.5px] text-ink-100 leading-relaxed">
            {a.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
          </div>
        </div>
      ))}

      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={onApprove}
          disabled={approved}
          className={
            'px-4 py-2 rounded-lg text-[13px] font-medium tracking-tightish transition ' +
            (approved
              ? 'bg-mint-500/15 text-mint-400 ring-1 ring-mint-500/30 cursor-default'
              : 'bg-white text-ink-900 hover:bg-ink-100')
          }
        >
          {approved ? (
            <span className="inline-flex items-center gap-1.5"><Check size={13} /> Approved</span>
          ) : 'Approve'}
        </button>
        <button className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] ring-1 ring-white/[0.12] inline-flex items-center gap-1.5 transition">
          <ArrowUpRight size={13} /> Open
        </button>
        <button className="ml-auto p-2 rounded-lg text-ink-200 hover:text-white hover:bg-white/[0.08] transition" title="More">
          <MoreHorizontal size={15} />
        </button>
      </div>

      <div className="mt-7">
        <ActivityList items={detail.activity ?? []} />
      </div>
    </div>
  );
}

export function ListDetail({ screenKey }: { screenKey: string }) {
  const s = SCREENS[screenKey];
  const [selectedId, setSelectedId] = useState<string>(s.items[0].id);
  const [approvedIds, setApprovedIds] = useState<Record<string, boolean>>({});
  const selected = s.items.find((i) => i.id === selectedId);
  const Ic = ICON_MAP[s.icon] ?? FileText;

  return (
    <div className="screen-enter relative ambient flex h-full">
      <div className="w-[420px] shrink-0 border-r border-white/[0.06] flex flex-col">
        <div className="px-6 pt-7 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-ink-100"><Ic size={17} strokeWidth={1.6} /></span>
            <h1 className="text-[17px] font-semibold tracking-tightish text-white">{s.title}</h1>
            <span className="text-[12.5px] text-ink-200 tabular-nums">{s.items.length}</span>
          </div>
          <LiveBadge />
        </div>
        <div className="px-6 pb-4 text-[12.5px] text-ink-200">{s.subtitle}</div>

        <div className="px-3 pb-4 flex flex-col gap-1 overflow-auto">
          {s.items.map((it) => (
            <ListItem
              key={it.id}
              item={it}
              selected={selectedId === it.id}
              onClick={() => setSelectedId(it.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <DetailPane
          detail={selected?.detail}
          approved={!!approvedIds[selectedId]}
          onApprove={() => setApprovedIds((m) => ({ ...m, [selectedId]: true }))}
        />
      </div>
    </div>
  );
}

