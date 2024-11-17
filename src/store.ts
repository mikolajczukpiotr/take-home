import { create } from "zustand";

// Types
type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

type State = {
  deletedCards: ListItem[];
  expandedCardIds: number[];
};

type Actions = {
  deleteCard: (card: ListItem) => void;
  toggleCardExpansion: (id: number) => void;
};

// Helpers for persistence
const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

const saveToLocalStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Zustand Store
export const useStore = create<State & Actions>((set) => ({
  // Initial State
  deletedCards: loadFromLocalStorage("deletedCards", []),
  expandedCardIds: loadFromLocalStorage("expandedCardIds", []),

  // Actions
  deleteCard: (card: ListItem) =>
    set((state) => {
      const updatedDeletedCards = [...state.deletedCards, card];
      saveToLocalStorage("deletedCards", updatedDeletedCards);
      return { deletedCards: updatedDeletedCards };
    }),

  toggleCardExpansion: (id) =>
    set((state) => {
      const updatedExpandedIds = state.expandedCardIds.includes(id)
        ? state.expandedCardIds.filter((cardId) => cardId !== id)
        : [...state.expandedCardIds, id];

      saveToLocalStorage("expandedCardIds", updatedExpandedIds);
      return { expandedCardIds: updatedExpandedIds };
    }),
}));
