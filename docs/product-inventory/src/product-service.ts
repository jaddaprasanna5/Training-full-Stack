// product.service.ts - business logic layer

import { Product, ProductCategory, ProductStatus, StockLevel, ProductWithStockInfo, ProductFieldFlags, InventorySummary } from "./types";
import { Repository } from "../src/product-repository";

export class ProductService {
    private repo: Repository<Product>;

    constructor(repo: Repository<Product>) {
        this.repo = repo;
    }

    // 1. Add product - uses Omit<Product, "id">
    addProduct(productDetails: Omit<Product, "id">): Product {
        // validation
        if (!productDetails.name.trim()) {
            throw new Error("Product name cannot be empty");
        }
        if (productDetails.price <= 0) {
            throw new Error("Price must be greater than 0");
        }
        if (productDetails.quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }

        // generate new id
        const all = this.repo.getAll();
        const newId = all.length === 0 ? 1 : Math.max(...all.map(p => p.id)) + 1;

        const newProduct: Product = {
            id: newId,
            ...productDetails
        };

        return this.repo.add(newProduct);
    }

    // 2. Search - returns undefined if not found
    getProductById(id: number): Product | undefined {
        return this.repo.getById(id);
    }

    getAllProducts(): Product[] {
        return this.repo.getAll();
    }

    // 3. Update - uses Partial<Product>
    updateProduct(id: number, changes: Partial<Product>): Product | undefined {
        // validate if price is being updated
        if (changes.price !== undefined && changes.price <= 0) {
            throw new Error("Price must be greater than 0");
        }
        if (changes.quantity !== undefined && changes.quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }

        // business rule: if quantity is 0, set out-of-stock
        if (changes.quantity === 0) {
            changes.status = "out-of-stock";
        } else if (changes.quantity !== undefined && changes.quantity > 0) {
            // if quantity back to >0 and was out-of-stock, make it available
            const existing = this.repo.getById(id);
            if (existing && existing.status === "out-of-stock") {
                changes.status = "Available";
            }
        }

        return this.repo.update(id, changes);
    }

    deleteProduct(id: number): boolean {
        return this.repo.delete(id);
    }
}