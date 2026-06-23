import { Component, Input, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Resaltar } from '../directives/resaltar';
import { ClickTrackerDirective } from '../directives/click-tracker';
import { Store } from '@ngrx/store';
import { DestinoViaje } from './../models/destino-viaje.models';
import { upvote, downvote } from '../state/destinos.actions';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLink, Resaltar, ClickTrackerDirective],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',
  animations: [
    trigger('animacionFavorito', [
      state('normal', style({
        transform: 'scale(1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      })),
      state('favorito', style({
        transform: 'scale(1.05)',
        boxShadow: '0 0 25px rgba(40, 167, 69, 0.6), 0 0 50px rgba(40, 167, 69, 0.3)'
      })),
      transition('normal => favorito', [
        animate('600ms ease-out', keyframes([
          style({ transform: 'scale(1)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', offset: 0 }),
          style({ transform: 'scale(1.15)', boxShadow: '0 0 35px rgba(40, 167, 69, 0.8), 0 0 60px rgba(40, 167, 69, 0.4)', offset: 0.5 }),
          style({ transform: 'scale(1.05)', boxShadow: '0 0 25px rgba(40, 167, 69, 0.6), 0 0 50px rgba(40, 167, 69, 0.3)', offset: 1 })
        ]))
      ]),
      transition('favorito => normal', [
        animate('300ms ease-in', style({
          transform: 'scale(1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }))
      ])
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino!: DestinoViaje;
  @Input() index: number = 0;

  @Output() seleccionarPreferido = new EventEmitter<DestinoViaje>();

  @HostBinding('attr.class') cssClass = 'col-md-4 mb-3';

  get animacionFavoritoState(): string {
    return this.destino?.preferred ? 'favorito' : 'normal';
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSeleccionar(): void {
    this.seleccionarPreferido.emit(this.destino);
  }

  onUpvote(): void {
    this.store.dispatch(upvote({ index: this.index }));
  }

  onDownvote(): void {
    this.store.dispatch(downvote({ index: this.index }));
  }
}