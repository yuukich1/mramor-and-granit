import { Product } from "@/types/product";
import { trigramSimilarity, normalizeText } from "./trigrams";

const THRESHOLD = 0.07;

export function searchProducts(
    products: Product[],
    query: string
): Product[] {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
        return products;
    }

    return products
        .map(product => {
            const productText = normalizeText(
                `${product.name} ${product.description ?? ""} ${product.tags?.join(" ") ?? ""}`
            );

            const score = trigramSimilarity(productText, normalizedQuery);

            return { product, score };
        })
        .filter(item => item.score >= THRESHOLD)
        .sort((a, b) => b.score - a.score)
        .map(item => item.product);
}
