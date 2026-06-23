import { createReducer, on } from '@ngrx/store';
import { DestinoViaje } from '../models/destino-viaje.models';
import { Servicio } from '../models/destino-viaje.models';
import { addDestino, deleteDestino, seleccionarDestino, upvote, downvote, resetVotes, loadFromDexie } from './destinos.actions';

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

  on(addDestino, (state, { destino }) => ({
    ...state,
    destinos: [...state.destinos, destino]
  })),

  on(deleteDestino, (state, { index }) => ({
    ...state,
    destinos: state.destinos.filter((_, i) => i !== index)
  })),

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

    return {
      ...state,
      destinos: nuevosDestinos,
      actividades: [...state.actividades, `Se ha elegido: ${destino.nombre}`]
    };
  }),

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

  on(resetVotes, (state) => ({
    ...state,
    destinos: state.destinos.map(d => {
      const nuevo = new DestinoViaje(d.nombre.toString(), d.imagenUrl.toString(), d.servicio);
      nuevo.preferred = d.preferred;
      nuevo.votos = 0;
      return nuevo;
    })
  })),

  on(loadFromDexie, (state, { destinos }) => ({
    ...state,
    destinos: destinos.map(d => {
      const dv = new DestinoViaje(d.nombre, d.imagenUrl, d.servicio as Servicio);
      dv.preferred = d.preferred;
      dv.votos = d.votos;
      return dv;
    })
  }))
);
