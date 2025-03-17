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
});
