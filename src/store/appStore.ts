import { create } from 'zustand';

interface AppStore {
  selectedId: Record<string, string | null>;
  approvedIds: Record<string, boolean>;
  draftText: Record<string, string>;
  openSections: Record<string, boolean>;
  sent: Record<string, boolean>;
  starred: Record<string, boolean>;
  archived: Record<string, boolean>;

  setSelectedId: (screen: string, id: string | null) => void;
  setApproved: (id: string, approved: boolean) => void;
  saveDraft: (id: string, text: string) => void;
  toggleSection: (key: string, defaultOpen?: boolean) => void;
  setSent: (id: string, value: boolean) => void;
  toggleStarred: (id: string) => void;
  setArchived: (id: string, value: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedId: {},
  approvedIds: {},
  draftText: {},
  openSections: { workspace: true, favorites: true },
  sent: {},
  starred: {},
  archived: {},

  setSelectedId: (screen, id) =>
    set((s) => ({ selectedId: { ...s.selectedId, [screen]: id } })),

  setApproved: (id, approved) =>
    set((s) => ({ approvedIds: { ...s.approvedIds, [id]: approved } })),

  saveDraft: (id, text) =>
    set((s) => ({ draftText: { ...s.draftText, [id]: text } })),

  toggleSection: (key, defaultOpen = true) =>
    set((s) => ({
      openSections: {
        ...s.openSections,
        [key]: s.openSections[key] === undefined ? !defaultOpen : !s.openSections[key],
      },
    })),

  setSent: (id, value) =>
    set((s) => ({ sent: { ...s.sent, [id]: value } })),

  toggleStarred: (id) =>
    set((s) => ({ starred: { ...s.starred, [id]: !s.starred[id] } })),

  setArchived: (id, value) =>
    set((s) => ({ archived: { ...s.archived, [id]: value } })),
}));
