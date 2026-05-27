// Three-pane list/detail screen used by Inbox, Calls, Calendar, Documents, CRM, Billing
const { useState: useStateLD } = React;

function ToneChip({ tone, text, dot = true }) {
  const tones = {
    accent: 'bg-accent-600/15 text-accent-500 ring-accent-600/20',
    mint:   'bg-mint-500/12 text-mint-400 ring-mint-500/20',
    amber:  'bg-amber-500/12 text-amber-500 ring-amber-500/20',
  };
  return (
    <span className={"chip ring-1 ring-inset " + tones[tone]}>
      {dot && <span className={"h-1.5 w-1.5 rounded-full " + (tone === 'mint' ? 'bg-mint-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-accent-500')} />}
      {text}
    </span>
  );
}

function ListItem({ item, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full text-left px-4 py-4 rounded-xl transition relative " +
        (selected
          ? "bg-ink-800/70 ring-1 ring-inset ring-ink-700"
          : "hover:bg-ink-850/60")
      }
    >
      {item.unread && (
        <span className="absolute left-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent-500" />
      )}
      <div className="flex items-start gap-3">
        <div className="shrink-0 h-9 w-9 rounded-full grid place-items-center text-[11.5px] font-medium text-white ring-1 ring-ink-700"
             style={{ backgroundColor: avatarColor(item.name) }}>
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

function ActivityList({ items }) {
  return (
    <div>
      <div className="text-[12.5px] uppercase tracking-[0.16em] text-ink-200 mb-3">Activity</div>
      <ul className="flex flex-col gap-3">
        {items.map((a, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={
              "shrink-0 h-3.5 w-3.5 rounded-full ring-2 ring-ink-900 " +
              (a.tone === 'mint' ? 'bg-mint-500' : a.tone === 'amber' ? 'bg-amber-500' : 'bg-accent-500')
            } />
            <span className="text-[13px] text-ink-100 tracking-tightish">{a.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailPane({ detail, onApprove, approved }) {
  if (!detail) {
    return (
      <div className="grid place-items-center h-full text-ink-200 text-[13px]">Nothing selected.</div>
    );
  }
  return (
    <div className="px-8 py-7 max-w-[640px]">
      <div className="flex items-center gap-2 text-[12.5px] text-ink-200">
        <span>{detail.breadcrumb[0]}</span>
        <Icons.ChevronRight size={13} className="text-ink-300" />
        <span className="text-ink-100">{detail.breadcrumb[1]}</span>
      </div>
      <h1 className="mt-3 text-[22px] font-semibold tracking-tighter2 text-white leading-tight">{detail.title}</h1>
      <div className="mt-1 text-[12.5px] text-ink-200">{detail.meta}</div>

      <div className="mt-5 card-surface rounded-xl p-5">
        <p className="text-[14px] text-ink-100 leading-relaxed tracking-tightish">{detail.body}</p>
      </div>

      {detail.attachments && detail.attachments.map((a, i) => (
        <div key={i} className="mt-3 card-surface rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-ink-200"><Icons.Doc size={15} /></span>
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
            "px-4 py-2 rounded-lg text-[13px] font-medium tracking-tightish transition " +
            (approved
              ? "bg-mint-500/15 text-mint-400 ring-1 ring-mint-500/30 cursor-default"
              : "bg-white text-ink-900 hover:bg-ink-100")
          }
        >
          {approved ? (<span className="inline-flex items-center gap-1.5"><Icons.Check size={13} /> Approved</span>) : 'Approve'}
        </button>
        <button className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-white bg-ink-800 hover:bg-ink-750 ring-1 ring-ink-700 inline-flex items-center gap-1.5 transition">
          <Icons.ArrowUpRight size={13} /> Open
        </button>
        <button className="ml-auto p-2 rounded-lg text-ink-200 hover:text-white hover:bg-ink-800 transition" title="More">
          <Icons.MoreH size={15} />
        </button>
      </div>

      <div className="mt-7">
        <ActivityList items={detail.activity || []} />
      </div>
    </div>
  );
}

function ListDetail({ screenKey }) {
  const s = SCREENS[screenKey];
  const [selectedId, setSelectedId] = useStateLD(s.items[0].id);
  const [approvedIds, setApprovedIds] = useStateLD({});
  const selected = s.items.find(i => i.id === selectedId);
  const Ic = Icons[s.icon];

  return (
    <div className="screen-enter relative ambient flex h-full">
      {/* List pane */}
      <div className="w-[420px] shrink-0 border-r border-ink-800/80 flex flex-col">
        <div className="px-6 pt-7 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-ink-100"><Ic size={17} /></span>
            <h1 className="text-[17px] font-semibold tracking-tightish text-white">{s.title}</h1>
            <span className="text-[12.5px] text-ink-200 tabular-nums">{s.items.length}</span>
          </div>
          <LiveBadge />
        </div>
        <div className="px-6 pb-4 text-[12.5px] text-ink-200">{s.subtitle}</div>

        <div className="px-3 pb-4 flex flex-col gap-1 overflow-auto">
          {s.items.map(it => (
            <ListItem
              key={it.id}
              item={it}
              selected={selectedId === it.id}
              onClick={() => setSelectedId(it.id)}
            />
          ))}
        </div>
      </div>

      {/* Detail pane */}
      <div className="flex-1 overflow-auto">
        <DetailPane
          detail={selected?.detail}
          approved={!!approvedIds[selectedId]}
          onApprove={() => setApprovedIds(m => ({ ...m, [selectedId]: true }))}
        />
      </div>
    </div>
  );
}

window.ListDetail = ListDetail;
window.ToneChip = ToneChip;
