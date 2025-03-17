import tldData from '../data.json';

export interface TldEntry {
    tld: string;
    punycode: string;
}

/**
 * The complete list of all TLDs
 */
export const tlds: TldEntry[] = tldData;

/**
 * Get all TLDs as an array of strings
 * @returns Array of TLD strings (e.g., ["com", "org", "net", ...])
 */
export function getAllTlds(): string[] {
    return tlds.map(entry => entry.tld);
}

/**
 * Check if a string is a valid TLD
 * @param tld The TLD to check
 * @returns True if the TLD exists in the list
 */
export function isTld(tld: string): boolean {
    return tlds.some(entry => entry.tld.toLowerCase() === tld.toLowerCase());
}

/**
 * Get the punycode representation of a TLD
 * @param tld The TLD to get the punycode for
 * @returns The punycode representation or null if the TLD doesn't exist
 */
export function getPunycode(tld: string): string | null {
    const entry = tlds.find(entry => entry.tld.toLowerCase() === tld.toLowerCase());
    return entry ? entry.punycode : null;
}

/**
 * Filter TLDs by a search string
 * @param search The search string
 * @returns Array of TLD entries that match the search
 */
export function searchTlds(search: string): TldEntry[] {
    const searchLower = search.toLowerCase();
    return tlds.filter(entry => entry.tld.toLowerCase().includes(searchLower));
}

export default {
    tlds,
    getAllTlds,
    isTld,
    getPunycode,
    searchTlds
};
