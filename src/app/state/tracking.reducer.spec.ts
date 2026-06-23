import { trackingReducer, TrackingState, initialTrackingState } from './tracking.reducer';
import { trackClick } from './tracking.actions';

describe('Tracking Reducer', () => {

  // ========== ESTADO INICIAL ==========
  it('debería tener un estado inicial con tags vacío y totalClicks en 0', () => {
    expect(initialTrackingState.tags).toEqual({});
    expect(initialTrackingState.totalClicks).toBe(0);
  });

  it('debería retornar el estado inicial cuando no reconoce la action', () => {
    const action = { type: '@ngrx/store/init' } as any;
    const result = trackingReducer(initialTrackingState, action);
    expect(result).toEqual(initialTrackingState);
  });

  // ========== TRACK CLICK ==========
  describe('trackClick', () => {
    it('debería registrar un click con un tag nuevo', () => {
      const state = trackingReducer(initialTrackingState, trackClick({ tag: 'upvote-btn' }));

      expect(state.totalClicks).toBe(1);
      expect(state.tags['upvote-btn']).toBe(1);
    });

    it('debería incrementar el conteo de un tag existente', () => {
      let state = trackingReducer(initialTrackingState, trackClick({ tag: 'upvote-btn' }));
      state = trackingReducer(state, trackClick({ tag: 'upvote-btn' }));
      state = trackingReducer(state, trackClick({ tag: 'upvote-btn' }));

      expect(state.totalClicks).toBe(3);
      expect(state.tags['upvote-btn']).toBe(3);
    });

    it('debería manejar múltiples tags independientes', () => {
      let state = trackingReducer(initialTrackingState, trackClick({ tag: 'btn-upvote' }));
      state = trackingReducer(state, trackClick({ tag: 'btn-downvote' }));
      state = trackingReducer(state, trackClick({ tag: 'btn-upvote' }));

      expect(state.totalClicks).toBe(3);
      expect(state.tags['btn-upvote']).toBe(2);
      expect(state.tags['btn-downvote']).toBe(1);
    });

    it('debería mantener tags previos al registrar un tag nuevo', () => {
      let state = trackingReducer(initialTrackingState, trackClick({ tag: 'tag-a' }));
      state = trackingReducer(state, trackClick({ tag: 'tag-b' }));

      expect(state.tags['tag-a']).toBe(1);
      expect(state.tags['tag-b']).toBe(1);
      expect(Object.keys(state.tags).length).toBe(2);
    });

    it('debería contar correctamente múltiples clicks en diferentes tags', () => {
      let state = trackingReducer(initialTrackingState, trackClick({ tag: 'btn-upvote' }));
      state = trackingReducer(state, trackClick({ tag: 'btn-upvote' }));
      state = trackingReducer(state, trackClick({ tag: 'btn-downvote' }));
      state = trackingReducer(state, trackClick({ tag: 'btn-ir' }));
      state = trackingReducer(state, trackClick({ tag: 'btn-ir' }));
      state = trackingReducer(state, trackClick({ tag: 'btn-ir' }));

      expect(state.totalClicks).toBe(6);
      expect(state.tags['btn-upvote']).toBe(2);
      expect(state.tags['btn-downvote']).toBe(1);
      expect(state.tags['btn-ir']).toBe(3);
    });
  });
});
