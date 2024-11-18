import mockJson from "./mock.json";
import { getRandom, shuffle, sleep } from "../utils/utils";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

const RANDOM_VISIBILITY_THRESHOLD = 50;
const ERROR_THRESHOLD = 85;
const FETCH_DELAY = 1000;

const ERROR_MESSAGES = {
  unexpected: "An unexpected error occurred!",
  fetch: "👀",
};

export const fetchListData = async (): Promise<ListItem[]> => {
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
