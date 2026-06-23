import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestinoViaje } from './../models/destino-viaje.models';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.css'
})
export class DestinoDetalleComponent implements OnInit {
  destino!: DestinoViaje;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Por ahora muestra un destino de ejemplo
    // Más adelante se puede conectar con un servicio
    this.destino = new DestinoViaje(
      'Destino Seleccionado',
      '',
      'wifi'
    );
  }
}
