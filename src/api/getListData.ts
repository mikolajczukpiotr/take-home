import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import mockJson from "./mock.json";
import { getRandom, shuffle, sleep } from "../utils/utils";
import { useStore } from "../store";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

// Constants for thresholds and delays
const RANDOM_VISIBILITY_THRESHOLD = 50;
const ERROR_THRESHOLD = 85;
const DELETE_DELAY_MULTIPLIER = 100;
const FETCH_DELAY = 1000;

// Error messages
const ERROR_MESSAGES = {
  unexpected: "An unexpected error occurred!",
  fetch: "👀",
};

// Fetch list data function
const fetchListData = async (): Promise<ListItem[]> => {
  await sleep(FETCH_DELAY);

  if (getRandom() > ERROR_THRESHOLD) {
    console.error(ERROR_MESSAGES.unexpected);
    throw new Error(ERROR_MESSAGES.fetch);
  }

  const mockData = mockJson as Omit<ListItem, "isVisible">[];
  return shuffle(mockData).map((item) => ({
    ...item,
    isVisible: getRandom() > RANDOM_VISIBILITY_THRESHOLD,
  }));
};

// Custom hook for fetching list data
export const useGetListData = () => {
  return useQuery({
    queryKey: ["list"],
    queryFn: fetchListData,
    refetchOnWindowFocus: false,
  });
};

// Helper function to optimistically update query data
const updateQueryData = (
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: string[],
  updateFn: (data: ListItem[] | undefined) => ListItem[] | undefined
) => {
  queryClient.setQueryData(queryKey, (currentData: ListItem[] | undefined) =>
    updateFn(currentData)
  );
};

// Custom hook for deleting a card
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

      // Get the current list of cards
      const previousData = queryClient.getQueryData<ListItem[]>(["list"]);

      // Find the card being deleted
      const cardToDelete = previousData?.find((card) => card.id === id);

      // Optimistically update the query data
      updateQueryData(queryClient, ["list"], (data) =>
        data?.filter((card) => card.id !== id)
      );

      // Add the card to the deleted store if it exists
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
