import { FoodItem, FoodCategory } from "../models/FoodItem"; // importing FoodItem structure

export class MenuService {
    // Private menu list - outside file cannot directly change it
    private menu: FoodItem[] = [
        { id: 1, name: "Dosa", category: "starter", price: 80, isAvailable: true },
        { id: 2, name: "Biryani", category: "main", price: 250, isAvailable: true },
        { id: 3, name: "Paneer Curry", category: "main", price: 200, isAvailable: true },
        { id: 4, name: "Pizza", category: "main", price: 300, isAvailable: false }, // Pizza is not available now
        { id: 5, name: "Ice Cream", category: "dessert", price: 80, isAvailable: true },
        { id: 6, name: "Coffee", category: "drink", price: 60, isAvailable: true },
        { id: 7, name: "Gulab Jamun", category: "dessert", price: 90, isAvailable: true },
        { id: 8, name: "Mango Lassi", category: "drink", price: 70, isAvailable: true },
    ];

    // Return only foods where isAvailable is true
    getAvailableFoods(): FoodItem[] {
        return this.menu.filter(f => f.isAvailable);
    }

    // Find one food by its id
    getFoodById(id: number): FoodItem | undefined {
        return this.menu.find(f => f.id === id);
    }

    // Filter foods by category like main, starter etc
    filterByCategory(category: FoodCategory): FoodItem[] {
        return this.menu.filter(f => f.category === category);
    }

    // Add new food item with validation
    addFoodItem(item: FoodItem): void {
        if (!item.name.trim()) throw new Error("Food Name cannot be empty"); // name should not be empty
        if (item.price < 0) throw new Error("Price cannot be Negative"); // price check
        this.menu.push(item);
    }

    // Return copy of full menu so original array is safe
    getAll(): FoodItem[] {
        return [...this.menu];
    }
}