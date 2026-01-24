import { Product } from "@/types/product";
const PLACEHOLDER_IMAGE = "/placeholder.png";

export function getProductImageUrl(product: Product): string {
    return product.image_url
        ? `${process.env.NEXT_PUBLIC_API_URL}/products/image/${product.image_url}`
        : PLACEHOLDER_IMAGE;
}


export function getProductPriceLabel(product: Product): string {
    if (!product.price || product.price <= 0) {
        return "Цену уточняйте";
    }

    return `от ${product.price} ₽`;
}