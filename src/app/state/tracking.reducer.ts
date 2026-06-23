import { createReducer, on } from '@ngrx/store';
import { trackClick } from './tracking.actions';

export interface TrackingState {
  tags: { [tag: string]: number };
  totalClicks: number;
}

export const initialTrackingState: TrackingState = {
  tags: {},
  totalClicks: 0
};

export const trackingReducer = createReducer(
  initialTrackingState,

  on(trackClick, (state, { tag }) => {
    const currentCount = state.tags[tag] || 0;
    return {
      ...state,
      tags: {
        ...state.tags,
        [tag]: currentCount + 1
      },
      totalClicks: state.totalClicks + 1
    };
  })
);
