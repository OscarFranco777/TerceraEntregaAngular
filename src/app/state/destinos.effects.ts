import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as DestinosActions from './destinos.actions';

@Injectable()
export class DestinosEffects {

  agregarDestino$;
  upvote$;
  resetVotos$;

  constructor(private actions$: Actions) {
    this.agregarDestino$ = createEffect(
      () => this.actions$.pipe(
        ofType(DestinosActions.addDestino),
        tap(action => console.log('[Effect] Destino agregado:', action.destino.nombre))
      ),
      { dispatch: false }
    );

    this.upvote$ = createEffect(
      () => this.actions$.pipe(
        ofType(DestinosActions.upvote),
        tap(action => console.log(`[Effect] Upvote en destino índice: ${action.index}`))
      ),
      { dispatch: false }
    );

    this.resetVotos$ = createEffect(
      () => this.actions$.pipe(
        ofType(DestinosActions.resetVotes),
        tap(() => console.log('[Effect] Todos los votos han sido reseteados a 0'))
      ),
      { dispatch: false }
    );
  }
}
