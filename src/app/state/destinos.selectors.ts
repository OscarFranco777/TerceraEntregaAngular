import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DestinosState } from './destinos.reducer';

export const selectDestinosState = createFeatureSelector<DestinosState>('destinos');

export const selectAllDestinos = createSelector(
  selectDestinosState,
  (state) => state.destinos
);

export const selectActividades = createSelector(
  selectDestinosState,
  (state) => state.actividades
);
