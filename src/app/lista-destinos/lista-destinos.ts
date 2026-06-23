import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { FormDestinoViajeComponent } from '../form-destino-viaje/form-destino-viaje';
import { DestinoViaje } from './../models/destino-viaje.models';
import { DestinosState } from '../state/destinos.reducer';
import { RouterLink } from '@angular/router';
import { deleteDestino, seleccionarDestino, resetVotes, addDestino, initApp } from '../state/destinos.actions';
import { DestinosApiService } from '../services/destinos-api.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViajeComponent, FormDestinoViajeComponent, RouterLink, TranslatePipe],  
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css'
})
export class ListaDestinos implements OnInit {
  destinos$: Observable<DestinoViaje[]>;
  actividades$: Observable<string[]>;

  constructor(
    private store: Store<{ destinos: DestinosState }>,
    private apiService: DestinosApiService
  ) {
    this.destinos$ = this.store.select(state => state.destinos.destinos);
    this.actividades$ = this.store.select(state => state.destinos.actividades);
  }

  ngOnInit(): void {
    this.store.dispatch(initApp());
  }

  onItemAdded(event: { nombre: string; url: string }): void {
    const nuevo = new DestinoViaje(event.nombre, event.url, 'wifi');
    this.store.dispatch(addDestino({ destino: nuevo }));
    this.apiService.addDestino(nuevo).subscribe({
      next: (res) => console.log('[API] OK:', res),
      error: (err) => console.error('[API] Error:', err)
    });
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
