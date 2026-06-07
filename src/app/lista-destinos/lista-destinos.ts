import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje'; 
import { DestinoViaje } from './../models/destino-viaje.models'; 


@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViajeComponent],  
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css'
})
export class ListaDestinos {
  destinos: DestinoViaje[];

  constructor() {
    this.destinos = []; 
  }

  guardar(n: string, u: string): boolean {
    this.destinos.push(new DestinoViaje(n, u));
    console.log(this.destinos);
    return false;
  }
}