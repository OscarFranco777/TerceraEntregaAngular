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
import { ClickTrackerDirective } from '../directives/click-tracker';
import { TranslatePipe } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViajeComponent, FormDestinoViajeComponent, RouterLink, TranslatePipe, ClickTrackerDirective],  
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
  animations: [
    trigger('listaAnimacion', [
      // Estado cuando la lista tiene elementos
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0) scale(1)'
      })),
      // Estado cuando la lista está vacía
      state('vacio', style({
        opacity: 0.5,
        transform: 'translateY(-10px) scale(0.95)'
      })),
      // Transición cuando aparece un elemento
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px) scale(0.8)' }),
        animate('400ms ease-out')
      ]),
      // Transición cuando se elimina un elemento
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.8)' }))
      ])
    ])
  ]
})
export class ListaDestinos implements OnInit {
  destinos$: Observable<DestinoViaje[]>;
  actividades$: Observable<string[]>;
  listaState: string = 'vacio';

  constructor(
    private store: Store<{ destinos: DestinosState }>,
    private apiService: DestinosApiService
  ) {
    this.destinos$ = this.store.select(state => state.destinos.destinos);
    this.actividades$ = this.store.select(state => state.destinos.actividades);
  }

  ngOnInit(): void {
    this.store.dispatch(initApp());
    // Suscribirse para actualizar el estado de la animación
    this.destinos$.subscribe(destinos => {
      this.listaState = destinos.length > 0 ? 'visible' : 'vacio';
    });
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
