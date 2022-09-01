import { FoodList } from "../types";

export type FoodListProps = {
  foodList: FoodList;
  onRemove?: (index: number) => void;
  onUpdate?: (index: number) => void;
};
