// Only these 4 categories are allowed, if other comes it should throw error
export type FoodCategory = "starter" | "main" | "dessert" | "drink";

// Blueprint for a single food item
export interface FoodItem {
    id: number;
    name: string;
    category: FoodCategory;
    price: number;
    isAvailable: boolean; 
}