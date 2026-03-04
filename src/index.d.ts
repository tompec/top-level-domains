export interface TldEntry {
    tld: string;
    punycode: string;
}

export declare const tlds: TldEntry[];
export declare function getAllTlds(): string[];
export declare function isTld(tld: string): boolean;
export declare function getPunycode(tld: string): string | null;
export declare function searchTlds(search: string): TldEntry[];

declare const _default: {
    tlds: TldEntry[];
    getAllTlds: typeof getAllTlds;
    isTld: typeof isTld;
    getPunycode: typeof getPunycode;
    searchTlds: typeof searchTlds;
};
export default _default;
