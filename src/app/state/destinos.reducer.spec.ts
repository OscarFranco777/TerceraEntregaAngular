import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { destinosReducer, DestinosState, initialState } from './destinos.reducer';
import {
  addDestino,
  deleteDestino,
  seleccionarDestino,
  upvote,
  downvote,
  resetVotes,
  loadFromDexie
} from './destinos.actions';
import { DestinoViaje } from '../models/destino-viaje.models';
import { DestinoViajeEntity } from '../db/dexie.db';

describe('Destinos Reducer', () => {

  // Helper para crear un DestinoViaje de prueba
  function crearDestino(nombre: string, servicio: 'wifi' | 'servicios' | 'piscina' | 'desayuno' = 'wifi'): DestinoViaje {
    const d = new DestinoViaje(nombre, `https://img/${nombre}.jpg`, servicio);
    return d;
  }

  // ========== ESTADO INICIAL ==========
  it('debería tener un estado inicial con array de destinos vacío', () => {
    expect(initialState.destinos).toEqual([]);
    expect(initialState.actividades).toEqual([]);
  });

  it('debería retornar el estado inicial cuando no reconoce la action', () => {
    const action = { type: '@ngrx/store/init' } as Action;
    const result = destinosReducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  // ========== ADD DESTINO ==========
  describe('addDestino', () => {
    it('debería agregar un destino al estado vacío', () => {
      const destino = crearDestino('Barcelona');
      const action = addDestino({ destino });
      const result = destinosReducer(initialState, action);

      expect(result.destinos.length).toBe(1);
      expect(result.destinos[0].nombre).toBe('Barcelona');
      expect(result.destinos[0].votos).toBe(0);
      expect(result.destinos[0].preferred).toBe(false);
    });

    it('debería agregar un destino al final de la lista existente', () => {
      const destino1 = crearDestino('Barcelona');
      const destino2 = crearDestino('Roma');
      let state = destinosReducer(initialState, addDestino({ destino: destino1 }));
      state = destinosReducer(state, addDestino({ destino: destino2 }));

      expect(state.destinos.length).toBe(2);
      expect(state.destinos[0].nombre).toBe('Barcelona');
      expect(state.destinos[1].nombre).toBe('Roma');
    });

    it('no debería mutar el array original al agregar', () => {
      const destino = crearDestino('Barcelona');
      let state = destinosReducer(initialState, addDestino({ destino }));
      const prevDestinos = state.destinos;

      const destino2 = crearDestino('Roma');
      state = destinosReducer(state, addDestino({ destino: destino2 }));

      expect(prevDestinos.length).toBe(1);
      expect(state.destinos.length).toBe(2);
    });
  });

  // ========== DELETE DESTINO ==========
  describe('deleteDestino', () => {
    it('debería eliminar un destino por índice', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma'), crearDestino('Londres')],
        actividades: []
      };

      state = destinosReducer(state, deleteDestino({ index: 1 }));

      expect(state.destinos.length).toBe(2);
      expect(state.destinos[0].nombre).toBe('Barcelona');
      expect(state.destinos[1].nombre).toBe('Londres');
    });

    it('debería eliminar el primer destino correctamente', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma')],
        actividades: []
      };

      state = destinosReducer(state, deleteDestino({ index: 0 }));

      expect(state.destinos.length).toBe(1);
      expect(state.destinos[0].nombre).toBe('Roma');
    });

    it('debería eliminar el último destino correctamente', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma')],
        actividades: []
      };

      state = destinosReducer(state, deleteDestino({ index: 1 }));

      expect(state.destinos.length).toBe(1);
      expect(state.destinos[0].nombre).toBe('Barcelona');
    });
  });

  // ========== SELECCIONAR DESTINO ==========
  describe('seleccionarDestino', () => {
    it('debería marcar el destino seleccionado como preferred', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma')],
        actividades: []
      };

      state = destinosReducer(state, seleccionarDestino({ destino: crearDestino('Roma') }));

      expect(state.destinos[0].preferred).toBe(false);
      expect(state.destinos[1].preferred).toBe(true);
    });

    it('debería desmarcar los otros destinos al seleccionar uno', () => {
      const bcn = crearDestino('Barcelona');
      bcn.preferred = true;
      let state: DestinosState = {
        destinos: [bcn, crearDestino('Roma')],
        actividades: []
      };

      state = destinosReducer(state, seleccionarDestino({ destino: crearDestino('Roma') }));

      expect(state.destinos[0].preferred).toBe(false);
      expect(state.destinos[1].preferred).toBe(true);
    });

    it('debería registrar la actividad en el array actividades', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona')],
        actividades: []
      };

      state = destinosReducer(state, seleccionarDestino({ destino: crearDestino('Barcelona') }));

      expect(state.actividades.length).toBe(1);
      expect(state.actividades[0]).toContain('Barcelona');
    });

    it('debería acumular actividades múltiples', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma')],
        actividades: []
      };

      state = destinosReducer(state, seleccionarDestino({ destino: crearDestino('Barcelona') }));
      state = destinosReducer(state, seleccionarDestino({ destino: crearDestino('Roma') }));

      expect(state.actividades.length).toBe(2);
    });
  });

  // ========== UPVOTE ==========
  describe('upvote', () => {
    it('debería incrementar los votos de un destino', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona')],
        actividades: []
      };

      state = destinosReducer(state, upvote({ index: 0 }));

      expect(state.destinos[0].votos).toBe(1);
    });

    it('debería acumular votos con múltiples upvotes', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona')],
        actividades: []
      };

      state = destinosReducer(state, upvote({ index: 0 }));
      state = destinosReducer(state, upvote({ index: 0 }));
      state = destinosReducer(state, upvote({ index: 0 }));

      expect(state.destinos[0].votos).toBe(3);
    });

    it('no debería afectar a otros destinos al hacer upvote', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma')],
        actividades: []
      };

      state = destinosReducer(state, upvote({ index: 0 }));

      expect(state.destinos[0].votos).toBe(1);
      expect(state.destinos[1].votos).toBe(0);
    });

    it('debería mantener el preferred al hacer upvote', () => {
      const bcn = crearDestino('Barcelona');
      bcn.preferred = true;
      let state: DestinosState = {
        destinos: [bcn],
        actividades: []
      };

      state = destinosReducer(state, upvote({ index: 0 }));

      expect(state.destinos[0].preferred).toBe(true);
      expect(state.destinos[0].votos).toBe(1);
    });
  });

  // ========== DOWNVOTE ==========
  describe('downvote', () => {
    it('debería decrementar los votos de un destino', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona')],
        actividades: []
      };
      state = destinosReducer(state, upvote({ index: 0 }));
      state = destinosReducer(state, upvote({ index: 0 }));
      state = destinosReducer(state, downvote({ index: 0 }));

      expect(state.destinos[0].votos).toBe(1);
    });

    it('debería permitir votos negativos', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona')],
        actividades: []
      };

      state = destinosReducer(state, downvote({ index: 0 }));

      expect(state.destinos[0].votos).toBe(-1);
    });

    it('no debería afectar a otros destinos al hacer downvote', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma')],
        actividades: []
      };

      state = destinosReducer(state, downvote({ index: 0 }));

      expect(state.destinos[0].votos).toBe(-1);
      expect(state.destinos[1].votos).toBe(0);
    });
  });

  // ========== RESET VOTES ==========
  describe('resetVotes', () => {
    it('debería resetear todos los votos a 0', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma')],
        actividades: []
      };
      state = destinosReducer(state, upvote({ index: 0 }));
      state = destinosReducer(state, upvote({ index: 0 }));
      state = destinosReducer(state, upvote({ index: 1 }));

      state = destinosReducer(state, resetVotes());

      expect(state.destinos[0].votos).toBe(0);
      expect(state.destinos[1].votos).toBe(0);
    });

    it('debería mantener el preferred de los destinos al resetear votos', () => {
      const bcn = crearDestino('Barcelona');
      bcn.preferred = true;
      let state: DestinosState = {
        destinos: [bcn, crearDestino('Roma')],
        actividades: []
      };
      state = destinosReducer(state, upvote({ index: 0 }));

      state = destinosReducer(state, resetVotes());

      expect(state.destinos[0].votos).toBe(0);
      expect(state.destinos[0].preferred).toBe(true);
    });

    it('no debería cambiar la cantidad de destinos al resetear votos', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Barcelona'), crearDestino('Roma'), crearDestino('Londres')],
        actividades: []
      };

      state = destinosReducer(state, resetVotes());

      expect(state.destinos.length).toBe(3);
    });
  });

  // ========== LOAD FROM DEXIE ==========
  describe('loadFromDexie', () => {
    it('debería cargar destinos desde Dexie al estado vacío', () => {
      const entities: DestinoViajeEntity[] = [
        { id: 1, nombre: 'Barcelona', imagenUrl: 'https://img/bcn.jpg', servicio: 'wifi', preferred: false, votos: 5 },
        { id: 2, nombre: 'Roma', imagenUrl: 'https://img/roma.jpg', servicio: 'piscina', preferred: true, votos: 10 }
      ];

      const state = destinosReducer(initialState, loadFromDexie({ destinos: entities }));

      expect(state.destinos.length).toBe(2);
      expect(state.destinos[0].nombre).toBe('Barcelona');
      expect(state.destinos[0].votos).toBe(5);
      expect(state.destinos[0].servicio).toBe('wifi');
      expect(state.destinos[1].nombre).toBe('Roma');
      expect(state.destinos[1].preferred).toBe(true);
      expect(state.destinos[1].votos).toBe(10);
      expect(state.destinos[1].servicio).toBe('piscina');
    });

    it('debería reemplazar destinos existentes al cargar desde Dexie', () => {
      let state: DestinosState = {
        destinos: [crearDestino('Viejo')],
        actividades: ['actividad vieja']
      };

      const entities: DestinoViajeEntity[] = [
        { id: 1, nombre: 'Nuevo', imagenUrl: 'https://img/nuevo.jpg', servicio: 'servicios', preferred: false, votos: 0 }
      ];

      state = destinosReducer(state, loadFromDexie({ destinos: entities }));

      expect(state.destinos.length).toBe(1);
      expect(state.destinos[0].nombre).toBe('Nuevo');
    });
  });

  // ========== TESTS DE INTEGRACIÓN (flujo completo) ==========
  describe('flujo completo de usuario', () => {
    it('debería manejar el ciclo completo: agregar → seleccionar → votar → borrar', () => {
      let state = destinosReducer(initialState, addDestino({ destino: crearDestino('Barcelona') }));
      state = destinosReducer(state, addDestino({ destino: crearDestino('Roma') }));

      expect(state.destinos.length).toBe(2);

      // Seleccionar favorito
      state = destinosReducer(state, seleccionarDestino({ destino: crearDestino('Roma') }));
      expect(state.destinos[1].preferred).toBe(true);
      expect(state.actividades.length).toBe(1);

      // Votar
      state = destinosReducer(state, upvote({ index: 1 }));
      state = destinosReducer(state, upvote({ index: 1 }));
      expect(state.destinos[1].votos).toBe(2);

      // Borrar
      state = destinosReducer(state, deleteDestino({ index: 0 }));
      expect(state.destinos.length).toBe(1);
      expect(state.destinos[0].nombre).toBe('Roma');
      expect(state.destinos[0].votos).toBe(2);

      // Reset votos
      state = destinosReducer(state, resetVotes());
      expect(state.destinos[0].votos).toBe(0);
      expect(state.destinos[0].preferred).toBe(true);
    });
  });
});
