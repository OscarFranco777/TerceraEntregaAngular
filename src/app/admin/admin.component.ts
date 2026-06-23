import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card shadow border-success">
            <div class="card-body p-4">
              <h3 class="card-title text-success mb-3">Panel de Administración</h3>
              <p class="lead">Esta sección está protegida por un <code>authGuard</code>.</p>
              <p>Solo los usuarios logueados pueden acceder a esta ruta.</p>
              <div class="alert alert-info">
                <strong>✅ Acceso concedido</strong> — Estás autenticado en el sistema.
              </div>
              <button class="btn btn-outline-danger" (click)="logout()">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
