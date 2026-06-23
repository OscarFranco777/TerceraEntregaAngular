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
  destinoId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Se suscribe al parámetro 'id' de la URL de forma reactiva
    this.route.params.subscribe(params => {
      this.destinoId = params['id'];
      this.destino = new DestinoViaje(
        `Destino #${this.destinoId}`,
        '',
        'wifi'
      );
    });
  }
}
