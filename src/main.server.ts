import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // Asegúrate de que apunte a tu AppComponent
import { config } from './app/app.config.server';     // El config que corregimos antes

// 1. Definimos la función de bootstrap pasando el contexto obligatorio
const bootstrap = (context: any) => bootstrapApplication(AppComponent, config, context);

// 2. IMPORTANTE: Debe exportarse por defecto para que el motor de renderizado lo encuentre
export default bootstrap;