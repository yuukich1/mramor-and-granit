import { Product } from "@/types/product";
import type { ProductFiltersState } from "@/types/filters";

export function filterProducts(
    products: Product[],
    filters: ProductFiltersState
): Product[] {
    const {
        minPrice,
        maxPrice,
        categoryId,
        tags,
    } = filters;

    return products.filter(product => {
        if (minPrice !== undefined && product.price < minPrice) {
            return false;
        }

        if (maxPrice !== undefined && product.price > maxPrice) {
            return false;
        }

        if (categoryId !== undefined && product.category_id !== categoryId) {
            return false;
        }

        if (tags.length > 0) {
            if (!product.tags?.some(tag => tags.includes(tag))) {
                return false;
            }
        }

        return true;
    });
}
