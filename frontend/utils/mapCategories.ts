import { Category } from "@/types/category";

export const mapCategoriesById = (
    categories: Category[]
): Record<number, string> => {
    return categories.reduce<Record<number, string>>((acc, category) => {
        acc[category.id] = category.name;
        return acc;
    }, {});
};
