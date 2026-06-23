import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.models';
import { DestinosState } from '../state/destinos.reducer';
import { addDestino } from '../state/destinos.actions';

@Injectable({ providedIn: 'root' })
export class DestinosApiService {
  private apiUrl = '/api/destinos';

  constructor(private http: HttpClient, private store: Store<{ destinos: DestinosState }>) {}

  // GET - Obtener todos los destinos del API
  getDestinos(): Observable<DestinoViaje[]> {
    return this.http.get<DestinoViaje[]>(this.apiUrl);
  }

  // POST - Agregar un destino y notificar a Redux
  addDestino(destino: DestinoViaje): Observable<any> {
    return this.http.post(this.apiUrl, destino).pipe(
      tap((respuesta: any) => {
        if (respuesta.success) {
          // Cuando el API responde afirmativamente, notificamos a Redux
          this.store.dispatch(addDestino({ destino }));
        }
      })
    );
  }
}
