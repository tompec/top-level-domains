const { tlds, getAllTlds, isTld, getPunycode, searchTlds } = require('./index');

describe('TLD List', () => {
    test('tlds should be an array of TLD entries', () => {
        expect(Array.isArray(tlds)).toBe(true);
        expect(tlds.length).toBeGreaterThan(0);

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
        expect(isTld('com')).toBe(true);
        expect(isTld('notarealtld123456')).toBe(false);
        expect(isTld('COM')).toBe(true);
    });

    test('getPunycode should return the correct punycode', () => {
        const idnTld = tlds.find(entry => entry.tld !== entry.punycode);
        if (idnTld) {
            expect(getPunycode(idnTld.tld)).toBe(idnTld.punycode);
        }
        expect(getPunycode('notarealtld123456')).toBeNull();
    });

    test('searchTlds should return matching TLDs', () => {
        const results = searchTlds('com');
        expect(Array.isArray(results)).toBe(true);
        results.forEach(result => {
            expect(result.tld.toLowerCase()).toContain('com');
        });
        expect(searchTlds('notarealtld123456').length).toBe(0);
    });

    test('tlds should be sorted by punycode', () => {
        const sortedTlds = [...tlds].sort((a, b) => a.punycode.localeCompare(b.punycode));
        for (let i = 0; i < tlds.length; i++) {
            if (tlds[i].punycode !== sortedTlds[i].punycode) {
                throw new Error(`TLD at index ${i} is out of order: found "${tlds[i].punycode}", expected "${sortedTlds[i].punycode}"`);
            }
        }
    });

    test('tlds should not contain duplicates', () => {
        const seenTlds = new Set();
        const seenPunycodes = new Set();
        const dupTlds = [];
        const dupPunycodes = [];

        tlds.forEach(entry => {
            if (seenTlds.has(entry.tld)) dupTlds.push(entry.tld);
            else seenTlds.add(entry.tld);
            if (seenPunycodes.has(entry.punycode)) dupPunycodes.push(entry.punycode);
            else seenPunycodes.add(entry.punycode);
        });

        expect(dupTlds).toEqual([]);
        expect(dupPunycodes).toEqual([]);
    });
});
