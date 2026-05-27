# Strategent Console — Developer Handoff Prompt

You have the complete React + Tailwind source for Strategent, a production-grade AI back-office console. This document guides an agentic system to wire it into a real codebase.

## Stack Overview

**Current state:** Standalone HTML + React (script-loaded, Babel-transpiled inline)
**Target:** Integrate into an existing Vite/Next.js + React + Tailwind + TypeScript codebase

**What you have:**
- `src/icons.jsx` — 30+ Lucide-style SVG icon definitions (to replace with lucide-react)
- `src/data.jsx` — Mock workspace data, sample threads, stat cards, activity feeds
- `src/sidebar.jsx` — Persistent left nav with collapsible sections, notification badges
- `src/home.jsx` — Dashboard with 6 stat cards, activity feed, quick-action panels
- `src/list-detail.jsx` — Three-pane reusable layout (Inbox, Calls, Calendar, Docs, CRM, Billing)
- `src/inbox-detail.jsx` — Rich email thread view with token extraction, @Syra reply drafts, task list
- `src/landing.jsx` — Full-scroll marketing page (hero, integrations, features, industries, FAQ, contact form)
- `src/app.jsx` — Root router (App → Sidebar + main screen, Landing as modal view)

## Integration Checklist

### Phase 1: Setup (30 min)

```bash
# Install dependencies
npm install lucide-react axios zustand @tanstack/react-query
# (or your preferred HTTP + state management)

# Copy src/ into your project
# Ensure Tailwind CSS is configured with the custom color tokens:
theme: {
  extend: {
    colors: {
      ink: { 950: '#07090F', 900: '#0A0D14', ... },
      accent: { 500: '#7C84F2', 600: '#5C66E6', 700: '#4750CC' },
      mint: { 500: '#3FCF8E', 400: '#5CDBA0' },
      amber: { 500: '#E8A33A' },
      rose: { 500: '#E26D7C' },
    },
    fontFamily: {
      sans: ['Geist', 'ui-sans-serif', 'system-ui'],
      mono: ['Geist Mono', 'ui-monospace'],
    },
  }
}
```

### Phase 2: Replace Icons (15 min)

**Before:**
```jsx
import Icons from './icons'; // custom SVG defs
<Icons.Inbox size={17} stroke={1.6} />
```

**After:**
```jsx
import { Inbox, Home, Phone, Calendar, ... } from 'lucide-react';
<Inbox size={17} strokeWidth={1.6} />
```

Update all icon imports in:
- `sidebar.jsx` → use `Home, Inbox, Phone, Calendar, FileText, Users, DollarSign, Search, Edit, ChevronDown, ChevronRight, ArrowUpRight, ...`
- `home.jsx` → same set
- `list-detail.jsx`, `inbox-detail.jsx`, `landing.jsx` → add `Mail, Clock, Building, MoreHorizontal, Star, Send, Archive, Reply, Check, Sparkles, Filter, Plus, X, Lock, Shield, Briefcase, Scale, Heart, Activity, Layers, Command, Folder, TrendingUp, Globe, Settings, Bell, Lock, CheckCircle, Clock`

### Phase 3: Replace Mock Data (1–2 hours)

**data.jsx** currently exports:
- `STAT_CARDS` — hardcoded dashboard counts
- `ACTIVITY` — recent activity feed items
- `SCREENS` — per-section list+detail data (inbox threads, calls, calendar events, etc.)

**Wire to your API:**

```jsx
// Replace with real API calls
const [statCards, setStatCards] = useState([]);
useEffect(() => {
  fetch('/api/dashboard/stats')
    .then(r => r.json())
    .then(setStatCards);
}, []);

// Same pattern for ACTIVITY, SCREENS
```

**Key endpoints to create:**
- `GET /api/dashboard/stats` → returns `[{ key, count, label, sublabel, icon }]`
- `GET /api/activity` → returns `[{ type, tone, title, firm, ago }]`
- `GET /api/{screenKey}/items` → inbox threads, calls, calendar events, etc.
  - Per item: `{ id, avatar, name, preview, time, statusChip, unread, detail: { breadcrumb, title, meta, body, activity, ... } }`
- `GET /api/inbox/threads` → rich email threads with extracted tokens
- `POST /api/inbox/{threadId}/send-draft` → submit Syra-drafted email

### Phase 4: Wire Router (30 min)

**Current routing (simple state-based):**
```jsx
const [route, setRoute] = useState('home');
{route === 'home' && <Home />}
{route === 'inbox' && <InboxScreen />}
```

**Upgrade to React Router v6:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="inbox" element={<InboxScreen />} />
      <Route path="calls" element={<ListDetail screenKey="calls" />} />
      {/* ... etc ... */}
    </Route>
    <Route path="/landing" element={<Landing />} />
  </Routes>
</BrowserRouter>
```

Or if using Next.js:
```jsx
// pages/index.jsx → Home
// pages/inbox.jsx → InboxScreen
// pages/[section].jsx → ListDetail
// pages/landing.jsx → Landing
```

### Phase 5: State Management (2–3 hours)

**Current state (demo only):**
- `selectedId` (selected list item)
- `approvedIds` (which items are approved)
- `draftText` (Syra reply draft)
- `open` (FAQ accordions, collapsible nav sections)

**Upgrade to persistent state:**

```jsx
// Use Zustand or Redux to track:
// - User workspace context (firm name, email, avatar)
// - Selected thread/item across navigation
// - Draft states (in-progress emails, unsent messages)
// - User preferences (theme, notification settings)
// - Real-time sync status

// Example: Zustand store
const useAppStore = create((set) => ({
  workspace: null,
  selectedThreadId: null,
  drafts: {},
  setWorkspace: (ws) => set({ workspace: ws }),
  setSelectedThread: (id) => set({ selectedThreadId: id }),
  saveDraft: (id, text) => set((s) => ({ drafts: { ...s.drafts, [id]: text } })),
}));
```

### Phase 6: Real-time Sync & Notifications (3–4 hours)

**Current:** "Live · synced just now" is static.

**Add WebSocket or polling:**
```jsx
useEffect(() => {
  const ws = new WebSocket('wss://api.strategent.app/sync');
  ws.onmessage = (e) => {
    const { type, data } = JSON.parse(e.data);
    // { type: 'inbox.new', data: { threadId, ... } }
    // { type: 'dashboard.stats.update', data: { statCards } }
    if (type === 'inbox.new') {
      // Prepend new thread, update badge count
      setInboxThreads(prev => [data, ...prev]);
      setStatCards(sc => ({ ...sc, inbox: sc.inbox + 1 }));
    }
  };
  return () => ws.close();
}, []);
```

### Phase 7: Approval & Action Workflows (4–6 hours)

**Current:** Approve button just toggles a local flag.

**Wire to backend:**
```jsx
const handleApprove = async (threadId) => {
  const response = await fetch(`/api/inbox/${threadId}/approve`, {
    method: 'POST',
    body: JSON.stringify({ draftText }),
  });
  // Webhook → send email / move calendar / reconcile invoice / update CRM
  // Return confirmation or error
};

const handleSend = async (threadId) => {
  // Send the draft (real email)
  const response = await fetch(`/api/inbox/${threadId}/send`, { method: 'POST' });
  // Server logs action, sends email, returns success
  setThreads(prev => prev.map(t => t.id === threadId ? { ...t, sent: true } : t));
};
```

### Phase 8: Form Submissions (Landing Page) (2 hours)

**Current:** Contact form state only stored locally, success message shows.

**Wire to backend:**
```jsx
const handleContactSubmit = async (formData) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  // Server: send email to partners@strategent.app, store lead in CRM
  if (res.ok) setSent(true);
};
```

## Estimated Full Integration Timeline

| Phase | Task | Time |
|-------|------|------|
| 1 | Setup, Tailwind config | 30 min |
| 2 | Replace icons with lucide-react | 15 min |
| 3 | Wire mock data → real API | 1–2 hr |
| 4 | Router setup (React Router or Next.js) | 30 min |
| 5 | State management (Zustand/Redux) | 2–3 hr |
| 6 | WebSocket / real-time sync | 3–4 hr |
| 7 | Approval workflows + actions | 4–6 hr |
| 8 | Form submissions | 2 hr |
| **Total** | | **13–18 hours** |

## Key Design Notes

- **Dark theme by default** — all text, backgrounds, and borders use the `ink-*` palette. Accent color is muted indigo (`#7C84F2`). Mint for success, amber for warnings, rose for deadlines.
- **Dense, power-user layout** — sidebar, list pane, detail pane all visible at once. No modals. Scrollable regions stay tight.
- **No gradients or gimmicks** — subtle borders, shadows, and hover states only. Enterprise aesthetic.
- **Approval-centric** — every outbound action (email, calendar move, invoice issuance, CRM update) can require partner approval. Default is approval-required; you tune per action type.
- **Extracted metadata** — @Syra pulls structured data (property address, offer price, deadline, etc.) and highlights them as inline chips. This is a design feature, not a rendering quirk.
- **Task extraction** — Email and call threads can have AI-extracted task lists. These are editable checkboxes, not read-only.
- **Industry tabs on landing** — Law, Real Estate, Finance, Medical. Each has custom copy and stats. Implement as a simple `<select>` or tab component; no routing needed.

## Files to Create / Update

```
project/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Home.jsx
│   │   ├── ListDetail.jsx
│   │   ├── InboxScreen.jsx
│   │   ├── Landing.jsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useWorkspace.js
│   │   ├── useInbox.js
│   │   └── useSync.js (for WebSocket)
│   ├── store/
│   │   └── appStore.js (Zustand or Redux)
│   ├── api/
│   │   ├── dashboard.js
│   │   ├── inbox.js
│   │   ├── billing.js
│   │   └── ...
│   ├── data.js (← replace with live API)
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js (← custom color tokens)
├── package.json (← lucide-react + state lib)
└── ...
```

## Questions for Your Dev Team

1. **Routing:** React Router v6 or Next.js?
2. **State:** Zustand, Redux, or TanStack Query?
3. **Real-time:** WebSocket, polling, or gRPC?
4. **Auth:** Does the sidebar workspace switcher open a modal, or is it a multi-tenant UI?
5. **API design:** RESTful, GraphQL, or tRPC?
6. **Approval workflows:** Database schema for audit trails?

## Next Steps

1. Copy `src/` into your project
2. Run Phase 1–2 (setup + icons): 45 min
3. Call your agent with this prompt + the updated code
4. Agent wires data → API, sets up router, builds state layer
5. QA and iterate

---

**Good luck!** The UI is polished; the wiring is the real work. Your agent can handle 60–70% of it (data fetching, router scaffolding, state setup). The last 30% (approval workflows, real-time sync, form validation) will need domain knowledge from your team.
