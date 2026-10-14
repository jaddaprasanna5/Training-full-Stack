// only these 4 category allowed
export type FoodCategory = "starter" | "main" | "dessert" | "drink";

// single food item structure
export interface FoodItem {
  id: number
  name: string
  category: FoodCategory
  price: number
  isAvailable: boolean
}