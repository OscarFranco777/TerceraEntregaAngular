import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// 1. IMPORTAMOS EL COMPONENTE DE LA LISTA
// (Asegúrate de que la ruta apunte bien a tu archivo lista-destinos.ts)
import { ListaDestinos } from './lista-destinos/lista-destinos'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. CAMBIAMOS LOS IMPORTS: Quitamos el "DestinoViajeComponent" y añadimos "ListaDestinos"
  imports: [RouterOutlet, ListaDestinos], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'angular-wishlist';
}