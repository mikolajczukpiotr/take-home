import { useGetListData } from "../api/getListData";
import { useStore } from "../store";

export const useFetchListData = () => {
  const { data: listQuery, isLoading } = useGetListData();
  const { deletedCards } = useStore();

  // Directly derive visible cards from query data and exclude deleted cards
  const visibleCards = listQuery
    ? listQuery.filter(
        (item) =>
          item.isVisible &&
          !deletedCards.some((deleted) => deleted.id === item.id)
      )
    : [];

  return { visibleCards, isLoading };
};
