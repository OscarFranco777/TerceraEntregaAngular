import { createAction, props } from '@ngrx/store';
import { DestinoViaje } from '../models/destino-viaje.models';

export const addDestino = createAction(
  '[Destinos] Add Destino',
  props<{ destino: DestinoViaje }>()
);

export const deleteDestino = createAction(
  '[Destinos] Delete Destino',
  props<{ index: number }>()
);

export const seleccionarDestino = createAction(
  '[Destinos] Seleccionar Preferido',
  props<{ destino: DestinoViaje }>()
);

export const upvote = createAction(
  '[Destinos] Upvote',
  props<{ index: number }>()
);

export const downvote = createAction(
  '[Destinos] Downvote',
  props<{ index: number }>()
);

export const resetVotes = createAction(
  '[Destinos] Reset Votes'
);
