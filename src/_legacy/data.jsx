// Sample workspace data
const avatarColor = (name) => {
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `oklch(0.55 0.08 ${h})`;
};
const initials = (name) => name.split(/[\s·&]+/).filter(Boolean).slice(0,2).map(s => s[0]?.toUpperCase() || '').join('');

const STAT_CARDS = [
  { key: 'inbox',     count: 128,  label: 'Inbox',     sublabel: '12 drafted',    icon: 'Inbox' },
  { key: 'calls',     count: 9,    label: 'Calls',     sublabel: '4 transcribed', icon: 'Phone' },
  { key: 'calendar',  count: 12,   label: 'Calendar',  sublabel: '4 today',       icon: 'Calendar' },
  { key: 'documents', count: 23,   label: 'Documents', sublabel: '3 awaiting sign', icon: 'Doc' },
  { key: 'crm',       count: 47,   label: 'CRM',       sublabel: '$14M pipeline', icon: 'Users' },
  { key: 'billing',   count: 6,    label: 'Billing',   sublabel: '2 past due',    icon: 'Dollar' },
];

const ACTIVITY = [
  { type: 'docs',     tone: 'accent', title: 'IPS draft v2 ready to sign',  firm: 'Heartwell Capital',  ago: 'now' },
  { type: 'calendar', tone: 'mint',   title: 'Q2 review booked · Thu 2pm',  firm: 'Whitfield household', ago: '3m' },
  { type: 'billing',  tone: 'mint',   title: 'Advisory fee invoice · paid', firm: 'Greer & Associates',  ago: '21m' },
  { type: 'crm',      tone: 'accent', title: 'Pipeline +$14M, three to proposal', firm: 'Marcus Lee',   ago: '12m' },
  { type: 'inbox',    tone: 'amber',  title: 'Trustee intro · referral',    firm: 'Northbridge Trust',   ago: '34m' },
  { type: 'calls',    tone: 'accent', title: 'Inbound · prospective client', firm: '+1 (212) 555-0142',  ago: '1h' },
];

// Per-screen list data (used by list-detail views)
const SCREENS = {
  inbox: {
    icon: 'Inbox', title: 'Inbox', subtitle: 'Triaged and drafted in your voice',
    items: [
      { id: 'i1', avatar: 'WF', name: 'Heartwell Capital', preview: 'Re: Q2 allocation memo', time: 'now',
        statusChip: { text: 'Drafted', tone: 'accent' }, unread: true,
        detail: {
          breadcrumb: ['Inbox', 'Drafted'],
          title: 'Re: Q2 allocation memo',
          meta: 'Heartwell Capital · now',
          body: 'Comfortable with the shift to private credit. Let\'s keep municipals at 18% for now.',
          activity: [
            { state: 'done', label: 'Parsed inbound and classified', tone: 'accent' },
            { state: 'done', label: 'Pulled context from CRM and prior threads', tone: 'accent' },
            { state: 'done', label: 'Drafted response in your voice', tone: 'mint' },
            { state: 'wait', label: 'Awaiting approval', tone: 'amber' },
          ],
        }
      },
      { id: 'i2', avatar: 'AG', name: 'Avery Greer · client', preview: 'Tax-loss harvest window', time: '8m',
        statusChip: { text: 'Replied', tone: 'mint' },
        detail: {
          breadcrumb: ['Inbox', 'Replied'],
          title: 'Tax-loss harvest window',
          meta: 'Avery Greer · 8m',
          body: 'Confirmed the harvest schedule. I\'ll surface candidates Friday before market open.',
          activity: [
            { state: 'done', label: 'Parsed inbound and classified', tone: 'accent' },
            { state: 'done', label: 'Pulled context from CRM and prior threads', tone: 'accent' },
            { state: 'done', label: 'Drafted response in your voice', tone: 'mint' },
            { state: 'done', label: 'Sent after approval', tone: 'mint' },
          ],
        }
      },
      { id: 'i3', avatar: 'NT', name: 'Northbridge Trust', preview: 'Trustee intro · referral', time: '22m',
        statusChip: { text: 'Routed', tone: 'mint' },
        detail: {
          breadcrumb: ['Inbox', 'Routed'],
          title: 'Trustee intro · referral',
          meta: 'Northbridge Trust · 22m',
          body: 'Routed to Marcus. Intro thread opened with Carla and the trust attorneys CC\'d.',
          activity: [
            { state: 'done', label: 'Parsed inbound and classified', tone: 'accent' },
            { state: 'done', label: 'Pulled context from CRM and prior threads', tone: 'accent' },
            { state: 'done', label: 'Routed to Marcus Lee', tone: 'mint' },
            { state: 'wait', label: 'Awaiting reply', tone: 'amber' },
          ],
        }
      },
      { id: 'i4', avatar: 'SC', name: 'Custodian · Schwab', preview: 'ACAT transfer · complete', time: '41m',
        statusChip: { text: 'Filed', tone: 'accent' },
        detail: {
          breadcrumb: ['Inbox', 'Filed'],
          title: 'ACAT transfer · complete',
          meta: 'Custodian · Schwab · 41m',
          body: '$2.4M in-kind transfer settled. Filed under Whitfield household, custody records updated.',
          activity: [
            { state: 'done', label: 'Parsed inbound and classified', tone: 'accent' },
            { state: 'done', label: 'Pulled context from CRM', tone: 'accent' },
            { state: 'done', label: 'Filed to household record', tone: 'mint' },
          ],
        }
      },
    ],
  },
  calls: {
    icon: 'Phone', title: 'Calls', subtitle: 'Routed, transcribed, logged',
    items: [
      { id: 'c1', avatar: 'AK', name: '+1 (212) 555-0142', preview: 'Inbound · prospective client', time: '1m',
        statusChip: { text: 'Routed', tone: 'mint' }, unread: true,
        detail: {
          breadcrumb: ['Calls', 'Routed'],
          title: 'Inbound · prospective client',
          meta: '+1 (212) 555-0142 · 1m',
          body: 'Liquidity event from a business sale. Routed to Marcus, intake scheduled.',
          activity: [
            { state: 'done', label: 'Parsed inbound and classified', tone: 'accent' },
            { state: 'done', label: 'Pulled context from CRM and prior threads', tone: 'accent' },
            { state: 'done', label: 'Drafted response in your voice', tone: 'mint' },
            { state: 'wait', label: 'Awaiting approval', tone: 'amber' },
          ],
        }
      },
      { id: 'c2', avatar: 'HC', name: 'Hartwell Capital', preview: 'Quarterly review recap', time: '14m',
        statusChip: { text: 'Logged', tone: 'accent' },
        detail: {
          breadcrumb: ['Calls', 'Logged'],
          title: 'Quarterly review recap',
          meta: 'Hartwell Capital · 14m',
          body: 'Reviewed Q2 performance and next quarter\'s allocation. Action items logged into CRM.',
          activity: [
            { state: 'done', label: 'Transcribed 42 min call', tone: 'accent' },
            { state: 'done', label: 'Extracted 7 action items', tone: 'mint' },
            { state: 'done', label: 'Logged to household timeline', tone: 'mint' },
          ],
        }
      },
      { id: 'c3', avatar: 'VM', name: 'Voicemail · 4 new', preview: 'Transcribed and triaged', time: '33m',
        statusChip: { text: 'Triaged', tone: 'amber' },
        detail: {
          breadcrumb: ['Calls', 'Triaged'],
          title: 'Voicemail · 4 new',
          meta: 'Voicemail queue · 33m',
          body: 'Four voicemails transcribed. Two routed to advisors, two flagged for personal callback.',
          activity: [
            { state: 'done', label: 'Transcribed 4 voicemails', tone: 'accent' },
            { state: 'done', label: 'Classified urgency', tone: 'mint' },
            { state: 'wait', label: 'Awaiting callback', tone: 'amber' },
          ],
        }
      },
    ],
  },
  calendar: {
    icon: 'Calendar', title: 'Calendar', subtitle: 'Booked with prep notes attached',
    items: [
      { id: 'k1', avatar: 'WF', name: 'Heartwell Capital', preview: 'Annual review · Thu 2pm', time: '3m',
        statusChip: { text: 'Booked', tone: 'accent' }, unread: true,
        detail: {
          breadcrumb: ['Calendar', 'Booked'],
          title: 'Annual review · Thu 2pm',
          meta: 'Heartwell Capital · 3m',
          body: 'Conflict with IC meeting resolved. Performance brief prepared.',
          activity: [
            { state: 'done', label: 'Detected scheduling conflict', tone: 'accent' },
            { state: 'done', label: 'Rebooked attendees', tone: 'accent' },
            { state: 'done', label: 'Drafted prep notes', tone: 'mint' },
            { state: 'wait', label: 'Awaiting approval', tone: 'amber' },
          ],
        }
      },
      { id: 'k2', avatar: 'GA', name: 'Greer & Associates', preview: 'Quarterly review · Mon 9am', time: '27m',
        statusChip: { text: 'Prepped', tone: 'mint' },
        detail: {
          breadcrumb: ['Calendar', 'Prepped'],
          title: 'Quarterly review · Mon 9am',
          meta: 'Greer & Associates · 27m',
          body: 'Prep packet generated with Q2 attribution and Q3 talking points.',
          activity: [
            { state: 'done', label: 'Pulled household snapshot', tone: 'accent' },
            { state: 'done', label: 'Generated prep packet', tone: 'mint' },
          ],
        }
      },
      { id: 'k3', avatar: 'IC', name: 'Internal · IC sync', preview: 'Rescheduled to Fri 10am', time: '1h',
        statusChip: { text: 'Moved', tone: 'amber' },
        detail: {
          breadcrumb: ['Calendar', 'Moved'],
          title: 'Rescheduled to Fri 10am',
          meta: 'Internal · IC sync · 1h',
          body: 'IC sync moved to clear conflict with the Heartwell review. All attendees confirmed.',
          activity: [
            { state: 'done', label: 'Detected scheduling conflict', tone: 'accent' },
            { state: 'done', label: 'Proposed new times', tone: 'accent' },
            { state: 'done', label: 'Confirmed with attendees', tone: 'mint' },
          ],
        }
      },
    ],
  },
  documents: {
    icon: 'Doc', title: 'Documents', subtitle: 'Drafted from approved templates',
    items: [
      { id: 'd1', avatar: 'IP', name: 'Investment policy stmt', preview: 'Draft v2 · ready to sign', time: '6m',
        statusChip: { text: 'Ready', tone: 'mint' }, unread: true,
        detail: {
          breadcrumb: ['Documents', 'Ready'],
          title: 'Draft v2 · ready to sign',
          meta: 'Investment policy stmt · 6m',
          body: 'Pulled clauses from the Heartwell template. Two redlines on liquidity flagged.',
          activity: [
            { state: 'done', label: 'Loaded household profile', tone: 'accent' },
            { state: 'done', label: 'Composed from approved template', tone: 'accent' },
            { state: 'done', label: 'Reviewed against compliance', tone: 'mint' },
            { state: 'wait', label: 'Awaiting approval', tone: 'amber' },
          ],
          attachments: [
            { title: 'Investment Policy Statement — Heartwell Capital', time: '6m',
              paragraphs: [
                'This statement governs the investment of household assets across taxable, retirement, and trust accounts, effective May 1, 2026.',
                'Strategic allocation: 55% global equities, 25% fixed income, 12% private credit, 5% real assets, 3% cash. Rebalanced quarterly within tolerance bands.',
              ] },
          ],
        }
      },
      { id: 'd2', avatar: 'QL', name: 'Quarterly client letter', preview: 'Generated from intake', time: '19m',
        statusChip: { text: 'Drafted', tone: 'accent' },
        detail: {
          breadcrumb: ['Documents', 'Drafted'],
          title: 'Quarterly Client Letter — Q2 2026',
          meta: 'Quarterly client letter · 19m',
          body: 'Generated from intake notes and the standard Q2 letter template.',
          attachments: [
            { title: 'Quarterly Client Letter — Q2 2026', time: '19m',
              paragraphs: [
                'Performance summary across the household: total return net of fees, contribution from each sleeve, and benchmark comparison.',
                'Market commentary: rates, credit spreads, equity earnings dispersion, and what we changed in the model portfolios.',
              ] },
          ],
          activity: [
            { state: 'done', label: 'Loaded household snapshot', tone: 'accent' },
            { state: 'done', label: 'Composed from template', tone: 'mint' },
          ],
        }
      },
      { id: 'd3', avatar: 'AA', name: 'Advisory agreement', preview: 'Compared to v1.2', time: '44m',
        statusChip: { text: 'Compared', tone: 'accent' },
        detail: {
          breadcrumb: ['Documents', 'Compared'],
          title: 'Advisory agreement · v1.2 → v1.3',
          meta: 'Advisory agreement · 44m',
          body: '6 clause changes, 2 flagged for review. Fee schedule and termination terms updated.',
          activity: [
            { state: 'done', label: 'Diffed against v1.2', tone: 'accent' },
            { state: 'done', label: 'Flagged material changes', tone: 'amber' },
          ],
        }
      },
    ],
  },
  crm: {
    icon: 'Users', title: 'CRM', subtitle: 'Pipeline kept in perfect sync',
    items: [
      { id: 'r1', avatar: 'ML', name: 'Marcus Lee · advisor', preview: 'Pipeline updated', time: '12m',
        statusChip: { text: 'Synced', tone: 'accent' }, unread: true,
        detail: {
          breadcrumb: ['CRM', 'Synced'],
          title: 'Pipeline updated',
          meta: 'Marcus Lee · advisor · 12m',
          body: 'Added $14M of prospective AUM. Three households advanced to proposal.',
          activity: [
            { state: 'done', label: 'Parsed inbound and classified', tone: 'accent' },
            { state: 'done', label: 'Pulled context from CRM and prior threads', tone: 'accent' },
            { state: 'done', label: 'Drafted response in your voice', tone: 'mint' },
            { state: 'wait', label: 'Awaiting approval', tone: 'amber' },
          ],
        }
      },
      { id: 'r2', avatar: 'WF', name: 'Heartwell Capital', preview: 'Stage → Onboarding', time: '31m',
        statusChip: { text: 'Advanced', tone: 'mint' },
        detail: {
          breadcrumb: ['CRM', 'Advanced'],
          title: 'Stage → Onboarding',
          meta: 'Heartwell Capital · 31m',
          body: 'Engagement signed. Moved to onboarding with the standard 30-day plan attached.',
          activity: [
            { state: 'done', label: 'Detected stage change', tone: 'accent' },
            { state: 'done', label: 'Updated CRM record', tone: 'mint' },
            { state: 'done', label: 'Notified household team', tone: 'mint' },
          ],
        }
      },
      { id: 'r3', avatar: '12', name: '12 household contacts', preview: 'Enriched with new context', time: '55m',
        statusChip: { text: 'Enriched', tone: 'accent' },
        detail: {
          breadcrumb: ['CRM', 'Enriched'],
          title: '12 household contacts',
          meta: 'Bulk enrichment · 55m',
          body: 'Pulled fresh employer, role, and household size data from the connected providers.',
          activity: [
            { state: 'done', label: 'Identified 12 stale records', tone: 'accent' },
            { state: 'done', label: 'Enriched with verified data', tone: 'mint' },
          ],
        }
      },
    ],
  },
  billing: {
    icon: 'Dollar', title: 'Billing', subtitle: 'Invoices reconciled to engagements',
    items: [
      { id: 'b1', avatar: 'IN', name: 'Invoice 1042 · paid', preview: 'Advisory fee received', time: '21m',
        statusChip: { text: 'Closed', tone: 'mint' }, unread: true,
        detail: {
          breadcrumb: ['Billing', 'Closed'],
          title: 'Advisory fee received',
          meta: 'Invoice 1042 · paid · 21m',
          body: '$24,200 from Greer & Associates. Reconciled to the household.',
          activity: [
            { state: 'done', label: 'Parsed inbound and classified', tone: 'accent' },
            { state: 'done', label: 'Pulled context from CRM and prior threads', tone: 'accent' },
            { state: 'done', label: 'Drafted response in your voice', tone: 'mint' },
            { state: 'wait', label: 'Awaiting approval', tone: 'amber' },
          ],
        }
      },
      { id: 'b2', avatar: 'IN', name: 'Invoice 1045 · sent', preview: 'Auto-issued for Q2 fees', time: '48m',
        statusChip: { text: 'Sent', tone: 'accent' },
        detail: {
          breadcrumb: ['Billing', 'Sent'],
          title: 'Auto-issued for Q2 fees',
          meta: 'Invoice 1045 · sent · 48m',
          body: '$18,600 to Whitfield household. Auto-issued on the quarterly schedule.',
          activity: [
            { state: 'done', label: 'Computed Q2 fees', tone: 'accent' },
            { state: 'done', label: 'Issued invoice', tone: 'mint' },
            { state: 'wait', label: 'Awaiting payment', tone: 'amber' },
          ],
        }
      },
      { id: 'b3', avatar: 'PD', name: 'Past due · 2 households', preview: 'Reminders queued', time: '1h',
        statusChip: { text: 'Queued', tone: 'amber' },
        detail: {
          breadcrumb: ['Billing', 'Queued'],
          title: 'Reminders queued',
          meta: 'Past due · 2 households · 1h',
          body: 'Two invoices past 30 days. Polite reminders drafted in your voice for review.',
          activity: [
            { state: 'done', label: 'Detected past due', tone: 'accent' },
            { state: 'done', label: 'Drafted reminders', tone: 'mint' },
            { state: 'wait', label: 'Awaiting approval', tone: 'amber' },
          ],
        }
      },
    ],
  },
};

window.STAT_CARDS = STAT_CARDS;
window.ACTIVITY = ACTIVITY;
window.SCREENS = SCREENS;
window.avatarColor = avatarColor;
window.initials = initials;
