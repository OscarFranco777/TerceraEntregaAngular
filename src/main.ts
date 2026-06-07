import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// 👇 CAMBIAMOS 'App' POR 'AppComponent'
import { AppComponent } from './app/app'; 

// 👇 AQUÍ TAMBIÉN PASAMOS 'AppComponent'
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));