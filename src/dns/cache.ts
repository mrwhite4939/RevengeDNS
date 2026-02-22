// File: src/dns/cache.ts  
interface CacheEntry {  
  response: Buffer;  
  timestamp: number;  
  ttl: number;  
}  
  
export class DNSCache {  
  private cache: Map<string, CacheEntry> = new Map();  
  private maxSize: number = 10000;  
  
  constructor() {}  
  
  get(domain: string, type: number): Buffer | null {  
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
  
  set(domain: string, type: number, response: Buffer, ttl: number): void {  
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
  
  private evictOldest(): void {  
    let oldestKey: string | null = null;  
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
  
  private makeKey(domain: string, type: number): string {  
    return `${domain}:${type}`;  
  }  
  
  clear(): void {  
    this.cache.clear();  
  }  
  
  size(): number {  
    return this.cache.size;  
  }  
}