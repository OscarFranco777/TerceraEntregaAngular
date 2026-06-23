import { Component, Input, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { DestinoViaje } from './../models/destino-viaje.models';
import { upvote, downvote } from '../state/destinos.actions';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css'
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino!: DestinoViaje;
  @Input() index: number = 0;

  @Output() seleccionarPreferido = new EventEmitter<DestinoViaje>();

  @HostBinding('attr.class') cssClass = 'col-md-4 mb-3';

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