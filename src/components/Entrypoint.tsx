import { useState } from "react";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { ToggleButton } from "./ToggleButton";
import {
  useDeleteCard,
  useFetchListData,
  useGetListData,
} from "../hooks/useListData";

export const Entrypoint = () => {
  const { deletedCards, toggleCardExpansion } = useStore();
  const { refetch } = useGetListData();
  const deleteCardMutation = useDeleteCard();
  const [showDeleted, setShowDeleted] = useState(false);

  const { visibleCards, isFetching, isError } = useFetchListData();

  const handleDelete = (id: number) => {
    deleteCardMutation.mutate(id);
  };

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-medium text-lg">
            My Awesome List ({visibleCards?.length ?? 0})
          </h1>
          <ToggleButton onClick={() => refetch()}>Refresh</ToggleButton>
        </div>
        <div className="flex flex-col gap-y-3">
          {isFetching ? (
            <Spinner />
          ) : (
            visibleCards?.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                id={card.id}
                onDelete={handleDelete}
                onToggleExpansion={toggleCardExpansion}
              />
            ))
          )}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <ToggleButton onClick={() => setShowDeleted(!showDeleted)}>
            {showDeleted ? "Hide" : "Reveal"}
          </ToggleButton>
        </div>
        {showDeleted && (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card) => (
              <Card key={card.id} title={card.title} id={card.id} isDeleted />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
