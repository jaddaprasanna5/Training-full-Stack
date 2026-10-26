export type ProductStatus = "Available"|"out-of-stock"|"discontinued";
export type ProductCategory = "clothing"| "toys"| "feeding"|"care";
export type InventoryAction = "add"| "update"|"delete";

export enum StockLevel{
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: ProductCategory; 
    status: ProductStatus; 
}

export type ProductWithStockInfo = Product & {
    stockLevel :StockLevel;
    isAvailable: boolean;
}

export type ProductFieldFlags = {
    [K in keyof Product]?: boolean;
};

export type InventorySummary = {
    totalProducts: number;
    totalUnits: number;
    outOfStockCount: number;
    totalValue: number;
}