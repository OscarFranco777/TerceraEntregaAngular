import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css'
})
export class DestinoViajeComponent implements OnInit {
  // Recibimos el objeto completo desde el componente padre
  @Input() destino!: DestinoViaje;

  // Requisito de la rúbrica: Uso de @HostBinding para inyectar clases de Bootstrap al elemento padre
  @HostBinding('attr.class') cssClass = 'col-md-4 mb-3';

  constructor() { }

  ngOnInit(): void {
  }
}