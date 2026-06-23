import { Directive, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, Subscription } from 'rxjs';
import { trackClick } from '../state/tracking.actions';

@Directive({
  selector: '[appClickTracker]',
  standalone: true
})
export class ClickTrackerDirective implements OnInit, OnDestroy {

  private el = inject(ElementRef);
  private store = inject(Store);
  private clickSub?: Subscription;

  ngOnInit(): void {
    console.log('[ClickTracker] ngOnInit ejecutado en', this.el.nativeElement.tagName);

    // Suscribirse al evento click del DOM de forma reactiva
    this.clickSub = fromEvent<MouseEvent>(this.el.nativeElement, 'click').subscribe((event) => {
      // Leer el tracking tag del atributo data-tracking-tag
      const tag = this.el.nativeElement.getAttribute('data-tracking-tag') || 'sin-tag';
      console.log(`[ClickTracker] Click detectado → tag: "${tag}"`);

      // Actualizar Redux con el tag
      this.store.dispatch(trackClick({ tag }));
    });
  }

  ngOnDestroy(): void {
    console.log('[ClickTracker] ngOnDestroy ejecutado en', this.el.nativeElement.tagName);
    this.clickSub?.unsubscribe();
  }
}
