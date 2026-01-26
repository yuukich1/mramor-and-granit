export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-zа-яё0-9]/gi, "")
        .trim();
}

export function getTrigrams(text: string): Set<string> {
    const normalized = normalizeText(text);

    if (normalized.length < 3) {
        return new Set();
    }

    const trigrams = new Set<string>();

    for (let i = 0; i <= normalized.length - 3; i += 1) {
        trigrams.add(normalized.slice(i, i + 3));
    }

    return trigrams;
}

export function trigramSimilarity(a: string, b: string): number {
    if (!a || !b) return 0;

    const aTrigrams = getTrigrams(a);
    const bTrigrams = getTrigrams(b);

    if (!aTrigrams.size || !bTrigrams.size) return 0;

    let intersection = 0;

    aTrigrams.forEach(tri => {
        if (bTrigrams.has(tri)) {
            intersection += 1;
        }
    });

    return (2 * intersection) / (aTrigrams.size + bTrigrams.size);
}
