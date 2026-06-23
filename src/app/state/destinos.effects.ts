import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllDestinos } from './destinos.selectors';
import { DexieService } from '../db/dexie.service';
import * as DestinosActions from './destinos.actions';

@Injectable()
export class DestinosEffects {
  private actions$ = inject(Actions);
  private dexie = inject(DexieService);
  private store = inject(Store);

  cargarDesdeDexie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinosActions.initApp),
      switchMap(() => from(this.dexie.getAll()).pipe(
        map(destinos => DestinosActions.loadFromDexie({ destinos })),
        catchError(() => of(DestinosActions.loadFromDexie({ destinos: [] })))
      ))
    )
  );

  persistirAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinosActions.addDestino),
      switchMap(({ destino }) => from(this.dexie.add({
        nombre: destino.nombre.toString(),
        imagenUrl: destino.imagenUrl.toString(),
        servicio: destino.servicio.toString(),
        preferred: destino.preferred,
        votos: destino.votos
      })).pipe(
        map(() => ({ type: '[Dexie] Add OK' })),
        catchError(() => of({ type: '[Dexie] Add Error' }))
      ))
    )
  );

  persistirCambios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DestinosActions.deleteDestino,
        DestinosActions.upvote,
        DestinosActions.downvote,
        DestinosActions.resetVotes,
        DestinosActions.seleccionarDestino
      ),
      withLatestFrom(this.store.select(selectAllDestinos)),
      switchMap(([_, destinos]) => {
        const entities = destinos.map(d => ({
          nombre: d.nombre.toString(),
          imagenUrl: d.imagenUrl.toString(),
          servicio: d.servicio.toString(),
          preferred: d.preferred,
          votos: d.votos
        }));
        return from(
          this.dexie.clear().then(() =>
            entities.length > 0 ? this.dexie.addAll(entities) : Promise.resolve()
          )
        ).pipe(
          map(() => ({ type: '[Dexie] Sync OK' })),
          catchError(() => of({ type: '[Dexie] Sync Error' }))
        );
      })
    )
  );
}
