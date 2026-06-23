import { Injectable } from '@angular/core';
import { db, DestinoViajeEntity } from './dexie.db';

@Injectable({ providedIn: 'root' })
export class DexieService {

  async getAll(): Promise<DestinoViajeEntity[]> {
    return await db.destinos.toArray();
  }

  async add(entity: DestinoViajeEntity): Promise<number> {
    return await db.destinos.add(entity);
  }

  async clear(): Promise<void> {
    await db.destinos.clear();
  }

  async addAll(entities: DestinoViajeEntity[]): Promise<void> {
    await db.destinos.bulkAdd(entities);
  }
}
