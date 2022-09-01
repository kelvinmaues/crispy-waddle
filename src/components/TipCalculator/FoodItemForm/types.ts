import { FoodItem } from "../types";

export type FoodItemFormProps = {
  onAddFoodItem: (foodItem: FoodItem) => void;
  onEditFoodItem?: (foodItem: FoodItem) => void;
  currentFoodItem?: FoodItem ;
};
