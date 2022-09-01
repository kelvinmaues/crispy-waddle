import { FoodItem } from "../types";

export type NewFoodItemFormProps = {
  onAddFoodItem?: (foodItem: FoodItem) => void;
};
