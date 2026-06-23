import { createReducer, on } from '@ngrx/store';
import { DestinoViaje } from '../models/destino-viaje.models';
import { addDestino, deleteDestino, seleccionarDestino, upvote, downvote, resetVotes } from './destinos.actions';

export interface DestinosState {
  destinos: DestinoViaje[];
  actividades: string[];
}

export const initialState: DestinosState = {
  destinos: [],
  actividades: []
};

export const destinosReducer = createReducer(
  initialState,

  // Agregar un destino al listado
  on(addDestino, (state, { destino }) => ({
    ...state,
    destinos: [...state.destinos, destino]
  })),

  // Eliminar un destino por índice
  on(deleteDestino, (state, { index }) => ({
    ...state,
    destinos: state.destinos.filter((_, i) => i !== index)
  })),

  // Seleccionar un destino como preferido
  on(seleccionarDestino, (state, { destino }) => {
    const nuevosDestinos = state.destinos.map(d => {
      const nuevo = new DestinoViaje(
        d.nombre.toString(),
        d.imagenUrl.toString(),
        d.servicio
      );
      nuevo.preferred = (d.nombre.toString() === destino.nombre.toString());
      nuevo.votos = d.votos;
      return nuevo;
    });

    const mensaje = `Se ha elegido: ${destino.nombre}`;

    return {
      ...state,
      destinos: nuevosDestinos,
      actividades: [...state.actividades, mensaje]
    };
  }),

  // Voto a favor
  on(upvote, (state, { index }) => ({
    ...state,
    destinos: state.destinos.map((d, i) => {
      if (i === index) {
        const nuevo = new DestinoViaje(d.nombre.toString(), d.imagenUrl.toString(), d.servicio);
        nuevo.preferred = d.preferred;
        nuevo.votos = d.votos + 1;
        return nuevo;
      }
      return d;
    })
  })),

  // Voto en contra
  on(downvote, (state, { index }) => ({
    ...state,
    destinos: state.destinos.map((d, i) => {
      if (i === index) {
        const nuevo = new DestinoViaje(d.nombre.toString(), d.imagenUrl.toString(), d.servicio);
        nuevo.preferred = d.preferred;
        nuevo.votos = d.votos - 1;
        return nuevo;
      }
      return d;
    })
  })),

  // Resetear todos los votos a 0
  on(resetVotes, (state) => ({
    ...state,
    destinos: state.destinos.map(d => {
      const nuevo = new DestinoViaje(d.nombre.toString(), d.imagenUrl.toString(), d.servicio);
      nuevo.preferred = d.preferred;
      nuevo.votos = 0;
      return nuevo;
    })
  }))
);
