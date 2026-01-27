import { Product } from "@/types/product";
import { normalizeText, getTrigrams } from "@/utils/trigrams";


export type IndexedProduct = {
    product: Product;
    text: string;
    trigrams: Set<string>;
};

export function buildSearchIndex(products: Product[]): IndexedProduct[] {
    return products.map(product => {
        const text = normalizeText(
            `${product.name} ${product.description ?? ""} ${product.tags?.join(" ") ?? ""}`
        );

        return {
            product,
            text,
            trigrams: getTrigrams(text),
        };
    });
}
