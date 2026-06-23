import { Injectable, InjectionToken } from '@angular/core';

// --- 1) InjectionToken con useValue ---
export const APP_CONFIG_TOKEN = new InjectionToken<string>('AppConfigToken');
export const API_URL_TOKEN = new InjectionToken<string>('ApiUrlToken');

// --- 2) useClass ---
// Interfaz abstracta
export abstract class LoggerService {
  abstract log(mensaje: string): void;
  abstract getHistorial(): string[];
}

// Implementación concreta
@Injectable()
export class ConsoleLoggerService extends LoggerService {
  private historial: string[] = [];

  log(mensaje: string): void {
    const entrada = `[${new Date().toLocaleTimeString()}] ${mensaje}`;
    this.historial.push(entrada);
    console.log(entrada);
  }

  getHistorial(): string[] {
    return this.historial;
  }
}

// --- 3) useExisting ---
// Token nuevo que apunta al mismo servicio ya registrado (ConsoleLoggerService)
export const MISMA_LOGGER_TOKEN = new InjectionToken<LoggerService>('MismaLogger');
