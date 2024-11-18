import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../store";
import { fetchListData, ListItem } from "../api/getList";
import { getRandom } from "../utils/utils";

const DELETE_DELAY_MULTIPLIER = 100;

export const useFetchListData = () => {
  const { data: listQuery, isFetching, isError } = useGetListData();
  const { deletedCards } = useStore();

  // Directly derive visible cards from query data and exclude deleted cards
  const visibleCards = listQuery
    ? listQuery.filter(
        (item) =>
          item.isVisible &&
          !deletedCards.some((deleted) => deleted.id === item.id)
      )
    : [];

  return { visibleCards, isFetching, isError };
};
export const useGetListData = () => {
  return useQuery({
    queryKey: ["list"],
    queryFn: fetchListData,
    refetchOnWindowFocus: false,
  });
};

const updateQueryData = (
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: string[],
  updateFn: (data: ListItem[] | undefined) => ListItem[] | undefined
) => {
  queryClient.setQueryData(queryKey, (currentData: ListItem[] | undefined) =>
    updateFn(currentData)
  );
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  const { deleteCard } = useStore();

  return useMutation({
    mutationFn: () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, getRandom() * DELETE_DELAY_MULTIPLIER);
      }),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["list"] });

      const previousData = queryClient.getQueryData<ListItem[]>(["list"]);

      const cardToDelete = previousData?.find((card) => card.id === id);

      updateQueryData(queryClient, ["list"], (data) =>
        data?.filter((card) => card.id !== id)
      );

      if (cardToDelete) {
        deleteCard(cardToDelete);
      }

      return { previousData, cardToDelete };
    },

    onError: (
      _: unknown,
      __: number,
      context: { previousData: ListItem[] | undefined } | undefined
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(["list"], context.previousData);
      }
    },
  });
};
