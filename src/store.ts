import { create } from "zustand";

type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

type State = {
  visibleCards: ListItem[];
  expandedCardIds: number[];
  isLoading: boolean;
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  deleteCard: (id: number) => void;
  toggleCardExpansion: (id: number) => void;
};

const loadExpandedCardIds = (): number[] => {
  const savedState = localStorage.getItem("expandedCardIds");
  return savedState ? JSON.parse(savedState) : [];
};

const saveExpandedCardIds = (state: number[]) => {
  localStorage.setItem("expandedCardIds", JSON.stringify(state));
};

export const useStore = create<State & Actions>((set) => ({
  visibleCards: [],
  expandedCardIds: loadExpandedCardIds(),
  isLoading: false,
  setVisibleCards: (cards) => set({ visibleCards: cards }),
  setIsLoading: (isLoading) => set({ isLoading }),
  deleteCard: (id) =>
    set((state) => ({
      visibleCards: state.visibleCards.filter((card) => card.id !== id),
    })),
  toggleCardExpansion: (id) =>
    set((state) => {
      const isExpanded = state.expandedCardIds.includes(id);
      const updatedExpandedCardIds = isExpanded
        ? state.expandedCardIds.filter((cardId) => cardId !== id)
        : [...state.expandedCardIds, id];
      saveExpandedCardIds(updatedExpandedCardIds);
      return { expandedCardIds: updatedExpandedCardIds };
    }),
}));
