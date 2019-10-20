import { Injectable } from '@nestjs/common';
import { IEquipment } from '../../utils/equipment.interface';
import Timer = NodeJS.Timer;

interface Cache {
  [key: string]: CacheRecord
}

interface CacheRecord {
  ttl: number;
  data: CacheRecordData;
}

export type CacheRecordData = IEquipment | IEquipment[];

@Injectable()
export class EquipmentCacheService {
  private cache: CacheRecord[] = [];
  private checkTimer: Timer;
  private checkPeriod: number = 600;

  constructor() {
    this.checkData();
  }

  private hasExpired(record: CacheRecord): boolean {
    return record.ttl > Date.now();
  }

  private checkData() {
    this.cache = this.cache.filter((record: CacheRecord) =>
      this.hasExpired(record),
    );
    this.checkTimer = setTimeout(this.checkData, this.checkPeriod * 1000);
  }

  set(key: string, data: CacheRecordData, ttl: number = 600) {
    this.cache[key] = { data, ttl };
  }

  get(key): CacheRecordData {
    const record = this.cache[key];
    return record ? record.data : null;
  }

  getTll(key: string): number {
    const record = this.cache[key];
    return record ? record.ttl : null;
  }

  setTll(key: string, ttl: number): void {
    const record = this.cache[key];
    record.ttl = ttl;
  }

  delete(key): void {
    this.cache[key] = null;
  }
}
