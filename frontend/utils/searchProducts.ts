import { IndexedProduct } from "./searchIndex";
import { normalizeText, getTrigrams } from "./trigrams";

const TRIGRAM_THRESHOLD = 0.3;

export function searchIndexedProducts(
    indexed: IndexedProduct[],
    query: string
) {
    const q = normalizeText(query);

    if (!q) {
        return indexed.map(i => i.product);
    }

    if (q.length < 4) {
        return indexed
            .filter(i => i.text.includes(q))
            .map(i => i.product);
    }

    const qTrigrams = getTrigrams(q);

    return indexed
        .map(i => {
            let match = 0;

            qTrigrams.forEach(tri => {
                if (i.trigrams.has(tri)) {
                    match += 1;
                }
            });

            const score = match / qTrigrams.size;

            return { product: i.product, score };
        })
        .filter(i => i.score >= TRIGRAM_THRESHOLD)
        .sort((a, b) => b.score - a.score)
        .map(i => i.product);
}
