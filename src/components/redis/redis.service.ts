import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class RedisCacheService {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
    ) {}

    async setData(KEY:string,data: any, expire_time:number): Promise<void> {
        await this.cache.set(KEY, data, {ttl:expire_time});
    }

    async getData(KEY:string): Promise<string> {
        return this.cache.get(KEY);
    }

    async delete(KEY:string): Promise<string> {
        return this.cache.del(KEY);
    }
}