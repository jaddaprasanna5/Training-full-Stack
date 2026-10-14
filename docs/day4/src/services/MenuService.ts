import { FoodItem, FoodCategory } from "../models/FoodItem";

export class MenuService {
  // menu list - private
  private menu: FoodItem[] = [
    { id: 1, name: "Dosa", category: "starter", price: 80, isAvailable: true },
    { id: 2, name: "Biryani", category: "main", price: 250, isAvailable: true },
    { id: 3, name: "Paneer Curry", category: "main", price: 200, isAvailable: true },
    { id: 4, name: "Pizza", category: "main", price: 300, isAvailable: false }, // not available
    { id: 5, name: "Ice Cream", category: "dessert", price: 80, isAvailable: true },
    { id: 6, name: "Coffee", category: "drink", price: 60, isAvailable: true },
    { id: 7, name: "Gulab Jamun", category: "dessert", price: 90, isAvailable: true },
    { id: 8, name: "Mango Lassi", category: "drink", price: 70, isAvailable: true },
  ];

  // get only available foods
  getAvailableFoods(): FoodItem[] {
    let result: FoodItem[] = []
    for(let f of this.menu){
      if(f.isAvailable == true){
        result.push(f)
      }
    }
    return result
  }

  getFoodById(id: number): FoodItem | undefined {
    for(let f of this.menu){
      if(f.id == id){
        return f
      }
    }
    return undefined
  }

  // filter by category
  filterByCategory(category: FoodCategory): FoodItem[] {
    let filtered: FoodItem[] = []
    this.menu.forEach(f => {
      if(f.category == category){
        filtered.push(f)
      }
    })
    return filtered
  }

  addFoodItem(item: FoodItem): void {
    if(!item.name.trim()){
      throw new Error("Food name empty") // name check
    }
    if(item.price < 0){
      throw new Error("Price negative not allowed")
    }
    this.menu.push(item)
  }

  getAll(): FoodItem[] {
    return [...this.menu] // return copy
  }
}