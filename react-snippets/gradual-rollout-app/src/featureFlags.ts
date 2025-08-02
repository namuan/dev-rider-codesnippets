// Hashing function
export function simpleHash(str: string, maxValue: number): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % maxValue;
}

// Function to determine feature availability
export function isFeatureEnabled(userId: string, rolloutPercentage: number): boolean {
    const maxValue = 100; // Use a range of 0-99 for percentage calculations
    const hashValue = simpleHash(userId, maxValue);
    return hashValue < rolloutPercentage;
}
