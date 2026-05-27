export type Tone = 'accent' | 'mint' | 'amber';
export type ToneWithRose = Tone | 'rose';
export type ScreenKey = 'inbox' | 'calls' | 'calendar' | 'documents' | 'crm' | 'billing';
export type ActivityState = 'done' | 'wait' | 'error';

export interface StatCard {
  key: string;
  count: number;
  label: string;
  sublabel: string;
  icon: string;
}

export interface ActivityItem {
  type: string;
  tone: Tone;
  title: string;
  firm: string;
  ago: string;
}

export interface StatusChip {
  text: string;
  tone: Tone;
}

export interface DetailActivity {
  state: ActivityState;
  label: string;
  tone: Tone;
}

export interface Attachment {
  title: string;
  time: string;
  paragraphs: string[];
}

export interface DetailPane {
  breadcrumb: [string, string];
  title: string;
  meta: string;
  body: string;
  activity: DetailActivity[];
  attachments?: Attachment[];
}

export interface ListItemData {
  id: string;
  avatar: string;
  name: string;
  preview: string;
  time: string;
  statusChip: StatusChip;
  unread?: boolean;
  detail: DetailPane;
}

export interface Screen {
  icon: string;
  title: string;
  subtitle: string;
  items: ListItemData[];
}

export type TokenKind = 'property' | 'offer' | 'date' | 'deadline';

export interface Token {
  text: string;
  kind?: TokenKind;
}

export interface EmailParagraph {
  text: string;
  tokens?: Token[];
}

export interface ExtractedField {
  icon: string;
  label: string;
  value: string;
  tone: ToneWithRose;
}

export interface Task {
  label: string;
  done: boolean;
}

export interface InboxThread {
  id: string;
  avatar: string;
  name: string;
  subject: string;
  email: string;
  time: string;
  day: string;
  preview: string;
  unread?: boolean;
  group: 'TODAY' | 'YESTERDAY';
  body?: EmailParagraph[];
  extracted?: ExtractedField[];
  tasks?: Task[];
  draft?: string;
}
