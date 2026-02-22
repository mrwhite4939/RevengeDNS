export declare class DNSCache {
    private cache;
    private maxSize;
    constructor();
    get(domain: string, type: number): Buffer | null;
    set(domain: string, type: number, response: Buffer, ttl: number): void;
    private evictOldest;
    private makeKey;
    clear(): void;
    size(): number;
}
//# sourceMappingURL=cache.d.ts.map