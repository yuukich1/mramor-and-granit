export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-zа-яё0-9\s]/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function getTrigrams(text: string): Set<string> {
    const normalized = normalizeText(text);

    if (normalized.length < 3) {
        return new Set();
    }

    const padded = `  ${normalized} `;
    const trigrams = new Set<string>();

    for (let i = 0; i < padded.length - 2; i += 1) {
        trigrams.add(padded.slice(i, i + 3));
    }

    return trigrams;
}

export function trigramSimilarity(a: string, b: string): number {
    const aTrigrams = getTrigrams(a);
    const bTrigrams = getTrigrams(b);

    if (!aTrigrams.size || !bTrigrams.size) return 0;

    let intersection = 0;

    bTrigrams.forEach(tri => {
        if (aTrigrams.has(tri)) {
            intersection += 1;
        }
    });

    return intersection / bTrigrams.size;
}
