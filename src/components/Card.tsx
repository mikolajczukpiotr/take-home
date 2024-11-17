import { FC, useRef, useEffect, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon, ChevronDownIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  id: ListItem["id"];
  onDelete: (id: number) => void;
};

export const Card: FC<CardProps> = ({ title, description, id, onDelete }) => {
  const { expandedCardIds, toggleCardExpansion } = useStore();
  const isExpanded = expandedCardIds.includes(id);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const handleExpandClick = () => {
    toggleCardExpansion(id);
  };

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isExpanded]);

  return (
    <div className="border border-black px-2 py-1.5 transition-all duration-300">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={handleExpandClick}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>
          <DeleteButton onClick={() => onDelete(id)} />
        </div>
      </div>
      <p
        ref={contentRef}
        className="text-sm transition-max-height duration-300 ease-in-out overflow-hidden"
        style={{ maxHeight }}
      >
        {description}
      </p>
    </div>
  );
};
