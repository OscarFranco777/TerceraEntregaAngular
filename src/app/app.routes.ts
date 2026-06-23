import { Routes } from '@angular/router';
import { ListaDestinos } from './lista-destinos/lista-destinos';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle';

export const routes: Routes = [
  { path: 'home', component: ListaDestinos },
  { path: 'destino', component: ListaDestinos },
  { path: 'destino/detalle', component: DestinoDetalleComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
