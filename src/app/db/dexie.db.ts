import Dexie, { Table } from 'dexie';

export interface DestinoViajeEntity {
  id?: number;
  nombre: string;
  imagenUrl: string;
  servicio: string;
  preferred: boolean;
  votos: number;
}

export class AppDatabase extends Dexie {
  destinos!: Table<DestinoViajeEntity>;

  constructor() {
    super('AppDestinosDB');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl, servicio, preferred, votos'
    });
  }
}

export const db = new AppDatabase();
