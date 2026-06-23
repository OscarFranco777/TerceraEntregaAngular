import { createAction, props } from '@ngrx/store';

export const trackClick = createAction(
  '[Tracking] Track Click',
  props<{ tag: string }>()
);
