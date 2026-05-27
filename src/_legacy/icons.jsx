// Lucide-style icons. Stroke 1.5, 16px default.
const Ic = ({ d, size = 16, stroke = 1.5, className = '', fill = 'none', children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {d ? <path d={d} /> : children}
  </svg>
);

const Icons = {
  Home: (p) => <Ic {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></Ic>,
  Inbox: (p) => <Ic {...p}><path d="M3 13h4l1.5 3h7L17 13h4"/><path d="M3 13 5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/></Ic>,
  Phone: (p) => <Ic {...p}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></Ic>,
  Calendar: (p) => <Ic {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Ic>,
  Doc: (p) => <Ic {...p}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></Ic>,
  Users: (p) => <Ic {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Ic>,
  Dollar: (p) => <Ic {...p}><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Ic>,
  Search: (p) => <Ic {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Ic>,
  Edit: (p) => <Ic {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></Ic>,
  ChevronDown: (p) => <Ic {...p}><path d="m6 9 6 6 6-6"/></Ic>,
  ChevronRight: (p) => <Ic {...p}><path d="m9 6 6 6-6 6"/></Ic>,
  ArrowUpRight: (p) => <Ic {...p}><path d="M7 17 17 7M8 7h9v9"/></Ic>,
  Reply: (p) => <Ic {...p}><path d="m9 17-5-5 5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></Ic>,
  Archive: (p) => <Ic {...p}><rect x="3" y="3" width="18" height="5" rx="1"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M10 12h4"/></Ic>,
  Star: (p) => <Ic {...p}><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1z"/></Ic>,
  Sparkle: (p) => <Ic {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1"/></Ic>,
  Sparkles: (p) => <Ic {...p}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8zM5 4l.6 1.6L7.2 6.2 5.6 6.8 5 8.4l-.6-1.6L2.8 6.2l1.6-.6z"/></Ic>,
  Send: (p) => <Ic {...p}><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4z"/></Ic>,
  Clock: (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ic>,
  Building: (p) => <Ic {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h.01M9 13h.01M9 17h.01M13 9h.01M13 13h.01M13 17h.01M17 9h.01M17 13h.01M17 17h.01"/></Ic>,
  Settings: (p) => <Ic {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Ic>,
  Folder: (p) => <Ic {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Ic>,
  Workflow: (p) => <Ic {...p}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a2 2 0 0 0 2 2h2M18 9v3a2 2 0 0 1-2 2h-2"/></Ic>,
  BarChart: (p) => <Ic {...p}><path d="M3 3v18h18M7 14v4M12 9v9M17 5v13"/></Ic>,
  MoreH: (p) => <Ic {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></Ic>,
  Pin: (p) => <Ic {...p}><path d="m12 17 .01 5M9 3h6l-1 6 4 3v2H6v-2l4-3z"/></Ic>,
  Check: (p) => <Ic {...p}><path d="m5 12 5 5 9-11"/></Ic>,
  CheckCircle: (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></Ic>,
  Plus: (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>,
  X: (p) => <Ic {...p}><path d="M18 6 6 18M6 6l12 12"/></Ic>,
  Bell: (p) => <Ic {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/></Ic>,
  Globe: (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Ic>,
  Shield: (p) => <Ic {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></Ic>,
  Briefcase: (p) => <Ic {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></Ic>,
  Scale: (p) => <Ic {...p}><path d="M12 3v18M5 21h14M5 7l-3 7a4 4 0 0 0 6 0zM19 7l-3 7a4 4 0 0 0 6 0zM5 7h14"/></Ic>,
  Heart: (p) => <Ic {...p}><path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></Ic>,
  Activity: (p) => <Ic {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></Ic>,
  Mail: (p) => <Ic {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></Ic>,
  Layers: (p) => <Ic {...p}><path d="m12 2 10 6-10 6L2 8z"/><path d="m2 14 10 6 10-6M2 11l10 6 10-6"/></Ic>,
  Lock: (p) => <Ic {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Ic>,
  Filter: (p) => <Ic {...p}><path d="M3 4h18l-7 9v6l-4 2v-8z"/></Ic>,
  Command: (p) => <Ic {...p}><path d="M6 9a3 3 0 1 0 3-3v12a3 3 0 1 0 3-3H6"/><path d="M15 9a3 3 0 1 1 3-3v12a3 3 0 1 1-3-3"/></Ic>,
};

window.Icons = Icons;
