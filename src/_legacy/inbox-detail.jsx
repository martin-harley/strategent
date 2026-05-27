// Rich Inbox view — three-pane with extracted metadata + reply draft
const { useState: useStateIB } = React;

const INBOX_THREADS = [
  {
    id: 't1', avatar: 'DR', name: 'Daniel Reeves', subject: 'Counter on 412 Magnolia',
    email: 'daniel@reeves.co', time: '9:42', day: 'Today',
    preview: 'Prepared to move at $1.215M with 25% dow…', unread: true, group: 'TODAY',
    body: [
      { text: 'Anna —' },
      { text: 'We\'re prepared to move on ', tokens: [
        { text: '412 Magnolia', kind: 'property' },
        { text: ' at ' },
        { text: '$1.215M', kind: 'offer' },
        { text: ' with 25% down and a 21-day close, provided the seller covers the standing repair items from the inspection. We\'d want to be in by ' },
        { text: 'August 1', kind: 'date' },
        { text: '.' },
      ] },
      { text: 'Can you push for a response by ', tokens: [
        { text: 'Friday', kind: 'deadline' },
        { text: '?' },
      ] },
      { text: '— Daniel' },
    ],
    extracted: [
      { icon: 'Building', label: 'Property',     value: '412 Magnolia',         tone: 'accent' },
      { icon: 'Dollar',   label: 'Offer',        value: '$1.215M · 25% down',   tone: 'mint' },
      { icon: 'Calendar', label: 'Possession',   value: 'Aug 1',                tone: 'amber' },
      { icon: 'Clock',    label: 'Response by',  value: 'Friday',               tone: 'rose' },
    ],
    tasks: [
      { label: 'Draft counter at $1.215M, 25% down, 21-day close', done: true },
      { label: 'Confirm seller covers repair items from inspection', done: true },
      { label: 'Send written counter to Daniel before Friday EOD', done: false },
      { label: 'Calendar hold: possession review Aug 1', done: false },
    ],
    draft: 'Daniel — sending the counter to Lisa this morning at $1.215M with 25% down and a 21-day close, with a seller credit for the inspection items. I\'ll have a written response back to you before Friday end-of-day.',
  },
  {
    id: 't2', avatar: 'PW', name: 'Priya Whitfield', subject: 'Highland Park — pricing thoughts',
    email: 'priya@whitfield.com', time: '8:17', day: 'Today',
    preview: 'Linden and Forrester closed 4–6% above as…', group: 'TODAY',
  },
  {
    id: 't3', avatar: 'JC', name: 'Jordan Carter', subject: 'Carter showing — they want a second look',
    email: 'jordan@coldwellprop.com', time: '7:54', day: 'Today',
    preview: 'Loved kitchen and outdoor space, want…', group: 'TODAY',
  },
  {
    id: 't4', avatar: 'SC', name: 'Schwab Custody', subject: 'ACAT transfer · complete',
    email: 'ops@schwab.com', time: 'Yesterday', day: 'Yesterday', preview: '', group: 'YESTERDAY',
  },
  {
    id: 't5', avatar: 'ML', name: 'Marcus Lee', subject: 'Pipeline updated',
    email: 'marcus@strategent.app', time: 'Yesterday', day: 'Yesterday', preview: '', group: 'YESTERDAY',
  },
];

function TokenSpan({ token }) {
  if (!token.kind) return <span>{token.text}</span>;
  const styles = {
    property: 'bg-accent-600/15 text-accent-500 ring-accent-600/25',
    offer:    'bg-mint-500/12 text-mint-400 ring-mint-500/25',
    date:     'bg-amber-500/12 text-amber-500 ring-amber-500/25',
    deadline: 'bg-rose-500/12 text-rose-500 ring-rose-500/25',
  };
  return (
    <span className={"inline-flex items-baseline px-1.5 py-0.5 -my-0.5 rounded-md text-[13.5px] font-medium ring-1 ring-inset " + styles[token.kind]}>
      {token.text}
    </span>
  );
}

function Paragraph({ p }) {
  if (!p.tokens) return <p className="text-[14.5px] text-ink-100 leading-[1.75]">{p.text}</p>;
  return (
    <p className="text-[14.5px] text-ink-100 leading-[1.75]">
      {p.text}
      {p.tokens.map((t, i) => <TokenSpan key={i} token={t} />)}
    </p>
  );
}

function ExtractedTile({ icon, label, value, tone }) {
  const Ic = Icons[icon];
  const tones = {
    accent: { bg: 'bg-accent-600/12', text: 'text-accent-500', ring: 'ring-accent-600/20' },
    mint:   { bg: 'bg-mint-500/12',   text: 'text-mint-400',   ring: 'ring-mint-500/20' },
    amber:  { bg: 'bg-amber-500/12',  text: 'text-amber-500',  ring: 'ring-amber-500/20' },
    rose:   { bg: 'bg-rose-500/12',   text: 'text-rose-500',   ring: 'ring-rose-500/20' },
  }[tone];
  return (
    <div className="flex items-center gap-3 card-surface rounded-xl p-3.5">
      <div className={"h-8 w-8 rounded-lg grid place-items-center ring-1 ring-inset " + tones.bg + ' ' + tones.text + ' ' + tones.ring}>
        <Ic size={15} />
      </div>
      <div className="min-w-0">
        <div className={"text-[10.5px] uppercase tracking-[0.14em] " + tones.text}>{label}</div>
        <div className="text-[13.5px] font-medium text-white tracking-tightish truncate">{value}</div>
      </div>
    </div>
  );
}

function PipelineStage({ active, done, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={
        "h-1.5 w-1.5 rounded-full " +
        (done ? "bg-mint-500" : active ? "bg-accent-500" : "bg-ink-600")
      } />
      <span className={
        "text-[11.5px] " +
        (done ? "text-mint-400" : active ? "text-accent-500" : "text-ink-200")
      }>{label}</span>
    </div>
  );
}

function ThreadRow({ thread, selected, onClick }) {
  return (
    <button onClick={onClick} className={
      "w-full text-left px-3.5 py-3 rounded-xl transition relative flex items-start gap-3 " +
      (selected ? "bg-ink-800/70 ring-1 ring-inset ring-ink-700"
                : "hover:bg-ink-850/60")
    }>
      {selected && (
        <span className="absolute left-0 top-3 bottom-3 w-[2px] rounded bg-accent-500" />
      )}
      <div className="shrink-0 h-9 w-9 rounded-full grid place-items-center text-[11.5px] font-medium text-white ring-1 ring-ink-700"
           style={{ backgroundColor: avatarColor(thread.name) }}>
        {thread.avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-[13.5px] font-semibold text-white tracking-tightish truncate">{thread.name}</div>
          <div className="text-[11.5px] text-ink-200 tabular-nums shrink-0">{thread.time}</div>
        </div>
        <div className="text-[12.5px] text-ink-100 truncate tracking-tightish">{thread.subject}</div>
        {thread.preview && (
          <div className="text-[12px] text-ink-200 truncate mt-0.5">{thread.preview}</div>
        )}
      </div>
    </button>
  );
}

function InboxScreen() {
  const [selectedId, setSelectedId] = useStateIB('t1');
  const [starred, setStarred] = useStateIB({ t1: false });
  const [archived, setArchived] = useStateIB({});
  const [sent, setSent] = useStateIB(false);
  const [editing, setEditing] = useStateIB(false);
  const [search, setSearch] = useStateIB('');

  const threads = INBOX_THREADS.filter(t => !archived[t.id] &&
    (search === '' || t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase())));
  const selected = INBOX_THREADS.find(t => t.id === selectedId);
  const today = threads.filter(t => t.group === 'TODAY');
  const yesterday = threads.filter(t => t.group === 'YESTERDAY');

  const [draftText, setDraftText] = useStateIB(selected?.draft || '');
  React.useEffect(() => { setDraftText(selected?.draft || ''); setSent(false); }, [selectedId]);

  return (
    <div className="screen-enter relative ambient flex h-full">
      {/* Thread list */}
      <div className="w-[360px] shrink-0 border-r border-ink-800/80 flex flex-col">
        <div className="px-5 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-ink-100"><Icons.Inbox size={17} /></span>
            <h1 className="text-[17px] font-semibold tracking-tightish text-white">Inbox</h1>
            <span className="text-[12.5px] text-ink-200 tabular-nums">{threads.length}</span>
          </div>
          <button className="p-1.5 rounded-md text-ink-200 hover:text-white hover:bg-ink-800 transition" title="Compose"><Icons.Edit size={15} /></button>
        </div>
        <div className="px-5 pb-3">
          <label className="flex items-center gap-2 px-3 py-2 rounded-md bg-ink-850 ring-1 ring-ink-800">
            <Icons.Search size={14} className="text-ink-200" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search chat…" className="bg-transparent outline-none text-[13px] flex-1 placeholder:text-ink-200 text-white" />
          </label>
        </div>
        <div className="flex-1 overflow-auto px-2 pb-4 flex flex-col gap-1">
          {today.length > 0 && <div className="px-3 pt-2 pb-1 text-[10.5px] tracking-[0.18em] uppercase text-ink-200">Today</div>}
          {today.map(t => (
            <ThreadRow key={t.id} thread={t} selected={selectedId === t.id} onClick={() => setSelectedId(t.id)} />
          ))}
          {yesterday.length > 0 && <div className="px-3 pt-3 pb-1 text-[10.5px] tracking-[0.18em] uppercase text-ink-200">Yesterday</div>}
          {yesterday.map(t => (
            <ThreadRow key={t.id} thread={t} selected={selectedId === t.id} onClick={() => setSelectedId(t.id)} />
          ))}
        </div>
      </div>

      {/* Email detail */}
      <div className="flex-1 overflow-auto">
        {selected && selected.body ? (
          <div>
            {/* Action bar */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-ink-900/80 border-b border-ink-800/80 px-7 py-3 flex items-center gap-1">
              <button className="px-3 py-1.5 rounded-md text-[12.5px] text-white hover:bg-ink-800 inline-flex items-center gap-1.5 transition">
                <Icons.Reply size={14} className="text-accent-500" /> Reply
              </button>
              <button onClick={() => { setArchived(m => ({ ...m, [selected.id]: true })); setSelectedId(threads.find(t => t.id !== selected.id)?.id || ''); }}
                      className="px-3 py-1.5 rounded-md text-[12.5px] text-white hover:bg-ink-800 inline-flex items-center gap-1.5 transition">
                <Icons.Archive size={14} className="text-ink-200" /> Archive
              </button>
              <button onClick={() => setStarred(m => ({ ...m, [selected.id]: !m[selected.id] }))}
                      className="px-3 py-1.5 rounded-md text-[12.5px] text-white hover:bg-ink-800 inline-flex items-center gap-1.5 transition">
                <Icons.Star size={14} className={starred[selected.id] ? "text-amber-500" : "text-ink-200"} fill={starred[selected.id] ? "currentColor" : "none"} />
                {starred[selected.id] ? 'Starred' : 'Star'}
              </button>
              <div className="ml-auto flex items-center gap-3">
                <PipelineStage done label="Triage" />
                <span className="h-px w-3 bg-ink-700"></span>
                <PipelineStage done label="Draft" />
                <span className="h-px w-3 bg-ink-700"></span>
                <PipelineStage active label="Tasks" />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_300px] gap-0">
              {/* Body column */}
              <div className="px-9 py-7 max-w-[720px]">
                <h1 className="text-[24px] font-semibold tracking-tighter2 text-white leading-tight">{selected.subject}</h1>
                <div className="mt-1.5 flex items-center gap-2 text-[12.5px] text-ink-200">
                  <span className="text-white font-medium">{selected.name}</span>
                  <span className="font-mono text-[11.5px] text-ink-200">{'<' + selected.email + '>'}</span>
                  <span>·</span>
                  <span>Today {selected.time}</span>
                </div>

                <div className="mt-7 space-y-5">
                  {selected.body.map((p, i) => <Paragraph key={i} p={p} />)}
                </div>

                {/* Syra reply draft */}
                <div className="mt-7 card-surface rounded-xl p-5 ring-1 ring-accent-600/20 bg-gradient-to-br from-accent-600/[0.04] to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-500"><Icons.Sparkles size={14} /></span>
                      <span className="text-[12.5px] font-medium tracking-tightish text-accent-500">@Syra · reply draft</span>
                    </div>
                    <div className="text-[11.5px] text-ink-200">in your voice · ready</div>
                  </div>
                  {!editing ? (
                    <p className="mt-3 text-[13.5px] text-ink-100 leading-relaxed">{draftText}</p>
                  ) : (
                    <textarea value={draftText} onChange={e => setDraftText(e.target.value)}
                              className="mt-3 w-full bg-ink-850 ring-1 ring-ink-700 rounded-md p-3 text-[13.5px] text-ink-100 leading-relaxed outline-none focus:ring-accent-600/40 min-h-[110px]" />
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    {!sent ? (
                      <button onClick={() => setSent(true)} className="px-3.5 py-2 rounded-lg text-[13px] font-medium bg-accent-600 hover:bg-accent-700 text-white inline-flex items-center gap-1.5 transition">
                        <Icons.Send size={13} /> Send
                      </button>
                    ) : (
                      <span className="px-3.5 py-2 rounded-lg text-[13px] font-medium bg-mint-500/15 text-mint-400 ring-1 ring-mint-500/30 inline-flex items-center gap-1.5">
                        <Icons.Check size={13} /> Sent · 9:43
                      </span>
                    )}
                    <button className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-white bg-ink-800 ring-1 ring-ink-700 hover:bg-ink-750 inline-flex items-center gap-1.5 transition">
                      <Icons.Clock size={13} /> Schedule
                    </button>
                    <button onClick={() => setEditing(v => !v)} className="ml-auto text-[12.5px] text-ink-200 hover:text-white">{editing ? 'Done' : 'Edit'}</button>
                  </div>
                </div>

                {/* Syra-extracted task list */}
                <div className="mt-7">
                  <div className="flex items-center gap-2 text-[12.5px] uppercase tracking-[0.16em] text-ink-200">
                    <span>Tasks</span>
                    <span className="text-ink-300">·</span>
                    <span className="text-accent-500 normal-case tracking-tightish flex items-center gap-1">
                      <Icons.Sparkles size={12} /> extracted by Syra
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {selected.tasks.map((t, i) => (
                      <TaskRow key={i} task={t} />
                    ))}
                  </ul>
                </div>

                <div className="h-10" />
              </div>

              {/* Extracted metadata sidebar */}
              <aside className="border-l border-ink-800/80 px-6 py-7 bg-ink-900/40">
                <div className="text-[12.5px] uppercase tracking-[0.16em] flex items-center gap-2 text-accent-500">
                  <Icons.Sparkles size={12} /> Extracted
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                  {selected.extracted.map((e, i) => <ExtractedTile key={i} {...e} />)}
                </div>

                <div className="mt-7 text-[12.5px] uppercase tracking-[0.16em] flex items-center gap-2 text-mint-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-500"></span> Status
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                  <StatusLine done label="Parsed inbound" />
                  <StatusLine done label="Linked to listing in CRM" />
                  <StatusLine done label="Drafted in your voice" />
                  <StatusLine wait label="Awaiting send approval" />
                </div>

                <div className="mt-7 text-[12.5px] uppercase tracking-[0.16em] text-ink-200">Thread</div>
                <div className="mt-3 text-[12.5px] text-ink-100 leading-relaxed">
                  3 messages · with Daniel Reeves and Lisa (seller). Linked to the <span className="text-accent-500">412 Magnolia</span> listing.
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center h-full text-ink-200 text-[13px]">
            <div className="text-center">
              <div className="mb-3 inline-flex h-10 w-10 rounded-full bg-ink-800 grid place-items-center text-ink-200"><Icons.Mail size={18} /></div>
              <div className="text-[13.5px] text-ink-100">Select a conversation</div>
              <div className="mt-1 text-[12.5px] text-ink-200">Syra has nothing queued for {selected?.name || 'this thread'}.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskRow({ task }) {
  const [done, setDone] = useStateIB(task.done);
  return (
    <li className="flex items-center gap-3">
      <button
        onClick={() => setDone(d => !d)}
        className={
          "h-4.5 w-4.5 rounded-md grid place-items-center transition " +
          (done ? "bg-mint-500 ring-1 ring-mint-500" : "bg-transparent ring-1 ring-ink-600 hover:ring-ink-500")
        }
        style={{ height: 18, width: 18 }}
      >
        {done && <Icons.Check size={11} stroke={2.4} className="text-ink-900" />}
      </button>
      <span className={"text-[13px] tracking-tightish " + (done ? "text-ink-200 line-through decoration-ink-500" : "text-ink-100")}>
        {task.label}
      </span>
    </li>
  );
}

function StatusLine({ done, wait, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={
        "h-3 w-3 rounded-full ring-2 ring-ink-900 " +
        (done ? 'bg-mint-500' : wait ? 'bg-amber-500' : 'bg-ink-600')
      }></span>
      <span className="text-[12.5px] text-ink-100 tracking-tightish">{label}</span>
    </div>
  );
}

window.InboxScreen = InboxScreen;
