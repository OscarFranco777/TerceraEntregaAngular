import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.models';

// Modelo para cada entrada del log de actividades
export class Actividad {
  nombre: string;
  fecha: Date;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.fecha = new Date();
  }
}

@Injectable({
  providedIn: 'root'
})
export class DestinosApiClient {
  // Subject que emite la lista completa de destinos
  private destinosSubject = new BehaviorSubject<DestinoViaje[]>([]);
  destinos$ = this.destinosSubject.asObservable();

  // Subject que emite cada vez que se elige un preferido
  private motivoSubject = new Subject<string>();
  motivo$ = this.motivoSubject.asObservable();

  // Subject que emite el log de actividades
  private actividadesSubject = new BehaviorSubject<Actividad[]>([]);
  actividades$ = this.actividadesSubject.asObservable();

  constructor() {}

  // Agregar un destino al listado
  agregar(d: DestinoViaje): void {
    const actuales = this.destinosSubject.getValue();
    this.destinosSubject.next([...actuales, d]);
  }

  // Obtener la lista actual (síncrono)
  getAll(): DestinoViaje[] {
    return this.destinosSubject.getValue();
  }

  // Seleccionar un destino como preferido
  seleccionar(d: DestinoViaje): void {
    const actuales = this.destinosSubject.getValue();

    // Recrear todos los destinos (forzar detección de cambios)
    const nuevos = actuales.map(item => {
      const nuevo = new DestinoViaje(
        item.nombre.toString(),
        item.imagenUrl.toString(),
        item.servicio
      );
      nuevo.preferred = (item.nombre.toString() === d.nombre.toString());
      return nuevo;
    });

    this.destinosSubject.next(nuevos);

    // Emitir el motivo de la selección
    const mensaje = `Se ha elegido: ${d.nombre}`;
    this.motivoSubject.next(mensaje);

    // Agregar al log de actividades
    const actividades = this.actividadesSubject.getValue();
    this.actividadesSubject.next([...actividades, new Actividad(d.nombre.toString())]);
  }
}
