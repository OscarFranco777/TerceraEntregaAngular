import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TrackingState } from '../state/tracking.reducer';

@Injectable({ providedIn: 'root' })
export class TrackingService {
  private sub?: Subscription;

  constructor(private store: Store<{ tracking: TrackingState }>) {}

  startTracking(): void {
    this.sub = this.store.select(state => state.tracking).subscribe(tracking => {
      if (tracking.totalClicks > 0) {
        console.log(`[TrackingService] Total clicks: ${tracking.totalClicks}`);
        console.log('[TrackingService] Tags:', JSON.stringify(tracking.tags));
      }
    });
  }

  stopTracking(): void {
    this.sub?.unsubscribe();
  }
}
