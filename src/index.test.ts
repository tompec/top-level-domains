import { tlds, getAllTlds, isTld, getPunycode, searchTlds } from './index';

describe('TLD List', () => {
    test('tlds should be an array of TLD entries', () => {
        expect(Array.isArray(tlds)).toBe(true);
        expect(tlds.length).toBeGreaterThan(0);

        // Check structure of first item
        const firstItem = tlds[0];
        expect(firstItem).toHaveProperty('tld');
        expect(firstItem).toHaveProperty('punycode');
    });

    test('getAllTlds should return an array of strings', () => {
        const allTlds = getAllTlds();
        expect(Array.isArray(allTlds)).toBe(true);
        expect(allTlds.length).toBe(tlds.length);
        expect(typeof allTlds[0]).toBe('string');
    });

    test('isTld should correctly identify valid TLDs', () => {
        // Test with a known TLD
        expect(isTld('com')).toBe(true);

        // Test with a non-existent TLD
        expect(isTld('notarealtld123456')).toBe(false);

        // Test case insensitivity
        if (tlds.some(entry => entry.tld.toLowerCase() === 'com')) {
            expect(isTld('COM')).toBe(true);
        }
    });

    test('getPunycode should return the correct punycode', () => {
        // Find an IDN TLD for testing
        const idnTld = tlds.find(entry => entry.tld !== entry.punycode);

        if (idnTld) {
            expect(getPunycode(idnTld.tld)).toBe(idnTld.punycode);
        }

        // Test with a non-existent TLD
        expect(getPunycode('notarealtld123456')).toBeNull();
    });

    test('searchTlds should return matching TLDs', () => {
        // Search for a common substring
        const results = searchTlds('com');
        expect(Array.isArray(results)).toBe(true);

        // All results should contain 'com'
        results.forEach(result => {
            expect(result.tld.toLowerCase()).toContain('com');
        });

        // Search for a non-existent TLD
        const emptyResults = searchTlds('notarealtld123456');
        expect(emptyResults.length).toBe(0);
    });

    test('tlds should be sorted by punycode', () => {
        // Create a sorted copy of the TLDs array by punycode
        const sortedTlds = [...tlds].sort((a, b) => a.punycode.localeCompare(b.punycode));

        // Compare original array with sorted one
        for (let i = 0; i < tlds.length; i++) {
            const isOrdered = tlds[i].punycode === sortedTlds[i].punycode;
            expect(isOrdered).toBe(true);
            if (!isOrdered) {
                console.error(`TLD at index ${i} is out of order: found "${tlds[i].punycode}", expected "${sortedTlds[i].punycode}"`);
            }
        }
    });

    test('tlds should not contain duplicates', () => {
        // Check for duplicate TLDs by both display form and punycode
        const displayTldCounts = new Map<string, number>();
        const punycodeTldCounts = new Map<string, number>();
        const duplicateDisplayTlds: string[] = [];
        const duplicatePunycodeTlds: string[] = [];

        // Count occurrences of each TLD
        tlds.forEach(entry => {
            // Count display form TLDs
            const displayCount = displayTldCounts.get(entry.tld) || 0;
            displayTldCounts.set(entry.tld, displayCount + 1);
            if (displayCount === 1) {
                duplicateDisplayTlds.push(entry.tld);
            }

            // Count punycode TLDs
            const punycodeCount = punycodeTldCounts.get(entry.punycode) || 0;
            punycodeTldCounts.set(entry.punycode, punycodeCount + 1);
            if (punycodeCount === 1) {
                duplicatePunycodeTlds.push(entry.punycode);
            }
        });

        // Display any duplicates found
        if (duplicateDisplayTlds.length > 0) {
            console.error(`Found ${duplicateDisplayTlds.length} duplicate display TLDs:`, duplicateDisplayTlds);
        }

        if (duplicatePunycodeTlds.length > 0) {
            console.error(`Found ${duplicatePunycodeTlds.length} duplicate punycode TLDs:`, duplicatePunycodeTlds);
        }

        // Assert no duplicates
        expect(duplicateDisplayTlds.length).toBe(0);
        expect(duplicatePunycodeTlds.length).toBe(0);
    });
});
