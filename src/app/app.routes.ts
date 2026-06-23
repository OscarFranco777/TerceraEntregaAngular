import { Routes } from '@angular/router';
import { ListaDestinos } from './lista-destinos/lista-destinos';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { DestinosContainerComponent } from './destinos-container/destinos-container.component';
import { DiDemoComponent } from './di-demo/di-demo.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'di-demo', component: DiDemoComponent },

  // Ruta padre con children: tiene su propio router-outlet anidado
  {
    path: 'destinos',
    component: DestinosContainerComponent,
    children: [
      { path: 'listar', component: ListaDestinos },
      { path: 'nuevo', component: ListaDestinos },
      { path: 'detalle/:id', component: DestinoDetalleComponent },
      { path: '', redirectTo: 'listar', pathMatch: 'full' }
    ]
  },

  { path: 'home', redirectTo: '/destinos/listar', pathMatch: 'full' },
  { path: '', redirectTo: '/destinos/listar', pathMatch: 'full' }
];
