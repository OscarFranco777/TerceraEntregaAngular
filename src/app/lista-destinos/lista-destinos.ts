import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { FormDestinoViajeComponent } from '../form-destino-viaje/form-destino-viaje';
import { DestinoViaje } from './../models/destino-viaje.models';
import { DestinosState } from '../state/destinos.reducer';
import { addDestino, deleteDestino, seleccionarDestino, resetVotes } from '../state/destinos.actions';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViajeComponent, FormDestinoViajeComponent],  
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css'
})
export class ListaDestinos {
  destinos$: Observable<DestinoViaje[]>;
  actividades$: Observable<string[]>;

  constructor(private store: Store<{ destinos: DestinosState }>) {
    // Seleccionar el listado de destinos del store (reactivo)
    this.destinos$ = this.store.select(state => state.destinos.destinos);
    // Seleccionar las actividades del store (reactivo)
    this.actividades$ = this.store.select(state => state.destinos.actividades);
  }

  onItemAdded(event: { nombre: string; url: string }): void {
    console.log('=== padre recibió onItemAdded ===', event);
    const nuevo = new DestinoViaje(event.nombre, event.url, 'wifi');
    this.store.dispatch(addDestino({ destino: nuevo }));
  }

  seleccionar(d: DestinoViaje): void {
    this.store.dispatch(seleccionarDestino({ destino: d }));
  }

  eliminar(index: number): void {
    this.store.dispatch(deleteDestino({ index }));
  }

  resetVotos(): void {
    this.store.dispatch(resetVotes());
  }
}
