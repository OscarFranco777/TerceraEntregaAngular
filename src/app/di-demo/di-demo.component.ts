import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  APP_CONFIG_TOKEN,
  API_URL_TOKEN,
  LoggerService,
  MISMA_LOGGER_TOKEN
} from '../di/ejemplo-di';

@Component({
  selector: 'app-di-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './di-demo.html',
  styleUrl: './di-demo.css'
})
export class DiDemoComponent implements OnInit {
  nombreServicio = '';
  historial: string[] = [];

  constructor(
    @Inject(APP_CONFIG_TOKEN) public appConfig: string,
    @Inject(API_URL_TOKEN) public apiUrl: string,
    private logger: LoggerService,
    @Inject(MISMA_LOGGER_TOKEN) private mismoLogger: LoggerService
  ) {}

  ngOnInit(): void {
    this.logger.log('Componente DI Demo inicializado');
    this.nombreServicio = this.mismoLogger === this.logger
      ? 'Mismo objeto (useExisting apunta al mismo servicio)'
      : 'Objetos distintos';
    this.historial = this.logger.getHistorial();
  }

  registrar(): void {
    if (this.nombreServicio.trim()) {
      this.logger.log(this.nombreServicio.trim());
      this.historial = this.logger.getHistorial();
      this.nombreServicio = '';
    }
  }
}
