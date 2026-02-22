"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DNSCache = void 0;
class DNSCache {
    cache = new Map();
    maxSize = 10000;
    constructor() { }
    get(domain, type) {
        const key = this.makeKey(domain, type);
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        const now = Date.now();
        const age = now - entry.timestamp;
        if (age > entry.ttl * 1000) {
            this.cache.delete(key);
            return null;
        }
        return entry.response;
    }
    set(domain, type, response, ttl) {
        if (ttl <= 0 || ttl > 86400) {
            ttl = 300;
        }
        if (this.cache.size >= this.maxSize) {
            this.evictOldest();
        }
        const key = this.makeKey(domain, type);
        this.cache.set(key, {
            response: Buffer.from(response),
            timestamp: Date.now(),
            ttl
        });
    }
    evictOldest() {
        let oldestKey = null;
        let oldestTime = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (entry.timestamp < oldestTime) {
                oldestTime = entry.timestamp;
                oldestKey = key;
            }
        }
        if (oldestKey) {
            this.cache.delete(oldestKey);
        }
    }
    makeKey(domain, type) {
        return `${domain}:${type}`;
    }
    clear() {
        this.cache.clear();
    }
    size() {
        return this.cache.size;
    }
}
exports.DNSCache = DNSCache;
//# sourceMappingURL=cache.js.map